// src/components/VerifyProduct.jsx
// Component for verifying product journey using QR code or product ID

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './VerifyProduct.css';

const VerifyProduct = () => {
  const { productId: paramProductId } = useParams();
  const [productId, setProductId] = useState(paramProductId || '');
  const [journey, setJourney] = useState([]);
  const [productInfo, setProductInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (paramProductId) {
      handleVerify(paramProductId);
    }
  }, [paramProductId]);

  const handleVerify = async (id) => {
    if (!id.trim()) {
      setError('Please enter a product ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Fetch product journey from backend/IOTA
      // For now, we'll simulate this with mock data
      const mockJourney = [
        {
          stage: 'Registered',
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          location: 'Bogotá, Colombia',
          condition: 'Freshly harvested',
          verified: true,
        },
        {
          stage: 'In Transit - Distributor',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          location: 'Port of Buenaventura',
          condition: 'Packaged and ready for shipment',
          verified: true,
        },
        {
          stage: 'In Transit - International',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          location: 'Atlantic Ocean (Shipping)',
          condition: 'En route to European ports',
          verified: true,
        },
        {
          stage: 'Received - Retailer',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          location: 'Hamburg, Germany',
          condition: 'Quality verified and in stock',
          verified: true,
        },
        {
          stage: 'Available for Purchase',
          timestamp: new Date().toISOString(),
          location: 'Local Coffee Shop - Berlin',
          condition: 'Ready for customer purchase',
          verified: true,
        },
      ];

      setProductInfo({
        id: id,
        name: 'Colombian Coffee Beans',
        origin: 'Bogotá, Colombia',
        registrationDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Premium quality arabica coffee beans from the mountains of Colombia',
      });

      setJourney(mockJourney);
    } catch (err) {
      setError(`Error verifying product: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleVerify(productId);
  };

  const getStageIcon = (stage) => {
    const icons = {
      'Registered': '📦',
      'In Transit - Distributor': '🚚',
      'In Transit - International': '✈️',
      'Received - Retailer': '🏪',
      'Available for Purchase': '✅',
    };
    return icons[stage] || '📍';
  };

  return (
    <div className="verify-product-container">
      <h2>Verify Product Journey</h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Enter Product ID (e.g., PROD-1234567890-abc123def)"
          className="search-input"
        />
        <button type="submit" disabled={loading} className="search-btn">
          {loading ? 'Verifying...' : 'Verify Product'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {productInfo && (
        <div className="product-details">
          <h3>{productInfo.name}</h3>
          <div className="details-grid">
            <div className="detail-item">
              <span className="label">Product ID:</span>
              <span className="value">{productInfo.id}</span>
            </div>
            <div className="detail-item">
              <span className="label">Origin:</span>
              <span className="value">{productInfo.origin}</span>
            </div>
            <div className="detail-item">
              <span className="label">Registered:</span>
              <span className="value">{new Date(productInfo.registrationDate).toLocaleDateString()}</span>
            </div>
          </div>
          <p className="description">{productInfo.description}</p>
        </div>
      )}

      {journey.length > 0 && (
        <div className="journey-timeline">
          <h3>Product Journey Timeline</h3>
          <div className="timeline">
            {journey.map((stop, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <div className="marker-icon">{getStageIcon(stop.stage)}</div>
                  <div className="marker-line" />
                </div>

                <div className="timeline-content">
                  <div className="stage-header">
                    <h4>{stop.stage}</h4>
                    {stop.verified && <span className="verified-badge">✓ Verified on IOTA</span>}
                  </div>

                  <div className="stage-details">
                    <p>
                      <strong>Location:</strong> {stop.location}
                    </p>
                    <p>
                      <strong>Condition:</strong> {stop.condition}
                    </p>
                    <p className="timestamp">
                      <strong>Date:</strong> {new Date(stop.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {productInfo && journey.length === 0 && !loading && !error && (
        <div className="info-message">
          No journey updates found for this product.
        </div>
      )}
    </div>
  );
};

export default VerifyProduct;
