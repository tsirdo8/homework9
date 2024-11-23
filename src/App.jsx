import { useState, useEffect } from "react";
import FooterComponent from "./components/footer/Footer";
import HeaderComponent from "./components/header/Header";

function App() {
  const [orderCount, setOrderCount] = useState(0); // Shoe order count
  const [currentImage, setCurrentImage] = useState(1); // Main image
  const [currentModalImage, setCurrentModalImage] = useState(1); // Modal image
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [cartDetails, setCartDetails] = useState({ price: 0, quantity: 0 }); // Cart details

  // Log cart details for debugging
  useEffect(() => {
    console.log("Cart updated:", cartDetails);
  }, [cartDetails]);

  return (
    <>
      <HeaderComponent cart={cartDetails} setCart={setCartDetails} />
      <main className="w-full min-h-screen font-serif mb-5">
        <div className="md:py-16 pt-0 flex max-w-6xl flex-col md:flex-row justify-center md:mx-auto">
          {/* Desktop Image Section */}
          <div className="hidden w-1/2 md:flex flex-col items-center gap-6">
            <img
              src={`/images/photo${currentImage}.jpg`}
              alt={`photo${currentImage}.jpg`}
              className="w-96 rounded-xl cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            />
            <div className="flex w-96 justify-between">
              {[1, 2, 3, 4].map((imgNumber) => (
                <img
                  key={imgNumber}
                  src={`/images/ph${imgNumber}.jpg`}
                  alt={`photo${imgNumber}.jpg`}
                  className={`w-[85px] rounded-xl hover:opacity-45 cursor-pointer ${
                    currentImage === imgNumber
                      ? "opacity-60 border-4 border-orange-500"
                      : ""
                  }`}
                  onClick={() => setCurrentImage(imgNumber)}
                />
              ))}
            </div>
          </div>

          {/* Mobile Image Carousel */}
          <div className="md:hidden w-2/3 min-w-[375px] mx-auto relative mb-6">
            <img
              src={`/images/photo${currentImage}.jpg`}
              alt={`photo${currentImage}.jpg`}
              className="w-full"
            />
            <div
              className="w-12 h-12 bg-white absolute left-0 ms-3 rounded-full flex items-center justify-center cursor-pointer top-1/2 -translate-y-1/2"
              onClick={() =>
                currentImage === 1
                  ? setCurrentImage(4)
                  : setCurrentImage((prev) => prev - 1)
              }
            >
              <img
                src="/images/previous.svg"
                alt="previous.svg"
                className="w-3"
              />
            </div>
            <div
              className="w-12 h-12 bg-white absolute right-0 top-1/2 -translate-y-1/2 me-3 rounded-full flex items-center justify-center cursor-pointer"
              onClick={() =>
                currentImage === 4
                  ? setCurrentImage(1)
                  : setCurrentImage((prev) => prev + 1)
              }
            >
              <img src="/images/next.svg" alt="next.svg" className="w-3" />
            </div>
          </div>

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
              {/* Add to Cart */}
              <button
                className="bg-orange-500 md:w-52 w-full mx-auto md:mx-0 py-3 flex items-center gap-3 bg-Orange hover:bg-PaleOrange justify-center rounded-lg text-vdBlue font-bold"
                onClick={() => {
                  if (orderCount > 0) {
                    setCartDetails((prevCart) => ({
                      ...prevCart,
                      price: 125 * orderCount, // Calculate total price dynamically
                      quantity: prevCart.quantity + orderCount, // Add to existing quantity
                    }));
                    setOrderCount(0); // Reset the order count after adding to cart
                  } else {
                    alert(
                      "Please select at least one item to add to the cart."
                    );
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

        {/* Modal */}
        {isModalOpen && (
          <div className="w-full h-screen left-0 fixed bg-opacity-90 bg-black flex flex-col gap-5 items-center justify-center z-50 top-0 ">
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
                    src={`/images/ph${imgNumber}.jpg`}
                    alt={`photo${imgNumber}`}
                    className={`w-[85px] rounded-xl hover:opacity-45 cursor-pointer ${
                      currentModalImage === imgNumber
                        ? "opacity-60 border-4 border-orange-500"
                        : ""
                    }`}
                    onClick={() => setCurrentModalImage(imgNumber)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <FooterComponent />
    </>
  );
}

export default App;
