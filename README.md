# Appointment Booking Application (React Native)

A professional-grade mobile application built with **React Native** and **Expo SDK 54**, designed for seamless service discovery and appointment scheduling.

## 📱 Project Overview
This application allows users to discover local service providers, view their availability across different dates, and book/manage appointments with a premium, animated interface.

### Key Features
- **User Authentication**: Secure registration and persistent login using `AsyncStorage`.
- **Provider Marketplace**: Search and filter providers by category (Healthcare, Education, Home Services, etc.).
- **Dynamic Scheduling**: Interactive horizontal date selector and time-slot booking.
- **Dark Mode Support**: Full system-level theme synchronization with adaptive colors.
- **Premium UX**: High-performance micro-animations using `react-native-reanimated`.
- **Simulated API**: Abstracted service layer demonstrating production-ready data handling.

---

## 🛠️ Tech Stack
- **Framework**: React Native (Expo SDK 54)
- **Navigation**: Expo Router (File-based navigation)
- **State Management**: React Context API
- **Animations**: React Native Reanimated
- **Icons**: Lucide React Native
- **Testing**: Jest + React Native Testing Library
- **Development**: TypeScript, ESLint, Prettier

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn
- Expo Go app on your mobile device (to preview)

### Installation
1.  Clone the repository and navigate to the project folder:
    ```bash
    cd "React Native mobile application"
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npx expo start
    ```
4.  Scan the QR code in the terminal with your Camera app (iOS) or Expo Go (Android).

---

## 📂 Project Structure
- `app/`: Expo Router screens and layouts.
- `context/`: Global state management logic (Auth, Appointments).
- `services/`: API layer abstraction.
- `constants/`: Theme tokens and global constants.
- `components/`: Reusable UI components.
- `mock/`: Static data for providers and categories.
- `__tests__/`: Automated unit and integration tests.

---

## 🧪 Testing & Linting
- **Run Unit Tests**: `npm test`
- **Lint Code**: `npm run lint`

---

## 📦 Building for Production
This project uses **EAS Build** for creating production binaries.
To build an Android APK (Preview):
```bash
eas build -p android --profile preview
```

---

## 📄 Documentation Links
- [Submission Summary (Reviewer Guide)](./SUBMISSION.md): Technical deep-dive for recruiters.
- [Requirement Checklist](./CHECKLIST.md): Verification against assignment rubric.

---
*Developed as part of the Lead React Native Developer Technical Assessment.*
