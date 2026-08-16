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

function IncomeExpenseChart({
  income,
  expense,
}) {
  const data = [
    {
      name: "Finance",
      Income: Number(income || 0),
      Expense: Number(expense || 0),
    },
  ];

  return (
    <div className="income-expense-chart">
      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip
            formatter={(value) =>
              `₹${Number(value).toFixed(2)}`
            }
          />

          <Legend />

          <Bar
            dataKey="Income"
            radius={[8, 8, 0, 0]}
          />

          <Bar
            dataKey="Expense"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IncomeExpenseChart;