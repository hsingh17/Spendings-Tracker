const MfaSetupInstructions = () => {
  return (
    <p className="text-slate-500 font-semibold mt-2">
      Use an authenticator app (e.g:{" "}
      <a
        href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_US"
        className="text-theme-cta"
        target="_blank"
      >
        Google Authenticator
      </a>
      ,{" "}
      <a
        href="https://www.microsoft.com/en-us/security/mobile-authenticator-app"
        className="text-theme-cta"
        target="_blank"
      >
        Microsoft Authenticator
      </a>
      ,{" "}
      <a
        href="https://duo.com/product/multi-factor-authentication-mfa/duo-mobile-app"
        className="text-theme-cta"
        target="_blank"
      >
        Duo Mobile
      </a>
      , etc.) to scan the following QR code. Then, enter the 6 digit code that
      is shown in the app, before it expires.
    </p>
  );
};

export default MfaSetupInstructions;
