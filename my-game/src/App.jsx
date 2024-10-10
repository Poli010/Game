import Login from "./Components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./Components/SignUp/SignUp";
import Verification from "./Components/Verification/Verification";
import Choose_Game from "./Components/Choose_Game/Choose_Game";
import Admin from "./Components/Admin/Admin";
import Forgot_Password from "./Components/Forgot_Password/Forgot_Password";
import Forgot_Verification from "./Components/Forgot_Password/Forgot_Verification";
import New_Password from "./Components/Forgot_Password/New_Password";

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Login/>
          </>
        }/>
         <Route path="SignUp" element={
          <>
            <SignUp/>
          </>
        }/>
         <Route path="Verification" element={
          <>
            <Verification/>
          
          </>
        }/>
        <Route path="Choose_Game" element={
          <>
            <Choose_Game />
          </>
        }/>
        <Route path="Admin" element={
          <>
            <Admin />
          </>
        }/>
        <Route path="Forgot_Password" element={
          <>
            <Forgot_Password />
          </>
        }/>
        <Route path="Forgot_Verification" element={
          <>
            <Forgot_Verification />
          </>
        }/>
        <Route path="New_Password" element={
          <>
            <New_Password />
          </>
        }/>

      </Routes>
    </Router>

  );
}

export default App
