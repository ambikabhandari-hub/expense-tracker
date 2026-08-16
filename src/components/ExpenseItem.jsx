import "./ExpenseItem.css";

function ExpenseItem({ expense, onDelete }) {
  return (
    <div className="expense-item">
      <div className="expense-item-icon">
        💸
      </div>

      <div className="expense-item-info">
        <h3>{expense.name}</h3>

        <p>
          {expense.category} • {expense.date}
        </p>
      </div>

      <div className="expense-item-amount">
        - ₹{expense.amount.toFixed(2)}
      </div>

      <button
        className="delete-btn"
        onClick={() => onDelete(expense.id)}
        title="Delete expense"
      >
        🗑️
      </button>
    </div>
  );
}

export default ExpenseItem;