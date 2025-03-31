import { FC, ReactNode } from "react";

type DashboardChartContainerProps = {
  children: ReactNode;
  additionalStyles?: string;
};

const DashboardChartContainer: FC<DashboardChartContainerProps> = ({
  children,
  additionalStyles = "",
}) => {
  return (
    <div className={`bg-gray-700 rounded-xl shadow-2xl ${additionalStyles}`}>
      {children}
    </div>
  );
};

export default DashboardChartContainer;
