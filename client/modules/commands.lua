
local Config = require 'config'
local MDT = require 'client.modules.mdt'
local ANPR = require 'client.modules.anpr'
local Commands = {}

-- Register MDT Command
RegisterCommand(Config.OpenCommand, function()
    if not MDT.IsOpen() then
        MDT.Open()
    else
        MDT.Close()
    end
end, false)

-- Register callsign command
RegisterCommand(Config.OpenCommand .. '-callsign', function(source, args)
    if args[1] then
        MDT.SetCallsign(args[1])
    else
        Notifications.Notify('Please specify a callsign', 'error')
    end
end, false)

-- Manual ANPR scan with PageDown key
RegisterCommand('manual_anpr', function()
    ANPR.ScanVehicleAhead()
end, false)

RegisterKeyMapping('manual_anpr', 'Manual ANPR Scan', 'keyboard', 'PAGEDOWN')

-- Only register ANPR command if enabled
if Config.EnableANPR then
    RegisterCommand('anpr', function()
        ANPR.ScanVehicleAhead()
    end, false)
    
    -- Register keybinding for ANPR
    RegisterKeyMapping('anpr', 'Scan vehicle with ANPR', 'keyboard', 'Y')
end

-- Register keybinding if configured
if Config.OpenKey and Config.OpenKey ~= '' then
    RegisterKeyMapping(Config.OpenCommand, 'Open Police MDT', 'keyboard', Config.OpenKey)
end

return Commands
