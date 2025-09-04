import '../styles/Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../service/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const token = useSelector(state => state.auth.token);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email })); // login factice
  };

  useEffect(() => {
    if (token) {
      navigate('/profile');
    }
  }, [token, navigate]);

  return (
    <>
      <section className="sign-in">
        <i className="fa fa-user-circle sign-in__icon"></i>
        <h1 className="sign-in__title">Sign In</h1>
        <form className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__input-wrapper">
            <label htmlFor="username" className="sign-in__label">Username</label>
            <input
              type="text"
              id="username"
              className="sign-in__input"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="sign-in__input-wrapper">
            <label htmlFor="password" className="sign-in__label">Password</label>
            <input
              type="password"
              id="password"
              className="sign-in__input"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="sign-in__remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me" className="sign-in__remember-label">Remember me</label>
          </div>
          <button className="sign-in__button" type="submit">Sign In</button>
        </form>
      </section>
    </>
  );
};

export default Login;
