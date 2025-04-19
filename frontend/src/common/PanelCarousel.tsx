import { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

type CarouselIndicatorProps = {
  idx: number;
  isSelected: boolean;
  setSelectedIdx: Dispatch<SetStateAction<number>>;
};

const CarouselIndicator: FC<CarouselIndicatorProps> = ({
  idx,
  isSelected,
  setSelectedIdx,
}) => {
  return (
    <span
      className={`rounded-full w-5 h-5 drop-shadow-md inline-block hover:cursor-pointer ${isSelected ? "bg-slate-400" : "bg-[#FFFFF0]"}`}
      onClick={() => setSelectedIdx(idx)}
    />
  );
};

type PanelCarouselProps = {
  children: ReactNode[];
  className: string;
};
const PanelCarousel: FC<PanelCarouselProps> = ({ children, className }) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  if (!children || children.length === 0) {
    return <></>;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className={`${className} flex flex-row items-center justify-center`}>
        {children[selectedIdx]}
      </div>

      <div className="mt-5 w-36 h-fit flex flex-row justify-evenly">
        {children.map((_, childIdx) => {
          return (
            <CarouselIndicator
              idx={childIdx}
              isSelected={childIdx === selectedIdx}
              setSelectedIdx={setSelectedIdx}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PanelCarousel;
