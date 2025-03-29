
-- Import required modules
local Config = _G.Config or {}
local Notifications = {}

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

-- Check if MDT UI is open
local isOpen = false

-- Function to open MDT UI with proper data
local function OpenMDT()
    local playerData = {}
    local frameworkName = exports['mdt']:GetFramework()
    
    if frameworkName == 'qbcore' then
        local QBCore = exports['qb-core']:GetCoreObject()
        local Player = QBCore.Functions.GetPlayerData()
        playerData = {
            callsign = Player.metadata.callsign or 'UNIT',
            name = Player.charinfo.firstname .. ' ' .. Player.charinfo.lastname,
            job = Player.job.name,
            grade = Player.job.grade.name
        }
    elseif frameworkName == 'esx' then
        local ESX = exports['es_extended']:getSharedObject()
        local Player = ESX.GetPlayerData()
        playerData = {
            callsign = Player.callsign or 'UNIT',
            name = Player.firstName .. ' ' .. Player.lastName,
            job = Player.job.name,
            grade = Player.job.grade
        }
    else
        -- Fallback to default values
        playerData = {
            callsign = 'UNIT-' .. GetPlayerServerId(PlayerId()),
            name = 'Officer',
            job = 'police',
            grade = 'Unknown'
        }
    end
    
    -- Send NUI message to open MDT with proper data
    SendNUIMessage({
        type = "open",
        data = playerData
    })
    SetNuiFocus(true, true)
    isOpen = true
    
    -- Debug info
    print('[MDT] Opening MDT UI with data:', json.encode(playerData))
end

-- Function to close MDT UI
local function CloseMDT()
    SendNUIMessage({
        type = "close"
    })
    SetNuiFocus(false, false)
    isOpen = false
    
    -- Debug info
    print('[MDT] Closing MDT UI')
end

-- Register MDT Command
RegisterCommand(Config.OpenCommand or 'mdt', function()
    if not isOpen then
        OpenMDT()
    else
        CloseMDT()
    end
end, false)

-- Register NUI callback for closing
RegisterNUICallback('close', function(_, cb)
    CloseMDT()
    if cb then cb('ok') end
end)

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

-- Register keybinding if configured
if Config.OpenKey and Config.OpenKey ~= '' then
    RegisterKeyMapping(Config.OpenCommand, 'Open Police MDT', 'keyboard', Config.OpenKey)
end

-- Expose functions globally
_G.MDT = _G.MDT or {}
_G.MDT.Open = OpenMDT
_G.MDT.Close = CloseMDT
_G.MDT.IsOpen = function() return isOpen end
_G.MDT.Notify = Notify

-- Export functions
exports('OpenMDT', OpenMDT)
exports('CloseMDT', CloseMDT)
exports('IsOpen', function() return isOpen end)

-- Return the module
return {
    Open = OpenMDT,
    Close = CloseMDT,
    IsOpen = function() return isOpen end,
    Notify = Notify
}
