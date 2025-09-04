import "../styles/Profile.css";
import Account from "../components/Account";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { updateUserProfile } from '../service/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((s) => s.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleEditClick = () => {
    setFirstName(user.firstName || '');
    setLastName(user.lastName || '');
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFirstName('');
    setLastName('');
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ firstName, lastName }));
    setIsEditing(false);
  };

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
          Welcome back
          {!isEditing && (
            <>
              <br />
              {loading ? (
                <span>Loading...</span>
              ) : (
                <span>{user.firstName} {user.lastName}!</span>
              )}
            </>
          )}
        </h1>
        {!isEditing ? (
          <button className="user__edit-button" onClick={handleEditClick}>
            Edit Name
          </button>
        ) : (
          <form onSubmit={handleSave} className="user__edit-form">
            <div className="user__edit-inputs">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="user__edit-input"
                required
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="user__edit-input"
                required
              />
            </div>
            <div className="user__edit-buttons">
              <button type="submit" className="user__save-button" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button type="button" className="user__cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        )}
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