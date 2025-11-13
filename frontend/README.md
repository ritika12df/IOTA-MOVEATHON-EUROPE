# TrackIT Frontend

React.js frontend application for TrackIT - Transparent Product Journey on IOTA

## Features

- **Product Registration**: Manufacturers can register products and generate QR codes
- **Journey Verification**: Customers can scan QR codes or enter product IDs to verify the complete supply chain journey
- **Journey Updates**: Supply chain participants can record product status updates
- **IOTA Integration**: All data is immutably recorded on the IOTA blockchain

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── RegisterProduct.jsx
│   │   ├── RegisterProduct.css
│   │   ├── VerifyProduct.jsx
│   │   ├── VerifyProduct.css
│   │   ├── UpdateJourney.jsx
│   │   └── UpdateJourney.css
│   ├── services/
│   │   └── iotaService.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.jsx
│   └── config.js
├── package.json
└── README.md
```

## Installation

```bash
cd frontend
npm install
```

## Running the Application

```bash
npm start
```

The application will open at `http://localhost:3000`

## Configuration

Update `src/config.js` with your deployed IOTA package and object IDs:

```javascript
export const TRACKIT_CONFIG = {
  PACKAGE_ID: '0x19831efd615bb1e1daa9793508af7a713c90dc8fe3b72fe1ff33e38713b0101e',
  REGISTRY_OBJECT_ID: '0x1853e8135230e04d9f3c51962eb137ce250525109aed3e036cbaa385abb12ca0',
  MODULE_NAME: 'product_registry',
  NETWORK: 'testnet',
  RPC_URL: 'https://api.testnet.shimmer.network',
};
```

## Components

### RegisterProduct
- Form for manufacturers to register new products
- Generates unique product IDs
- Creates downloadable QR codes for distribution

### VerifyProduct
- Search for products by ID
- Display complete product journey timeline
- Show verification status and timestamps

### UpdateJourney
- Interface for supply chain participants
- Record product location and condition
- Submit updates to IOTA blockchain

## Dependencies

- **@iota/iota-sdk**: IOTA blockchain SDK for reading/writing data
- **react-router-dom**: Routing for multi-page application
- **qrcode.react**: QR code generation
- **axios**: HTTP client for API calls

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## License

Apache-2.0
