import "./BalanceCard.css";

function BalanceCard({ balance = 0 }) {
  return (
    <div className="balance-card">
      <div className="balance-content">
        <p className="balance-title">💳 Total Balance</p>

        <h2>₹{Number(balance).toFixed(2)}</h2>

        <span className="balance-subtitle">
          Available balance
        </span>
      </div>

      <div className="balance-icon">
        ₹
      </div>
    </div>
  );
}

export default BalanceCard;