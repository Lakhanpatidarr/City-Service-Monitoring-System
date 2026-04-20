import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AboutCity from './pages/AboutCity';
import CityServices from './pages/CityServices'
import Login from './pages/Login';
import ReportIssue from './pages/ReportIssue';
import SignUp from './pages/SignUp';
import ViewRating from './pages/ViewRating';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import { useState } from 'react';
import Template from './components/Template';
import PrivateRouter from './pages/PrivateRouter';
import RegisterIssue from './pages/RegisterIssue';
import SubmitRating from './pages/SubmitRating';
import UpdateProfile from './pages/UpdateProfile';
import VerifyOtp from "./pages/VerifyOtp";
import AdminRoute from './pages/AdminRoute';
import AdminPage from './pages/AdminPage';
import OfficerPage from './pages/OfficerPage';
import OfficerRouter from './pages/OfficerRouter';
import SuperAdminPage from './pages/SuperAdminPage';
import SuperAdminRoute from './pages/SuperAdminRoute';
import ResetPassword from './pages/ResetPassword';
import ViewAllComplaint from './pages/ViewAllComplaint';
import ViewPandingComplaint from './pages/ViewPandingComplaint';
import ViewResolvedComplaint from './pages/ViewResolvedComplaint';
import './index.css';
import { useSelector } from 'react-redux';
import CreateAdmin from './pages/CreateAdmin';
import CreateOfficer from './pages/CreateOfficer';
import AdminSuperAdminRoute from './pages/AdminSuperAdminRoute';
import ScrollToTop from "./pages/ScrollToTop";
import FAQ from './pages/FAQ';
import Support from './pages/Support';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Footer from './components/Footer';
import GoogleCallBack from "./pages/GoogleCallBack";
import Chatbot from './pages/Chatbot';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [ratings, setRatings] = useState([]);
  return (
    <div className='app-container'>
      <Navbar isLoggedIn={isLoggedIn}/>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home ratings={ratings}/>} />
        <Route path='aboutcity' element={<AboutCity/>} />
        <Route path='cityservices' element={<CityServices/>} />
        <Route path='login' element={<Login/>} />
        <Route path='reportissue' element={<ReportIssue/>} />
        <Route path='signup' element={<SignUp/>} />
        <Route path='viewrating' element={<ViewRating ratings={ratings}/>} />
        <Route path='submitrating' element={<PrivateRouter isLoggedIn={isLoggedIn}><SubmitRating ratings={ratings} setRatings={setRatings}/></PrivateRouter>} />
        <Route path='dashboard' element={<PrivateRouter isLoggedIn={isLoggedIn}>
          <Dashboard />
        </PrivateRouter>} />
        <Route path='registerissue' element={<PrivateRouter isLoggedIn={isLoggedIn}><RegisterIssue/></PrivateRouter>} />
        <Route path='updateprofile' element={<PrivateRouter isLoggedIn={isLoggedIn}><UpdateProfile/></PrivateRouter>} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/admin" element={<AdminRoute><AdminPage/></AdminRoute>}></Route>
        <Route path="/officer" element={<OfficerRouter><OfficerPage/></OfficerRouter>}></Route>
        <Route path='/super-admin' element={<SuperAdminRoute><SuperAdminPage/></SuperAdminRoute>}></Route>
        <Route path='/reset-password' element={<ResetPassword/>} />
        <Route path='/all-complaints' element={<PrivateRouter><ViewAllComplaint/></PrivateRouter>}></Route>
        <Route path='/panding-complaints' element={<PrivateRouter><ViewPandingComplaint/></PrivateRouter>}></Route>
        <Route path='/resolved-complaints' element={<PrivateRouter><ViewResolvedComplaint/></PrivateRouter>}></Route>
        <Route path='/create-admin' element={<SuperAdminRoute><CreateAdmin/></SuperAdminRoute>}></Route>
        <Route path='/create-officer' element={<AdminSuperAdminRoute><CreateOfficer></CreateOfficer></AdminSuperAdminRoute>}/>
        <Route path='/faq' element={<FAQ/>} />
        <Route path='/support' element={<Support/>} />
        <Route path='/terms' element={<Terms/>} />
        <Route path='/privacy' element={<PrivacyPolicy/>} />
        <Route path="/auth/google/callback" element={<GoogleCallBack />} />
      </Routes>
      <Footer/>
      <Chatbot/>
    </div>
  );
}

export default App;