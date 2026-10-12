import { Routes, Route, NavLink } from "react-router-dom";
import MenuPage from "./features/menu/pages/MenuPage";
import DishDetailPage from "./features/menu/pages/DishDetailPage";
import OrderPage from "./features/menu/pages/OrderPage";

export default function App() {
  return (
    <div>
      <header className="app-header">
        <h1>CampusEats Dashboard</h1>
        <nav className="nav-buttons">
          <NavLink to="/">Menu</NavLink>
          <NavLink to="/order">Place Order</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/dish/:id" element={<DishDetailPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="*" element={<p>404 — Page not found</p>} />
      </Routes>
    </div>
  );
}