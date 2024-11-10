# Alerium

Alerium is a monorepo solution developed for the Junction hackathon, leveraging Turborepo for efficient workspace management. The project combines a powerful backend provider with a feature-rich React Native mobile application, enhanced with AI capabilities.

## 🏗️ Project Structure

```
alerium/
├── apps/
│   ├── provider/     # Convex backend
│   └── mobile/       # React Native application
└── packages/        # Shared packages and utilities
    ├── ui/           # Shared UI components
    └── icons/        # Shared icons  
    └── shared/       # Shared utilities
            ├── components/ # Native and web components
            └── types/     # Native and web types
            └── utils/     # Native and web utilities 
            └── config/    # Configuration files
```

## 🚀 Key Features

- **AI-Powered Label Recognition**: Native module integration for real-time label and object detection
- **Speech-to-Text Conversion**: Built-in voice recognition capabilities
- **Real-time Backend**: Powered by Convex for seamless data synchronization
- **Cross-Platform Mobile App**: Built with React Native for iOS and Android support

## 🛠️ Tech Stack

- **Monorepo Management**: Turborepo
- **Runtime**: Bun
- **Backend**:
  - Convex for real-time data handling
  - Serverless architecture
- **Mobile Application**:
  - React Native
  - Native Modules for AI integration
  - Speech-to-Text capabilities

## 🔑 Environment Variables

```env
# Provider (Convex Backend)
CONVEX_DEPLOYMENT=
CONVEX_URL=

# Expo App
EXPO_PUBLIC_CONVEX_URL=
EXPO_PUBLIC_DYNAMOSOFT_KEY=
EXPO_PUBLIC_OPENAI_API_KEY=
EXPO_PUBLIC_OPENAI_ORGANIZATION_ID= 
EXPO_PUBLIC_OPENAI_MODEL_ID=

# Add your environment variables here
```

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/zennit-io/alerium.git
cd alerium
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
bun dev
```

## 🔧 Development

To run different parts of the application:

```bash
# Run the backend provider
bun run dev --filter provider

# Run the mobile app
bun run dev --filter native
```

## 📱 Mobile App Setup

1. Install mobile dependencies:
```bash
cd apps/native
bun install
```

2. For iOS:
```bash
cd ios
pod install
cd ..
bun ios
```

3. For Android:
```bash
bun android
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Junction Hackathon

This project was developed as part of the Junction hackathon. It showcases the integration of AI capabilities with mobile applications while maintaining a scalable and maintainable codebase structure.

---

Built with ❤️ by zennit for Junction