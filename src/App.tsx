import { HashRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from './store'
import { ReservationProvider } from './reservationStore'
import Layout from './components/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Dish from './pages/Dish'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Tables from './pages/Tables'

export default function App() {
  return (
    <CartProvider>
      <ReservationProvider>
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="dish/:id" element={<Dish />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="about" element={<About />} />
              <Route path="tables" element={<Tables />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </HashRouter>
      </ReservationProvider>
    </CartProvider>
  )
}
