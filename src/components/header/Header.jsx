import React, { useState } from "react";

const Header = ({ cart }) => {
  const navLinks = ["Collections", "Men", "Women", "About", "Contact"];
  const [showCart, setShowCart] = useState(false);

  return (
    <header className="border-b border-gray-300 py-4">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6">
        <div className="flex items-center">
          <img src="/images/logo.svg" alt="Logo" className="w-36" />
          <ul className="hidden md:flex ml-10 gap-6">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setShowCart((prev) => !prev)}
            className="relative"
          >
            <img src="/images/cart.svg" alt="Cart" className="w-6" />
            {cart.quantity > 0 && (
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.quantity}
              </span>
            )}
          </button>
          <img
            src="/images/pic.png"
            alt="Profile"
            className="w-10 h-10 ml-6 rounded-full"
          />
        </div>
      </nav>
      {showCart && (
        <div className="absolute top-16 right-6 bg-white shadow-lg p-4 rounded-lg">
          <h2 className="font-bold mb-2">Cart</h2>
          {cart.quantity > 0 ? (
            <>
              <p>
                <strong>Price:</strong> ${cart.price.toFixed(2)}
              </p>
              <p>
                <strong>Quantity:</strong> {cart.quantity}
              </p>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
