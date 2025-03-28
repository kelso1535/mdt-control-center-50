local Config = require 'config'
local MDTOpen = false
local callsign = nil
local currentFramework = nil

-- Detect framework
local function DetectFramework()
    if GetResourceState('es_extended') ~= 'missing' then
        currentFramework = 'esx'
        return 'esx'
    elseif GetResourceState('qb-core') ~= 'missing' then
        currentFramework = 'qbcore'
        return 'qbcore'
    else
        currentFramework = 'standalone'
        return 'standalone'
    end
end

-- Create a standalone callback system
local ClientCallbacks = {}

function TriggerServerCallback(name, cb, ...)
    local requestId = GetGameTimer()
    ClientCallbacks[requestId] = cb
    TriggerServerEvent('mdt:server:TriggerCallback', name, requestId, ...)
end

RegisterNetEvent('mdt:client:TriggerCallback')
AddEventHandler('mdt:client:TriggerCallback', function(requestId, ...)
    if ClientCallbacks[requestId] then
        ClientCallbacks[requestId](...)
        ClientCallbacks[requestId] = nil
    end
end)

-- Standalone notification system
RegisterNetEvent('mdt:client:Notify')
AddEventHandler('mdt:client:Notify', function(message, type)
    -- Basic notification if ox_lib is not available
    SetNotificationTextEntry('STRING')
    AddTextComponentString(message)
    DrawNotification(false, false)
end)

-- Notification function that uses ox_lib if enabled
local function Notify(message, type)
    if Config.UseOxLib then
        exports['ox_lib']:notify({
            title = 'Police MDT',
            description = message,
            type = type or 'inform'
        })
    else
        TriggerEvent('mdt:client:Notify', message, type)
    end
end

-- Base functions
function OpenMDT()
    if MDTOpen then return end
    
    -- In standalone, we can use a job check command to verify or simply use the callsign requirement
    if not callsign and Config.EnableCallsign then
        Notify('Please set your callsign using /' .. Config.OpenCommand .. '-callsign first', 'error')
        return
    end

    -- Trigger NUI open
    MDTOpen = true
    SetNuiFocus(true, true)
    SendNUIMessage({
        type = "open",
        callsign = callsign
    })
    Notify('MDT opened', 'primary')
end

function CloseMDT()
    if not MDTOpen then return end
    
    MDTOpen = false
    SetNuiFocus(false, false)
    SendNUIMessage({
        type = "close"
    })
    Notify('MDT closed', 'primary')
end

-- Register MDT Command
RegisterCommand(Config.OpenCommand, function()
    if not MDTOpen then
        OpenMDT()
    else
        CloseMDT()
    end
end, false)

-- Register callsign command
RegisterCommand(Config.OpenCommand .. '-callsign', function(source, args)
    if args[1] then
        callsign = args[1]
        TriggerServerEvent('mdt:server:SetCallsign', callsign)
        Notify('Callsign set to: ' .. callsign, 'success')
    else
        Notify('Please specify a callsign', 'error')
    end
end, false)

-- Register keybinding if configured
if Config.OpenKey and Config.OpenKey ~= '' then
    RegisterKeyMapping(Config.OpenCommand, 'Open Police MDT', 'keyboard', Config.OpenKey)
end

-- NUI Callbacks
RegisterNUICallback('closeApp', function(_, cb)
    CloseMDT()
    cb('ok')
end)

RegisterNUICallback('login', function(data, cb)
    -- Handle login callback
    if data.callsign then
        callsign = data.callsign
        TriggerServerEvent('mdt:server:SetCallsign', callsign)
        Notify('Logged in as: ' .. callsign, 'success')
    end
    cb({ success = true })
end)

RegisterNUICallback('changeStatus', function(data, cb)
    -- Handle status change
    if data.status then
        TriggerServerEvent("police:server:UpdateStatus", data.status)
        Notify('Status changed to: ' .. data.status, 'success')
    end
    cb('ok')
end)

RegisterNUICallback('duress', function(_, cb)
    -- Handle duress signal
    local coords = GetEntityCoords(PlayerPedId())
    TriggerServerEvent("police:server:DuressSignal", coords)
    cb('ok')
end)

RegisterNUICallback('flagStolen', function(_, cb)
    -- Handle flagging police vehicle as stolen
    local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
    if vehicle ~= 0 then
        local plate = GetVehicleNumberPlateText(vehicle)
        TriggerServerEvent("police:server:FlagVehicleStolen", plate)
    end
    cb('ok')
end)

-- ANPR Functionality (if enabled)
local lastScannedPlate = nil

function ScanVehicleAhead()
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
            Notify('ANPR: Scanning plate ' .. plate, 'inform')
        end
    else
        Notify('ANPR: No vehicle detected', 'error')
    end
end

-- Manual ANPR scan with PageDown key
RegisterCommand('manual_anpr', function()
    ScanVehicleAhead()
end, false)

RegisterKeyMapping('manual_anpr', 'Manual ANPR Scan', 'keyboard', 'PAGEDOWN')

-- Only register ANPR command if enabled
if Config.EnableANPR then
    RegisterCommand('anpr', function()
        ScanVehicleAhead()
    end, false)
    
    -- Register keybinding for ANPR
    RegisterKeyMapping('anpr', 'Scan vehicle with ANPR', 'keyboard', 'Y')
end

-- NUI Callbacks for Search History
RegisterNUICallback('getSearchHistory', function(_, cb)
    TriggerServerCallback('mdt:server:GetSearchHistory', function(history)
        cb(history)
    end)
end)

-- Event Handlers
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
        
        Notify('ANPR: ' .. results.plate .. ownerInfo .. ' - ' .. flagMessage, 'success')
    else
        -- No flags, just display the owner info
        Notify('ANPR: ' .. results.plate .. ' - Owner: ' .. results.owner, 'success')
    end
    
    -- Store the ANPR record in the MDT system
    -- This would typically be done server-side in a real implementation
    TriggerServerEvent('mdt:server:StoreANPRRecord', results)
end)

-- Close MDT on resource stop to prevent stuck NUI
AddEventHandler('onResourceStop', function(resource)
    if resource == GetCurrentResourceName() and MDTOpen then
        CloseMDT()
    end
end)

-- Initialize by detecting framework
Citizen.CreateThread(function()
    DetectFramework()
    print('MDT initialized with framework: ' .. currentFramework)
end)
