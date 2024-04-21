import GenericInputField from "./GenericInputField";

const EmailInput = () => {
  return (
    <div className="mt-5">
      <label className="font-semibold text-slate-500">Email</label>
      <GenericInputField type="text" name="email" />
    </div>
  );
};

export default EmailInput;
