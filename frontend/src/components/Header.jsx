import Logo from '../assets/argentBankLogo.png';
import '../styles/Header.css';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { logout } from "../service/authSlice";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((s) => s.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={Logo} alt="Argent Bank Logo" className='header__logo'/>
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className='header__links'>
        <Link to={isAuthenticated ? "/profile" : '/login'} className="header__link">
          <i className='fa fa-user-circle header__icon'></i><span className='header__link-text'>{isAuthenticated ? user?.firstName : 'Sign In'}</span>
        </Link>
        {isAuthenticated && (
          <button className="header__link" onClick={handleLogout} style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer'}}>
            <i className="fa fa-sign-out header__icon"></i><span className='header__link-text'>Sign Out</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
