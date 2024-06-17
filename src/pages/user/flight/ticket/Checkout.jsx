import React, { useEffect, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { getTicket } from "../../../../redux/actions/ticket/ticketActions";
import OrderSummary from "./OrderSummary";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Modal from "react-modal";
import "../../../../index.css";
import Navbar from "../../../../assets/components/navigations/navbar/Navbar";
import Footer from "../../../../assets/components/navigations/Footer";
import NavbarMobile from "../../../../assets/components/navigations/navbar/Navbar-mobile";
import { useMediaQuery } from "react-responsive";
import BtnScrollTop from "../../../../assets/components/BtnScrollUp";
import { setChoosenFlight } from "../../../../redux/reducers/flight/flightReducers";


export default function TicketCheckout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const query = new URLSearchParams(location.search);
  const adult = parseInt(query.get("adult"));
  const child = parseInt(query.get("child"));
  const infant = parseInt(query.get("infant"));
  const orderSummaryRef = useRef(null);

  
  const { choosenFlight } = useSelector((state) => state.flight);
  const { token } = useSelector((state) => state.login);
  const [isChecked, setIsChecked] = useState(false);
  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(0);
  const [timeUpModal, setTimeUpModal] = useState (false);
  const [isDataSaved, setIsDataSaved] = useState(false);

  //State untuk tanggal
  const [date, setDate] = useState(null);

  //state untuk modal
  const [openModal, setOpenModal] = useState(false);
  const [penumpang, setPenumpang] = useState({
    dewasa: adult,
    anak: child,
    bayi: infant,
  });

  //State untuk form
  const [orderer, setOrderer] = useState({
    name: "",
    family_name: "",
    phone_number: "",
    email: "",
  });

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

  //untuk toogle nama keluarga
  const handleToogle = () => {
    setIsChecked(!isChecked);
  };

  //Handler untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const flightIds = choosenFlight.map((flight) => flight.flight_id);
      dispatch(
        getTicket(
          flightIds,
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
      if (orderSummaryRef.current) {
        orderSummaryRef.current.scrollIntoView({ behavior: "smooth" });
      }   
    } else {
      toast.error("Harap lengkapi semua data");
    }
  };

  const handleLanjutPembayaran = () => {
    navigate("/payment");
  };

  //Timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          setTimeUpModal(true)
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds, navigate]);

  //Modal Timer
  const closeTimeUpModal = () => {
    setTimeUpModal(false);
    navigate("/hasil-pencarian");
  };


  return (
    <div className="bg-[#FFF0DC] pt-20">
      {isMobile ? <NavbarMobile /> : <Navbar />}
      <Toaster />
      <div className="p-3 my-10 pt-8">
        {/* Menampilkan modal waktu habis */}
        <Modal 
        isOpen={timeUpModal}
        onRequestClose={() => setTimeUpModal(false)}
        contentLabel="Waktu Habis"
        className="custom-modal"
        overlayClassName="custom-overlay"
        >
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-[#2A629A]">
              Waktu telah berakhir!
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  closeTimeUpModal(false);
                  window.location.href = "/";
                  dispatch(setChoosenFlight([]));
                }}
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </Modal>

      <div className="p-3">
        {/* Countdown Bar */}
        <div className="bg-red-500 text-center py-2 text-white font-bold">
          Selesaikan dalam {minutes}:{seconds < 10 ? `0${seconds}` : seconds} sebelum tiket kamu hangus!
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
                  dispatch(setChoosenFlight([]));
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
                <h2 className="text-xl font-semibold mb-4 text-[#003285]">Data Diri Pemesan</h2>
                <div className="mb-4">
                  <label className="block text-[#2A629A] mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={orderer.name}
                    onChange={handleOrdererChange}
                    className="w-full p-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus-within:border-[#2A629A] text-[#2A629A]"
                    required
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <label className="text-[#2A629A] mr-2">
                    Punya Nama Keluarga?
                  </label>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="family_name"
                      checked={isChecked}
                      onChange={handleToogle}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block text-[#2A629A] mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={orderer.email}
                    onChange={handleOrdererChange}
                    className="w-full p-2 border border-gray-300 rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none  text-[#2A629A]"
                    placeholder="contoh@gmail.com"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#2A629A] mb-2">
                    No Telephone
                  </label>
                  <input
                    type="text"
                    name="phone_number"
                    value={orderer.phone_number}
                    onChange={handleOrdererChange}
                    className="w-full p-2 border border-gray-300 rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none text-[#2A629A]"
                    required
                  />
                </div>
              </div>

              {/* Data Tiket 1 */}
              <div className="bg-white shadow-md rounded p-6 mt-6">
                <h2 className="text-xl font-bold mb-4 text-[#003285]">Isi Data Penumpang</h2>
                {passengers.map((passenger, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-[#2A629A] mb-2">Title</label>
                    <div className="relative mb-4">
                      <select
                        name="title"
                        value={passenger.title}
                        onChange={(e) => handlePassengerChange(index, e)}
                        className="appearance-none w-full p-2 border border-gray-300 rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none  text-[#2A629A] py-2 pl-3 pr-10"
                      >
                        <option className="text-[#2A629A]">Tuan</option>
                        <option className="text-[#2A629A]">Nyonya</option>
                        <option className="text-[#2A629A]">Nona</option>
                      </select>
                      <span className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-6 w-6 text-[#2A629A]"
                        >
                          <path
                            d="M10 12.586L4.707 7.293a1 1 0 011.414-1.414L10 10.758l4.879-4.879a1 1 0 111.414 1.414L10 12.586z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="mb-4">
                      <label className="block text-[#2A629A] mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={passenger.name}
                        onChange={(e) => handlePassengerChange(index, e)}
                        className="w-full p-2 border border-gray-300 rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none text-[#2A629A]"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-[#2A629A] mb-2">Email</label>
                      <input
                        type="text"
                        name="email"
                        placeholder="contoh@gmail.com"
                        value={passenger.email}
                        onChange={(e) => handlePassengerChange(index, e)}
                        className="w-full p-2 border border-gray-300 rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none text-[#2A629A]"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-[#2A629A] mb-2">
                        No Telp
                      </label>
                      <input
                        type="text"
                        name="phone_number"
                        value={passenger.phone_number}
                        onChange={(e) => handlePassengerChange(index, e)}
                        className="w-full p-2 border border-gray-300 rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none text-[#2A629A]"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-[#2A629A] mb-2">
                        Tanggal Lahir
                      </label>
                      <Flatpickr
                        value={passenger.date_of_birth}
                        onChange={(date) =>
                          handleDateChange(index, "date_of_birth", date)
                        }
                        className="w-full p-2 border border-gray-300 rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none  text-[#2A629A]"
                        placeholder="dd-mm-yyyy"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-[#2A629A] mb-2">
                        Kewarganegaraan
                      </label>
                      <input
                        type="text"
                        name="nationality"
                        value={passenger.nationality}
                        onChange={(e) => handlePassengerChange(index, e)}
                        className="w-full p-2 border border-gray-300 rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none  text-[#2A629A]"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-[#2A629A] mb-2">
                        KTP/Paspor
                      </label>
                      <input
                        type="number"
                        name="identity_number"
                        value={passenger.identity_number}
                        onChange={(e) => handlePassengerChange(index, e)}
                        className="w-full p-2 border border-gray-300 rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none text-[#2A629A]"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-[#2A629A] mb-2">
                        Negara Penerbit
                      </label>
                      <input
                        type="text"
                        name="issuing_country"
                        value={passenger.issuing_country}
                        onChange={(e) => handlePassengerChange(index, e)}
                        className="w-full p-2 border border-gray-300 rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none  text-[#2A629A]"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-[#2A629A] mb-2">
                        Berlaku Sampai
                      </label>
                      <Flatpickr
                        value={passenger.valid_until}
                        onChange={(date) =>
                          handleDateChange(index, "valid_until", date)
                        }
                        className="w-full p-2 border border-gray-300 rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none text-[#2A629A]"
                        placeholder="dd-mm-yyyy"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5">
            <button
              type="submit"
              className="w-full bg-[#2A629A] text-white text-sm p-2 rounded-xl focus:outline-none transition-colors duration-300 hover:bg-[#003285] active:bg-[#003285]"
            >
              Simpan
            </button>
          </div>
            </div>

            {/* Order Summary */}
            <div className="col-span-1" ref={orderSummaryRef}>
              <OrderSummary />
              {isDataSaved && (
                <button
                  onClick={handleLanjutPembayaran}
                  className="mt-4 ms-3 w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Lanjut Pembayaran
                </button>
              )}
            </div>
          </div>
          
        </form>
      </div>
      {isMobile ? "" : <BtnScrollTop />}
      <Footer />
    </div>
  );
}
