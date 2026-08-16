import { useState } from "react";
import "./ResponsiveIncomeList.css";
import "./IncomeList.css";

function IncomeList({
  incomes = [],
  onDeleteIncome,
  onEditIncome,
}) {
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All");

  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    name: "",
    amount: "",
    source: "",
    date: "",
  });

  // Search + Source Filter
  const filteredIncomes = incomes.filter((income) => {
    const incomeName = String(income.name || "");

    const matchesSearch = incomeName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesSource =
      sourceFilter === "All" ||
      income.source === sourceFilter;

    return matchesSearch && matchesSource;
  });

  // Start Edit
  const startEdit = (income) => {
    setEditingId(income.id);

    setEditData({
      name: income.name || "",
      amount: income.amount || "",
      source: income.source || "Other",
      date: income.date || "",
    });
  };

  // Cancel Edit
  const cancelEdit = () => {
    setEditingId(null);

    setEditData({
      name: "",
      amount: "",
      source: "",
      date: "",
    });
  };

  // Save Edit
  const saveEdit = (id) => {
    if (
      !editData.name ||
      !editData.amount ||
      !editData.source ||
      !editData.date
    ) {
      alert("Please fill all fields");
      return;
    }

    onEditIncome({
      id,
      name: editData.name,
      amount: Number(editData.amount),
      source: editData.source,
      date: editData.date,
    });

    cancelEdit();
  };

  return (
    <div className="income-list">

      {/* Header */}

      <div className="income-list-header">
        <div>
          <h2>Recent Income</h2>

          <p>
            Keep track of your earnings.
          </p>
        </div>

        <span className="income-count">
          {incomes.length}{" "}
          {incomes.length === 1
            ? "Income"
            : "Incomes"}
        </span>
      </div>

      {/* Search + Filter */}

      <div className="income-filters">

        <input
          type="text"
          placeholder="🔍 Search income..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={sourceFilter}
          onChange={(e) =>
            setSourceFilter(e.target.value)
          }
        >
          <option value="All">
            All Sources
          </option>

          <option value="Salary">
            💼 Salary
          </option>

          <option value="Freelance">
            💻 Freelance
          </option>

          <option value="Business">
            🏪 Business
          </option>

          <option value="Investment">
            📈 Investment
          </option>

          <option value="Other">
            📦 Other
          </option>
        </select>

      </div>

      {/* No Income */}

      {incomes.length === 0 ? (

        <div className="empty-incomes">

          <div className="empty-icon">
            💰
          </div>

          <h3>No income yet</h3>

          <p>
            Add your first income to start
            tracking your earnings.
          </p>

        </div>

      ) : filteredIncomes.length === 0 ? (

        <div className="empty-incomes">

          <div className="empty-icon">
            🔍
          </div>

          <h3>No matching income</h3>

          <p>
            Try another search or source.
          </p>

        </div>

      ) : (

        <div className="income-items">

          {filteredIncomes.map((income) => (

            <div
              className="income-item"
              key={income.id}
            >

              {/* Edit Mode */}

              {editingId === income.id ? (

                <div className="edit-income-form">

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
                    value={editData.source}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        source: e.target.value,
                      })
                    }
                  >
                    <option value="Salary">
                      💼 Salary
                    </option>

                    <option value="Freelance">
                      💻 Freelance
                    </option>

                    <option value="Business">
                      🏪 Business
                    </option>

                    <option value="Investment">
                      📈 Investment
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
                        saveEdit(income.id)
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

                /* Normal Mode */

                <>
                  <div className="income-info">

                    <div className="income-item-icon">
                      💰
                    </div>

                    <div>

                      <h3>
                        {income.name || "Untitled Income"}
                      </h3>

                      <p>
                        {income.source || "Other"}

                        {income.date &&
                          ` • ${income.date}`}
                      </p>

                    </div>

                  </div>

                  <div className="income-actions">

                    <strong>
                      + ₹
                      {Number(
                        income.amount || 0
                      ).toFixed(2)}
                    </strong>

                    <button
                      className="edit-btn"
                      onClick={() =>
                        startEdit(income)
                      }
                      title="Edit income"
                    >
                      ✏️
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        onDeleteIncome(income.id)
                      }
                      title="Delete income"
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

export default IncomeList;