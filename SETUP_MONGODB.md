# MongoDB Setup Guide for PaperPop

## The Issue
You're getting a "Server Error" when creating an account because MongoDB is not installed or running on your system.

## Solution Options

### Option 1: Use MongoDB Atlas (Cloud - Recommended for Quick Start)
This is the easiest option and doesn't require installing anything locally.

1. **Create a free MongoDB Atlas account:**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for a free account

2. **Create a cluster:**
   - Click "Build a Database"
   - Choose the FREE tier (M0)
   - Select a cloud provider and region close to you
   - Click "Create Cluster"

3. **Set up database access:**
   - Go to "Database Access" in the left menu
   - Click "Add New Database User"
   - Create a username and password (save these!)
   - Set privileges to "Read and write to any database"

4. **Set up network access:**
   - Go to "Network Access" in the left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get your connection string:**
   - Go back to "Database" in the left menu
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

6. **Update your .env.local file:**
   ```
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/paperpop?retryWrites=true&w=majority
   ```
   Replace YOUR_USERNAME, YOUR_PASSWORD, and YOUR_CLUSTER with your actual values.

### Option 2: Install MongoDB Locally (Windows)

1. **Download MongoDB:**
   - Go to https://www.mongodb.com/try/download/community
   - Download MongoDB Community Server for Windows
   - Run the installer

2. **Install MongoDB:**
   - Choose "Complete" installation
   - Install MongoDB as a Service (check this option)
   - Install MongoDB Compass (optional GUI tool)

3. **Verify MongoDB is running:**
   - Open Command Prompt as Administrator
   - Run: `net start MongoDB`
   - If it says "The service has already been started", you're good!

4. **Your .env.local is already configured for local MongoDB:**
   ```
   MONGODB_URI=mongodb://localhost:27017/paperpop
   ```

## After Setting Up MongoDB

1. **Restart your development server:**
   - Stop the current server (Ctrl+C in terminal)
   - Run: `npm run dev`

2. **Try creating an account again**
   - The server error should be gone
   - Your account will be saved to MongoDB

## Troubleshooting

### "MongooseServerSelectionError: connect ECONNREFUSED"
- **For Atlas:** Check your connection string, username, and password
- **For Local:** Make sure MongoDB service is running: `net start MongoDB`

### "Authentication failed"
- **For Atlas:** Double-check your username and password in the connection string
- Make sure special characters in password are URL-encoded

### Still having issues?
- Check the terminal/console for specific error messages
- Make sure your .env.local file is in the root directory
- Restart your development server after any .env.local changes
