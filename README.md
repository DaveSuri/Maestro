# Maestro App

A React Native mobile application for booking music classes.

## Features

- Browse available music classes
- View class details
- Book and manage class schedules
- User profile management
- Subscription management

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/maestro-app.git
cd maestro-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install iOS dependencies (macOS only):
```bash
cd ios
pod install
cd ..
```

## Running the App

### Android

1. Start an Android emulator or connect a physical device
2. Run the app:
```bash
npm run android
# or
yarn android
```

### iOS (macOS only)

1. Start an iOS simulator or connect a physical device
2. Run the app:
```bash
npm run ios
# or
yarn ios
```

## Development

- The app uses TypeScript for type safety
- React Navigation for routing
- React Native Paper for UI components
- Axios for API requests

## Project Structure

```
maestro-app/
├── android/          # Android native code
├── ios/             # iOS native code
├── src/
│   ├── screens/     # Screen components
│   ├── components/  # Reusable components
│   ├── navigation/  # Navigation configuration
│   ├── services/    # API services
│   ├── utils/       # Utility functions
│   └── types/       # TypeScript type definitions
├── App.tsx          # Root component
└── index.js         # Entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 