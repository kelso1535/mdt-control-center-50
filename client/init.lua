
-- Initialize MDT client modules
Citizen.CreateThread(function()
    -- Wait for resource to fully start
    Wait(1000)
    
    -- Debug log
    print('[MDT] Initializing MDT client modules')
    
    -- Initialize framework detection
    local Framework = {}
    
    -- Detect framework
    function Framework.DetectFramework()
        if GetResourceState('es_extended') ~= 'missing' then
            print('[MDT] ESX framework detected')
            return 'esx'
        elseif GetResourceState('qb-core') ~= 'missing' then
            print('[MDT] QBCore framework detected')
            return 'qbcore'
        else
            print('[MDT] No framework detected, using standalone')
            return 'standalone'
        end
    end
    
    -- Export framework detection
    exports('GetFramework', Framework.DetectFramework)
    
    -- Initialize NUI callbacks
    RegisterNUICallback('fetchData', function(data, cb)
        -- Example implementation
        local responseData = {
            success = true,
            message = "Data fetched successfully",
            data = data
        }
        cb(responseData)
    end)
    
    -- Register event to close MDT on resource stop
    AddEventHandler('onResourceStop', function(resource)
        if resource == GetCurrentResourceName() then
            -- Close MDT if it's open
            if _G.MDT and _G.MDT.IsOpen and _G.MDT.IsOpen() then
                _G.MDT.Close()
            end
        end
    end)
    
    print('[MDT] Client modules initialized successfully')
end)
