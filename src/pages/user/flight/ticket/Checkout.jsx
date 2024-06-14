import React, { useEffect, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { getTicket } from "../../../../redux/actions/ticket/ticketActions";
import OrderSummary from "./OrderSummary";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Modal from "react-modal";
import "../../../../index.css";

export default function TicketCheckout() {
  const dispatch = useDispatch();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const adult = parseInt(query.get("adult"));
  const child = parseInt(query.get("child"));
  const infant = parseInt(query.get("infant"));

  const { token } = useSelector((state) => state.login);
  const { choosenFlight } = useSelector((state) => state.flight);
  console.log(choosenFlight);

  //State untuk tanggal
  const [date, setDate] = useState(null);

  //state untuk modal
  const [openModal, setOpenModal] = useState(false);
  const [penumpang, setPenumpang] = useState({
    dewasa: adult,
    anak: child,
    bayi: infant,
  });
  console.log(penumpang);

  //State untuk form
  const [orderer, setOrderer] = useState({
    name: "",
    family_name: "",
    phone_number: "",
    email: "",
  });
  console.log("nama: ", orderer);

  const [passengers, setPassengers] = useState([
    {
      title: "",
      name: "",
      email: "",
      passenger_type: "adult",
      phone_number: "",
      date_of_birth: "",
      nationality: "",
      identity_number: "",
      issuing_country: "",
      valid_until: "",
    },
  ]);

  // State untuk melacak apakah data sudah disimpan
  const [isDataSaved, setIsDataSaved] = useState(false);

  //reff untuk ke button lanjut pembayaran
  const orderSummaryRef = useRef(null);

  //Handler untuk mengupdate state ordered
  const handleOrdererChange = (e) => {
    setOrderer({
      ...orderer,
      [e.target.name]: e.target.value,
    });
  };

  //Handler untuk mengupdate state passengers
  const handlePassengerChange = (index, e) => {
    const newPassengers = [...passengers];
    newPassengers[index][e.target.name] = e.target.value;
    setPassengers(newPassengers);
  };

  //Handler untuk tanggal lahir dan berlaku sampai
  const handleDateChange = (index, name, date) => {
    const newPassengers = [...passengers];
    newPassengers[index][name] = date[0];
    setPassengers(newPassengers);
  };

  //Handler untuk validasi form
  const validateForm = () => {
    if (!orderer.name || !orderer.email || !orderer.phone_number) {
      return false;
    }

    for (let passenger of passengers) {
      if (
        !passenger.name ||
        !passenger.date_of_birth ||
        !passenger.nationality ||
        !passenger.identity_number ||
        !passenger.issuing_country ||
        !passenger.valid_until
      ) {
        return false;
      }
    }

    return true;
  };

  //Handler untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const flightIds = choosenFlight.map((flight) => flight.flight_id);
      dispatch(
        getTicket(
          [flightIds],
          penumpang.dewasa,
          penumpang.anak,
          penumpang.bayi,
          orderer,
          passengers
        )
      );
      toast.success(
        "Data anda berhasil disimpan, Silahkan lanjutkan pembayaran"
      );
      setIsDataSaved(true);
      // Setelah menyimpan, mengarah ke tombol "Lanjut Pembayaran"
      if (orderSummaryRef.current) {
        orderSummaryRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      toast.error("Harap lengkapi semua data");
    }
  };

  return (
    <div className="bg-[#FFF0DC] p-3">
      <Toaster />
      {/* Countdown Bar */}
      <div className="bg-red-500 text-center py-2 text-white font-bold">
        Selesaikan dalam 00.15.00 sebelum tiket kamu hangus!
      </div>

      {/* Menampilkan modal untuk kembali */}
      <div className="lg:w-1/12 mt-5">
        <div
          className="flex font-medium items-center text-[#003285] hover:text-[#40A2E3] cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          <IoIosArrowBack className="text-3xl" />
          <h6 className="text-lg">Kembali</h6>
        </div>
      </div>
      <Modal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        contentLabel="Konfirmasi Kembali"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Apakah kamu yakin ingin keluar?
          </h3>
          <div className="flex justify-center gap-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => {
                setOpenModal(false);
                window.location.href = "/";
              }}
            >
              Ya, saya yakin
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              onClick={() => setOpenModal(false)}
            >
              Tidak
            </button>
          </div>
        </div>
      </Modal>

      <form onSubmit={handleSubmit}>
        <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-2">
            {/* Data Akun */}
            <div className="bg-white shadow-md rounded p-6">
              <h2 className="text-xl font-bold mb-4">Data Diri Pemesan</h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={orderer.name}
                  onChange={handleOrdererChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="text-gray-700 mr-2">
                  Punya Nama Keluarga?
                </label>
                <input
                  type="checkbox"
                  name="family_name"
                  checked={orderer.family_name}
                  onChange={handleOrdererChange}
                  className="toggle toggle-accent"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={orderer.email}
                  onChange={handleOrdererChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="contoh@gmail.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">No Telephone</label>
                <input
                  type="text"
                  name="phone_number"
                  value={orderer.phone_number}
                  onChange={handleOrdererChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Data Tiket 1 */}
            <div className="bg-white shadow-md rounded p-6 mt-6">
              <h2 className="text-xl font-bold mb-4">Isi Data Penumpang</h2>
              {passengers.map((passenger, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-gray-700 mb-2">Title</label>
                  <div className="relative mb-4">
                    <select
                      name="title"
                      value={passenger.title}
                      onChange={(e) => handlePassengerChange(index, e)}
                      className="appearance-none w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white text-gray-700 py-2 pl-3 pr-10"
                    >
                      <option>Tuan</option>
                      <option>Nyonya</option>
                      <option>Nona</option>
                    </select>
                    <span className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-6 w-6 text-gray-400"
                      >
                        <path
                          d="M10 12.586L4.707 7.293a1 1 0 011.414-1.414L10 10.758l4.879-4.879a1 1 0 111.414 1.414L10 12.586z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={passenger.name}
                      onChange={(e) => handlePassengerChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="contoh@gmail.com"
                      value={passenger.email}
                      onChange={(e) => handlePassengerChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">No Telp</label>
                    <input
                      type="text"
                      name="phone_number"
                      value={passenger.phone_number}
                      onChange={(e) => handlePassengerChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Tanggal Lahir
                    </label>
                    <Flatpickr
                      value={passenger.date_of_birth}
                      onChange={(date) =>
                        handleDateChange(index, "date_of_birth", date)
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      placeholder="dd-mm-yyyy"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Kewarganegaraan
                    </label>
                    <input
                      type="text"
                      name="nationality"
                      value={passenger.nationality}
                      onChange={(e) => handlePassengerChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      KTP/Paspor
                    </label>
                    <input
                      type="number"
                      name="identity_number"
                      value={passenger.identity_number}
                      onChange={(e) => handlePassengerChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Negara Penerbit
                    </label>
                    <input
                      type="text"
                      name="issuing_country"
                      value={passenger.issuing_country}
                      onChange={(e) => handlePassengerChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Berlaku Sampai
                    </label>
                    <Flatpickr
                      value={passenger.valid_until}
                      onChange={(date) =>
                        handleDateChange(index, "valid_until", date)
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      placeholder="dd-mm-yyyy"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-span-1" ref={orderSummaryRef}>
            <OrderSummary />
            {isDataSaved && (
              <button className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Lanjut Pembayaran
              </button>
            )}
          </div>
        </div>
        <div className="mb-4 ms-5">
          <button
            type="submit"
            className="w-64 bg-[#2A629A] text-white text-sm p-2 rounded-xl focus:outline-none transition-colors duration-300 hover:bg-[#003285] active:bg-[#003285]"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
