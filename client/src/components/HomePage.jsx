import Welcome from "./Welcome"
import About from "./About"
import Menu from "./Menu"
import Daily from "./Daily"
import Booking from "./Booking/Booking"
import BackToTop from "./BackToTop"

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