import '../styles/Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../service/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const token = useSelector(state => state.auth.token);
  const error = useSelector(state => state.auth.error);

  const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(loginUser({ email, password }));
};

  useEffect(() => {
    if (token) {
      navigate('/profile');
    }
  }, [token, navigate]);

  return (
    <>
      <section className="login">
        <i className="fa fa-user-circle login__icon"></i>
        <h1 className="login__title">Sign In</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__input-wrapper">
            <label htmlFor="username" className="login__label">Username</label>
            <input
              type="text"
              id="username"
              className="login__input"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="login__input-wrapper">
            <label htmlFor="password" className="login__label">Password</label>
            <input
              type="password"
              id="password"
              className="login__input"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="login__remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me" className="login__remember-label">Remember me</label>
          </div>
            <div className='login__button-error'>
          <button className="login__button" type="submit">Sign In</button>
          {error && (
            <div className="login__error" >
              {error}
            </div>

          )}</div>
        </form>
      </section>
    </>
  );
};

export default Login;
