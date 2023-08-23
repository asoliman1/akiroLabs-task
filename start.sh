#!/bin/bash

# Navigate to the backend directory
cd validator 

# Start the backend
node app.js &

# Navigate to the frontend directory
cd ../frontend

# Start the frontend
npm start &

