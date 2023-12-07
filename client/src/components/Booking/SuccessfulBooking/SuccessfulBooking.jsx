import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as bookingServices from "../../../services/bookingServices";
import styles from "./SuccessfulBooking.module.css";

function SuccessfulBooking({ onClose, userId }) {
  const [data, setData] = useState({});

  useEffect(() => {
    bookingServices
      .getBooking(userId)
      .then((result) => setData(result))
      .catch((err) => console.log("Error fetching booking data:", err));
  }, []);
  
  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thank you for your booking!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {data.name}, your booking for {data.datetime} for {data.tableFor}{" "}
          people has been made. Your special request: {data.specialRequest}
          In case of delay more than 15 minutes, please contact us.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={onClose}
          className={styles.whiteColor}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SuccessfulBooking;
