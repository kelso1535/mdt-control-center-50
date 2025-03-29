
local Config = require 'config'
local Notifications = require 'client.modules.notifications'
local MDT = {}
local MDTOpen = false
local callsign = nil

-- Getters and setters
function MDT.IsOpen()
    return MDTOpen
end

function MDT.SetCallsign(newCallsign)
    callsign = newCallsign
    TriggerServerEvent('mdt:server:SetCallsign', callsign)
    Notifications.Notify('Callsign set to: ' .. callsign, 'success')
end

function MDT.GetCallsign()
    return callsign
end

-- MDT functions
function MDT.Open()
    if MDTOpen then return end
    
    -- In standalone, we can use a job check command to verify or simply use the callsign requirement
    if not callsign and Config.EnableCallsign then
        Notifications.Notify('Please set your callsign using /' .. Config.OpenCommand .. '-callsign first', 'error')
        return
    end

    -- Trigger NUI open
    MDTOpen = true
    SetNuiFocus(true, true)
    SendNUIMessage({
        type = "open",
        callsign = callsign
    })
    Notifications.Notify('MDT opened', 'primary')
end

function MDT.Close()
    if not MDTOpen then return end
    
    MDTOpen = false
    SetNuiFocus(false, false)
    SendNUIMessage({
        type = "close"
    })
    Notifications.Notify('MDT closed', 'primary')
end

-- NUI Callbacks
RegisterNUICallback('closeApp', function(_, cb)
    MDT.Close()
    cb('ok')
end)

RegisterNUICallback('login', function(data, cb)
    -- Handle login callback
    if data.callsign then
        MDT.SetCallsign(data.callsign)
        Notifications.Notify('Logged in as: ' .. callsign, 'success')
    end
    cb({ success = true })
end)

RegisterNUICallback('changeStatus', function(data, cb)
    -- Handle status change
    if data.status then
        TriggerServerEvent("police:server:UpdateStatus", data.status)
        Notifications.Notify('Status changed to: ' .. data.status, 'success')
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

-- NUI Callbacks for Search History
RegisterNUICallback('getSearchHistory', function(_, cb)
    TriggerServerCallback('mdt:server:GetSearchHistory', function(history)
        cb(history)
    end)
end)

return MDT
