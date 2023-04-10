const SpendingFormRow = () => {
  return (
    <div key={ idx } >
    
      <button onClick={ (e:React.MouseEvent ) => { handleDeleteRow(e, idx) }}>X</button>
    </div>
  );
};

export default SpendingFormRow;