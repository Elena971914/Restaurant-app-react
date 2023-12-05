import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";
import * as authenticationServices from "../../../services/authenticationServices"

export default function Logout() {
  const navigate = useNavigate();
  const { logoutHandler } = useContext(UserContext);

  useEffect(() => {
    authenticationServices
      .logout()
      .then(logoutHandler())
      .then(navigate("/"))
      .catch((err) => {
        logoutHandler();
        navigate("/");
      });
  }, []);
}
