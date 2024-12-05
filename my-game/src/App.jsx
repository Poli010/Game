import Login from "./Components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./Components/SignUp/SignUp";
import Verification from "./Components/Verification/Verification";
import Forgot_Password from "./Components/Forgot_Password/Forgot_Password";
import Forgot_Verification from "./Components/Forgot_Password/Forgot_Verification";
import New_Password from "./Components/Forgot_Password/New_Password";
import Admin_Options from "./Components/Admin/Admin_Options/Admin_Options";
import Accounts_Admin from "./Components/Admin/Accounts_Admin/Accounts_Admin";
import Guess_Admin from "./Components/Admin/Guess_Admin/Guess_Admin";
import Trick_Questions from "./Components/Admin/Trick_Questions/Trick_Questions";
import Choose_Game from "./Components/EndUser_Page/Choose_Game/Choose_Game";

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
            <Admin_Options />
            <Accounts_Admin/>
            
          </>
        }/>
          <Route path="Admin_Guess" element={
          <>
            <Admin_Options />
            <Guess_Admin />
            
          </>
        }/>
          <Route path="Admin_Trivia" element={
          <>
            <Admin_Options />
            <Trick_Questions />
            
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
