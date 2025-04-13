import { FC, ReactNode, useState } from "react";

type PanelCarouselProps = {
  children: ReactNode[];
  className: string;
};
const PanelCarousel: FC<PanelCarouselProps> = ({ children, className }) => {
  const [idx, setIdx] = useState<number>(0);
  console.log(setIdx);

  return (
    <>
      <div className={className}>{children[idx]}</div>
      {children.map((_, childIdx) => {
        return <div key={childIdx}>.</div>;
      })}
    </>
  );
};

export default PanelCarousel;
