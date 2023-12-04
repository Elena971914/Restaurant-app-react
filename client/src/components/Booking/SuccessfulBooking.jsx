import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getBooking } from "../../services/bookingServices";
import {Link, Navigate} from "react-router-dom"

function SuccessfulBooking({ onClose, userId }) {
  const [data, setData] = useState({});

  useEffect(() => {getBooking(userId).then((result) => setData(result))}, []);

return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thank you for your booking!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {data.name}, your booking for {data.datetime} for {data.tableFor} people
          has been made. In case of delay more than 15 minutes, please contact us.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary"><Link to="/profile" style={{color:"white"}}>My Profile</Link>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SuccessfulBooking;


