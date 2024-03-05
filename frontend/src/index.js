import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

//RESTRICTED
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import store from './redux/store'
// import { Provider } from 'react-redux';
// import {Route, RouterProvider, Routes, createRoutesFromElements} from 'react-router-dom'
// import {BrowserRouter} from 'react-router-dom'

// //AUTH


// //RESTRICTED

// import Home from './pages/Home'

// const router = (
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />}>
//         <Route index={true} element={<Home />} /> {/* Remove the path prop from the nested Route */}
//       </Route>
//     </Routes>
//   </BrowserRouter>
// );

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//     <RouterProvider router = {router} />
//   </Provider>
// );

