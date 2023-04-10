const SpendingFormInput = () =>{ 
  return (
    <>
      <label>Category:</label>
      <input 
        type="text" 
        name="category" 
        value={ spending.category || "" } 
        onChange={ (e:React.ChangeEvent) => { handleChange(e, idx) }} />
    </>
  );
};

export default SpendingFormInput;