import { Circles } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Circles
      height="32"
      width="32"
      color="#4fa94d"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};
