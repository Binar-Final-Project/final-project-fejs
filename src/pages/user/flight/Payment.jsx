import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiErrorCircle } from "react-icons/bi";
import { RxCrossCircled } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../../../assets/components/navigations/navbar/Navbar";
import Footer from "../../../assets/components/navigations/Footer";
import NavbarMobile from "../../../assets/components/navigations/navbar/Navbar-mobile";
import {
  setCardNumber,
  setCardHolderName,
  setCardHolderNameTouched,
  setCvv,
  setExpiryDate,
  setSelectedMethod,
  setIsDropdownOpen,
  setSelectedMonth,
  setSelectedYear,
  clearError,
} from "../../../redux/reducers/flight/paymentReducers";
import {
  processPayment,
  resetPaymentState,
} from "../../../redux/actions/flight/paymentActions";
import BookingSummary from "./BookingSummary";
import BRILogo from "../../../assets/images/bri-logo.png";
import BNILogo from "../../../assets/images/bni-logo.png";
import MandiriLogo from "../../../assets/images/mandiri-logo.png";
import BCALogo from "../../../assets/images/bca-logo.png";
import VisaLogo from "../../../assets/images/visa-logo.png";
import MastercardLogo from "../../../assets/images/mastercard-logo.png";
import PayPalLogo from "../../../assets/images/paypal-logo.png";

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const {
    card_number,
    card_holder_name,
    isCardHolderNameTouched,
    cvv,
    isLoading,
    selectedMethod,
    isDropdownOpen,
    selectedMonth,
    selectedYear,
  } = useSelector((state) => state.payment); // Menggunakan useSelector untuk mengambil state payment dari reducers
  const { ticket } = useSelector((state) => state.ticket);

  // Untuk membersihkan state ketika komponen di-refresh
  useEffect(() => {
    return () => {
      dispatch(resetPaymentState());
    };
  }, [dispatch]);

  // Fungsi untuk menangani perubahan input nama
  const handleCardHolderNameChange = (event) => {
    dispatch(clearError());
    dispatch(setCardHolderName(event.target.value)); // Memastikan ini mengatur nilai nama pemegang kartu ke dalam Redux state
    if (!isCardHolderNameTouched) {
      dispatch(setCardHolderNameTouched(true));
    }
  };

  // Fungsi untuk menangani fokus input nama
  const handleCardHolderNameFocus = () => {
    if (!isCardHolderNameTouched) {
      dispatch(setCardHolderNameTouched(true));
    }
  };

  // Fungsi untuk menangani blur input nama
  const handleCardHolderNameBlur = () => {
    if (card_holder_name === "") {
      dispatch(setCardHolderNameTouched(false));
    }
  };

  const handleMethodChange = (payment_method) => {
    if (selectedMethod === payment_method) {
      dispatch(setIsDropdownOpen(!isDropdownOpen));
    } else {
      dispatch(setSelectedMethod(payment_method)); // Mengatur selectedMethod ke payment_method yang dipilih
      dispatch(setIsDropdownOpen(true));
      // Reset input saat berpindah metode pembayaran
      dispatch(setCardNumber(""));
      dispatch(setCardHolderName(""));
      dispatch(setCvv(""));
      dispatch(setExpiryDate(""));
      dispatch(setSelectedMonth(""));
      dispatch(setSelectedYear(""));
    }
  };

  // Fungsi untuk menghasilkan opsi tahun
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 10; i++) {
      years.push(currentYear + i);
    }
    return years;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !card_number ||
      !card_holder_name ||
      !cvv ||
      !selectedMonth ||
      !selectedYear
    ) {
      toast.error("Harap isi semua field terlebih dahulu.", {
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
        },
        position: "top-center", // Posisi toast
        duration: 4000, // Durasi toast
      });
      return;
    }
    const expiry_date = `${selectedMonth}/${selectedYear.toString().slice(2)}`; // Format tanggal kedaluwarsa
    const paymentData = {
      booking_code: ticket.booking_code,
      payment_method: selectedMethod,
      card_number: card_number.replace(/\s/g, ""),
      card_holder_name,
      cvv,
      expiry_date,
    };
    console.log("Cek data pembayaran: ", paymentData); // Menampilkan data inputan pengguna
    dispatch(processPayment(paymentData, navigate)); // Mengirim data pembayaran ke proses pembayaran di actions
  };

  // Validasi nomor kartu kredit
  const validateCardNumber = (number) =>
    /^[0-9]{16}$/.test(number.replace(/\s/g, ""));

  // Validasi CVV
  const validateCvv = (cvv) => /^[0-9]{3,4}$/.test(cvv);

  // Validasi tanggal kedaluwarsa
  const validateExpiryDate = (date) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(date);

  const handleNumberInput = (event) => {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); // Mencegah input karakter selain angka
    }
  };

  const formatCardNumber = (number) => {
    return number
      .replace(/\s?/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim(); // Format nomor kartu kredit dengan spasi setiap 4 digit
  };

  const handleInputChange = (e, setter) => {
    const value = e.target.value.replace(/\D/g, ""); // Menghapus karakter non-digit
    const formattedValue = formatCardNumber(value); // Format nomor kartu
    dispatch(setter(formattedValue));
  };

  // const handleExpiryDateChange = (e) => {
  //   let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
  //   if (value.length > 2) {
  //     value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
  //   }
  //   dispatch(setExpiryDate(value));
  // };

  return (
    <div>
      {isMobile ? <NavbarMobile /> : <Navbar />}
      <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center min-h-screen bg-[#FFF0DC] p-5 relative md:pt-16 pt-16">
        <Toaster reverseOrder={false} />

        {/* Tombol Kembali
        <div className="absolute pt-16 top-10 left-10 z-10">
          <Link to="/checkout">
            <div className="flex items-center text-[#003285] hover:text-[#40A2E3]">
              <IoIosArrowBack className="text-3xl mr-2" />
              <span className="text-lg">Kembali</span>
            </div>
          </Link>
        </div> */}

        {/* Tombol Kembali */}
        {!isMobile && (
          <div className="absolute pt-16 top-10 left-10 z-10">
            <div>
              <Link to="/checkout">
                <div className="flex items-center text-[#003285] hover:text-[#40A2E3]">
                  <IoIosArrowBack className="text-3xl mr-2" />
                  <span className="text-lg">Kembali</span>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Form Pembayaran */}
        <div className="w-full lg:w-1/2 max-w-[500px] rounded-lg p-6 my-20 bg-white text-center shadow-lg">
          <h1 className="text-[#003285] text-2xl font-bold p-2 mb-7">
            Isi Data Pembayaran
          </h1>
          <div className="flex flex-col items-center">
            <button
              className={`w-full flex justify-between items-center p-3 rounded-lg mb-3 ${
                selectedMethod === "Virtual Account"
                  ? "bg-[#2A629A] text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => handleMethodChange("Virtual Account")}
            >
              Virtual Account
              {selectedMethod === "Virtual Account" && isDropdownOpen ? (
                <IoIosArrowUp />
              ) : (
                <IoIosArrowDown />
              )}
            </button>
            {selectedMethod === "Virtual Account" && isDropdownOpen && (
              <div className="w-full p-3 rounded-lg mb-3 bg-gray-100 text-left">
                <h2 className="text-[#2A629A] text-md font-semibold mb-5">
                  Pilih Jenis Bank
                </h2>
                <div className="flex justify-center items-center space-x-3 mb-4">
                  <img src={BRILogo} alt="BRI" className="h-5" />
                  <img src={BNILogo} alt="BNI" className="h-5" />
                  <img src={MandiriLogo} alt="Mandiri" className="h-5" />
                  <img src={BCALogo} alt="BCA" className="h-5" />
                  {/* Mungkin bisa menambahkan logo bank lainnya */}
                </div>
                <div className="text-left">
                  {/* <p className="text-[#2A629A] text-md font-semibold mb-2">
                  Nomor Billing
                </p> */}
                  <p className="text-[#555555] text-sm mb-3">
                    Silakan transfer ke salah satu nomor rekening Virtual
                    Account berikut:
                  </p>
                  <div className="flex items-center mb-3">
                    <div className="bg-gray-200 rounded-lg p-3 text-[#2A629A] text-lg font-semibold flex-grow relative logo-container">
                      <span className="flex items-center justify-between">
                        <span>88810 5678 9012 3456</span>
                        <img src={BRILogo} alt="BRI" className="h-5 mr-3" />
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="bg-gray-200 rounded-lg p-3 text-[#2A629A] text-lg font-semibold flex-grow relative logo-container">
                      <span className="flex items-center justify-between">
                        <span>8881 5678 9012 3456</span>
                        <img src={BNILogo} alt="BNI" className="h-5 mr-3" />
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="bg-gray-200 rounded-lg p-3 text-[#2A629A] text-lg font-semibold flex-grow relative logo-container">
                      <span className="flex items-center justify-between">
                        <span>89508 5678 9012 3456</span>
                        <img
                          src={MandiriLogo}
                          alt="Mandiri"
                          className="h-5 mr-3"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="bg-gray-200 rounded-lg p-3 text-[#2A629A] text-lg font-semibold flex-grow relative logo-container">
                      <span className="flex items-center justify-between">
                        <span>3901 5678 9012 3456</span>
                        <img src={BCALogo} alt="BCA" className="h-5 mr-3" />
                      </span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full p-3 rounded-lg bg-[#2A629A] text-white text-base font-medium mt-3 transition-colors duration-300 hover:bg-[#003285] active:bg-[#003285]"
                  >
                    {isLoading
                      ? "Memproses..."
                      : "Bayar dengan Virtual Account"}
                  </button>
                </div>
              </div>
            )}

            <button
              className={`w-full flex justify-between items-center p-3 rounded-lg mb-3 ${
                selectedMethod === "Kartu Kredit"
                  ? "bg-[#2A629A] text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => handleMethodChange("Kartu Kredit")}
            >
              Kartu Kredit
              {selectedMethod === "Kartu Kredit" && isDropdownOpen ? (
                <IoIosArrowUp />
              ) : (
                <IoIosArrowDown />
              )}
            </button>
            {selectedMethod === "Kartu Kredit" && isDropdownOpen && (
              <form
                onSubmit={handleSubmit}
                className="w-full p-3 rounded-lg mb-3 bg-gray-100 text-left"
              >
                <h2 className="text-[#2A629A] text-md font-semibold mb-5">
                  Pilih Jenis Kartu Kredit
                </h2>
                <div className="flex justify-center items-center space-x-3 mb-4">
                  <img src={VisaLogo} alt="Visa" className="h-7" />
                  <img src={MastercardLogo} alt="MasterCard" className="h-7" />
                  <img src={PayPalLogo} alt="PayPal" className="h-7" />
                  {/* Tambahkan logo kartu kredit lainnya sesuai kebutuhan */}
                </div>
                <div className="mt-2">
                  <label className="block text-left text-[#2A629A] text-sm font-medium mb-1">
                    Nomor Kartu
                  </label>
                  <div
                    className={`flex items-center p-2 rounded-lg bg-white border focus-within:shadow-lg ${
                      card_number
                        ? validateCardNumber(card_number)
                          ? "focus-within:border-[#2A629A]"
                          : "focus-within:border-[#FF0000]"
                        : "focus-within:border-[#2A629A]"
                    } ${
                      !validateCardNumber(card_number) && card_number
                        ? "border-[#FF0000]"
                        : "border-[#D0D0D0]"
                    }`}
                  >
                    <input
                      className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A]"
                      type="text"
                      value={card_number}
                      onChange={(e) => handleInputChange(e, setCardNumber)}
                      onKeyPress={handleNumberInput}
                      placeholder="4480 0000 0000 0000"
                      maxLength={19} // Menyesuaikan panjang input agar sesuai dengan format kartu kredit yang mengandung spasi
                    />
                    {!validateCardNumber(card_number) && card_number && (
                      <RxCrossCircled className="text-[#FF0000] w-[20px] h-[20px]" />
                    )}
                  </div>
                  {!validateCardNumber(card_number) && card_number && (
                    <p className="text-[#FF0000] text-xs mt-1 text-left">
                      Nomor kartu terlalu pendek, minimum 16 angka
                    </p>
                  )}
                </div>
                <div className="mt-2">
                  <label className="block text-left text-[#2A629A] text-sm font-medium mb-1">
                    Nama Pemegang Kartu
                  </label>
                  <div
                    className={`flex items-center p-2 rounded-lg bg-white border focus-within:shadow-lg
                    ${
                      card_holder_name
                        ? isCardHolderNameTouched
                          ? "focus-within:border-[#2A629A]"
                          : "focus-within:border-[#FF0000]"
                        : "focus-within:border-[#2A629A]"
                    } 
                    ${
                      !isCardHolderNameTouched && card_holder_name
                        ? "border-[#FF0000]"
                        : "border-[#D0D0D0]"
                    }`}
                  >
                    <input
                      className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A]"
                      type="text"
                      placeholder="Nama"
                      value={card_holder_name}
                      onFocus={handleCardHolderNameFocus}
                      onBlur={handleCardHolderNameBlur}
                      onChange={handleCardHolderNameChange}
                    />
                  </div>
                  {isCardHolderNameTouched && !card_holder_name && (
                    <div className="flex items-center text-[#FF0000] text-xs mt-1 text-left">
                      <BiErrorCircle className="w-[20px] h-[20px] mr-1" />
                      <p>Nama pemegang kartu tidak boleh kosong</p>
                    </div>
                  )}
                </div>
                <div className="mt-2 flex gap-2">
                  <div className="w-1/2">
                    <label className="block text-left text-[#2A629A] text-sm font-medium mb-1">
                      CVV
                    </label>
                    <div
                      className={`flex items-center p-2 rounded-lg bg-white border focus-within:shadow-lg ${
                        cvv
                          ? validateCvv(cvv)
                            ? "focus-within:border-[#2A629A]"
                            : "focus-within:border-[#FF0000]"
                          : "focus-within:border-[#2A629A]"
                      } ${
                        !validateCvv(cvv) && cvv
                          ? "border-[#FF0000]"
                          : "border-[#D0D0D0]"
                      }`}
                    >
                      <input
                        className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A]"
                        type="text"
                        value={cvv}
                        onChange={(e) => handleInputChange(e, setCvv)}
                        onKeyPress={handleNumberInput}
                        placeholder="123"
                        maxLength={4}
                      />
                      {!validateCvv(cvv) && cvv && (
                        <RxCrossCircled className="text-[#FF0000] w-[20px] h-[20px] ml-2" />
                      )}
                    </div>
                    {!validateCvv(cvv) && cvv && (
                      <p className="text-[#FF0000] text-xs mt-1 text-left">
                        CVV berisi 3-4 angka
                      </p>
                    )}
                  </div>
                  <div className="w-1/2">
                    <label className="block text-left text-[#2A629A] text-sm font-medium mb-1">
                      Masa Berlaku
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        className="p-2 rounded-lg bg-white border border-[#D0D0D0] focus:shadow-lg focus:border-[#2A629A] text-sm text-[#2A629A] w-1/2"
                        value={selectedMonth}
                        onChange={(e) =>
                          dispatch(setSelectedMonth(e.target.value))
                        }
                      >
                        <option value="" disabled>
                          Bulan
                        </option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option
                            key={i + 1}
                            value={String(i + 1).padStart(2, "0")}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                      <select
                        className="p-2 rounded-lg bg-white border border-[#D0D0D0] focus:shadow-lg focus:border-[#2A629A] text-sm text-[#2A629A] w-1/2"
                        value={selectedYear}
                        onChange={(e) =>
                          dispatch(setSelectedYear(e.target.value))
                        }
                      >
                        <option value="" disabled>
                          Tahun
                        </option>
                        {generateYearOptions().map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    {!validateExpiryDate(
                      `${selectedMonth}/${selectedYear.toString().slice(2)}`
                    ) &&
                      (selectedMonth || selectedYear) && (
                        <div className="flex items-center text-[#FF0000] text-xs mt-1 text-left">
                          <BiErrorCircle className="w-[20px] h-[20px] mr-1" />
                          <p>Mohon isi kedua kolom di atas</p>
                        </div>
                      )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full p-3 rounded-lg bg-[#2A629A] text-white text-base font-medium mt-3 transition-colors duration-300 hover:bg-[#003285] active:bg-[#003285]"
                >
                  {isLoading ? "Memproses..." : "Bayar dengan Kartu Kredit"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Format Pemesanan Tiket */}
        <div className="w-full lg:flex-grow max-w-[500px] lg:ml-10 mt-10 lg:mt-0">
          <BookingSummary />
        </div>
      </div>
      <Footer />
    </div>
  );
}
