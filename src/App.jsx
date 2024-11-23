import { useState, useEffect } from "react";
import FooterComponent from "./components/footer/Footer";
import HeaderComponent from "./components/header/Header";

function App() {
  const [orderCount, setOrderCount] = useState(0); // Shoe order count
  const [currentImage, setCurrentImage] = useState(1); // Main image
  const [currentModalImage, setCurrentModalImage] = useState(1); // Modal image
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [cartDetails, setCartDetails] = useState({ price: 0, quantity: 0 }); // Cart details
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Burger menu state

  // Log cart details for debugging
  useEffect(() => {
    console.log("Cart updated:", cartDetails);
  }, [cartDetails]);

  const handleImageChange = (imageNumber) => {
    setCurrentImage(imageNumber);
    setCurrentModalImage(imageNumber); // Synchronize modal image with the main image
  };

  const handleModalImageChange = (imageNumber) => {
    setCurrentModalImage(imageNumber);
  };

  const handlePrevImage = () => {
    setCurrentImage(currentImage === 1 ? 4 : currentImage - 1);
  };

  const handleNextImage = () => {
    setCurrentImage(currentImage === 4 ? 1 : currentImage + 1);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <HeaderComponent cart={cartDetails} setCart={setCartDetails} />
      <main className="w-full min-h-screen font-serif mb-5">
        <div className="md:py-16 pt-0 flex max-w-6xl flex-col md:flex-row justify-center md:mx-auto">
          {/* Burger Menu for Mobile */}
          <div className="md:hidden flex justify-between w-full px-5">
            <button
              className="text-vdBlue text-3xl"
              onClick={toggleMenu} // Toggle burger menu
            >
              {isMenuOpen ? "X" : "☰"}
            </button>
            {isMenuOpen && (
              <nav className="absolute left-0 right-0 top-16 bg-white shadow-lg p-5 z-50">
                <ul className="space-y-4 text-lg">
                  <li>
                    <a href="#home" className="text-vdBlue">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#shop" className="text-vdBlue">
                      Shop
                    </a>
                  </li>
                  <li>
                    <a href="#about" className="text-vdBlue">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="text-vdBlue">
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            )}
          </div>

          {/* Desktop Image Section */}
          <div className="hidden w-1/2 md:flex flex-col items-center gap-6">
            <img
              src={`/images/photo${currentImage}.jpg`}
              alt={`photo${currentImage}`}
              className="w-96 rounded-xl cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            />
            <div className="flex w-96 justify-between">
              {[1, 2, 3, 4].map((imgNumber) => (
                <img
                  key={imgNumber}
                  src={`/images/ph${imgNumber}.jpg`}
                  alt={`photo${imgNumber}`}
                  className={`w-[85px] rounded-xl hover:opacity-45 cursor-pointer ${
                    currentImage === imgNumber
                      ? "opacity-60 border-4 border-orange-500"
                      : ""
                  }`}
                  onClick={() => handleImageChange(imgNumber)}
                />
              ))}
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div
              className={`w-full h-screen left-0 fixed bg-opacity-90 bg-black flex flex-col gap-5 items-center justify-center z-50 top-0 transition-opacity ${
                isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="w-96 relative">
                <img
                  src="/images/close.svg"
                  alt="close.svg"
                  className="w-5 ms-auto cursor-pointer"
                  onClick={() => setIsModalOpen(false)}
                />
                <img
                  src={`/images/photo${currentModalImage}.jpg`}
                  alt={`photo${currentModalImage}`}
                  className="w-96 rounded-xl cursor-pointer"
                />
                <div className="flex w-96 justify-between mt-3">
                  {[1, 2, 3, 4].map((imgNumber) => (
                    <img
                      key={imgNumber}
                      src={`/images/photo${imgNumber}-thumbnail.jpg`}
                      alt={`photo${imgNumber}`}
                      className={`w-[85px] rounded-xl hover:opacity-45 cursor-pointer ${
                        currentModalImage === imgNumber
                          ? "opacity-60 border-4 border-orange-500"
                          : ""
                      }`}
                      onClick={() => handleModalImageChange(imgNumber)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Product and Cart Section */}
          <div className="flex flex-col px-3 lg:px-0 md:w-1/2 justify-center w-2/3 min-w-[375px] mx-auto">
            <h2 className="uppercase text-dgBlue font-extrabold text-sm tracking-widest mb-3">
              Sneaker Company
            </h2>
            <h1 className="mb-7 text-4xl lg:text-5xl font-extrabold text-vdBlue">
              Fall Limited Edition Sneakers
            </h1>
            <p className="text-dgBlue mb-5">
              These low-profile sneakers are your perfect casual wear companion.
              Featuring a durable rubber outer sole, they’ll withstand
              everything the weather can offer.
            </p>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-vdBlue text-3xl font-extrabold">
                $125.00
              </span>
              <div className="text-center rounded-md w-12 bg-orange-500 text-white text-md">
                50%
              </div>
            </div>
            <p className="text-dgBlue font-bold text-md line-through mb-8">
              $250.00
            </p>
            <div className="flex gap-3 md:flex-row flex-col">
              {/* Quantity Control */}
              <div className="bg-lgBlue flex items-center justify-between p-3 md:w-36 w-full mx-auto md:mx-0 rounded-lg">
                <button
                  onClick={() =>
                    orderCount > 0 && setOrderCount((prev) => prev - 1)
                  }
                  disabled={orderCount === 0} // Disabled when quantity is 0
                >
                  <img
                    src="/images/minus.svg"
                    alt="minus.svg"
                    className="w-3"
                  />
                </button>
                <span className="text-vdBlue font-bold text-lg">
                  {orderCount}
                </span>
                <button onClick={() => setOrderCount((prev) => prev + 1)}>
                  <img src="/images/plus.svg" alt="plus.svg" className="w-3" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                className="bg-orange-500 md:w-52 w-full mx-auto md:mx-0 py-3 flex items-center gap-3 bg-Orange hover:bg-PaleOrange justify-center rounded-lg text-vdBlue font-bold"
                onClick={() => {
                  if (orderCount > 0) {
                    // Add the selected quantity and price to the cart
                    setCartDetails((prevCart) => ({
                      ...prevCart,
                      price: 125 * orderCount, // Dynamically calculate total price
                      quantity: prevCart.quantity + orderCount, // Add to existing quantity
                    }));
                    setOrderCount(0); // Reset the order count after adding to cart
                    alert(`Added ${orderCount} item(s) to your cart!`); // Confirmation alert
                  } else {
                    alert(
                      "Please select at least one item to add to the cart."
                    ); // Alert if no items are selected
                  }
                }}
              >
                <img
                  src="/images/white.svg"
                  alt="white.svg"
                  className="w-5 text-vdBlue"
                />
                <span className="text-white">Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </main>
      <FooterComponent />
    </>
  );
}

export default App;
