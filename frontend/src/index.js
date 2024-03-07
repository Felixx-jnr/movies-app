import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

//RESTRICTED
import Home from './pages/Home';
import Profile from "./pages/User/Profile";
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PrivateRoute from "./pages/Auth/PrivateRoute.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />

          <Route path='' element={<PrivateRoute/>}>
            <Route path='/profile' element={<Profile/>}/>

          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);



