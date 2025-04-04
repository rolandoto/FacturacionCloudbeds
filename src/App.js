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
             path="/Price"
            element={
              <PrivateRoute>
                <Price />
                </PrivateRoute>
            }
        />

        <Route
             path="/InvoinceRelax"
            element={
              <PrivateRoute>
                <InvoinceRelax />
              </PrivateRoute>
            }
        />

      
    </Routes> 
  </BrowserRouter>
  </Provider>
  );
}
export default App;
