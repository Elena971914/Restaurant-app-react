import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import styles from "./Booking.Module.css";
import * as bookingServices from "../../services/bookingServices"
import SuccessfulBooking from "./SuccessfulBooking";

export default function Booking() {
  const navigate = useNavigate();
  const { isAuthenticated, fullName, email} = useContext(UserContext);
  const [showLoggedIn, setShowLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const onFocus = () => {
    if (!isAuthenticated) {
      setShowLoggedIn(true);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.currentTarget))
    const result = await bookingServices.create(data)
    setBookingId(result._id)
    setShowModal(true)
    e.target.reset()
  }


  return (
    <>
    {showModal && <SuccessfulBooking userId={bookingId} onClose={() => setShowModal(false)}/>}
      <div
        className="container-xxl py-5 px-0 wow fadeInUp"
        data-wow-delay="0.1s"
      >
        <div className="row g-0">
          <div className="col-md-6">
            <div className="video">
              <button
                type="button"
                className="btn-play"
                data-bs-toggle="modal"
                data-src="https://www.youtube.com/embed/DWRcNpR6Kdc"
                data-bs-target="#videoModal"
              >
                <span></span>
              </button>
            </div>
          </div>
          <div className="col-md-6 bg-dark d-flex align-items-center">
            <div className="p-5 wow fadeInUp" data-wow-delay="0.2s">
              <h5 className="section-title ff-secondary text-start text-primary fw-normal">
                Reservation
              </h5>
              <h1 className="text-white mb-4">Book A Table Online</h1>
              <form onSubmit={onSubmit}>
                <div className="row g-3">
                  {showLoggedIn && (
                    <>
                      <p className="redParagraph">
                        You should login/register first to make a reservation.
                      </p>
                      <Link to="/login">
                        <button className="btn btn-primary width">Login</button>
                      </Link>
                      <Link to="/register">
                        <button className="btn btn-primary width marginBottom">
                          Register
                        </button>
                      </Link>
                    </>
                  )}
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        onFocus={onFocus}
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        onFocus={onFocus}
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div
                      className="form-floating date input-group date datepickers"
                      id="ass_date"
                      data-target-input="nearest"
                    >
                      <input
                        type="text"
                        className="form-control datetimepicker-input assessment-date-keypress"
                        id="datetime"
                        placeholder="Date & Time"
                        name="datetime"
                        data-target="#ass_date"
                        data-toggle="datetimepicker"
                        onFocus={onFocus}
                      />
                      
                      <label htmlFor="datetime">Date & Time</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <select className="form-select" id="select1" name="tableFor">
                        <option value="2">2 People</option>
                        <option value="3-5">3-5 People</option>
                        <option value="5+">5+ People</option>
                      </select>
                      <label htmlFor="select1">Table for:</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Special Request"
                        id="message"
                        name="specialRequest"
                        style={{ height: "100px" }}
                        onFocus={onFocus}
                      ></textarea>
                      <label htmlFor="message">Special Request</label>
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="videoModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Youtube Video
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="ratio ratio-16x9">
                <iframe
                  className="embed-responsive-item"
                  src=""
                  id="video"
                  allowFullScreen
                  allowscriptaccess="always"
                  allow="autoplay"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
