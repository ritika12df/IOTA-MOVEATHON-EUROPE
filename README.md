# TrackIT – Transparent Product Journey

A complete blockchain-based supply chain transparency solution built on the IOTA network, combining Move smart contracts with a modern React frontend for real-time product tracking and verification.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Smart Contracts](#smart-contracts)
- [Frontend Application](#frontend-application)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Usage Examples](#usage-examples)
- [Configuration](#configuration)
- [Build Commands](#build--run-commands)
- [Security](#security-features)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**TrackIT** is an innovative supply chain solution that leverages the IOTA blockchain to provide complete transparency and authenticity verification for products moving through the supply chain. From manufacturer to consumer, every step is recorded immutably on the blockchain.

### Key Benefits

✅ **Immutable Records** - All product data stored on IOTA blockchain  
✅ **Transparent Tracking** - Real-time journey visibility  
✅ **Authenticity Verification** - QR codes for product verification  
✅ **No Counterfeits** - Blockchain-verified supply chain  
✅ **Consumer Trust** - Complete product history available  
✅ **Scalable** - Built on IOTA's scalable network  

---

## 🛠️ Technology Stack

### Blockchain Layer
- **IOTA** - Distributed ledger platform
- **Move** - Safe smart contract language
- **IOTA SDK** - Blockchain interaction

### Frontend
- **React 18.3** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **QRCode React** - QR code generation
- **CSS3** - Responsive styling

### Tools & Infrastructure
- **Node.js** - Runtime environment
- **npm** - Package management
- **Netlify** - Frontend deployment
- **GitHub Actions** - CI/CD automation
- **Git** - Version control

---

## ✨ Features

### 1. Product Registration 📦
- Manufacturers register products with details
- Automatic unique product ID generation
- QR code generation for distribution
- Immutable record on IOTA blockchain

### 2. Journey Tracking 🚚
- Supply chain participants record status updates
- Automatic timestamp and location logging
- Product condition monitoring
- Real-time journey visualization

### 3. Product Verification ✅
- Customers scan QR codes or enter product ID
- View complete product history
- Verify authenticity
- Check all supply chain checkpoints

### 4. Transparent Timeline 📅
- Visual timeline of all product movements
- Location and condition at each stage
- IOTA verification badges
- Immutable proof of authenticity

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- IOTA CLI (for smart contracts)


### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/ritika12df/IOTA-MOVEATHON-EUROPE.git
cd IOTA-MOVEATHON-EUROPE
```

#### 2. Setup Frontend
```bash
cd frontend
npm install --legacy-peer-deps
npm start
```

The frontend will open at `http://localhost:3000`

#### 3. Build Smart Contracts 
```bash
cd trackit
iota move build
iota client publish --gas-budget 100000000
```

---

## 🎨 Frontend Application

### Components

#### RegisterProduct.jsx
- Product information form
- Automatic ID generation
- QR code download
- Success confirmation

#### VerifyProduct.jsx
- Product search interface
- Journey timeline display
- Verification status
- Location and condition tracking

#### UpdateJourney.jsx
- Supply chain update form
- Stage selection
- Location and condition recording
- Notes for additional info

### Services

#### iotaService.js
- IOTA client initialization
- Product queries
- Registry object fetching
- Event tracking
- Gas estimation

---

## 💡 Usage Examples

### Example 1: Register a Product

1. Navigate to "Register Product"
2. Fill in product details:
   - Product Name: "Colombian Coffee Beans"
   - Origin: "Bogotá, Colombia"
   - Date: Select date
   - Description: "Premium arabica coffee"
3. Click "Register Product"
4. Download QR code
5. Product ID created: `PROD-1731504000123-abc12345`

### Example 2: Update Supply Chain Journey

1. Navigate to "Update Journey"
2. Enter Product ID: `PROD-1731504000123-abc12345`
3. Select Stage: "In Transit - Distributor"
4. Enter Location: "Port of Buenaventura"
5. Select Condition: "Good"
6. Add notes if needed
7. Click "Record Journey Update"
8. Update recorded on IOTA blockchain

### Example 3: Verify Product

1. Navigate to "Verify Product"
2. Either:
   - Scan QR code with phone camera, or
   - Enter Product ID manually
3. View product details:
   - Name, Origin, Registration Date
4. See complete journey timeline:
   - All supply chain stages
   - Locations and conditions
   - Timestamps for each update
   - IOTA verification badges

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
---

### Contact
- Create an issue on GitHub for bug reports
- Start a discussion for feature requests
- Check existing issues for solutions

---

**Made with ❤️ for transparent supply chains on IOTA**

*Last Updated: November 13, 2025*
