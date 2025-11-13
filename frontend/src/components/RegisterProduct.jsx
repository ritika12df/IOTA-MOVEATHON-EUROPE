// src/components/RegisterProduct.jsx
// Component for registering a new product

import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import './RegisterProduct.css';

const RegisterProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    origin: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const [productId, setProductId] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Generate a unique product ID
      const newProductId = `PROD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Create product data
      const product = {
        id: newProductId,
        ...formData,
        registrationDate: new Date().toISOString(),
        journey: [
          {
            stage: 'Registered',
            timestamp: new Date().toISOString(),
            location: formData.origin,
            condition: 'Newly registered',
          },
        ],
      };

      // For now, we'll store this locally and show QR code
      // In production, this would be sent to IOTA blockchain via transaction
      setProductId(newProductId);
      
      // Generate QR code with product ID and verification URL
      const verificationUrl = `${window.location.origin}/verify/${newProductId}`;
      setQrCode(verificationUrl);

      // Reset form
      setFormData({
        name: '',
        origin: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
      });

      console.log('Product registered:', product);
    } catch (err) {
      setError(`Error registering product: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    const canvas = document.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `${productId}-qr.png`;
    link.click();
  };

  return (
    <div className="register-product-container">
      <h2>Register New Product</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      {!productId ? (
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Colombian Coffee Beans"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="origin">Origin Location *</label>
            <input
              type="text"
              id="origin"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="e.g., Bogotá, Colombia"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Manufacturing Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Additional details about the product..."
              rows="4"
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Registering...' : 'Register Product'}
          </button>
        </form>
      ) : (
        <div className="success-container">
          <h3>✓ Product Registered Successfully!</h3>
          <p>Product ID: <strong>{productId}</strong></p>
          
          <div className="qr-code-section">
            <h4>Share this QR Code:</h4>
            <QRCode value={qrCode} size={256} level="H" includeMargin={true} />
            <button onClick={downloadQRCode} className="download-btn">
              Download QR Code
            </button>
          </div>

          <button
            onClick={() => {
              setProductId(null);
              setQrCode(null);
            }}
            className="new-product-btn"
          >
            Register Another Product
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterProduct;
