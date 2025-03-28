
local Config = {}

-- MDT Configuration
Config.RequireJobName = 'police' -- Job name required to access MDT
Config.OpenCommand = 'mdt'      -- Command to open MDT
Config.OpenKey = 'F6'           -- Key to open MDT (leave empty to disable)
Config.EnableCallsign = true    -- Enable callsign requirements for login
Config.AdminPassword = 'admin123' -- Leadership password to access admin features

-- Status options
Config.StatusOptions = {
    'Available',
    'Busy', 
    'On Scene',
    'Responding',
    'Off Duty'
}

-- Department configuration
Config.DepartmentName = 'Police Department'

-- Notification settings
Config.UseOxLib = false -- Set to false by default to ensure no external dependencies

-- ANPR Configuration
Config.EnableANPR = true -- Enable ANPR integration
Config.ANPRScanDistance = 7.0 -- Distance in meters for ANPR scanning
Config.ManualANPRKey = 'PAGEDOWN' -- Key for manual ANPR scan

-- Database Configuration
Config.DatabaseType = 'mysql-async' -- Supported: 'mysql-async', 'oxmysql', 'ghmattimysql'
Config.DatabasePrefix = '' -- Table prefix if any

-- DMV Integration 
Config.EnableDMVIntegration = true -- Enable DMV database integration

-- Search History
Config.EnableSearchHistory = true -- Enable search history tracking

-- Framework Functions (These will be overridden by the framework detection)
Config.Framework = {
    -- These are fallback functions if no framework is detected
    GetPlayerData = function(source)
        return {
            job = { name = 'police' },
            source = source,
            name = 'Officer ' .. source,
            metadata = { 
                callsign = 'UNIT-' .. source 
            },
            citizenid = 'CITIZEN' .. source,
            charinfo = { 
                firstname = 'Officer',
                lastname = tostring(source)
            }
        }
    end,
    
    Notify = function(source, message, type)
        TriggerClientEvent('mdt:client:Notify', source, message, type)
    end
}

return Config
