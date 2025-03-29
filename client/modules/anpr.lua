
local Config = require 'config'
local Notifications = require 'client.modules.notifications'
local ANPR = {}
local lastScannedPlate = nil

function ANPR.ScanVehicleAhead()
    if not Config.EnableANPR then return end
    
    local playerPed = PlayerPedId()
    local playerCoords = GetEntityCoords(playerPed)
    local forward = GetEntityForwardVector(playerPed)
    local forwardCoords = vector3(
        playerCoords.x + forward.x * Config.ANPRScanDistance,
        playerCoords.y + forward.y * Config.ANPRScanDistance,
        playerCoords.z
    )
    
    local rayHandle = StartShapeTestRay(playerCoords.x, playerCoords.y, playerCoords.z, 
                                        forwardCoords.x, forwardCoords.y, forwardCoords.z,
                                        10, playerPed, 0)
    local _, _, _, _, vehicle = GetShapeTestResult(rayHandle)
    
    if DoesEntityExist(vehicle) and IsEntityAVehicle(vehicle) then
        local plate = GetVehicleNumberPlateText(vehicle)
        if plate ~= lastScannedPlate then
            lastScannedPlate = plate
            TriggerServerEvent('mdt:server:ANPRScan', plate)
            Notifications.Notify('ANPR: Scanning plate ' .. plate, 'inform')
        end
    else
        Notifications.Notify('ANPR: No vehicle detected', 'error')
    end
end

-- Register events for ANPR results
RegisterNetEvent('mdt:client:ANPRResults', function(results)
    if not results then return end
    
    local flagMessage = ""
    
    -- Check if any flags were found
    if results.flags and #results.flags > 0 then
        -- Create message based on flags
        for i, flag in ipairs(results.flags) do
            if i > 1 then flagMessage = flagMessage .. ", " end
            
            if flag == "STOLEN" then
                flagMessage = flagMessage .. "~r~STOLEN~s~"
            elseif flag == "EXPIRED_REGISTRATION" then
                flagMessage = flagMessage .. "~y~EXPIRED REGO~s~"
            elseif flag == "OWNER_WANTED" then
                flagMessage = flagMessage .. "~p~OWNER WANTED~s~"
            elseif flag == "INSURANCE_EXPIRED" then
                flagMessage = flagMessage .. "~o~NO INSURANCE~s~"
            elseif flag == "MANUAL_CHECK" then
                flagMessage = flagMessage .. "~b~MANUAL CHECK~s~"
            end
        end
        
        -- Display the notification with owner and flag info
        local ownerInfo = ""
        if results.owner and results.owner ~= "Unknown" then
            ownerInfo = " - Owner: " .. results.owner
        end
        
        Notifications.Notify('ANPR: ' .. results.plate .. ownerInfo .. ' - ' .. flagMessage, 'success')
    else
        -- No flags, just display the owner info
        Notifications.Notify('ANPR: ' .. results.plate .. ' - Owner: ' .. results.owner, 'success')
    end
    
    -- Store the ANPR record in the MDT system
    TriggerServerEvent('mdt:server:StoreANPRRecord', results)
end)

return ANPR
