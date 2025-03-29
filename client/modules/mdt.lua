
local Config = require 'config'
local MDT = {}
local isOpen = false

function MDT.IsOpen()
    return isOpen
end

function MDT.Open()
    if isOpen then return end
    
    isOpen = true
    
    -- Send NUI message to open MDT
    SendNUIMessage({
        type = 'openMDT'
    })
    
    -- Display NUI cursor
    SetNuiFocus(true, true)
end

function MDT.Close()
    if not isOpen then return end
    
    isOpen = false
    
    -- Send NUI message to close MDT
    SendNUIMessage({
        type = 'closeMDT'
    })
    
    -- Hide NUI cursor
    SetNuiFocus(false, false)
end

function MDT.Toggle()
    if isOpen then
        MDT.Close()
    else
        MDT.Open()
    end
end

-- Register NUI callbacks
RegisterNUICallback('closeApp', function(data, cb)
    MDT.Close()
    cb('ok')
end)

RegisterNUICallback('login', function(data, cb)
    print('Officer logged in with callsign: ' .. (data.callsign or 'UNKNOWN'))
    cb('ok')
end)

RegisterNUICallback('changeStatus', function(data, cb)
    print('Officer changed status to: ' .. (data.status or 'UNKNOWN'))
    cb('ok')
end)

RegisterNUICallback('duress', function(data, cb)
    print('DURESS ALERT ACTIVATED')
    -- Additional duress functionality would go here
    cb('ok')
end)

RegisterNUICallback('flagStolen', function(data, cb)
    print('Vehicle flagged as stolen')
    -- Additional stolen vehicle flag functionality would go here
    cb('ok')
end)

return MDT
