import '../styles/Login.css'

const Login = () => {
  return (
    <>
      <section className="sign-in">
        <i className="fa fa-user-circle sign-in__icon"></i>
        <h1 className="sign-in__title">Sign In</h1>
        <form className="sign-in__form">
          <div className="sign-in__input-wrapper">
            <label htmlFor="username" className="sign-in__label">Username</label>
            <input type="text" id="username" className="sign-in__input"></input>
          </div>
          <div className="sign-in__input-wrapper">
            <label htmlFor="password" className="sign-in__label">Password</label>
            <input type="password" id="password" className="sign-in__input"></input>
          </div>
          <div className="sign-in__remember">
            <input type="checkbox" id="remember-me"></input>
            <label htmlFor="remember-me" className="sign-in__remember-label">Remember me</label>
          </div>
          <button className="sign-in__button">Sign In</button>
        </form>
      </section>
    </>
  );
};

export default Login;
