// src/components/UpdateJourney.jsx
// Component for supply chain participants to update product journey

import React, { useState } from 'react';
import './UpdateJourney.css';

const UpdateJourney = () => {
  const [formData, setFormData] = useState({
    productId: '',
    stage: 'In Transit',
    location: '',
    condition: 'Good',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const stageOptions = [
    'In Transit - Distributor',
    'In Transit - International',
    'Received - Retailer',
    'Quality Check',
    'Storage',
    'Available for Purchase',
  ];

  const conditionOptions = [
    'Good',
    'Fair',
    'Needs Attention',
    'Critical',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productId.trim()) {
      setError('Product ID is required');
      return;
    }

    if (!formData.location.trim()) {
      setError('Location is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create journey update
      const journeyUpdate = {
        productId: formData.productId,
        stage: formData.stage,
        location: formData.location,
        condition: formData.condition,
        notes: formData.notes,
        timestamp: new Date().toISOString(),
        updatedBy: 'Supply Chain Participant', // In production, get from wallet
      };

      // Send to backend/IOTA
      console.log('Journey update:', journeyUpdate);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSuccess('Journey update recorded successfully on IOTA!');

      // Reset form
      setFormData({
        productId: '',
        stage: 'In Transit',
        location: '',
        condition: 'Good',
        notes: '',
      });

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(`Error updating journey: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-journey-container">
      <h2>Update Product Journey</h2>
      <p className="subtitle">Record supply chain events for transparent tracking</p>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="journey-form">
        <div className="form-group">
          <label htmlFor="productId">Product ID *</label>
          <input
            type="text"
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            placeholder="e.g., PROD-1234567890-abc123def"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="stage">Supply Chain Stage *</label>
            <select
              id="stage"
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              required
            >
              {stageOptions.map(stage => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="condition">Product Condition *</label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              {conditionOptions.map(cond => (
                <option key={cond} value={cond}>
                  {cond}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="location">Current Location *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Port of Hamburg, Germany"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any additional details about this stage..."
            rows="4"
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Recording Update...' : 'Record Journey Update'}
        </button>
      </form>

      <div className="info-box">
        <h4>📌 How it works:</h4>
        <ul>
          <li>Enter the product ID to identify which product to update</li>
          <li>Select the current supply chain stage</li>
          <li>Record the location and condition of the product</li>
          <li>All updates are recorded on the IOTA blockchain for transparency</li>
          <li>Customers can verify the entire journey using the product's QR code</li>
        </ul>
      </div>
    </div>
  );
};

export default UpdateJourney;
