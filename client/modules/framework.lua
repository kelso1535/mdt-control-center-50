
local Framework = {}
local currentFramework = nil

-- Detect framework
function Framework.DetectFramework()
    if GetResourceState('es_extended') ~= 'missing' then
        currentFramework = 'esx'
        return 'esx'
    elseif GetResourceState('qb-core') ~= 'missing' then
        currentFramework = 'qbcore'
        return 'qbcore'
    else
        currentFramework = 'standalone'
        return 'standalone'
    end
end

function Framework.GetCurrentFramework()
    return currentFramework
end

return Framework
