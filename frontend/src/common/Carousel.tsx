import Card from "./Card";

const Carousel = () => {
  return (
    <div className="overflow-y-scroll w-full">
      <div className="flex flex-row w-[125%] h-fit p-5">
        <Card itemsCenter={false}>
          Date:
        </Card>
        <Card itemsCenter={true}>
          Hello
        </Card>
        <Card itemsCenter={true}>
          Hello
        </Card>
        <Card itemsCenter={true}>
          Hello
        </Card>
        <Card itemsCenter={true}>
          Hello
        </Card>
        <Card itemsCenter={true}>
          Hello
        </Card><Card itemsCenter={true}>
          Hello
        </Card><Card itemsCenter={true}>
          Hello
        </Card><Card itemsCenter={true}>
          Hello
        </Card><Card itemsCenter={true}>
          Hello
        </Card><Card itemsCenter={true}>
          Hello
        </Card><Card itemsCenter={true}>
          Hello
        </Card><Card itemsCenter={true}>
          Hello
        </Card><Card itemsCenter={true}>
          Hello
        </Card><Card itemsCenter={true}>
          Hello
        </Card>
        <Card itemsCenter={true}>
          Hello
        </Card>
        <Card itemsCenter={true}>
          Hello
        </Card>
        <Card itemsCenter={true}>
          Hello
        </Card>
        <Card itemsCenter={true}>
          Hello
        </Card>
        <Card itemsCenter={true}>
          Hello
        </Card>
      </div>
    </div>
  );
};

export default Carousel;
