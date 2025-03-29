
fx_version 'cerulean'
game 'gta5'

author 'Lovable AI'
description 'Standalone Police MDT System'
version '1.0.0'

ui_page 'web/dist/index.html'

shared_scripts {
    'config.lua'
}

client_scripts {
    'client/main.lua',
    'client/init.lua',
    'client/commands.lua',
    'client/modules/*.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua',
    'server/modules/*.lua'
}

files {
    'web/dist/index.html',
    'web/dist/assets/**/*'
}

dependencies {
    'oxmysql'
}

lua54 'yes'
