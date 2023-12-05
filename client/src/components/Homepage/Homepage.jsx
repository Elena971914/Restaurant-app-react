import Welcome from "../Welcome/Welcome"
import About from "../About/About"
import Menu from "../Menu/Menu/Menu"
import Daily from "../Daily/Daily/Daily"
import Booking from "../Booking/Booking/Booking"
import BackToTop from "../BackToTop"

export default function HomePage() {
    return(
    <>
    <Welcome />
    <About />
    <Menu />
    <Booking />
    <Daily />
    <BackToTop />
    </>)
}