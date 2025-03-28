
# QB-Core Police MDT System

A modern police Mobile Data Terminal (MDT) system for QB-Core FiveM servers.

## Features

- Modern, responsive UI with a realistic MDT look and feel
- Officer login with callsign verification
- Status updates for officers
- Person, vehicle, and serial number searches
- Criminal and traffic history lookups
- Warrant system
- Duress/emergency functionality
- Officer tracking for command staff
- ANPR (Automatic Number Plate Recognition) integration
- DMV database integration
- ox_lib notifications support

## Installation

1. Copy this resource to your server's resource folder
2. Add `ensure qb-mdt` to your server.cfg
3. Configure the `config.lua` file to match your server's needs
4. If using ox_lib for notifications, ensure it's installed and loaded before this resource
5. Build the web UI (see instructions below)
6. Restart your server

## Building the Web UI

```bash
cd web
npm install
npm run build
```

## Commands

- `/mdt` - Open the MDT interface
- `/setcallsign [callsign]` - Set your officer callsign
- `/checkwarrants` - Check active warrants
- `/anpr` - Scan vehicle in front of you (keybind: Y)
- `/vehiclecheck [plate]` - Check a specific vehicle plate

## Configuration

You can configure the MDT system in the `config.lua` file:

- Job requirements
- Command and key bindings
- Callsign requirements
- Status options
- Department name
- Notification system (QB or ox_lib)
- ANPR settings
- DMV integration

## Dependencies

- QB-Core framework
- oxmysql
- ox_lib (optional, for improved notifications)

## Integration

This MDT system is designed to work with:
- Any DMV script that provides vehicle registration data
- ANPR/ALPR scripts for automatic plate scanning
- Standard QB-Core player and vehicle database tables

## Credits

Developed by Lovable AI for QB-Core FiveM servers.
