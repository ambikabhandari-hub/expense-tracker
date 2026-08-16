import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

/* =====================================================
   HELPERS
===================================================== */

const getStoredData = (keys) => {
  for (const key of keys) {
    try {
      const value = localStorage.getItem(key);

      if (!value) continue;

      const parsed = JSON.parse(value);

      if (Array.isArray(parsed)) {
        return parsed;
      }

      if (parsed && Array.isArray(parsed.data)) {
        return parsed.data;
      }

      if (parsed && Array.isArray(parsed.items)) {
        return parsed.items;
      }
    } catch (error) {
      console.warn(`Could not read ${key}`, error);
    }
  }

  return [];
};

const getAmount = (item) => {
  const amount =
    item?.amount ??
    item?.value ??
    item?.price ??
    item?.total ??
    0;

  const number = Number(amount);

  return Number.isFinite(number) ? number : 0;
};

const getDate = (item) => {
  return (
    item?.date ||
    item?.createdAt ||
    item?.created_at ||
    item?.timestamp ||
    ""
  );
};

const getMonthNumber = (date) => {
  if (!date) return null;

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return null;
  }

  return d.getMonth() + 1;
};

const getYearNumber = (date) => {
  if (!date) return null;

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return null;
  }

  return d.getFullYear();
};

const formatMoney = (amount) => {
  return `₹${Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/* =====================================================
   COMPONENT
===================================================== */

export default function Reports() {
  const [selectedMonth, setSelectedMonth] = useState("all");

  /* ---------------------------------------------------
     READ DATA FROM LOCAL STORAGE
  --------------------------------------------------- */

  const incomes = useMemo(() => {
    return getStoredData([
      "incomes",
      "income",
      "incomeData",
      "transactions",
      "expenseTrackerIncomes",
    ]);
  }, []);

  const expenses = useMemo(() => {
    return getStoredData([
      "expenses",
      "expense",
      "expenseData",
      "expenseTrackerExpenses",
      "transactions",
    ]);
  }, []);

  /* ---------------------------------------------------
     FILTER DATA
  --------------------------------------------------- */

  const filteredIncomes = useMemo(() => {
    if (selectedMonth === "all") {
      return incomes;
    }

    return incomes.filter((item) => {
      return String(getMonthNumber(getDate(item))) === selectedMonth;
    });
  }, [incomes, selectedMonth]);

  const filteredExpenses = useMemo(() => {
    if (selectedMonth === "all") {
      return expenses;
    }

    return expenses.filter((item) => {
      return String(getMonthNumber(getDate(item))) === selectedMonth;
    });
  }, [expenses, selectedMonth]);

  /* ---------------------------------------------------
     TOTALS
  --------------------------------------------------- */

  const totalIncome = useMemo(() => {
    return filteredIncomes.reduce((sum, item) => {
      return sum + getAmount(item);
    }, 0);
  }, [filteredIncomes]);

  const totalExpenses = useMemo(() => {
    return filteredExpenses.reduce((sum, item) => {
      return sum + getAmount(item);
    }, 0);
  }, [filteredExpenses]);

  const currentBalance = totalIncome - totalExpenses;

  /* ---------------------------------------------------
     CHART DATA
  --------------------------------------------------- */

  const chartData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return months.map((monthName, index) => {
      const month = index + 1;

      const income = incomes
        .filter((item) => getMonthNumber(getDate(item)) === month)
        .reduce((sum, item) => sum + getAmount(item), 0);

      const expense = expenses
        .filter((item) => getMonthNumber(getDate(item)) === month)
        .reduce((sum, item) => sum + getAmount(item), 0);

      return {
        name: monthName,
        income,
        expense,
      };
    });
  }, [incomes, expenses]);

  /* ---------------------------------------------------
     CATEGORY DATA
  --------------------------------------------------- */

  const categoryData = useMemo(() => {
    const categoryMap = {};

    filteredExpenses.forEach((item) => {
      const category =
        item?.category ||
        item?.type ||
        item?.name ||
        "Other";

      if (!categoryMap[category]) {
        categoryMap[category] = 0;
      }

      categoryMap[category] += getAmount(item);
    });

    return Object.entries(categoryMap).map(
      ([name, amount]) => ({
        name,
        amount,
      })
    );
  }, [filteredExpenses]);

  /* ---------------------------------------------------
     UI
  --------------------------------------------------- */

  return (
    <div className="reports-page">
      <style>{`
        .reports-page {
          min-height: 100vh;
          width: 100%;
          padding: 30px;
          color: #ffffff;
          background:
            radial-gradient(
              circle at 85% 10%,
              rgba(139, 92, 246, 0.22),
              transparent 30%
            ),
            radial-gradient(
              circle at 10% 80%,
              rgba(236, 72, 153, 0.12),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #070b2b 0%,
              #10184a 50%,
              #180d35 100%
            );
        }

        .reports-inner {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .reports-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .reports-title {
          font-size: 36px;
          font-weight: 800;
          margin: 0 0 8px;
          color: #ffffff;
        }

        .reports-subtitle {
          margin: 0;
          color: #b9bddb;
          font-size: 15px;
        }

        .filter-box {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .filter-box label {
          font-size: 13px;
          font-weight: 600;
          color: #d9d8f0;
        }

        .month-select {
          min-width: 150px;
          padding: 11px 14px;
          border-radius: 10px;
          border: 1px solid rgba(167, 139, 250, 0.45);
          background: #21184d;
          color: #ffffff;
          outline: none;
          font-size: 14px;
        }

        .month-select:focus {
          border-color: #ec4899;
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.15);
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 24px;
        }

        .summary-card {
          position: relative;
          overflow: hidden;
          padding: 25px;
          min-height: 145px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.14);
          background: linear-gradient(
            135deg,
            rgba(32, 39, 112, 0.96),
            rgba(48, 30, 91, 0.96)
          );
          box-shadow:
            0 12px 30px rgba(0,0,0,0.22),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .summary-card::after {
          content: "";
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          right: -45px;
          top: -45px;
          background: rgba(255,255,255,0.05);
        }

        .summary-icon {
          font-size: 22px;
          margin-bottom: 10px;
        }

        .summary-label {
          font-size: 14px;
          font-weight: 600;
          color: #c6c8e4;
          margin-bottom: 8px;
        }

        .summary-value {
          font-size: 27px;
          font-weight: 800;
          color: #ffffff;
          opacity: 1;
        }

        .income-value {
          color: #6ee7b7;
        }

        .expense-value {
          color: #f9a8d4;
        }

        .balance-value {
          color: #c4b5fd;
        }

        .chart-grid {
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
          gap: 24px;
        }

        .chart-card {
          min-height: 450px;
          padding: 24px;
          border-radius: 20px;
          border: 1px solid rgba(167,139,250,0.28);
          background: linear-gradient(
            135deg,
            #21194f 0%,
            #30205f 50%,
            #3b1d4f 100%
          );
          box-shadow:
            0 15px 35px rgba(0,0,0,0.25);
        }

        .chart-title {
          margin: 0 0 5px;
          font-size: 20px;
          font-weight: 750;
          color: #ffffff;
        }

        .chart-description {
          margin: 0 0 20px;
          color: #b9bddb;
          font-size: 13px;
        }

        .chart-wrapper {
          width: 100%;
          height: 350px;
        }

        .category-card {
          min-height: 450px;
          padding: 24px;
          border-radius: 20px;
          border: 1px solid rgba(167,139,250,0.28);
          background: linear-gradient(
            135deg,
            #21194f 0%,
            #30205f 100%
          );
          box-shadow:
            0 15px 35px rgba(0,0,0,0.25);
        }

        .category-list {
          margin-top: 25px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .category-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 13px 14px;
          border-radius: 12px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.07);
        }

        .category-name {
          color: #eeeeff;
          font-weight: 600;
          font-size: 14px;
        }

        .category-amount {
          color: #f9a8d4;
          font-weight: 700;
          font-size: 14px;
        }

        .empty-message {
          margin-top: 40px;
          text-align: center;
          color: #aeb2d0;
          font-size: 14px;
        }

        @media (max-width: 900px) {
          .summary-grid {
            grid-template-columns: 1fr;
          }

          .chart-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .reports-page {
            padding: 18px;
          }

          .reports-title {
            font-size: 28px;
          }

          .summary-value {
            font-size: 23px;
          }

          .chart-card,
          .category-card {
            padding: 17px;
          }
        }
      `}</style>

      <div className="reports-inner">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="reports-header">
          <div>
            <h1 className="reports-title">
              Financial Reports 📊
            </h1>

            <p className="reports-subtitle">
              Get a clear overview of your financial activity.
            </p>
          </div>

          <div className="filter-box">
            <label htmlFor="month">
              Select Month
            </label>

            <select
              id="month"
              className="month-select"
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(e.target.value)
              }
            >
              <option value="all">All Time</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
        </div>


        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <div className="summary-grid">

          <div className="summary-card">
            <div className="summary-icon">
              💰
            </div>

            <div className="summary-label">
              Total Income
            </div>

            <div className="summary-value income-value">
              {formatMoney(totalIncome)}
            </div>
          </div>


          <div className="summary-card">
            <div className="summary-icon">
              💸
            </div>

            <div className="summary-label">
              Total Expenses
            </div>

            <div className="summary-value expense-value">
              {formatMoney(totalExpenses)}
            </div>
          </div>


          <div className="summary-card">
            <div className="summary-icon">
              💳
            </div>

            <div className="summary-label">
              Current Balance
            </div>

            <div className="summary-value balance-value">
              {formatMoney(currentBalance)}
            </div>
          </div>

        </div>


        {/* =================================================
            CHART + CATEGORY
        ================================================= */}

        <div className="chart-grid">

          {/* BAR CHART */}

          <div className="chart-card">

            <h2 className="chart-title">
              Income vs Expense
            </h2>

            <p className="chart-description">
              Compare your total income and spending.
            </p>

            <div className="chart-wrapper">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 20,
                    left: 10,
                    bottom: 10,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="rgba(255,255,255,0.14)"
                  />

                  <XAxis
                    dataKey="name"
                    tick={{
                      fill: "#ffffff",
                      fontSize: 12,
                    }}
                    axisLine={{
                      stroke: "rgba(255,255,255,0.25)",
                    }}
                    tickLine={{
                      stroke: "rgba(255,255,255,0.25)",
                    }}
                  />

                  <YAxis
                    tick={{
                      fill: "#ffffff",
                      fontSize: 12,
                    }}
                    axisLine={{
                      stroke: "rgba(255,255,255,0.25)",
                    }}
                    tickLine={{
                      stroke: "rgba(255,255,255,0.25)",
                    }}
                  />

                  <Tooltip
                    cursor={{
                      fill: "rgba(255,255,255,0.05)",
                    }}
                    contentStyle={{
                      background: "#21183f",
                      border:
                        "1px solid rgba(236,72,153,0.5)",
                      borderRadius: "10px",
                      color: "#ffffff",
                    }}
                    labelStyle={{
                      color: "#ffffff",
                      fontWeight: 700,
                    }}
                    formatter={(value) =>
                      formatMoney(value)
                    }
                  />

                  <Legend
                    wrapperStyle={{
                      color: "#ffffff",
                      paddingTop: "10px",
                    }}
                  />

                  <Bar
                    dataKey="income"
                    name="Income"
                    fill="#34d399"
                    radius={[8, 8, 0, 0]}
                    barSize={30}
                  />

                  <Bar
                    dataKey="expense"
                    name="Expense"
                    fill="#f472b6"
                    radius={[8, 8, 0, 0]}
                    barSize={30}
                  />

                </BarChart>
              </ResponsiveContainer>

            </div>
          </div>


          {/* CATEGORY CARD */}

          <div className="category-card">

            <h2 className="chart-title">
              Expense Summary
            </h2>

            <p className="chart-description">
              Your spending by category.
            </p>

            {categoryData.length > 0 ? (

              <div className="category-list">

                {categoryData.map((category) => (
                  <div
                    className="category-row"
                    key={category.name}
                  >

                    <span className="category-name">
                      {category.name}
                    </span>

                    <span className="category-amount">
                      {formatMoney(category.amount)}
                    </span>

                  </div>
                ))}

              </div>

            ) : (

              <div className="empty-message">
                No expense data available.
              </div>

            )}

          </div>

        </div>

      </div>
    </div>
  );
}