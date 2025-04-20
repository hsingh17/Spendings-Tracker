import { ReactNode } from "react";
import AddScreenshot from "../../assets/raw/add_screenshot.png";
import CurrencyScreenshot from "../../assets/raw/currency_screenshot.png";
import DashboardScreenshot from "../../assets/raw/dashboard_screenshot.png";
import GraphScreenshot from "../../assets/raw/graph_screenshot.png";
import ListScreenshot from "../../assets/raw/list_screenshot.png";
import PanelCarousel from "../../common/PanelCarousel";
import useDetectScreenWidth from "../../hooks/useDetectScreenWidth";
import GetStartedButton from "./component/GetStartedButton";
import SubTitle from "./component/Subtitle";
import Title from "./component/Title";

const THRESHOLD_FOR_STACKED_VIEW = 1700;

const Home = () => {
  const stackedView = useDetectScreenWidth(THRESHOLD_FOR_STACKED_VIEW);

  const renderPanelCarousel = (): ReactNode => {
    const imgClassName = `max-h-full ${!stackedView && "scale-90"}`;
    return (
      <PanelCarousel
        className={`bg-theme-neutral ${stackedView ? "h-[200px] w-full md:w-[700px]" : "h-[400px] w-[700px]"}`}
        children={[
          <img className={imgClassName} src={DashboardScreenshot} />,
          <img className={imgClassName} src={ListScreenshot} />,
          <img className={imgClassName} src={AddScreenshot} />,
          <img className={imgClassName} src={GraphScreenshot} />,
          <img className={imgClassName} src={CurrencyScreenshot} />,
        ]}
      />
    );
  };

  return (
    <div
      className={`w-full h-fit bg-gradient-to-r from-sky-200 via-slate-200 to-sky-200 ${stackedView ? "h-full" : "h-fit"}`}
    >
      {stackedView ? (
        <div className="flex flex-col items-center p-2 h-fit">
          <span>logo here</span>
          <Title className="p-5 text-center" />
          <SubTitle className="py-10" />
          {renderPanelCarousel()}
          <GetStartedButton />
        </div>
      ) : (
        <div className="w-full h-full">
          <span>logo here</span>
          <div className="flex flex-row justify-center items-center p-60 h-full">
            <div className="flex flex-col justify-center w-96 h-full mr-auto">
              <Title className="mb-10 text-2xl" />
              <SubTitle className="mb-10 text-lg" />
              <GetStartedButton />
            </div>
            {renderPanelCarousel()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
