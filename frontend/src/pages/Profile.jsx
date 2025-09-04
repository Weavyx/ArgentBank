import "../styles/Profile.css";
import Account from "../components/Account";
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user, loading } = useSelector((s) => s.auth);

  const accountContent = [
    {
      title: "Argent Bank Checking (x8349)",
      amount: "$2,082.79",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Savings (x6712)",
      amount: "$10,928.42",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Credit Card (x8349)",
      amount: "$184.30",
      description: "Current Balance",
    },
  ];

  return (
    <main className="user">
      <div className="user__header">
        <h1 className="user__welcome">
          Welcome back<br />
          {loading ? (
            <span>Loading...</span>
          ) : (
            <span>{user.firstName} {user.lastName}!</span>
          )}
        </h1>
        <button className="user__edit-button">Edit Name</button>
      </div>
      <h2 className="user__accounts-title sr-only">Accounts</h2>
      {accountContent.map((account, index) => (
        <Account
          key={index}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </main>
  );
};

export default Profile;