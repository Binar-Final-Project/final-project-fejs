import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChoosenFlight } from "../../../../redux/reducers/flight/flightReducers";

import { PiBagSimpleBold } from "react-icons/pi";
import { FiInfo } from "react-icons/fi";
import { useLocation } from "react-router-dom";

export default function OrderSummary() {
  const dispatch = useDispatch();
  const location = useLocation();
  const choosenFlight = useSelector((state) => state.flight.choosenFlight);
  const [showModal, setShowModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [penumpang, setPenumpang] = useState({ dewasa: 0, anak: 0, bayi: 0 });

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

  //Untuk timer
  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}j${hours > 1 ? "" : ""} ${remainingMinutes}m${
      remainingMinutes > 1 ? "" : ""
    }`;
  }


  //Untuk mengetahui penumpang
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const adult = parseInt(query.get("adult")) || 0;
    const child = parseInt(query.get("child")) || 0;
    const infant = parseInt(query.get("infant")) || 0;

    setPenumpang({
      dewasa: adult,
      anak: child,
      bayi: infant,
    });
  }, [location.search]);

  //Untuk menjumlah total tiket yang dipilih
  const calculateTotalPayment = (flight) => {
    let total = 0;
    if (flight && flight.price) {
      if (penumpang.dewasa > 0) {
        total += flight.price * penumpang.dewasa;
      }
      if (penumpang.anak > 0) {
        total += flight.price * penumpang.anak;
      }
      if (penumpang.bayi > 0) {
        total += flight.price * penumpang.bayi;
      }
    }
    return total;
  };
  
  //Untuk menghitung pajak
  const calculateTax = (total) => {
    return total * 0.1;
}


  return (
    <div>
      {choosenFlight.map((flight, index) => (
        <div key={index} className="container bg-white shadow-md rounded p-6 w-full ms-3">
          <div className="col-span-1">
            <div className="flex flex-col border-b border-gray-300 pb-4">
              <div className="bg-[#86B6F6] p-1 text-sm font-medium rounded-lg text-center inline-block w-[4rem]">
              <h1>{index === 0 ? "Pergi" : "Pulang"}</h1>
              </div>
              <div className="text-center p-3">
                <h2 className="text-xl font-semibold mb-0 mr-4 text-[#003285]">
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
              <div className="border border-gray-300 rounded-md p-5 mt-2 mb-3 text-center">
                <p className="font-semibold">
                  {flight.departure_time} - {flight.arrival_time}
                </p>
                <p className="text-gray-500">
                  {flight.departure_code} - {flight.arrival_code}
                </p>
              </div>
            </div>
            <div>
            <div className="bg-white p-4">
              <h4 className="font-semibold  mb-3">Rincian Harga</h4>
              <div className="text-sm flex justify-between">
                <p className="mb-1">Dewasa:</p>
                <p className="mb-1">{penumpang.dewasa > 0 ? `${penumpang.dewasa} x IDR ${flight.price.toLocaleString('id-ID')}` : '0'}</p>
              </div>
              <div className="text-sm flex justify-between">
                <p className="mb-1">Anak:</p>
                <p className="mb-1">{penumpang.anak > 0 ? `${penumpang.anak} x IDR ${flight.price.toLocaleString('id-ID')}` : '0'}</p>
              </div>
              <div className="text-sm flex justify-between">
                <p className="mb-1">Bayi:</p>
                <p className="mb-1">{penumpang.bayi > 0 ? `${penumpang.bayi} x IDR ${flight.price.toLocaleString('id-ID')}` : '0'}</p>
              </div>
              <div className="text-sm flex justify-between">
                <h4 className="mb-1">Pajak (10%)</h4>
                <p className="mb-1">IDR {calculateTax(calculateTotalPayment(flight)).toLocaleString("id-ID")}</p>
              </div>
            </div>

              <div className="flex items-center justify-between mt-4">
                <h4 className="text-sm text-gray-500 font-semibold">Total Pembayaran</h4>
                <p className="font-medium">
                  IDR {(calculateTotalPayment(flight) + calculateTax(calculateTotalPayment(flight))).toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {choosenFlight.length === 2 && (
        <div className="container bg-white shadow-md rounded p-6 w-full ms-3 mt-6">
          <div className="col-span-1">
            <div className="flex flex-col border-b border-gray-300 pb-4">
              <div className="text-center p-3">
                <h2 className="text-lg font-semibold mb-3 mr-4">
                  Total Pembayaran
                </h2>
              </div>
              <div className="flex justify-between text-sm">
                <p>Total Harga untuk Pergi</p>
                <p>IDR {calculateTotalPayment(choosenFlight[0]).toLocaleString('id-ID')}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Total Harga untuk Pulang</p>
                <p>IDR {calculateTotalPayment(choosenFlight[1]).toLocaleString('id-ID')}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Pajak (10%)</p>
                <p>IDR {(calculateTax(calculateTotalPayment(choosenFlight[0])) + calculateTax(calculateTotalPayment(choosenFlight[1]))).toLocaleString('id-ID')}</p>
              </div>
              <div className="flex justify-between font-semibold pt-4 mt-4">
                <p className="text-sm text-gray-500">Total Pembayaran</p>
                <p className="font-medium">
                  IDR {(
                    calculateTotalPayment(choosenFlight[0]) +
                    calculateTotalPayment(choosenFlight[1]) +
                    calculateTax(calculateTotalPayment(choosenFlight[0])) +
                    calculateTax(calculateTotalPayment(choosenFlight[1]))
                  ).toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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
