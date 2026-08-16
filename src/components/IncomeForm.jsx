import { useState } from "react";
import "./ResponsiveIncomeFrom.css";
import "./IncomeForm.css";

function IncomeForm({ onAddIncome }) {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!source || !amount) {
      alert("Please fill all fields");
      return;
    }

    const newIncome = {
      id: Date.now(),
      source,
      amount: Number(amount),
    };

    onAddIncome(newIncome);

    setSource("");
    setAmount("");
  };

  return (
    <div className="income-form">
      <h2>Add Income 💰</h2>

      <p className="income-form-subtitle">
        Add your salary, pocket money or other income.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="income-form-row">
          <div className="income-form-group">
            <label>Income Source</label>

            <input
              type="text"
              placeholder="e.g. Salary, Pocket Money"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>

          <div className="income-form-group">
            <label>Amount</label>

            <input
              type="number"
              placeholder="₹ 0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="add-income-btn">
          + Add Income
        </button>
      </form>
    </div>
  );
}

export default IncomeForm;