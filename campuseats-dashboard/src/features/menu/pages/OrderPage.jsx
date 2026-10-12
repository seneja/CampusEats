// src/features/menu/pages/OrderPage.jsx
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

function OrderPage() {
  const { data: dishes } = useFetch("/menu.json");
  const [form, setForm] = useState({ dishId: "", name: "", email: "", qty: 1 });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  function validate(v) {
    const e = {};
    if (!v.dishId) e.dishId = "Please select a dish";
    if (v.name.trim().length < 2) e.name = "Name too short";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) e.email = "Enter a valid email";
    if (Number(v.qty) < 1) e.qty = "Qty must be ≥ 1";
    return e;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length === 0) setDone(true);
  }

  if (done) {
     return (
        <div className="order-panel">
            <p className="success-message">
                 Thanks, {form.name}! Order received.
            </p>
        </div>
  );
}

  return (
    <div className="order-panel">
      <h2>Place Order</h2>
      <form onSubmit={handleSubmit}>
        {/* 1. Select Item */}
        <div className="form-field">
          <label>Select Item</label>
          <select name="dishId" value={form.dishId} onChange={handleChange}>
               <option value="">-- choose a dish --</option>
               {dishes
                    ?.filter((d) => d.available)
                     .map((d) => (
                         <option key={d.id} value={d.id}>
                                 {d.name} - Rs. {d.price.toFixed(2)} 
                         </option>
                ))}
            </select>
            {errors.dishId && <span>{errors.dishId}</span>}
        </div>

        {/* 2. Name */}
        <div className="form-field">
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
          />
          {errors.name && <span>{errors.name}</span>}
        </div>

        {/* 3. Email */}
        <div className="form-field">
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          {errors.email && <span>{errors.email}</span>}
        </div>

        {/* 4. Quantity */}
        <div className="form-field">
          <label>Quantity</label>
          <input
            name="qty"
            type="number"
            min="1"
            value={form.qty}
            onChange={handleChange}
          />
          {errors.qty && <span>{errors.qty}</span>}
        </div>

        <button type="submit">Place order</button>
      </form>
    </div>
  );
}

export default OrderPage;