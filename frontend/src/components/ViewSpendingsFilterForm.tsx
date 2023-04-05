
const ViewSpendingsFilterForm = () => {
  return (
    <form onSubmit={ (e: React.FormEvent) => { handleFilterSearch(e) }}>
        <label htmlFor="start-date">Start Date:</label>
        <input type="date" id="start-date" name="startDateInput" />
        <br />

        <label htmlFor="end-date">End Date:</label>
        <input type="date" id="end-date" name="endDateInput" />
        <br />
        
        <label htmlFor="page-limit">Limit page to show:</label>
        <select name="pageLimitInput">
          {
            Constants.PAGE_LIMITS.map((limit: String, idx: number) => {
              return <option key={ `${limit}-${idx}` }>{limit}</option>
            })
          }
        </select>
        <br />

        <button type="submit">Search</button>
        <button type="reset">Reset filters</button>
      </form>
  );
};

export default ViewSpendingsFilterForm;