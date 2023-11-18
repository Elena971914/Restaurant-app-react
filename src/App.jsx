import { Routes, Route } from "react-router-dom"
import About from './components/About'
import BackToTop from './components/BackToTop'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Navbar from './components/Navbar'
import Services from './components/Services'
import Daily from "./components/Daily"
import HomePage from "./components/HomePage"
import OurTeam from "./components/OurTeam"
import Booking from "./components/Booking"
import Testimonials from "./components/Testimonials"
import Contacts from "./components/Contacts"
import Recipe from "./components/Daily/Recipe"
import NotFound from "./components/NotFound"
import AddNewRecipe from "./components/Daily/AddNewRecipe"

function App() {
  return(
    <div className="container-xxl bg-white p-0">
      {/* <Spinner /> */}
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/about' element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path='/recipes' element={<Daily />} />
        <Route path='/recipes/:id' element={<Recipe />} />
        <Route path='/recipes/new' element={<AddNewRecipe />} />
        <Route path='/testimonials' element={<Testimonials />}/>
        <Route path='/booking' element={<Booking />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path='/team' element={<OurTeam />}/>
        <Route path='*' element={<NotFound />} />
      </Routes>

      <Footer />
      <BackToTop />

    </div>
  )
}

export default App
