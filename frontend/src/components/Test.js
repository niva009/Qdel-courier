import React, { useState } from 'react';
import PaymentGateway from './BusinessCourier/RazorpayPayment'

const ItemForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    quantity: 1,
    units: 'Pieces',
    value: '',
    weight: '',
    date: '',
    commodityCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="description">What is the item?</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          maxLength="170"
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
        />
      </div>
      <div>
        <label htmlFor="units">Units</label>
        <select
          id="units"
          name="units"
          value={formData.units}
          onChange={handleChange}
        >
          <option value="Pieces">Pieces</option>
          <option value="Kilograms">Kilograms</option>
          <option value="Liters">Liters</option>
        </select>
      </div>
      <div>
        <label htmlFor="value">Value (Per Item)</label>
        <input
          type="text"
          id="value"
          name="value"
          value={formData.value}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="weight">Weight (Per Item)</label>
        <input
          type="text"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="date">When was the item made?</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="commodityCode">Commodity Code</label>
        <input
          type="text"
          id="commodityCode"
          name="commodityCode"
          value={formData.commodityCode}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    <PaymentGateway/>
</div>
  );
};

export default ItemForm;
