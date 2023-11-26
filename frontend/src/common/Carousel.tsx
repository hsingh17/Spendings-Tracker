import Card from "./Card";

const Carousel = () => {
  return (
    <div className="overflow-y-scroll outline-red-500 border-dotted border border-green-700">
      <div className="w-[750px] flex flex-row h-fit">
        <Card itemsCenter={false}>
          Date:
        </Card>
        <Card itemsCenter={true}>
          Hello
        </Card>
      </div>
    </div>
  );
};

export default Carousel;
