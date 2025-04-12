import { FC } from "react";

type ScreenshotCarouselProps = {
  className: string;
};
const ScreenshotCarousel: FC<ScreenshotCarouselProps> = ({
  className = "",
}) => {
  return <h1 className={`lg:w-[700px] bg-red-500 ${className}`}>Carousel</h1>;
};

export default ScreenshotCarousel;
