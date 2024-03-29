import styles from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/");
  };
  return (
    <img
      onClick={clickHandler}
      className={styles.errorImg}
      src="../../public/img/23736e5af84855ef8458126d8775732b.jpg"
    />
  );
}
