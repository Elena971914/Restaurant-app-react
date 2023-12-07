import { Link } from "react-router-dom"

export default function Auth() {
    return(
        <div
          style={{ margin: "30px auto", width: "50vw", textAlign: "center" }}
        >
          <h6>Please, login or register first.</h6>
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