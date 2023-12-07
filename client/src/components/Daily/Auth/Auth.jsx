import { Link } from "react-router-dom"
import styles from "./Auth.module.css"

export default function Auth() {
    return(
        <div
          className={styles.container}
        >
          <h6 className={styles.marginBottom}>Please, login or register first.</h6>
          <div>
            <Link to="/login">
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "45%", marginRight: "30px" }}
              >
                Login
              </button>
            </Link>
            <Link to="/register">
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "45%" }}
              >
                Register
              </button>
            </Link>
          </div>
        </div>
    )
}