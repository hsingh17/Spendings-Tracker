const DashboardChartsContainer = () => {
  // desktop layout. TODO: mobile layout
  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-red-500">
      <div className="bg-green-600 w-full md:w-2/5 h-2/5 md:h-full"></div>
      <div className="md:flex md:flex-col w-full md:w-3/5 h-2/5 md:h-full">
        <div className="bg-purple-600 h-2/5 md:h-full"></div>
        <div className="bg-orange-600 h-2/5 md:h-full"></div>
      </div>
    </div>
  );
};

export default DashboardChartsContainer;
