
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
        stolen = false
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
            end
            result.model = results[1].vehicle
        end
    else
        -- Fall back to Framework's database functionality or use other DB adapters
        -- This would need to be customized for different frameworks
    end
    
    TriggerClientEvent('mdt:client:ANPRResults', src, result)
end)

