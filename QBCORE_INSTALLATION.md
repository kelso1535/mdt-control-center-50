
# QB-Core MDT Installation Guide

This guide provides step-by-step instructions for installing the Police MDT system on a QBCore FiveM server.

## Installation

### Step 1: Resource Setup

1. Download the resource and place it in your `resources` folder
2. Rename the folder to `qb-mdt` if it's not already named that
3. Ensure folder structure looks like:
   ```
   resources/
   └── qb-mdt/
       ├── client/
       ├── server/
       ├── web/
       ├── config.lua
       ├── fxmanifest.lua
       └── ...
   ```

### Step 2: Build the Web UI

1. Make sure you have Node.js installed (v16+ recommended)
2. Open a terminal/command prompt
3. Navigate to the web directory:
   ```
   cd /path/to/server/resources/qb-mdt/web
   ```
4. Install dependencies:
   ```
   npm install
   ```
5. Build for production:
   ```
   npm run build
   ```
6. Verify a `dist` folder was created with the built files

### Step 3: Configure for QB-Core

1. Open `config.lua` in a text editor
2. Update the following settings to match your server:
   ```lua
   -- Job configuration
   Config.RequireJobName = 'police' -- Change if your police job has a different name
   
   -- Department configuration
   Config.DepartmentName = 'Los Santos Police Department' -- Change to your server's department name
   
   -- Commands
   Config.OpenCommand = 'mdt' -- Command to open MDT
   Config.OpenKey = 'F6'      -- Key to open MDT (empty to disable)
   
   -- IMPORTANT: Change the admin password!
   Config.AdminPassword = 'YourSecurePasswordHere' 
   
   -- Database settings
   Config.DatabaseType = 'oxmysql' -- Use 'mysql-async' if you're using that instead
   Config.DatabasePrefix = ''      -- Only change if you use table prefixes
   ```

### Step 4: Server Configuration

1. Add the following line to your `server.cfg`:
   ```
   ensure qb-mdt
   ```
   Make sure it loads after QB-Core and your database resource
   
2. Restart your server or use the following commands:
   ```
   refresh
   ensure qb-mdt
   ```

### Step 5: Verify Integration

1. Join your server as a police officer
2. Run the command `/mdt` to open the MDT
3. You should see the login screen - enter your callsign
4. Test basic functionality like person and vehicle searches

## QB-Core Specific Integration

### Job Integration

The MDT integrates with the QB-Core job system. By default, it's configured for the 'police' job. If you have custom police job names, update the `Config.RequireJobName` setting.

### Database Integration

The MDT automatically integrates with QB-Core's database tables:
- `players` - For citizen information
- `player_vehicles` - For vehicle registration
- No additional tables need to be created

### Player Commands

The following commands are registered:
- `/mdt` - Opens the MDT interface
- `/setcallsign [callsign]` - Sets your officer callsign
- `/checkwarrants` - Checks active warrants
- `/vehiclecheck [plate]` - Checks a specific vehicle plate

### Permissions

By default, only players with the police job can access the MDT. You can modify this in the config to include additional jobs like 'sheriff' or custom jobs.

## Additional Setup

### Customizing Templates

1. Log in to the MDT with an admin account
2. Navigate to Admin > Templates
3. Enter the admin password (set in config.lua)
4. Create or modify templates for reports, warrants, etc.

### Adding Magistrates

If you want to use the magistrate system:
1. Set `Config.MagistrateAccess = true` in config.lua
2. Configure which jobs can access the magistrate portal
3. Use the `/magistrate` command to access the portal

## Support and Updates

For issues, check:
1. Your server console for any error messages
2. The F8 console in-game for client-side errors
3. Ensure your QB-Core version is up-to-date

Remember to back up the resource before making any custom modifications!

