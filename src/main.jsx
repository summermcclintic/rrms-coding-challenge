import { createRoot } from 'react-dom/client'
import './index.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartsPage from "./pages/CartsPage";
import Example from "./pages/Example";
// import Testing from "./pages/Testing";

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      	<Router>
          	<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/products" element={<ProductsPage />} />
				<Route path="/carts" element={<CartsPage />} />
				<Route path="/example" element={<Example />} />
				{/* <Route path="/testing" element={<Testing />} /> */}
          	</Routes>
      	</Router>
  	</React.StrictMode>
)
