
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
- Magistrate portal for court case management

## Quick Start

1. Place in your resources folder
2. Build the web UI:
   ```bash
   cd web
   npm install
   npm run build
   ```
3. Add `ensure qb-mdt` to your server.cfg
4. Restart your server
5. Use `/mdt` in-game to access

## Detailed Installation

For detailed installation instructions, see:
- [QBCORE_INSTALLATION.md](QBCORE_INSTALLATION.md) - Step-by-step QB-Core setup
- [DEPLOYMENT.md](DEPLOYMENT.md) - Complete deployment guide with troubleshooting

## Commands

- `/mdt` - Open the MDT interface
- `/setcallsign [callsign]` - Set your officer callsign
- `/checkwarrants` - Check active warrants
- `/anpr` - Scan vehicle in front of you
- `/vehiclecheck [plate]` - Check a specific vehicle plate

## Configuration

You can configure the MDT system in the `config.lua` file:

- Job requirements
- Commands and keybinds
- Callsign requirements
- Department name
- And more

## Dependencies

- QB-Core framework
- oxmysql

## Support

For support or questions, please consult the detailed installation guides included with this resource.

