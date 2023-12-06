import { Link } from "react-router-dom"
import styles from "./Footer.module.css"

export default function Footer() {
    return(
        <div className="container-fluid bg-dark text-light footer pt-5 wow fadeIn" data-wow-delay="0.1s">
            <div className="container py-5">
                <div className="row g-5">
                    <div className="col-lg-3 col-md-6">
                        <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Company</h4>
                        <Link className="btn btn-link" to="/recipes">Current competitor recipes</Link>
                        <Link className="btn btn-link" to="/contacts">Contact Us</Link>
                        <Link className="btn btn-link" to="/booking">Reservation</Link>
                        <Link className="btn btn-link" to="/testimonials">Testimonials</Link>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Contact</h4>
                        <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>Sofia, Bulgaria</p>
                        <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                        <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                        <div className="d-flex pt-2">
                            <Link className="btn btn-outline-light btn-social" to=""><i className="fab fa-twitter"></i></Link>
                            <Link className="btn btn-outline-light btn-social" to=""><i className="fab fa-facebook-f"></i></Link>
                            <Link className="btn btn-outline-light btn-social" to=""><i className="fab fa-youtube"></i></Link>
                            <Link className="btn btn-outline-light btn-social" to=""><i className="fab fa-linkedin-in"></i></Link>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Opening</h4>
                        <h5 className="text-light fw-normal">Monday - Saturday</h5>
                        <p>09AM - 09PM</p>
                        <h5 className="text-light fw-normal">Sunday</h5>
                        <p>10AM - 08PM</p>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Newsletter</h4>
                        <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                        <div className="position-relative mx-auto" style={{maxWidth: "400px"}}>
                            <input className="form-control border-primary w-100 py-3 ps-4 pe-5" type="text" name="email" autoComplete="on" placeholder="Your email"/>
                            <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="copyright">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            &copy; <Link className={styles.bolded} to="/">Sweet Restaurant</Link>, All Right Reserved. 
							
							
							Designed By <Link className="border-bottom" href="https://htmlcodex.com">HTML Codex</Link>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <div className="footer-menu">
                                <Link to="/">Home</Link>
                                <Link href="">Cookies</Link>
                                <Link href="">Help</Link>
                                <Link href="">FQAs</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}