import "./App.css";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";

import Activate from "./pages/Activate/Activate";
import Authenticate from "./pages/Authenticate/Authenticate";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Rooms from "./pages/Rooms/Rooms";
import { useSelector } from "react-redux";

import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Loader from "./components/shared/Loader/Loader";
import Room from "./pages/Room/Room";

import { Toaster } from "react-hot-toast";
import EditorHome from "./pages/Editor/EditorHome/EditorHome";
import EditorPage from "./pages/Editor/EditorPage/EditorPage";

// Root component

function App() {
  // call refresh endpoint

  const { loading } = useLoadingWithRefresh();

  return loading ? (
    <Loader message="Loading ,  please wait ..." />
  ) : (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: "green",
              },
            },
          }}
        ></Toaster>
      </div>

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

          <Route
            path="/room/:id"
            element={
              <ProtectedRoute>
                <Room />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editor"
            element={
              <ProtectedRoute>
                <EditorHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor/:id"
            element={
              <ProtectedRoute>
                <EditorPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

function GuestRoute({ children }) {
  const { isAuth } = useSelector((state) => state.auth); // taking isAuth STATE from store
  return isAuth ? <Navigate to="/rooms" replace /> : <>{children}</>;
}
function SemiProtectedRoute({ children }) {
  const { user, isAuth } = useSelector((state) => state.auth);
  return !isAuth ? (
    <Navigate to="/" replace />
  ) : isAuth && !user.isActivated ? (
    children
  ) : (
    <Navigate to="/rooms" replace />
  );
}

function ProtectedRoute({ children }) {
  const { user, isAuth } = useSelector((state) => state.auth);
  return !isAuth ? (
    <Navigate to="/" replace />
  ) : isAuth && !user.isActivated ? (
    <Navigate to="/activate" replace />
  ) : (
    children
  );
}

export default App;
