import GenericInputField from "./GenericInputField";

const CodeInput = () => {
  return (
    <div className="mt-5">
      <label className="font-semibold text-slate-500">Code</label>
      <GenericInputField type="text" name="code" />
    </div>
  );
};

export default CodeInput;
