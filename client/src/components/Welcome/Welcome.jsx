import { Link } from "react-router-dom";
import styles from "./Welcome.module.css";

export default function Welcome() {
  return (
    <div className="container-xxl py-5 bg-dark hero-header mb-5">
      <div className="container my-5 py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 text-center text-lg-start">
            <h1 className="display-3 text-white animated slideInLeft">
              Enjoy Our
              <br />
              Delicious Meals
            </h1>
            <p className="text-white animated slideInLeft mb-4 pb-2">
              Sweet restaurant is situated in Sofia. We offer delicious meals
              and great atmosphere. Our menu includes not only worldwide
              specialties, but also the customers favorite recipes. How we know
              the customers love them? Because they proposed us to make them and
              they voted that they liked them. You are welcome to try.
            </p>
            <Link
              to="/booking"
              className="btn btn-primary py-sm-3 px-sm-5 me-3 animated slideInLeft"
            >
              Book A Table
            </Link>
          </div>
          <div className="col-lg-6 text-center text-lg-end overflow-hidden">
            <img className={styles.imgFluid} src="img/hero.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
