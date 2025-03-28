
local Framework = require 'server.core'
local Config = require 'config'
local SearchHistory = require 'server.modules.search_history'

-- ANPR scanning functionality
RegisterNetEvent('mdt:server:ANPRScan', function(plate)
    local src = source
    if not plate then return end
    
    -- Log the ANPR scan
    SearchHistory.AddToSearchHistory(src, 'ANPR', plate)
    
    plate = string.gsub(plate, "^%s*(.-)%s*$", "%1") -- Trim whitespace
    
    -- Query the database for the vehicle and owner information
    local result = {
        plate = plate,
        owner = "Unknown",
        model = "Unknown",
        stolen = false,
        expired_registration = false,
        owner_wanted = false,
        insurance_expired = false,
        flags = {}
    }
    
    -- Use the appropriate framework to get vehicle data
    if Config.DatabaseType == 'oxmysql' then
        local query = "SELECT pv.*, p.charinfo FROM " .. Config.DatabasePrefix .. "player_vehicles pv " ..
                      "LEFT JOIN " .. Config.DatabasePrefix .. "players p ON pv.citizenid = p.citizenid " ..
                      "WHERE pv.plate = ?"
        local results = exports.oxmysql:executeSync(query, {plate})
        
        if results and results[1] then
            local charinfo = json.decode(results[1].charinfo or '{}')
            if charinfo and charinfo.firstname then
                result.owner = charinfo.firstname .. ' ' .. charinfo.lastname
                
                -- Check if owner has warrants
                local warrantQuery = "SELECT * FROM warrants WHERE citizenid = ? AND active = 1"
                local warrantResults = exports.oxmysql:executeSync(warrantQuery, {results[1].citizenid})
                if warrantResults and #warrantResults > 0 then
                    result.owner_wanted = true
                    table.insert(result.flags, "OWNER_WANTED")
                end
            end
            result.model = results[1].vehicle
            
            -- Check registration status
            if results[1].registration_expiry then
                local current_time = os.time()
                local expiry_time = results[1].registration_expiry
                if expiry_time < current_time then
                    result.expired_registration = true
                    table.insert(result.flags, "EXPIRED_REGISTRATION")
                end
            end
            
            -- Check insurance status
            if results[1].insurance_expiry then
                local current_time = os.time()
                local expiry_time = results[1].insurance_expiry
                if expiry_time < current_time then
                    result.insurance_expired = true
                    table.insert(result.flags, "INSURANCE_EXPIRED")
                end
            end
            
            -- Check if vehicle is marked as stolen
            if results[1].stolen == 1 then
                result.stolen = true
                table.insert(result.flags, "STOLEN")
            end
        else
            -- If no vehicle is found but plate matches a stolen vehicle record
            local stolenQuery = "SELECT * FROM stolen_vehicles WHERE plate = ?"
            local stolenResults = exports.oxmysql:executeSync(stolenQuery, {plate})
            
            if stolenResults and stolenResults[1] then
                result.stolen = true
                table.insert(result.flags, "STOLEN")
            else
                -- No flags found, mark as manual check
                table.insert(result.flags, "MANUAL_CHECK")
            end
        end
    else
        -- Fall back to Framework's database functionality or use other DB adapters
        -- This would need to be customized for different frameworks
        -- If no flags found, mark as manual check
        table.insert(result.flags, "MANUAL_CHECK")
    end
    
    -- Send the scan results back to the client
    TriggerClientEvent('mdt:client:ANPRResults', src, result)
end)
