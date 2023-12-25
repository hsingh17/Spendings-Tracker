import RecentSpendingsCarousel from "./RecentSpendingsCarousel";

const RecentSpendings = () => {
  return (
    <div className="p-2">
      <h2 className="text-theme-brand font-semibold text-2xl mb-3">
        Recent spending activity
      </h2>
      <RecentSpendingsCarousel />
    </div>
  );
};

export default RecentSpendings;
