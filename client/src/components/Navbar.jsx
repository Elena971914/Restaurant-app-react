import { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

export default function Navbar() {
    const {isAuthenticated, email, fullName} = useContext(UserContext)
    return(
    <div className="container-xxl position-relative p-0">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
                <Link to="/" className="navbar-brand p-0">
                    <h1 className="text-primary m-0"><i className="fa fa-utensils me-3"></i>Sweet Restaurant</h1>
                     {/* <img src="img/logo.png" alt="Logo">  */}
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="fa fa-bars"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto py-0 pe-4">
                        <NavLink style={({isActive}) => isActive ? {color: '#FEA116'}: {}} to="/" className="nav-item nav-link">Home</NavLink>
                        <NavLink to="/about" className="nav-item nav-link">About</NavLink>
                        <NavLink to="/menu" className="nav-item nav-link">Menu</NavLink>
                        <div className="nav-item dropdown">
                            <Link to='' className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
                            <div className="dropdown-menu m-0">
                                <Link to="/booking" className="dropdown-item">Booking</Link>
                                <Link to="/testimonials" className="dropdown-item">Testimonials</Link>
                            </div>
                        </div>
                        <div className="nav-item dropdown">
                            <Link to='' className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Competition</Link>
                            <div className="dropdown-menu m-0">
                                <Link to="/recipes" className="dropdown-item">Competitor's recipes</Link>
                                <Link to="/recipes/new" className="dropdown-item">Add recipe</Link>
                                {/* TO DO */}
                                <Link to="/team" className="dropdown-item">My recipe</Link>
                            </div>
                        </div>
                        <NavLink to="/contacts" className="nav-item nav-link">Contact</NavLink>
                    </div>
                    <Link to="/booking" className="btn btn-primary py-2 px-4">Book A Table</Link>
                    
                </div>
                <div className="nav-item dropdown">
                <NavLink to="/login" className="nav-item nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa-solid fa-user"></i></NavLink>
                            <div className="dropdown-menu m-0">
                                {isAuthenticated && <><Link to="/recipes" className="dropdown-item">Profile</Link>
                                <Link to="/logout" className="dropdown-item">Logout</Link></>}
                                {!isAuthenticated && <><Link to="/login" className="dropdown-item">Login</Link>
                                <Link to="/register" className="dropdown-item">Register</Link></>}
                                {/* TO DO */}
                            </div>
                        </div>
                
                {isAuthenticated && <small>{fullName}</small>}
            </nav>
        </div>
    )
}