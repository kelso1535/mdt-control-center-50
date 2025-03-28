
fx_version 'cerulean'
game 'gta5'

name 'QB-MDT'
author 'Lovable AI'
description 'Police MDT System for QB-Core'
version '1.0.0'

ui_page 'web/dist/index.html'

shared_scripts {
    'config.lua'
}

client_scripts {
    'client/main.lua',
    'client/commands.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua'
}

files {
    'web/dist/index.html',
    'web/dist/**/*'
}

dependencies {
    'oxmysql',
    'qb-core'
}

lua54 'yes'
