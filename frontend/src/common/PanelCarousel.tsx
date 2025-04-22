import { FC, ReactNode, useState } from "react";

const ANIMATE_IN = "animate-[carousel-slide-in_0.25s_ease-out]";
const ANIMATE_OUT = "animate-[carousel-slide-out_0.25s_ease-in]";

type CarouselIndicatorProps = {
  idx: number;
  isSelected: boolean;
  onClick: (idx: number) => void;
};

const CarouselIndicator: FC<CarouselIndicatorProps> = ({
  idx,
  isSelected,
  onClick,
}) => {
  return (
    <span
      className={`rounded-full w-5 h-5 drop-shadow-md inline-block hover:cursor-pointer ${isSelected ? "bg-slate-400" : "bg-[#FFFFF0]"}`}
      onClick={() => onClick(idx)}
    />
  );
};

type PanelCarouselProps = {
  children: ReactNode[];
  className: string;
};

const PanelCarousel: FC<PanelCarouselProps> = ({ children, className }) => {
  const [animation, setAnimation] = useState<string>("");
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const changeCarouselPanel = (idx: number) => {
    setAnimation(ANIMATE_OUT);
    setTimeout(() => {
      setAnimation(ANIMATE_IN);
      setSelectedIdx(idx);
    }, 100);
  };

  if (!children || children.length === 0) {
    return <></>;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div
        className={`${className} ${animation} relative bg-theme-neutral rounded-2xl drop-shadow-md flex flex-row items-center justify-center`}
      >
        {children[selectedIdx]}
      </div>

      <div className="mt-5 w-36 h-fit flex flex-row justify-evenly">
        {children.map((_, childIdx) => {
          return (
            <CarouselIndicator
              key={childIdx}
              idx={childIdx}
              isSelected={childIdx === selectedIdx}
              onClick={changeCarouselPanel}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PanelCarousel;
