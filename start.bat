@echo off
:: Navigate to the backend directory
cd /d backend

:: Start the backend
start cmd /k node app.js

:: Navigate to the frontend directory
cd /d ../frontend

:: Start the frontend
start cmd /k npm start


