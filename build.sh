#!/bin/bash

# Netlify build script for e-commerce app
echo "Starting build process..."

# Navigate to Frontend directory
cd Frontend

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found in Frontend directory"
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Check if react-scripts is installed
if ! command -v npx react-scripts &> /dev/null; then
    echo "Installing react-scripts globally as fallback..."
    npm install -g react-scripts@5.0.1
fi

# Build the React app
echo "Building React application..."
npm run build

echo "Build completed successfully!"
