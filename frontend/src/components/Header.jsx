import Logo from '../assets/argentBankLogo.png';
import '../styles/Header.css';


const Header = () => {

  return (
    <header className="header">
      <a href="/" className="header__link">
        <img src={Logo} alt="Argent Bank Logo" className='header__logo'/>
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div className='header__links'>
        <a href="/login" className="header__link">
          <i className='fa fa-user-circle header__icon'></i><span className='header__link-text'>Sign In</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
