
local Config = require 'config'

-- Import modules
local Framework = require 'client.modules.framework'
local Callbacks = require 'client.modules.callbacks'
local Notifications = require 'client.modules.notifications'
local MDT = require 'client.modules.mdt'
local ANPR = require 'client.modules.anpr'
local Commands = require 'client.modules.commands'

-- Initialize the client-side functionality
Citizen.CreateThread(function()
    local detectedFramework = Framework.DetectFramework()
    print('MDT initialized with framework: ' .. detectedFramework)
end)

-- Register event to close MDT on resource stop
AddEventHandler('onResourceStop', function(resource)
    if resource == GetCurrentResourceName() and MDT.IsOpen() then
        MDT.Close()
    end
end)
