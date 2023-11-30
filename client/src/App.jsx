import { Routes, Route } from "react-router-dom"
import About from './components/About'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Navbar from './components/Navbar'
import Daily from "./components/Daily"
import HomePage from "./components/HomePage"
import Booking from "./components/Booking"
import Testimonials from "./components/Testimonials/Testimonials"
import Contacts from "./components/Contacts"
import Recipe from "./components/Daily/Recipe"
import NotFound from "./components/NotFound"
import AddNewRecipe from "./components/Daily/AddNewRecipe"
import Login from "./components/Authentication/login"
import Register from "./components/Authentication/register"
import Logout from "./components/Authentication/Logout"
import { UserProvider } from "./contexts/UserContext"

function App() {
  return(
    <UserProvider>
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
        <Route path='/testimonials' element={<Testimonials />} />
        <Route path='/booking' element={<Booking />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/logout' element={<Logout />}/>
        <Route path='*' element={<NotFound />} />
      </Routes>

      <Footer />

    </div>
    </UserProvider>
  )
}

export default App
