import useUser from "../hooks/useUser";
import PreferredCurrencyLoader from "./PreferredCurrencyLoader";

const LocalStorageLoader = () => {
  const { data: response } = useUser();

  return (
    <>
      <PreferredCurrencyLoader userResponse={response} />
    </>
  );
};

export default LocalStorageLoader;
