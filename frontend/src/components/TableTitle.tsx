const TableTitle = () => {
  return (
    <div className="flex md:flex-row flex-col">
      <h1 className="text-3xl md:text-2xl text-theme-brand font-bold">
        Spendings
      </h1>
      <button className="text-theme-neutral font-semibold md:ml-auto bg-theme-cta md:px-5 py-2 md:py-1.5 mt-5 md:mt-0">
        New Spending
      </button>
    </div>
  );
};

export default TableTitle;