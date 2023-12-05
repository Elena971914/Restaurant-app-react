import { Routes, Route } from "react-router-dom"
import About from './components/About'
import Footer from './components/Footer'
import Menu from './components/Menu/Menu/Menu'
import Navbar from './components/Navbar'
import Daily from "./components/Daily/Daily/Daily"
import Recipe from "./components/Daily/Recipe/Recipe"
import AddNewRecipe from "./components/Daily/AddNewRecipe/AddNewRecipe"
import HomePage from "./components/HomePage"
import Booking from "./components/Booking/Booking/Booking"
import Testimonials from "./components/Testimonials/Testimonials"
import Contacts from "./components/Contacts"
import NotFound from "./components/NotFound"
import Login from "./components/Authentication/login"
import Register from "./components/Authentication/register"
import Logout from "./components/Authentication/Logout"
import Profile from "./components/Profile/Profile"
import { UserProvider } from "./contexts/UserContext"
import EditRecipe from "./components/Daily/EditRecipe/editRecipe"

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
        <Route path='/recipes/:id/edit' element={<EditRecipe />} />
        <Route path='/recipes/new' element={<AddNewRecipe />} />
        <Route path='/testimonials' element={<Testimonials />} />
        <Route path='/booking' element={<Booking />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/logout' element={<Logout />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='*' element={<NotFound />} />
      </Routes>

      <Footer />

    </div>
    </UserProvider>
  )
}

export default App
