import { Route, Routes } from "react-router-dom";
import CreateAccount from "../pages/create-acct/CreateAccount";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFound from "../pages/error/NotFound";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Metrics from "../pages/metrics-page/Metrics";
import MfaRecoveryCodes from "../pages/mfa/recovery-codes/MfaRecoveryCodes";
import MfaSetup from "../pages/mfa/setup/MfaSetup";
import MfaVerify from "../pages/mfa/verify/MfaVerify";
import PasswordReset from "../pages/password-reset/PasswordReset";
import SaveSpendings from "../pages/save/SaveSpendings";
import SendPasswordReset from "../pages/send-password-reset/SendPasswordReset";
import Settings from "../pages/settings/Settings";
import VerifyAccount from "../pages/verify-acct/VerifyAccount";
import ViewSpendings from "../pages/view/ViewSpendings";
import {
  CREATE_ACCT_PAGE,
  DASHBOARD_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  METRICS_PAGE,
  MFA_RECOVERY_CODES_PAGE,
  MFA_SETUP_PAGE,
  MFA_VERIFY_PAGE,
  PASSWORD_RESET_PAGE,
  SAVE_SPENDINGS_PAGE,
  SEND_PASSWORD_RESET_EMAIL_PAGE,
  SETTINGS_PAGE,
  VERIFY_ACCT_PAGE,
  VIEW_SPENDINGS_PAGE,
} from "../utils/constants";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={HOME_PAGE} element={<Home />} />
      <Route path={LOGIN_PAGE} element={<Login />} />
      <Route path={DASHBOARD_PAGE} element={<Dashboard />} />
      <Route path={VIEW_SPENDINGS_PAGE} element={<ViewSpendings />} />
      <Route
        path={`${SAVE_SPENDINGS_PAGE}/:dateStr`}
        element={<SaveSpendings />}
      />
      <Route path={`${METRICS_PAGE}`} element={<Metrics />} />
      <Route
        path={SEND_PASSWORD_RESET_EMAIL_PAGE}
        element={<SendPasswordReset />}
      />
      <Route path={PASSWORD_RESET_PAGE} element={<PasswordReset />} />
      <Route path={CREATE_ACCT_PAGE} element={<CreateAccount />} />
      <Route path={VERIFY_ACCT_PAGE} element={<VerifyAccount />} />
      <Route path={SETTINGS_PAGE} element={<Settings />} />
      <Route path={MFA_SETUP_PAGE} element={<MfaSetup />} />
      <Route path={MFA_RECOVERY_CODES_PAGE} element={<MfaRecoveryCodes />} />
      <Route path={MFA_VERIFY_PAGE} element={<MfaVerify />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
