# HADT App (hadt-app)

A cross-platform productivity application built with modern mobile and web technologies. This app leverages AI capabilities through Hugging Face, offers local data persistence, and features a user-friendly interface.

## ✨ Key Features

- **Cross-Platform:** Built with **Expo** for iOS, Android, and Web.
- **Modern UI:** Styled with **Tailwind CSS** and **Gluestack UI** for a consistent and responsive user experience. (Assuming these are used based on previous context)
- **File-Based Routing:** Utilizes **Expo Router** for intuitive navigation and typed routes.
- **Local Data Storage:** Employs **expo-sqlite** for efficient on-device data persistence.
- **AI Integration:** Connects to **Hugging Face Inference APIs** for advanced features, with API keys managed securely.
- **TypeScript:** Ensures type safety and improved developer experience.
- **New Architecture Enabled:** Leverages React Native's New Architecture for improved performance.
- **Static Web Output:** Configured for static site generation for web deployment.
- **Custom Splash Screen:** Configured with `expo-splash-screen`.
- **Asset Management:** Uses `expo-asset` for handling static assets.

## 🛠️ Tech Stack

- **Core Framework:** **React Native** with **Expo SDK**
- **Language:** **TypeScript**
- **Navigation:** **Expo Router** (v3 with Typed Routes)
- **State Management:** (Specify if any, e.g., Zustand, Redux, Context API)
- **UI Components:** **Gluestack UI** (Assuming)
- **Styling:** **Tailwind CSS** (via `nativewind` or similar - Assuming)
- **Local Database:** **expo-sqlite**
- **AI Integration:** **Hugging Face Inference API** (via `fetch` or a library)
- **Environment Variables:** `dotenv` for managing secrets like `HF_TOKEN`.
- **Build & Deployment:** EAS Build (implied by `eas.projectId`)

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- Yarn or npm
- Expo CLI: `npm install -g expo-cli`
- Git

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repository-url>
   cd hadt-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

### Configuration

1. **Set up Environment Variables:**

   Create a `.env` file in the root of the project and add your Hugging Face API token:

   ```env
   // filepath: d:\Projetos\HADT\hadt-app\.env
   HF_TOKEN="your_hugging_face_api_token_here"
   ```

   This token is used in `app.config.ts` via `process.env.HF_TOKEN`.

### Running the App

1. **Start the development server:**

   ```bash
   npm start
   # or
   yarn start
   # or
   npx expo start
   ```

2. **Run on a device/emulator/simulator:**

   - Scan the QR code with the Expo Go app on your iOS or Android device.
   - Press `a` to run on an Android emulator or connected device.
   - Press `i` to run on an iOS simulator or connected device.
   - Press `w` to run in a web browser.

## 📜 Available Scripts

In the project directory, you can run several commands:

- `npm start` / `yarn start`: Runs the app in development mode using Expo.
- `npm run android` / `yarn android`: Runs the app on a connected Android device or emulator.
- `npm run ios` / `yarn ios`: Runs the app on an iOS simulator (requires macOS).
- `npm run web` / `yarn web`: Runs the app in a web browser.
- `npx expo prebuild`: Generates the native `android` and `ios` folders if you need to work with native code directly or build locally without EAS.

(Add any other custom scripts you have)

## 📁 Project Structure (Simplified)

```
hadt-app/
├── app/                  # Expo Router: Files and folders here define routes
│   ├── _layout.tsx       # Root layout
│   ├── (tabs)/           # Example of a tab group
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   └── index.tsx         # Home screen
├── assets/               # Static assets (images, fonts)
│   └── images/
├── components/           # Reusable UI components
├── constants/            # Constant values (colors, styles, etc.)
├── services/             # Services (e.g., API calls to Hugging Face)
├── store/                # State management (if applicable)
├── .env                  # Environment variables (Gitignored)
├── app.config.ts         # Expo app configuration
├── babel.config.js       # Babel configuration
├── package.json
└── tsconfig.json         # TypeScript configuration
```

## 🤝 Contributing

Contributions are welcome! Please follow the standard fork, branch, and pull request workflow. Ensure your code adheres to the project's linting and formatting standards.

(Add more specific contribution guidelines if you have them)

_This README was generated with assistance from GitHub Copilot._
