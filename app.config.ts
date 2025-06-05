import "dotenv/config";

export default {
  expo: {
    owner: "llussca",
    name: "hadt-app",
    slug: "hadt-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.llussca.hadt", 
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      "expo-sqlite",
      "expo-asset",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      hfToken: process.env.HF_TOKEN,
      eas: {
        projectId: "7929ff95-513d-407e-9b5d-c900da79f8c9"
      }
    },
  },
};
