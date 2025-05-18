# 🛡️ Neighborhood Safety App

This is the backend service for the Neighborhood Safety App, built with **NestJS** and **PostgreSQL**. It offers secure APIs for incident reporting, user authentication, and real-time updates.

---

## ⚙️ Tech Stack

| Technology | Description | Logo |
|------------|-------------|------|
| [React Native](https://reactnative.dev/) | Cross-platform mobile framework | <img src="https://reactnative.dev/img/header_logo.svg" alt="React Native" width="40"/> |
| [NestJS](https://nestjs.com) | Node.js framework for building scalable server-side applications | <img src="https://nestjs.com/img/logo-small.svg" alt="NestJS" width="40"/> |
| [PostgreSQL](https://www.postgresql.org/) | Open-source relational database | <img src="https://www.postgresql.org/media/img/about/press/elephant.png" alt="PostgreSQL" width="40"/> |
| [Google Maps API](https://developers.google.com/maps) | Location services and mapping | <img src="https://developers.google.com/maps/images/maps-icon.svg" alt="Google Maps" width="40"/> |

---

## 👥 Features

### User Features
- 📍 **Report Incidents**  
  Users can report safety issues with type, description, and location.
  
- 🗣️ **Community Feed**  
  View nearby reports and participate with comments.

- 🗺️ **Map Integration**  
  View incidents on Google Maps with location pins.

- 🔔 **Push Notifications**  
  Get notified of incidents in real-time (via FCM).

### Admin Features
- ✅ **Moderate Reports**  
  View, verify, and resolve incident reports.

- 🛠️ **Status Management**  
  Change incident status (active, resolved, etc.).

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. set up .env

```bash
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_user
DB_PASSWORD=your_password
DB_NAME=neighborhood_safety
JWT_SECRET=your_jwt_secret
```

### 3. Start the Server
```bash
npm run start:dev
```

---

## 📱 Running Frontend on Expo Go

You can run the React Native app quickly using **[Expo Go](https://expo.dev/client)** on your Android or iOS device.

### ✅ Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Expo Go app installed on your mobile device (from Play Store or App Store)

---

### 🚀 Steps to Run

1. **Install Expo CLI globally** (if not installed)

```bash
npm install -g expo-cli
```

### 2. Start the Expo server
Navigate to your frontend/ directory:

```bash
cd frontend
npm install
npx expo start
```

### 3. Scan the QR Code
A QR code will appear in your terminal or browser.
Open the Expo Go app on your phone and scan the QR code.
The app will load on your device.
