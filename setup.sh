#!/bin/bash

# Install dependencies for frontend
npm install

# Setup backend
cd backend
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/tongue_analysis_system" > .env
echo "JWT_SECRET=your_jwt_secret_here" >> .env

# Start backend server
npm run dev &

# Go back to root directory
cd ..

# Start frontend development server
npm run dev