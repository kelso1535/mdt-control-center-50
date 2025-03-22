
local Config = require 'config'

-- Helper function to use ox_lib notifications if enabled
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

-- Additional commands for police operations
RegisterCommand('checkwarrants', function()
    TriggerServerCallback('mdt:server:GetWarrants', function(warrants)
        if #warrants > 0 then
            for i, warrant in ipairs(warrants) do
                Notify(warrant.name .. ' - ' .. warrant.charges, 'inform')
            end
        else
            Notify('No active warrants found', 'inform')
        end
    end)
end, false)

-- Register NUI callback for getting warrants
RegisterNUICallback('getWarrants', function(_, cb)
    TriggerServerCallback('mdt:server:GetWarrants', function(warrants)
        cb(warrants)
    end)
end)

-- Add ANPR related commands
if Config.EnableANPR then
    RegisterCommand('vehiclecheck', function(_, args)
        if not args[1] then
            Notify('Please specify a plate number', 'error')
            return
        end
        
        TriggerServerEvent('mdt:server:ANPRScan', args[1])
    end, false)
end

-- Status command
RegisterCommand('police-status', function(_, args)
    if not args[1] then
        local statusStr = table.concat(Config.StatusOptions, ", ")
        Notify('Available statuses: ' .. statusStr, 'inform')
        return
    end
    
    -- Check if the status is valid
    local validStatus = false
    for _, status in ipairs(Config.StatusOptions) do
        if status:lower() == args[1]:lower() then
            TriggerServerEvent('police:server:UpdateStatus', status)
            validStatus = true
            break
        end
    end
    
    if not validStatus then
        Notify('Invalid status. Use one of: ' .. table.concat(Config.StatusOptions, ", "), 'error')
    end
end, false)

-- Duress command
RegisterCommand('duress', function()
    local coords = GetEntityCoords(PlayerPedId())
    TriggerServerEvent('police:server:DuressSignal', coords)
    Notify('EMERGENCY: Duress signal activated!', 'error')
end, false)

