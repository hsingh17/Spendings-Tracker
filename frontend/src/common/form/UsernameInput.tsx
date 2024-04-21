import GenericInputField from "./GenericInputField";

const UsernameInput = () => {
  return (
    <div className="mt-5">
      <label className="font-semibold text-slate-500">Username</label>
      <GenericInputField type="text" name="username" />
    </div>
  );
};

export default UsernameInput;
