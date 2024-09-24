import Card from "../../common/Card";

const Error = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="w-full h-full md:w-fit md:h-fit items-center px-10 py-24">
        <h1 className="text-7xl font-semibold text-theme-brand">Oops!</h1>
        <h2 className="mt-10 text-2xl text-center font-semibold text-slate-500">
          We were unable to complete this request.
          <br />
          Please try again later
        </h2>
      </Card>
    </div>
  );
};

export default Error;
