import { useState } from "react";
import "./ResponsiveExpenseFrom.css";
import "./ExpenseForm.css";

function ExpenseForm({ onAddExpense }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !amount || !category || !date) {
      alert("Please fill all fields");
      return;
    }

    const newExpense = {
      id: Date.now(),
      name,
      amount: Number(amount),
      category,
      date,
    };

    onAddExpense(newExpense);

    setName("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <div className="expense-form">
      <h2>Add New Expense</h2>

      <p className="form-subtitle">
        Keep track of where your money goes 💸
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Expense Name</label>

          <input
            type="text"
            placeholder="e.g. Lunch, Shopping"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Amount</label>

            <input
              type="number"
              placeholder="₹ 0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="Food">🍔 Food</option>
              <option value="Shopping">🛍️ Shopping</option>
              <option value="Travel">🚗 Travel</option>
              <option value="Bills">💡 Bills</option>
              <option value="Education">📚 Education</option>
              <option value="Other">📦 Other</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Date</label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" className="add-expense-btn">
          + Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;