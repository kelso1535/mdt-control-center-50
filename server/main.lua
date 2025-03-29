
-- MDT Server side with multi-framework support


-- Hash table for active sessions
local ActiveSessions = {}
local SearchHistory = {}
local Templates = {}

-- Basic session management functions
local function CreateSession(source, callsign)
    ActiveSessions[tostring(source)] = {
        source = source,
        callsign = callsign,
        lastActive = os.time()
    }
end

local function GetSession(source)
    return ActiveSessions[tostring(source)]
end

local function UpdateSession(source, data)
    if ActiveSessions[tostring(source)] then
        for k, v in pairs(data) do
            ActiveSessions[tostring(source)][k] = v
        end
        ActiveSessions[tostring(source)].lastActive = os.time()
    end
end

local function DestroySession(source)
    ActiveSessions[tostring(source)] = nil
end

-- Register server callback system
local ServerCallbacks = {}

function RegisterServerCallback(name, cb)
    ServerCallbacks[name] = cb
end

RegisterNetEvent('mdt:server:TriggerCallback')
AddEventHandler('mdt:server:TriggerCallback', function(name, requestId, ...)
    local source = source
    
    if ServerCallbacks[name] then
        ServerCallbacks[name](source, function(...)
            TriggerClientEvent('mdt:client:TriggerCallback', source, requestId, ...)
        end, ...)
    else
        print('MDT: Server callback ' .. name .. ' does not exist')
    end
end)

-- Database function to execute SQL based on configured driver
local function ExecuteSQL(query, params, callback)
    params = params or {}
    
    if Config.DatabaseType == 'oxmysql' then
        if callback then
            exports.oxmysql:execute(query, params, callback)
        else
            return exports.oxmysql:executeSync(query, params)
        end
    elseif Config.DatabaseType == 'mysql-async' then
        if callback then
            exports['mysql-async']:mysql_execute(query, params, callback)
        else
            return exports['mysql-async']:mysql_execute_sync(query, params)
        end
    elseif Config.DatabaseType == 'ghmattimysql' then
        if callback then
            exports.ghmattimysql:execute(query, params, callback)
        else
            return exports.ghmattimysql:executeSync(query, params)
        end
    else
        print('MDT: Unsupported database type: ' .. Config.DatabaseType)
        return {}
    end
end

-- Event handler: Set callsign
RegisterNetEvent('mdt:server:SetCallsign')
AddEventHandler('mdt:server:SetCallsign', function(callsign)
    local src = source
    local Player = Framework.Functions.GetPlayer(src)
    
    if Player and Player.PlayerData.job.name == Config.RequireJobName then
        CreateSession(src, callsign)
        Config.Framework.Notify(src, 'Callsign set to: ' .. callsign, 'success')
    end
end)

-- Search history functions
local function AddToSearchHistory(source, searchType, query)
    local timestamp = os.date("%Y-%m-%d %H:%M")
    local session = GetSession(source)
    
    if not session then
        return
    end
    
    local searchId = #SearchHistory + 1
    
    SearchHistory[searchId] = {
        id = searchId,
        officer = session.callsign or ('Officer ' .. source),
        callsign = session.callsign or 'Unknown',
        timestamp = timestamp,
        type = searchType,
        query = query
    }
    
    -- Keep only the last 50 searches
    if #SearchHistory > 50 then
        table.remove(SearchHistory, 1)
    end
end

-- Server callbacks for search history
RegisterServerCallback('mdt:server:GetSearchHistory', function(source, cb)
    cb(SearchHistory)
end)

-- Server callbacks for searches
RegisterServerCallback('mdt:server:SearchPerson', function(source, cb, name)
    -- Log the person search
    AddToSearchHistory(source, 'Person', name)
    
    -- Query database for person information
    local query = "SELECT * FROM players WHERE CONCAT(LOWER(JSON_EXTRACT(charinfo, '$.firstname')), ' ', LOWER(JSON_EXTRACT(charinfo, '$.lastname'))) LIKE ?"
    ExecuteSQL(query, {'%' .. string.lower(name) .. '%'}, function(results)
        local formattedResults = {}
        
        if results and #results > 0 then
            for i, player in ipairs(results) do
                local charinfo = json.decode(player.charinfo)
                formattedResults[i] = {
                    id = player.citizenid,
                    name = charinfo.firstname .. ' ' .. charinfo.lastname,
                    dob = charinfo.birthdate,
                    gender = charinfo.gender,
                    phone = charinfo.phone,
                    wanted = false -- Default, would need to check warrants table
                }
            end
        end
        
        cb(formattedResults)
    end)
end)

RegisterServerCallback('mdt:server:SearchVehicle', function(source, cb, plate)
    -- Log the vehicle search
    AddToSearchHistory(source, 'Vehicle', plate)
    
    -- Query database for vehicle information
    local query = "SELECT pv.*, p.charinfo FROM " .. Config.DatabasePrefix .. "player_vehicles pv " ..
                  "LEFT JOIN " .. Config.DatabasePrefix .. "players p ON pv.citizenid = p.citizenid " ..
                  "WHERE pv.plate LIKE ?"
                  
    ExecuteSQL(query, {'%' .. string.upper(plate) .. '%'}, function(results)
        local formattedResults = {}
        
        if results and #results > 0 then
            for i, vehicle in ipairs(results) do
                local charinfo = json.decode(vehicle.charinfo or '{}')
                local owner = "Unknown"
                if charinfo and charinfo.firstname then
                    owner = charinfo.firstname .. ' ' .. charinfo.lastname
                end
                
                formattedResults[i] = {
                    plate = vehicle.plate,
                    model = vehicle.vehicle,
                    color = "Unknown", -- Not typically stored in default tables
                    owner = owner,
                    stolen = false, -- Would need to check against stolen vehicles table
                    insurance = 'Valid' -- Would need additional integration
                }
            end
        end
        
        cb(formattedResults)
    end)
end)

RegisterServerCallback('mdt:server:GetWarrants', function(source, cb)
    -- Log the warrant search
    AddToSearchHistory(source, 'Warrant', 'All Active Warrants')
    
    -- Query database for active warrants
    local warrants = {}
    
    -- This would need to be integrated with your actual warrants system
    -- For now, return mock data
    warrants = {
        {
            id = 'w1',
            name = 'John Smith',
            status = 'ACTIVE',
            count = 3
        },
        {
            id = 'w2',
            name = 'Jane Doe',
            status = 'ACTIVE',
            count = 1
        },
        {
            id = 'w3',
            name = 'Mike Johnson',
            status = 'ACTIVE',
            count = 2
        }
    }
    
    cb(warrants)
end)

-- Template management
RegisterServerCallback('mdt:server:GetTemplates', function(source, cb)
    cb(Templates)
end)

RegisterNetEvent('mdt:server:AddTemplate')
AddEventHandler('mdt:server:AddTemplate', function(password, template)
    local src = source
    if password ~= Config.AdminPassword then
        Config.Framework.Notify(src, 'Invalid admin password', 'error')
        return
    end
    
    table.insert(Templates, template)
    Config.Framework.Notify(src, 'Template added successfully', 'success')
end)

RegisterNetEvent('mdt:server:UpdateTemplate')
AddEventHandler('mdt:server:UpdateTemplate', function(password, templateId, updatedTemplate)
    local src = source
    if password ~= Config.AdminPassword then
        Config.Framework.Notify(src, 'Invalid admin password', 'error')
        return
    end
    
    for i, template in ipairs(Templates) do
        if template.id == templateId then
            Templates[i] = updatedTemplate
            Config.Framework.Notify(src, 'Template updated successfully', 'success')
            return
        end
    end
    
    Config.Framework.Notify(src, 'Template not found', 'error')
end)

RegisterNetEvent('mdt:server:DeleteTemplate')
AddEventHandler('mdt:server:DeleteTemplate', function(password, templateId)
    local src = source
    if password ~= Config.AdminPassword then
        Config.Framework.Notify(src, 'Invalid admin password', 'error')
        return
    end
    
    for i, template in ipairs(Templates) do
        if template.id == templateId then
            table.remove(Templates, i)
            Config.Framework.Notify(src, 'Template deleted successfully', 'success')
            return
        end
    end
    
    Config.Framework.Notify(src, 'Template not found', 'error')
end)

-- ANPR scanning functionality
RegisterNetEvent('mdt:server:ANPRScan')
AddEventHandler('mdt:server:ANPRScan', function(plate)
    local src = source
    if not plate then return end
    
    -- Log the ANPR scan
    AddToSearchHistory(src, 'ANPR', plate)
    
    plate = string.gsub(plate, "^%s*(.-)%s*$", "%1") -- Trim whitespace
    
    -- Query the database for the vehicle and owner information
    local query = "SELECT pv.*, p.charinfo FROM " .. Config.DatabasePrefix .. "player_vehicles pv " ..
                  "LEFT JOIN " .. Config.DatabasePrefix .. "players p ON pv.citizenid = p.citizenid " ..
                  "WHERE pv.plate = ?"
                  
    ExecuteSQL(query, {plate}, function(results)
        local result = {
            plate = plate,
            owner = "Unknown",
            model = "Unknown",
            stolen = false
        }
        
        if results and results[1] then
            local charinfo = json.decode(results[1].charinfo or '{}')
            if charinfo and charinfo.firstname then
                result.owner = charinfo.firstname .. ' ' .. charinfo.lastname
            end
            result.model = results[1].vehicle
        end
        
        TriggerClientEvent('mdt:client:ANPRResults', src, result)
    end)
end)

-- Additional server events
RegisterNetEvent('police:server:UpdateStatus')
AddEventHandler('police:server:UpdateStatus', function(status)
    local src = source
    local session = GetSession(src)
    
    if session then
        -- Update officer status
        UpdateSession(src, {status = status})
        Config.Framework.Notify(src, 'Status updated to: ' .. status, 'success')
    end
end)

RegisterNetEvent('police:server:DuressSignal')
AddEventHandler('police:server:DuressSignal', function(coords)
    local src = source
    local session = GetSession(src)
    
    if session then
        -- In a real implementation, this would alert other police officers
        Config.Framework.Notify(src, 'EMERGENCY: Duress signal sent', 'error')
    end
end)

-- Clean up when player disconnects
AddEventHandler('playerDropped', function()
    local src = source
    DestroySession(src)
end)

-- Auto-complete resource initial setup
AddEventHandler('onResourceStart', function(resource)
    if resource == GetCurrentResourceName() then
        print('MDT system initialized')
        
        -- Add default templates
        table.insert(Templates, {
            id = 'template1',
            name = 'Pursuit Template',
            type = 'Warrant',
            section1 = 'Outstanding Warrant for Questioning - FIRSTNAME LASTNAME\n\nList of Charges and/or PINS:\n- Engage in a Police pursuit / Evade Police',
            section2 = 'Preliminary Details\nTime: xxxx HRS\nDate: xx/xx/20\n\nWarrant Details:\n[CALL SIGN] signalled for [VEHICLE DESCRIPTION] to stop. The driver of the vehicle deliberately increased their speed and engaged in a police pursuit. The vehicle was successful in evading police. The registered owner of the vehicle is [REGISTERED OWNER\'S NAME] and the vehicle was NOT listed as stolen at the time of the pursuit. The accused is required to provide evidence of the driver at the time of the incident or they are to be charged with the above charges as the registered owner of the vehicle.\n\nEvidence:\nEvidence Locker: \n\n- Example: Highway Patrol Radar Print Out\n\nANPR Hits:\nIf applicable - to be copied from your MDT\n\nVicRoads Profile:\nTo be copied and pasted after running a vehicle check on the license plate\n\nSigned,\nFIRSTNAME LASTNAME\nRank | Callsign\nVictoria Police'
        })
        
        table.insert(Templates, {
            id = 'template2',
            name = 'Stolen Weapon Template',
            type = 'Serial# KALOF',
            section1 = 'SERIAL KALOF - Reported stolen\n\nCHARGES: \n-Robbery\n-Possess a [Class A / B / C] firearm without legal authority',
            section2 = 'Preliminary Details:\nTime: xxxx HRS\nDate: xx/xx/20\n\nAt Approx. [TIME]hrs [CALL SIGN] responded to a 000 call in relation to a stolen weapon. After discussing with [REGISTERED OWNER], it was ascertained that they had complied with their weapons license and had their [Weapon type] stolen by an individual, [NAME|DESCRIPTION|UNKOWN]. \n\n[Serial information to be Copy and Pasted here]\n\nWhoever is found in possession of this firearm is to be charged with the above offence(s) and any others attached to this firearm serial.'
        })
    end
end)

