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
  const [rememberMe, setRememberMe] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const token = useSelector(state => state.auth.token);
  const error = useSelector(state => state.auth.error);

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Le nom d'utilisateur est requis.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = "Le format de l'email est invalide.";
    }
    if (!password) {
      errors.password = "Le mot de passe est requis.";
    } else if (password.length < 6) {
      errors.password = "Le mot de passe doit contenir au moins 6 caractères.";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(loginUser({ email, password, rememberMe }));
    }
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
            {formErrors.email && (
              <div className="login__error">{formErrors.email}</div>
            )}
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
            {formErrors.password && (
              <div className="login__error">{formErrors.password}</div>
            )}
          </div>
          <div className="login__remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
            />
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
