import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import "./Reports.css";

function Reports() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const savedExpenses = localStorage.getItem("expenses");
      const savedIncomes = localStorage.getItem("incomes");

      const parsedExpenses = savedExpenses
        ? JSON.parse(savedExpenses)
        : [];

      const parsedIncomes = savedIncomes
        ? JSON.parse(savedIncomes)
        : [];

      setExpenses(
        Array.isArray(parsedExpenses)
          ? parsedExpenses
          : []
      );

      setIncomes(
        Array.isArray(parsedIncomes)
          ? parsedIncomes
          : []
      );
    } catch (error) {
      console.error("Error loading report data:", error);

      setExpenses([]);
      setIncomes([]);
    }
  };

  /* =========================
     TOTAL INCOME
     ========================= */

  const totalIncome = incomes.reduce(
    (total, income) =>
      total + Number(income?.amount || 0),
    0
  );

  /* =========================
     TOTAL EXPENSES
     ========================= */

  const totalExpenses = expenses.reduce(
    (total, expense) =>
      total + Number(expense?.amount || 0),
    0
  );

  /* =========================
     BALANCE
     ========================= */

  const balance = totalIncome - totalExpenses;

  /* =========================
     CATEGORY TOTALS
     ========================= */

  const categoryTotals = expenses.reduce(
    (totals, expense) => {
      const category =
        expense?.category || "Other";

      const amount =
        Number(expense?.amount || 0);

      totals[category] =
        (totals[category] || 0) + amount;

      return totals;
    },
    {}
  );

  /* =========================
     CHART DATA
     ========================= */

  const chartData = Object.entries(
    categoryTotals
  ).map(([name, value]) => ({
    name,
    value,
  }));

  const chartColors = [
    "#7c3aed",
    "#ec4899",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#3b82f6",
    "#ef4444",
  ];

  /* =========================
     FORMAT MONEY
     ========================= */

  const formatMoney = (amount) => {
    return `₹${Number(amount || 0).toFixed(2)}`;
  };

  return (
    <main className="reports-page">

      {/* =========================
          HEADER
          ========================= */}

      <section className="reports-header">

        <div>
          <h1>
            Financial Reports 📊
          </h1>

          <p>
            Get a clear overview of your
            financial activity.
          </p>
        </div>

      </section>

      {/* =========================
          SUMMARY CARDS
          ========================= */}

      <section className="report-cards">

        {/* INCOME */}

        <div className="report-card income-report-card">

          <div className="report-card-icon">
            💰
          </div>

          <div>
            <p>Total Income</p>

            <h2>
              {formatMoney(totalIncome)}
            </h2>

            <small>
              Total earnings
            </small>
          </div>

        </div>

        {/* EXPENSE */}

        <div className="report-card expense-report-card">

          <div className="report-card-icon">
            💸
          </div>

          <div>
            <p>Total Expenses</p>

            <h2>
              {formatMoney(totalExpenses)}
            </h2>

            <small>
              Total spending
            </small>
          </div>

        </div>

        {/* BALANCE */}

        <div className="report-card balance-report-card">

          <div className="report-card-icon">
            💳
          </div>

          <div>
            <p>Current Balance</p>

            <h2>
              {formatMoney(balance)}
            </h2>

            <small>
              Available balance
            </small>
          </div>

        </div>

      </section>

      {/* =========================
          EXPENSE BREAKDOWN
          ========================= */}

      <section className="report-section chart-section">

        <div className="section-heading">

          <div>
            <h2>
              Expense Breakdown 📊
            </h2>

            <p>
              See where your money is going.
            </p>
          </div>

          <span className="section-count">
            {expenses.length} Expenses
          </span>

        </div>

        {chartData.length === 0 ? (

          <div className="no-data">

            <div className="no-data-icon">
              📊
            </div>

            <h3>
              No expense data yet
            </h3>

            <p>
              Add expenses to see your
              category breakdown.
            </p>

          </div>

        ) : (

          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={115}
                  innerRadius={60}
                  paddingAngle={4}
                  label
                >

                  {chartData.map(
                    (entry, index) => (

                      <Cell
                        key={`cell-${index}`}
                        fill={
                          chartColors[
                            index %
                            chartColors.length
                          ]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip
                  formatter={(value) =>
                    formatMoney(value)
                  }
                />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        )}

      </section>

      {/* =========================
          EXPENSE SUMMARY
          ========================= */}

      <section className="report-section">

        <div className="section-heading">

          <div>
            <h2>
              Recent Expenses 🧾
            </h2>

            <p>
              Keep track of your recent spending.
            </p>
          </div>

          <span className="section-count">
            {expenses.length} Expenses
          </span>

        </div>

        {expenses.length === 0 ? (

          <div className="no-data">

            <div className="no-data-icon">
              🧾
            </div>

            <h3>
              No expenses yet
            </h3>

            <p>
              Add expenses from the Dashboard.
            </p>

          </div>

        ) : (

          <div className="expense-summary">

            {expenses.map((expense, index) => {

              const name =
                expense?.name ||
                expense?.title ||
                "Untitled Expense";

              const category =
                expense?.category ||
                "Other";

              const amount =
                Number(expense?.amount || 0);

              const date =
                expense?.date || "";

              return (

                <div
                  className="summary-row"
                  key={
                    expense?.id ||
                    `${name}-${index}`
                  }
                >

                  <div className="summary-left">

                    <div className="summary-icon">
                      💸
                    </div>

                    <div>

                      <strong>
                        {name}
                      </strong>

                      <small>
                        {category}

                        {date &&
                          ` • ${date}`}
                      </small>

                    </div>

                  </div>

                  <strong className="summary-amount">
                    - {formatMoney(amount)}
                  </strong>

                </div>

              );
            })}

          </div>

        )}

      </section>

      {/* =========================
          INCOME SUMMARY
          ========================= */}

      <section className="report-section">

        <div className="section-heading">

          <div>
            <h2>
              Recent Income 💰
            </h2>

            <p>
              Keep track of your earnings.
            </p>
          </div>

          <span className="section-count">
            {incomes.length} Income
          </span>

        </div>

        {incomes.length === 0 ? (

          <div className="no-data">

            <div className="no-data-icon">
              💰
            </div>

            <h3>
              No income yet
            </h3>

            <p>
              Add income from the Dashboard.
            </p>

          </div>

        ) : (

          <div className="expense-summary">

            {incomes.map((income, index) => {

              const name =
                income?.name ||
                income?.source ||
                "Income";

              const amount =
                Number(income?.amount || 0);

              const date =
                income?.date || "";

              return (

                <div
                  className="summary-row"
                  key={
                    income?.id ||
                    `${name}-${index}`
                  }
                >

                  <div className="summary-left">

                    <div className="summary-icon income-icon">
                      💰
                    </div>

                    <div>

                      <strong>
                        {name}
                      </strong>

                      <small>
                        Income

                        {date &&
                          ` • ${date}`}
                      </small>

                    </div>

                  </div>

                  <strong className="summary-amount income-amount">
                    + {formatMoney(amount)}
                  </strong>

                </div>

              );
            })}

          </div>

        )}

      </section>

    </main>
  );
}

export default Reports;