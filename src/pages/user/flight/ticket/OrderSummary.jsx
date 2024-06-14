import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChoosenFlight } from "../../../../redux/reducers/flight/flightReducers";

import { PiBagSimpleBold } from "react-icons/pi";
import { FiInfo } from "react-icons/fi";

export default function OrderSummary() {
  const dispatch = useDispatch();
  const choosenFlight = useSelector((state) => state.flight.choosenFlight);
  const [showModal, setShowModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  // Fungsi untuk menampilkan atau menyembunyikan modal dan mengatur penerbangan yang dipilih
  const toggleModal = (flight) => {
    setSelectedFlight(flight);
    setShowModal(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Fungsi untuk memilih penerbangan
  const chooseFlight = (flight) => {
    dispatch(setChoosenFlight(flight)); // Memilih penerbangan
    setSelectedFlight(flight); // Mengatur penerbangan yang dipilih
    toggleModal(flight); // Menampilkan modal dengan penerbangan yang dipilih
  };

  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}j${hours > 1 ? "" : ""} ${remainingMinutes}m${
      remainingMinutes > 1 ? "" : ""
    }`;
  }

  const calculateTaxPrice = () => {
    if (!choosenFlight || choosenFlight.length === 0) {
      return 0;
    }
    const totalPrice = choosenFlight.reduce((total, flight) => {
      return total + flight.price;
    }, 0);
    const taxPrice = totalPrice * 0.1;

    return taxPrice;
  };

  const calculateTotalPrice = () => {
    return choosenFlight.reduce((total, flight) => {
      return total + flight.price;
    }, 0);
  };

  const calculateTotalPriceWithTax = () => {
    const totalPrice = calculateTotalPrice();
    const taxPrice = calculateTaxPrice();
    const totalPriceWithTax = totalPrice + taxPrice;

    return totalPriceWithTax;
  };

  return (
    <div>
      {choosenFlight.map((flight, index) => (
        <div key={index} className="bg-white shadow-md rounded p-6 mb-4">
          <div className="flex flex-col border-b border-gray-300 pb-4">
            <div className="text-center p-3">
              <h2 className="text-xl font-bold mb-0 mr-4">
                {flight.departure_city} → {flight.arrival_city}
              </h2>
            </div>
            <div className="text-gray-500 justify-between flex">
              <p>{flight.flight_date}</p>
              <a
                href="#"
                className="text-blue-500 font-semibold hover:text-blue-700"
                onClick={(e) => {
                  e.preventDefault();
                  toggleModal(flight);
                }}
              >
                Detail
              </a>
            </div>
            <div className="border border-gray-300 rounded-md p-3 mt-2 text-center">
              <p className="font-bold">
                {flight.departure_time} - {flight.arrival_time}
              </p>
              <p className="text-gray-500">
                {flight.departure_code} - {flight.arrival_code}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <h4 className="text-sm text-gray-500 font-semibold">
              Total Pembayaran
            </h4>
            <p className="font-medium">IDR {calculateTotalPriceWithTax()}</p>
          </div>
        </div>
      ))}

      {/* Modal */}
      {showModal && selectedFlight && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 text-[#003285] font-semibold"
                      id="modal-headline"
                    >
                      Detail Penerbangan
                    </h3>
                    <div className="flex flex-row gap-3">
                      <div className="flex flex-col justify-between items-center">
                        <div className="flex flex-col text-center mt-1.5">
                          <time className="mb-1 text-lg font-semibold leading-none">
                            {selectedFlight?.departure_time}
                          </time>
                          <div className="text-sm">
                            {new Date(
                              selectedFlight?.flight_date
                            ).toLocaleString("id-ID", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                        <div className="pt-12">
                          <span className="text-sm">
                            <time>
                              {formatDuration(selectedFlight?.duration)}
                            </time>
                          </span>
                        </div>
                        <div></div>
                        <div className="flex flex-col text-center mt-1.5">
                          <time className="mb-1 text-lg font-semibold leading-none">
                            {selectedFlight?.arrival_time}
                          </time>
                          <div className="text-sm">
                            {new Date(
                              selectedFlight?.flight_date
                            ).toLocaleString("id-ID", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div>
                        <ol className="relative border-s border-gray-200">
                          <li className="mb-5 ms-4">
                            <div className="absolute w-3 h-3 bg-[#2A629A] rounded-full mt-1.5 -start-1.5 border border-white"></div>
                            <h3 className="text-lg font-semibold">
                              {selectedFlight?.departure_city} (
                              {selectedFlight?.departure_code})
                            </h3>
                            <p className="text-sm">
                              {selectedFlight?.departure_airport}
                            </p>
                            <p className="mb-4 text-sm">
                              {selectedFlight?.departure_terminal}
                            </p>
                          </li>
                          <li className="mb-5 ms-4 border border-gray-300 rounded-lg p-4">
                            <div className="border-b">
                              <div className="flex items-center">
                                <p>{selectedFlight?.airline_name}</p>
                                <img
                                  src={selectedFlight?.airline_icon_url}
                                  className="h-8 ml-2"
                                  alt="Airline Logo"
                                />
                              </div>
                              <div className="text-sm">
                                <span>{selectedFlight?.class}</span>
                              </div>
                            </div>
                            <div className="flex gap-5 md:gap-20 my-3 flex-col md:flex-row">
                              {selectedFlight?.baggage ? (
                                <div className="flex gap-3">
                                  <div>
                                    <PiBagSimpleBold className="text-xl" />
                                  </div>
                                  <div className="gap-1 flex flex-col">
                                    <p className="text-sm">
                                      Kabin : {selectedFlight?.cabin_baggage} kg
                                    </p>
                                    <p className="text-sm">
                                      Bagasi : {selectedFlight?.free_baggage} kg
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              <div className="flex gap-3">
                                <div>
                                  <FiInfo className="text-xl" />
                                </div>
                                <div>
                                  <p className="text-sm">
                                    {selectedFlight?.airplane_model}
                                  </p>
                                  <p className="text-sm">
                                    {selectedFlight?.flight_entertaiment
                                      ? "Hiburan di pesawat"
                                      : ""}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="ms-4">
                            <div className="absolute w-3 h-3 bg-[#2A629A] rounded-full mt-1.5 -start-1.5 border border-white"></div>
                            <h3 className="text-lg font-semibold">
                              {selectedFlight?.arrival_city} (
                              {selectedFlight?.arrival_code})
                            </h3>
                          </li>
                        </ol>

                        <div className="ms-4">
                          <p className="text-sm">
                            {selectedFlight?.arrival_airport}
                          </p>
                          <p className="text-sm">
                            {selectedFlight?.arrival_terminal}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeModal}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#2A629A] text-base font-medium text-white duration-300 hover:bg-[#003285] active:bg-[#003285] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
