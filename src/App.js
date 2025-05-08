import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Login/Login';
import Dashboard from './Page/Dashboard/Dashboard';
import { PrivateRoute } from './UseContext.js/PrivateRoute';
import { Provider } from "react-redux";
import store from './Store/Store';
import Reservation from './Page/Reservation/Reservation';
import DetailReservation from './Page/DetailReservation/DetailReservation';
import Price from './Page/Price/Price';
import InvoinceRelax from './Page/InvoinceRelax';
import Dollar from './Page/Dollar/Dollar';
import CityDian from './Page/CityDian/CityDian';
import Advances from './Page/Advances/Advances';
import Tra from './Page/Tra/Tra';

function App() {
  return (
    <Provider  store={store}>    <BrowserRouter> 
    <Routes>
      <Route exact path="/" element={<Login/> } />
      <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
                </PrivateRoute>
            }
          />

      <Route
            path="/dashboard/Dollar"
            element={
              <PrivateRoute>
                <Dollar />
                </PrivateRoute>
            }
          />
      <Route
             path="/connect/:id"
            element={
              <PrivateRoute>
                <Reservation />
                </PrivateRoute>
            }
          />
        <Route
             path="/reservation/:id"
            element={
              <PrivateRoute>
                <DetailReservation />
                </PrivateRoute>
            }
          />

        <Route
             path="/dashboard/Cotization"
            element={
              <PrivateRoute>
                <Price />
                </PrivateRoute>
            }
        />

        <Route
             path="/dashboard/siigo"
            element={
              <PrivateRoute>
                <InvoinceRelax />
              </PrivateRoute>
            }
        />
         <Route
             path="/dashboard/CityDian"
            element={
              <PrivateRoute>
                <CityDian />
              </PrivateRoute>
            }
        />


      <Route
             path="/Cotization"
            element={
              <PrivateRoute>
                <CityDian />
              </PrivateRoute>
            }
      />
      <Route
            path="/Cloudbeds/Tra"
            element={
              <PrivateRoute>
                <Tra />
              </PrivateRoute>
            }
      />

      
      <Route
             path="/Cloudbeds/Advances"
            element={
              <PrivateRoute>
                <Advances />
              </PrivateRoute>
            }
      />


      
    </Routes> 
  </BrowserRouter>
  </Provider>
  );
}
export default App;
