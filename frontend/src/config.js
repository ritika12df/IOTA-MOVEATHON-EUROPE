// src/config.js
// Configuration for TrackIT application

export const TRACKIT_CONFIG = {
  // IOTA Package ID (Published module)
  PACKAGE_ID: '0x19831efd615bb1e1daa9793508af7a713c90dc8fe3b72fe1ff33e38713b0101e',
  
  // ProductRegistry Object ID (Shared object)
  REGISTRY_OBJECT_ID: '0x1853e8135230e04d9f3c51962eb137ce250525109aed3e036cbaa385abb12ca0',
  
  // Module name
  MODULE_NAME: 'product_registry',
  
  // Network configuration
  NETWORK: 'testnet',
  RPC_URL: 'https://api.testnet.iota.cafe',
  
  // Product price in IOTA (10 IOTA in smallest units)
  PRODUCT_PRICE: 10_000_000_000,
};

export default TRACKIT_CONFIG;
