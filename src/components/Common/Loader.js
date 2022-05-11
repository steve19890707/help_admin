import Loader from "react-loader-spinner";
import { styles } from "../../constants/styles";

export const LoaderSpinner = ({ type = "Oval", width = 50, height = 50 }) => {
  return (
    <Loader type={type} color={styles.loader} width={width} height={height} />
  );
};
