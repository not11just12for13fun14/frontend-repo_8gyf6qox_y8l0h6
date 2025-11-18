import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import CustomRequest from './pages/CustomRequest'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar />
      <main id="content" className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:pt-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:slug" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/custom-request" element={<CustomRequest />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
