import "./App.css";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Activate from "./pages/Activate/Activate";
import Authenticate from "./pages/Authenticate/Authenticate";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Rooms from "./pages/Rooms/Rooms";

const isAuth = false;

const user = {
  isActivated: false,
};

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <Home />
            </GuestRoute>
          }
        />
        {/* <Route path="/authenticate" element={<Authenticate />} /> */}

        {/* <Route path="/authenticate">element={<Authenticate />}</Route> */}
        <Route
          path="/authenticate"
          element={
            <GuestRoute>
              <Authenticate />
            </GuestRoute>
          }
        />
        <Route
          path="/activate"
          element={
            <SemiProtectedRoute>
              <Activate />
            </SemiProtectedRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />

        {/* <GuestRoute path="/authenticate">element={<Authenticate />}</GuestRoute>
        <Route path="/login" element={<Login />} /> */}

        {/* <Route
          path="/activate"
          element={
            <SemiProtectedRoute>
              <Activate />
            </SemiProtectedRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
}

function GuestRoute({ children }) {
  return isAuth ? <Navigate to="/rooms" replace /> : <>{children}</>;
}
function SemiProtectedRoute({ children }) {
  return !isAuth ? (
    <Navigate to="/" replace />
  ) : isAuth && !user.isActivated ? (
    children
  ) : (
    <Navigate to="/rooms" replace />
  );
}
function ProtectedRoute({ children }) {
  return !isAuth ? (
    <Navigate to="/" replace />
  ) : isAuth && !user.isActivated ? (
    <Navigate to="/activate" replace />
  ) : (
    children
  );
}

// const GuestRoute = ({ children, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={({ location }) => {
//         return isAuth ? <Navigate to="/rooms" replace={true} /> : children;
//       }}
//     ></Route>
//   );
// };
// function SemiProtectedRoute({ children }) {
//   return !isAuth ? (
//     <Navigate to="/" replace={true} />
//   ) : isAuth && !user.isActivated ? (
//     <>{children}</>
//   ) : (
//     <Navigate to="/rooms" />
//   );
// }

export default App;
