import { useState } from "react";
import "./ResponsiveExpenseList.css";
import "./ExpenseList.css";

function ExpenseList({
  expenses,
  onDeleteExpense,
  onEditExpense,
}) {
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
  });

  // Search expenses
  const filteredExpenses = expenses.filter((expense) =>
    expense.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Start editing
  const startEdit = (expense) => {
    setEditingId(expense.id);

    setEditData({
      name: expense.name,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);

    setEditData({
      name: "",
      amount: "",
      category: "",
      date: "",
    });
  };

  // Save edited expense
  const saveEdit = (id) => {
    if (
      !editData.name ||
      !editData.amount ||
      !editData.category ||
      !editData.date
    ) {
      alert("Please fill all fields");
      return;
    }

    onEditExpense({
      id,
      name: editData.name,
      amount: Number(editData.amount),
      category: editData.category,
      date: editData.date,
    });

    cancelEdit();
  };

  return (
    <div className="expense-list">

      {/* Header */}

      <div className="expense-list-header">
        <div>
          <h2>Recent Expenses</h2>

          <p>
            Keep track of your recent spending.
          </p>
        </div>

        <span className="expense-count">
          {expenses.length}{" "}
          {expenses.length === 1
            ? "Expense"
            : "Expenses"}
        </span>
      </div>

      {/* Search */}

      <div className="expense-search">
        <input
          type="text"
          placeholder="🔍 Search expenses..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {/* Empty State */}

      {expenses.length === 0 ? (
        <div className="empty-expenses">
          <div className="empty-icon">
            🧾
          </div>

          <h3>No expenses yet</h3>

          <p>
            Add your first expense to start
            tracking your spending.
          </p>
        </div>
      ) : filteredExpenses.length === 0 ? (
        <div className="empty-expenses">
          <div className="empty-icon">
            🔍
          </div>

          <h3>No matching expenses</h3>

          <p>
            Try searching with a different name.
          </p>
        </div>
      ) : (
        <div className="expense-items">

          {filteredExpenses.map((expense) => (

            <div
              className="expense-item"
              key={expense.id}
            >

              {/* EDIT MODE */}

              {editingId === expense.id ? (

                <div className="edit-expense-form">

                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        name: e.target.value,
                      })
                    }
                  />

                  <input
                    type="number"
                    value={editData.amount}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        amount: e.target.value,
                      })
                    }
                  />

                  <select
                    value={editData.category}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="Food">
                      🍔 Food
                    </option>

                    <option value="Shopping">
                      🛍️ Shopping
                    </option>

                    <option value="Travel">
                      🚗 Travel
                    </option>

                    <option value="Bills">
                      💡 Bills
                    </option>

                    <option value="Education">
                      📚 Education
                    </option>

                    <option value="Other">
                      📦 Other
                    </option>
                  </select>

                  <input
                    type="date"
                    value={editData.date}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        date: e.target.value,
                      })
                    }
                  />

                  <div className="edit-buttons">

                    <button
                      className="save-btn"
                      onClick={() =>
                        saveEdit(expense.id)
                      }
                    >
                      Save
                    </button>

                    <button
                      className="cancel-btn"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>

                  </div>

                </div>

              ) : (

                /* NORMAL MODE */

                <>
                  <div className="expense-info">

                    <div className="expense-item-icon">
                      💸
                    </div>

                    <div>
                      <h3>{expense.name}</h3>

                      <p>
                        {expense.category ||
                          "Other"}

                        {expense.date &&
                          ` • ${expense.date}`}
                      </p>
                    </div>

                  </div>

                  <div className="expense-actions">

                    <strong>
                      - ₹
                      {Number(
                        expense.amount || 0
                      ).toFixed(2)}
                    </strong>

                    <button
                      className="edit-btn"
                      onClick={() =>
                        startEdit(expense)
                      }
                      title="Edit expense"
                    >
                      ✏️
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        onDeleteExpense(
                          expense.id
                        )
                      }
                      title="Delete expense"
                    >
                      🗑️
                    </button>

                  </div>
                </>
              )}

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default ExpenseList;