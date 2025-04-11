#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Install React Native CLI if not already installed
if ! command -v react-native &> /dev/null; then
    echo "Installing React Native CLI..."
    npm install -g react-native-cli
fi

echo "Setup complete! You can now run the app with:"
echo "  npm run android  # For Android"
echo "  npm run ios      # For iOS" 