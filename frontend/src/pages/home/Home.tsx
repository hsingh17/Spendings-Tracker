import useDetectScreenWidth from "../../hooks/useDetectScreenWidth";
import GetStartedButton from "./component/GetStartedButton";
import ScreenshotCarousel from "./component/ScreenshotCarousel";
import SubTitle from "./component/Subtitle";
import Title from "./component/Title";

const THRESHOLD_FOR_STACKED_VIEW = 1500;
const Home = () => {
  const stackedView = useDetectScreenWidth(THRESHOLD_FOR_STACKED_VIEW);

  return (
    <div className="w-full h-full bg-gradient-to-r from-sky-200 via-slate-200 to-sky-200 overflow-y-hidden">
      {stackedView ? (
        <div className="flex flex-col items-center p-2 h-full">
          <span>logo here</span>
          <Title className="p-5" />
          <SubTitle className="py-10" />
          <ScreenshotCarousel className="w-full h-[400px]" />
          <GetStartedButton />
        </div>
      ) : (
        <div className="w-full h-full">
          <span className="w-full">logo here</span>
          <div className="flex flex-row justify-center items-center p-60 h-full">
            <div className="flex flex-col justify-center w-96 h-full mr-auto">
              <Title className="mb-10 text-2xl" />
              <SubTitle className="mb-10 text-lg" />
              <GetStartedButton />
            </div>
            <ScreenshotCarousel className="h-[400px]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
