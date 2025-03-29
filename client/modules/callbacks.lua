
local Callbacks = {}
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

-- Export the TriggerServerCallback function
Callbacks.TriggerServerCallback = TriggerServerCallback

return Callbacks
