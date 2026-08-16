import "./IncomeCard.css";

function IncomeCard({ income = 0 }) {
  return (
    <div className="income-card">
      <div className="income-content">
        <p className="income-title">💰 Total Income</p>

        <h2>₹{Number(income).toFixed(2)}</h2>
      </div>

      <div className="income-icon">
        ↗
      </div>
    </div>
  );
}

export default IncomeCard;