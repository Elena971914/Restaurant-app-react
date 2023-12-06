import { Link } from "react-router-dom";
import styles from "./Contacts.module.css";

export default function Contacts() {
  return (
    <div className={styles.contactsContainer}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.9050391755895!2d23.362719575668205!3d42.68455381453996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa85ebcd064e11%3A0x7aaaed31df94c8c2!2z0KHRg9C40LnRgg!5e0!3m2!1sbg!2sbg!4v1699902669454!5m2!1sbg!2sbg"
        width="600"
        height="450"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className={styles.infoContainer}>
        <div>
          <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
            Contact
          </h4>
          <p className="mb-2">
            <i className="fa fa-map-marker-alt me-3"></i>Sofia, Bulgaria
          </p>
          <p className="mb-2">
            <i className="fa fa-phone-alt me-3"></i>+012 345 67890
          </p>
          <p className="mb-2">
            <i className="fa fa-envelope me-3"></i>info@example.com
          </p>
          <div className="d-flex pt-2">
            <Link className="btn btn-outline-light btn-social" to="">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link className="btn btn-outline-light btn-social" to="">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link className="btn btn-outline-light btn-social" to="">
              <i className="fab fa-youtube"></i>
            </Link>
            <Link className="btn btn-outline-light btn-social" to="">
              <i className="fab fa-linkedin-in"></i>
            </Link>
          </div>
        </div>
        <div>
          <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
            Opening
          </h4>
          <h5 className="text-light fw-normal">Monday - Saturday</h5>
          <p>09AM - 09PM</p>
          <h5 className="text-light fw-normal">Sunday</h5>
          <p>10AM - 08PM</p>
        </div>
      </div>
    </div>
  );
}
