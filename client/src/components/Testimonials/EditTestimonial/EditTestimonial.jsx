import { useState, useEffect } from "react";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as testimonialServices from "../../../services/testimonialServices";
import styles from "./EditTestimonial.Module.css"
import UserContext from "../../../contexts/UserContext";

function EditTestimonial({ onClose, id }) {
    const {fullName} = useContext(UserContext)
  const [text, setText] = useState("");

  useEffect(() => {
    testimonialServices.getOne(id)
      .then((result) => setText(result.text))
      .catch((error) => {
        console.log('Error in getting testimonial:', error);
      });
  }, []);

  const onChange = (e) => {
    setText(e.target.value)
  }

  const onEdit = async() => {
    const newTest = await testimonialServices.edit(id, text, fullName)
    onClose()
  }

return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton onClick={onClose}>
        <Modal.Title>Edit your testimonial</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea className="textarea" value={text} onChange={onChange}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onEdit}>Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTestimonial;