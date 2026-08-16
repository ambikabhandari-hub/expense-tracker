import { useEffect, useState } from "react";

import BalanceCard from "../components/BalanceCard";
import IncomeCard from "../components/IncomeCard";
import ExpenseCard from "../components/ExpenseCard";

import IncomeForm from "../components/IncomeForm";
import ExpenseForm from "../components/ExpenseForm";

import IncomeList from "../components/IncomeList";
import ExpenseList from "../components/ExpenseList";
import "../components/ResponsiveDashboard.css";

import "./Dashboard.css";

function Dashboard() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [incomes, setIncomes] = useState(() => {
    const savedIncomes = localStorage.getItem("incomes");
    return savedIncomes ? JSON.parse(savedIncomes) : [];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }, [incomes]);

  const addExpense = (newExpense) => {
    setExpenses((previous) => [
      ...previous,
      newExpense,
    ]);
  };

  const deleteExpense = (id) => {
    setExpenses((previous) =>
      previous.filter((expense) => expense.id !== id)
    );
  };

  const editExpense = (updatedExpense) => {
    setExpenses((previous) =>
      previous.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      )
    );
  };

  const addIncome = (newIncome) => {
    setIncomes((previous) => [
      ...previous,
      newIncome,
    ]);
  };

  const deleteIncome = (id) => {
    setIncomes((previous) =>
      previous.filter((income) => income.id !== id)
    );
  };

  const editIncome = (updatedIncome) => {
    setIncomes((previous) =>
      previous.map((income) =>
        income.id === updatedIncome.id
          ? updatedIncome
          : income
      )
    );
  };

  const totalExpenses = expenses.reduce(
    (total, expense) =>
      total + Number(expense.amount || 0),
    0
  );

  const totalIncome = incomes.reduce(
    (total, income) =>
      total + Number(income.amount || 0),
    0
  );

  const balance = totalIncome - totalExpenses;

  return (
    <main className="dashboard">

      <div className="dashboard-header">
        <h1>Welcome back! 👋</h1>

        <p>
          Track your expenses and manage your money
          smartly.
        </p>
      </div>

      {/* SUMMARY CARDS */}

      <div className="cards-container">

        <BalanceCard balance={balance} />

        <IncomeCard income={totalIncome} />

        <ExpenseCard expense={totalExpenses} />

      </div>

      {/* FORMS */}

      <div className="forms-container">

        <IncomeForm onAddIncome={addIncome} />

        <ExpenseForm onAddExpense={addExpense} />

      </div>

      {/* LISTS */}

      <div className="lists-container">

        <IncomeList
          incomes={incomes}
          onDeleteIncome={deleteIncome}
          onEditIncome={editIncome}
        />

        <ExpenseList
          expenses={expenses}
          onDeleteExpense={deleteExpense}
          onEditExpense={editExpense}
        />

      </div>

    </main>
  );
}

export default Dashboard;