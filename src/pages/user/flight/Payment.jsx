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
import BtnScrollTop from "../../../assets/components/BtnScrollUp";
import VisaLogo from "../../../assets/images/visa-logo.png";
import MastercardLogo from "../../../assets/images/mastercard-logo.png";
import PayPalLogo from "../../../assets/images/paypal-logo.png";

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const {
    card_number,
    card_holder_name,
    isCardHolderNameTouched,
    isCardHolderNameValid,
    cvv,
    isLoading,
    isDropdownOpen,
    selectedMonth,
    selectedYear,
  } = useSelector((state) => state.payment); // Menggunakan useSelector untuk mengambil state payment dari reducers
  const { ticketSelected } = useSelector((state) => state.ticket); // Menggunakan useSelector untuk mengambil state ticket dari reducers
  const paymentSuccess = useSelector((state) => state.payment.paymentSuccess); // Mengambil status pembayaran sukses dari state payment

  // Fungsi untuk membersihkan state ketika komponen di-refresh
  useEffect(() => {
    return () => {
      dispatch(resetPaymentState());
    };
  }, [dispatch]);

  // Fungsi untuk memformat nomor kartu kredit dengan spasi setiap 4 digit
  const formatCardNumber = (number) => {
    return number
      .replace(/\s?/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  // Fungsi untuk menangani perubahan input nomor kartu kredit
  const handleInputChange = (e, setter) => {
    const value = e.target.value.replace(/\D/g, ""); // Menghapus karakter non-digit
    const formattedValue = formatCardNumber(value); // Format nomor kartu
    dispatch(setter(formattedValue));
  };

  // Fungsi untuk mencegah input karakter selain angka
  const handleNumberInput = (event) => {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

  // Validasi nomor kartu kredit
  const validateCardNumber = (number) =>
    /^[0-9]{16}$/.test(number.replace(/\s/g, ""));

  // Fungsi untuk menangani perubahan input nama pemegang kartu
  const handleCardHolderNameChange = (event) => {
    dispatch(clearError());
    dispatch(setCardHolderName(event.target.value));
    if (!isCardHolderNameTouched) {
      dispatch(setCardHolderNameTouched(true));
    }
  };

  // Fungsi untuk menangani fokus input nama pemegang kartu
  const handleCardHolderNameFocus = () => {
    if (!isCardHolderNameTouched) {
      dispatch(setCardHolderNameTouched(true));
    }
  };

  // Fungsi untuk menangani blur input nama pemegang kartu
  const handleCardHolderNameBlur = () => {
    if (card_holder_name === "") {
      dispatch(setCardHolderNameTouched(false));
    }
  };

  // Validasi CVV kartu
  const validateCvv = (cvv) => /^[0-9]{3,4}$/.test(cvv);

  // Fungsi untuk menghasilkan opsi tahun masa berlaku kartu
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 10; i++) {
      years.push(currentYear + i);
    }
    return years;
  };

  // Validasi tanggal kedaluwarsa/masa berlaku kartu
  const validateExpiryDate = (date) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(date);

  // Fungsi untuk menangani proses pembayaran tiket
  const handleSubmit = (event) => {
    event.preventDefault();
    // Jika nomor kartu tidak diisi
    if (!card_number) {
      toast.error("Mohon masukkan nomor kartu Anda!", {
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
          width: "full",
          maxWidth: "900px",
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      return;
    }

    // Jika nama pemegang kartu tidak diisi
    if (!card_holder_name) {
      toast.error("Mohon masukkan nama pemegang kartu Anda!", {
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
          width: "full",
          maxWidth: "900px",
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      return;
    }

    // Jika CVV kartu tidak diisi
    if (!cvv) {
      toast.error("Mohon masukkan CVV Anda!", {
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
          width: "full",
          maxWidth: "900px",
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      return;
    }

    // Jika masa berlaku kartu tidak diisi
    if (!selectedMonth || !selectedYear) {
      toast.error("Mohon masukkan kolom masa berlaku kartu Anda!", {
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
          width: "full",
          maxWidth: "900px",
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      return;
    }

    // Jika nomor kartu kurang dari minimum karakter
    if (card_number.length < 19) {
      toast.error("Mohon masukkan nomor kartu dengan benar!", {
        // Menampilkan toast error
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
          width: "full",
          maxWidth: "900px",
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      return;
    }

    // Jika nama pemegang kartu kurang dari minimum karakter
    if (card_holder_name.length < 3) {
      toast.error("Mohon masukkan nama dengan benar!", {
        // Menampilkan toast error
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
          width: "full",
          maxWidth: "900px",
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      return;
    }

    // Jika CVV kartu kurang dari minimum karakter
    if (cvv.length < 3) {
      toast.error("Mohon masukkan CVV dengan benar!", {
        // Menampilkan toast error
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
          width: "full",
          maxWidth: "900px",
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      return;
    }

    // Jika semua kolom tidak diisi
    if (
      !card_number ||
      !card_holder_name ||
      !cvv ||
      !selectedMonth ||
      !selectedYear
    ) {
      // Menampilkan toast error
      toast.error("Mohon isi semua kolom terlebih dahulu!", {
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
          width: "full",
          maxWidth: "900px",
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      return;
    }
    const expiry_date = `${selectedMonth}/${selectedYear.toString().slice(2)}`; // Format tanggal kedaluwarsa
    const paymentData = {
      booking_code: ticketSelected.booking_code,
      // payment_method,
      card_number: card_number.replace(/\s/g, ""),
      card_holder_name,
      cvv,
      expiry_date,
    };
    console.log("Cek data pembayaran: ", paymentData);
    dispatch(processPayment(paymentData, navigate)); // Mengirim data pembayaran ke proses pembayaran di actions
  };

  // Menghandle sukses pembayaran dengan menampilkan toast sukses dari actions dan navigasi ke page print ticket
  useEffect(() => {
    if (paymentSuccess) {
      setTimeout(() => {
        navigate(`/print-ticket/${ticketSelected.booking_code}`);
      }, 3000);
    }
  }, [paymentSuccess, navigate, ticketSelected.booking_code]);

  return (
    <div>
      {isMobile ? <NavbarMobile /> : <Navbar />}
      <div
        className={`flex flex-col ${
          isTablet
            ? "items-center justify-center"
            : "lg:flex-row justify-center items-start lg:items-center"
        } min-h-screen bg-[#FFF0DC] p-5 relative md:pt-16 pt-16`}
      >
        <Toaster reverseOrder={false} />

        {/* Tombol Kembali */}
        {!isMobile && (
          <div className="absolute pt-16 top-10 left-10 z-10">
            <div>
              <Link to="/checkout">
                <div className="flex font-medium items-center text-[#003285] hover:text-[#40A2E3]">
                  <IoIosArrowBack className="text-2xl" />
                  <span className="text-lg">Kembali</span>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Form Data Pembayaran Tiket */}
        <div
          className={`w-full ${
            isTablet ? "lg:w-2/3 max-w-[750px]" : "lg:w-1/3"
          } max-w-[500px] rounded-xl p-6 mt-20 bg-white text-center shadow-lg`}
        >
          <h1 className="text-[#003285] text-xl font-bold p-2 mb-7">
            Isi Data Pembayaran
          </h1>
          <div className="flex flex-col items-center">
            <button
              className={`w-full flex justify-between items-center p-3 font-medium text-base rounded-xl mb-3 ${
                isDropdownOpen
                  ? "bg-[#2A629A] hover:bg-[#003285] text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-black"
              }`}
              onClick={() => dispatch(setIsDropdownOpen(!isDropdownOpen))}
            >
              Kartu Kredit
              {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
            {isDropdownOpen && (
              <form
                onSubmit={handleSubmit}
                className="w-full p-3 rounded-xl mb-3 bg-gray-100 text-left animate__animated animate__slideInUp"
              >
                <h2 className="text-[#2A629A] text-md font-semibold mb-7">
                  Pilih Jenis Kartu Kredit
                </h2>
                <div className="flex justify-center items-center space-x-3 mb-7">
                  <img src={VisaLogo} alt="Visa" className="h-7" />
                  <img src={MastercardLogo} alt="MasterCard" className="h-7" />
                  <img src={PayPalLogo} alt="PayPal" className="h-7" />
                </div>
                <div className="mt-5">
                  <label className="block text-left text-[#2A629A] text-sm font-medium mb-1">
                    Nomor Kartu
                  </label>
                  <div
                    className={`flex items-center p-2 rounded-xl bg-white border focus-within:shadow-lg ${
                      card_number
                        ? validateCardNumber(card_number)
                          ? "focus-within:border-[#2A629A]"
                          : "focus-within:border-[#FF0000]"
                        : "focus-within:border-[#2A629A]"
                    } ${
                      !validateCardNumber(card_number) && card_number
                        ? "border-[#FF0000]"
                        : "border-[#8A8A8A]"
                    }`}
                  >
                    <input
                      className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A]"
                      type="text"
                      value={card_number}
                      onChange={(e) => handleInputChange(e, setCardNumber)}
                      onKeyPress={handleNumberInput}
                      placeholder="4111 0000 0000 0000"
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
                    className={`flex items-center p-2 rounded-xl bg-white border focus-within:shadow-lg
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
                        : "border-[#8A8A8A]"
                    }
                    ${
                      card_holder_name
                        ? !isCardHolderNameValid &&
                          card_holder_name &&
                          card_holder_name.length < 3
                          ? "focus-within:border-[#FF0000]"
                          : "focus-within:border-[#2A629A]"
                        : "focus-within:border-[#FF0000]"
                    }`}
                  >
                    <input
                      className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A]"
                      type="text"
                      placeholder="Nama Lengkap"
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
                  {!isCardHolderNameValid &&
                    card_holder_name &&
                    card_holder_name.length < 3 && (
                      <div className="flex items-center text-[#FF0000] text-xs mt-1 text-left">
                        <BiErrorCircle className="w-[20px] h-[20px] mr-1" />
                        <p>Nama terlalu pendek, minimum 3 huruf</p>
                      </div>
                    )}
                </div>
                <div className="mt-2 flex gap-2">
                  <div className="w-1/2">
                    <label className="block text-left text-[#2A629A] text-sm font-medium mb-1">
                      CVV
                    </label>
                    <div
                      className={`flex items-center p-2 rounded-xl bg-white border focus-within:shadow-lg ${
                        cvv
                          ? validateCvv(cvv)
                            ? "focus-within:border-[#2A629A]"
                            : "focus-within:border-[#FF0000]"
                          : "focus-within:border-[#2A629A]"
                      } ${
                        !validateCvv(cvv) && cvv
                          ? "border-[#FF0000]"
                          : "border-[#8A8A8A]"
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
                        className="p-2 rounded-xl bg-white border border-[#8A8A8A] focus:shadow-lg focus:border-[#2A629A] text-sm text-[#2A629A] w-1/2"
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
                        className="p-2 rounded-xl bg-white border border-[#8A8A8A] focus:shadow-lg focus:border-[#2A629A] text-sm text-[#2A629A] w-1/2"
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
                  className="w-full p-3 rounded-xl bg-[#2A629A] text-white text-base font-medium mt-3 transition-colors duration-300 hover:bg-[#003285] active:bg-[#003285]"
                >
                  {isLoading ? "Memproses Pembayaran..." : "Bayar"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Format Pemesanan Tiket */}
        <div
          className={`w-full ${
            isTablet ? "lg:w-2/3 max-w-[750px]" : "lg:w-1/3"
          } max-w-[500px] lg:ml-10 lg:mt-0`}
        >
          <BookingSummary />
        </div>
      </div>
      {isMobile ? "" : <BtnScrollTop />}
      <Footer />
    </div>
  );
}
