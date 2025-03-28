
# QB-Core Police MDT Deployment Guide

This guide provides detailed instructions for deploying the Police MDT system to your QBCore FiveM server.

## Prerequisites

- A working QB-Core FiveM server
- oxmysql or mysql-async resource installed
- Node.js and npm (for building the web UI)
- Basic understanding of FiveM resource management

## Deployment Steps

### Step 1: Prepare the Resource

1. Download or clone this repository
2. Rename the folder to `qb-mdt` (if not already named that)
3. Place the folder in your server's `resources` directory

### Step 2: Build the Web UI

1. Open your terminal/command prompt
2. Navigate to the web directory inside the qb-mdt resource:
   ```
   cd /path/to/server/resources/qb-mdt/web
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Build the UI for production:
   ```
   npm run build
   ```
   This will create a `dist` folder with optimized production assets.

### Step 3: Configure the Resource

1. Open the `config.lua` file and adjust settings according to your server's needs:
   ```lua
   Config.RequireJobName = 'police' -- Change if your police job has a different name
   Config.OpenCommand = 'mdt'      -- Change command if needed
   Config.OpenKey = 'F6'           -- Key to open MDT (change or leave empty to disable)
   Config.AdminPassword = 'admin123' -- IMPORTANT: Change this to a secure password!
   ```
   
2. Configure database settings:
   ```lua
   Config.DatabaseType = 'oxmysql' -- Change to 'mysql-async' if you're using that
   Config.DatabasePrefix = ''      -- Add your table prefix if any
   ```

### Step 4: Add to server.cfg

Add the following line to your server.cfg:
```
ensure qb-mdt
```

### Step 5: Set Up Database Integration

The MDT system will integrate with your existing QB-Core tables. Make sure your database has:

- `players` table with player information
- `player_vehicles` table for vehicle records
- Proper QB-Core identifiers in both tables

### Step 6: Configure Permissions

Make sure your police officers have the correct job (`Config.RequireJobName` in config.lua) to access the MDT.

### Step 7: Testing the Deployment

1. Start or restart your server
2. Login as a police officer
3. Use the command `/mdt` to open the MDT
4. Enter your callsign when prompted
5. Test basic functionality:
   - Person search
   - Vehicle search
   - Warrant checks
   - ANPR functionality

## Troubleshooting

### Common Issues and Solutions

1. **MDT doesn't appear when using the command**
   - Check that the player has the correct job
   - Verify the resource is started (check server console)
   - Look for JavaScript errors in the browser console (F8)

2. **Database queries not working**
   - Ensure your database type is correctly set in config.lua
   - Check that table names match your database structure
   - Verify table prefix setting if you use one

3. **Web UI shows blank screen**
   - Make sure you built the web UI correctly
   - Check for JavaScript errors in the F8 console
   - Ensure the dist folder contains index.html and other web assets

4. **ANPR functionality not working**
   - Make sure Config.EnableANPR is set to true
   - Check the ANPR scan distance in config.lua

### Getting Support

If you encounter issues not covered here:

1. Check the server console for error messages
2. Look for errors in the browser console (F8 in-game)
3. Verify all dependencies are properly installed

## Additional Configuration

### Customizing the MDT

To customize the look and feel:

1. Modify the CSS files in web/src/styles/ before building
2. Rebuild the web UI with `npm run build`

### Adding Custom Templates

Templates for reports and warrants can be added through the admin interface using the password set in config.lua.

### Setting Up Multiple Departments

If you have multiple law enforcement departments:

1. Add their job names to the config.lua file:
   ```lua
   Config.RequireJobName = {'police', 'sheriff', 'highway'} 
   ```
   
### Regular Maintenance

1. Keep backups of your MDT data
2. Update the resource when new versions become available
3. Regularly review and clean up old records as needed

