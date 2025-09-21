import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from './service/authSlice';
import './styles/App.css'

function App() {
const dispatch = useDispatch();
const { user } = useSelector((s) => s.auth);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token && !user.firstName) {
      dispatch(getUserInfo());
    }
  }, [user.firstName, dispatch]);

  return (
    <>
      <Header />
        <main className="main-content">
          <Outlet />
        </main>
      <Footer />
    </>
  )
}

export default App
