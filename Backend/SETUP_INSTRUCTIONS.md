# Backend Setup Instructions

## MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set username and password (remember these!)
   - Set user privileges to "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for development
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/)

6. **Update .env File**
   - Open `Backend/.env`
   - Replace the MONGO_URL with your connection string
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Add your database name after `.mongodb.net/` (e.g., `gadgetstore`)

   Example:
   ```
   MONGO_URL=mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/gadgetstore?retryWrites=true&w=majority
   PORT=5000
   ```

## Running the Backend

1. **Install Dependencies**
   ```bash
   cd Backend
   npm install
   ```

2. **Start the Server**
   ```bash
   node server.js
   ```

   You should see:
   ```
   Server running on port 5000
   MongoDB connected successfully
   ```

## Running the Frontend

1. **Open a new terminal**

2. **Navigate to frontend folder**
   ```bash
   cd gadget-react
   ```

3. **Install dependencies (if not already done)**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   - The app will open at http://localhost:5173 (or similar)

## Testing the Connection

1. **Signup Test**
   - Click on "Login" in navbar
   - Click "Create account"
   - Fill in the signup form
   - Submit - data should be saved to MongoDB Atlas

2. **Login Test**
   - Use the email and password you just created
   - Click "Login"
   - Should redirect to home page

3. **Forgot Password Test**
   - Click "Forgot password?"
   - Enter your email
   - Enter new password in prompt
   - Password should be updated in MongoDB

## API Endpoints

- **POST** `/api/user/signup` - Create new user
- **POST** `/api/user/login` - Login user
- **POST** `/api/user/forgot-password` - Reset password

## Troubleshooting

- **Connection Error**: Check your MongoDB Atlas connection string and IP whitelist
- **CORS Error**: Make sure backend server is running on port 5000
- **Port Already in Use**: Change PORT in .env file
- **Module Not Found**: Run `npm install` in Backend folder
