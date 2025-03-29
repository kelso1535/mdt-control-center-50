
local Config = require 'config'
local Notifications = {}

-- Basic notification if ox_lib is not available
RegisterNetEvent('mdt:client:Notify')
AddEventHandler('mdt:client:Notify', function(message, type)
    SetNotificationTextEntry('STRING')
    AddTextComponentString(message)
    DrawNotification(false, false)
end)

-- Notification function that uses ox_lib if enabled
function Notifications.Notify(message, type)
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

return Notifications
