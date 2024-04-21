const UsernameInput = () => {
  return (
    <div className="mt-5">
      <label className="font-semibold text-slate-500">Username</label>
      <input
        type="text"
        name="username"
        className="font-semibold mt-1 p-1 border-2 border-slate-500 focus:outline-none focus:border-theme-cta rounded-lg w-full"
      />
    </div>
  );
};

export default UsernameInput;
