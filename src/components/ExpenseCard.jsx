import "./ExpenseCard.css";

function ExpenseCard({ expense = 0 }) {
  return (
    <div className="expense-card">
      <div>
        <p>💸 Total Expenses</p>
        <h2>₹{Number(expense).toFixed(2)}</h2>
      </div>

      <div className="expense-icon">
        ↘
      </div>
    </div>
  );
}

export default ExpenseCard;