-- Dynamic framework loader for MDT
local Framework = {}

-- Determine which framework is being used
local function DetectFramework()
    if GetResourceState('es_extended') ~= 'missing' then
        local ESX = exports['es_extended']:getSharedObject()
        Framework = ESX
        return 'esx'
    elseif GetResourceState('qb-core') ~= 'missing' then
        local QBCore = exports['qb-core']:GetCoreObject()
        Framework = QBCore
        return 'qbcore'
    else
        -- Create a standalone framework with equivalent functions
        Framework = {
            Functions = {
                GetPlayer = function(source)
                    -- Simple player data structure for standalone
                    return {
                        PlayerData = {
                            job = { name = 'police' },
                            source = source,
                            charinfo = { 
                                firstname = 'Officer',
                                lastname = tostring(source)
                            },
                            citizenid = 'CITIZEN' .. source,
                            metadata = { 
                                callsign = 'UNIT-' .. source 
                            }
                        },
                        Functions = {
                            SetMetaData = function(_, value)
                                -- Implement if needed
                            end
                        }
                    }
                end,
                CreateCallback = function(name, cb)
                    -- Register a server callback
                    ServerCallbacks[name] = cb
                end
            }
        }
        return 'standalone'
    end
end

local frameworkName = DetectFramework()
print('MDT initialized with framework: ' .. frameworkName)

-- Export the framework for other server files to use
_G.Framework = Framework
return Framework
