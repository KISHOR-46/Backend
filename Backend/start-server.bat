@echo off
echo ========================================
echo Starting GadgetHub Backend Server
echo ========================================
echo.
echo Checking MongoDB connection...
node test-connection.js
echo.
echo ========================================
echo Starting Server on Port 5000...
echo ========================================
echo.
node server.js
