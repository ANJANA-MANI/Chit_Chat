import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import './Pages/Home.scss';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const { data, dispatch } = useContext(ChatContext);

  console.log('user',currentUser);
  console.log('DAta',data);


  useEffect(() => {
    // Update ChatContext when currentUser changes
    if (!currentUser) {
      dispatch({ type: "CHANGE_USER", payload: null });
    }
  }, [currentUser, dispatch]);
  console.log('DAta updated',data);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;