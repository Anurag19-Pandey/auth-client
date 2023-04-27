import {BrowserRouter , Routes , Route} from "react-router-dom" ;
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PrivateRoute from "./auth/PrivateRoute";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import EmailVerificationLandingPage from "./pages/EmailVerificationLandingPage";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordResetLandingPage from "./pages/PasswordResetLandingPage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/verify-email" element={<VerifyEmailPage/>}/>
      <Route path="/verify-email/:verificationString" element={<EmailVerificationLandingPage/>}></Route>
      <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
      <Route path="/reset-password/:passwordResetCode" element={<PasswordResetLandingPage/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
