import AccountSection from "./components/AccountSection";
import PreferencesSection from "./components/PreferencesSection";

const Settings = () => {
  return (
    <div className="p-4 w-full">
      <h3 className="text-slate-700 font-semibold">Settings</h3>
      <AccountSection />
      <PreferencesSection />
    </div>
  );
};

export default Settings;
