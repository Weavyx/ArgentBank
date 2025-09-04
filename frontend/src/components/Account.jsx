import "../styles/Account.css";

const Account = ({ title, amount, description }) => {
  return (
    <section className="user__account">
        <div className="user__account-content">
          <h3 className="user__account-title">{title}</h3>
          <p className="user__account-amount">{amount}</p>
          <p className="user__account-description">{description}</p>
        </div>
        <div className="user__account-content user__account-content--cta">
          <button className="user__transaction-button">View transactions</button>
        </div>
      </section>
  );
};

export default Account;
