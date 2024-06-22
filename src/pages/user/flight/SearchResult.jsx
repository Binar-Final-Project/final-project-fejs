import React, { useState, useEffect, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import Navbar from "../../../assets/components/navigations/navbar/Navbar";
import Footer from "../../../assets/components/navigations/Footer";
import NavbarMobile from "../../../assets/components/navigations/navbar/Navbar-mobile";
import AirportInput from "../../../assets/components/AirportInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getFlight } from "../../../redux/actions/flight/flightActions";
import BtnScrollTop from "../../../assets/components/BtnScrollUp";
import { setChoosenFlight } from "../../../redux/reducers/flight/flightReducers";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange, Calendar } from "react-date-range";
import { format } from "date-fns";

// ICON
import { RiSearchLine } from "react-icons/ri";
import { IoFilter } from "react-icons/io5";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { TfiArrowCircleDown, TfiArrowCircleUp } from "react-icons/tfi";
import { PiBagSimpleBold, PiSeatFill } from "react-icons/pi";
import { FiInfo } from "react-icons/fi";
import { LuLuggage } from "react-icons/lu";
import {
  FaArrowsRotate,
  FaPerson,
  FaBaby,
  FaChildDress,
} from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { BiSolidPlaneAlt } from "react-icons/bi";

export default function SearchResult() {
  const { flights, pages, choosenFlight, isLoading } = useSelector(
    (state) => state.flight
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const from = query.get("from");
  const to = query.get("to");
  const departureDate = query.get("departureDate");
  const returnDate = query.get("returnDate");
  const seatClass = query.get("class");
  const passenger = parseInt(query.get("passenger"));
  const adult = parseInt(query.get("adult"));
  const child = parseInt(query.get("child"));
  const infant = parseInt(query.get("infant"));

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // MODAL FILTER URUTAN
  const [isChecked, setIsChecked] = useState(false); // TOGGLE TANGGAL KEPULANGAN
  const [seatModalOpen, setSeatModalOpen] = useState(false); // MODAL KELAS PENERBANGAN
  const [passengerModalOpen, setPassengerModalOpen] = useState(false); // MODAL JUMLAH PENUMPANG
  const [searchModalOpen, setSearchModalOpen] = useState(false); // MODAL UNTUK MENGUBAH PENCARIAN
  const [dateModalOpen, setDateModalOpen] = useState(false); // MODAL TANGGAL PENERBANGAN
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [detailOpen, setDetailOpen] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [dates, setDates] = useState([]);
  const [departure_code, setDeparture_code] = useState(from);
  const [arrival_code, setArrival_code] = useState(to);
  const [seat_class, setSeat_class] = useState(seatClass);
  const [total_passenger, setTotal_passenger] = useState(passenger);
  const [departure_date, setDeparture_date] = useState(
    departureDate || new Date()
  );
  const [return_date, setReturn_date] = useState(returnDate);
  const [selectedDate, setSelectedDate] = useState("");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [penumpang, setPenumpang] = useState({
    dewasa: 1,
    anak: 0,
    bayi: 0,
  });

  // BUAT NUKER POSISI DARI DESTINASI AWAL-DESTINASI TUJUAN
  const handleRotateClick = () => {
    setDeparture_code(arrival_code);
    setArrival_code(departure_code);
  };

  // BUAT INPUT KELAS PENERBANGAN
  const handleSeat = (e) => {
    setSeat_class(e?.target?.value);
  };

  // BUAT NAMPILIN INPUT TANGGAL KEPULANGAN
  const handleToggleChange = () => {
    setIsChecked(!isChecked);
  };

  // BUAT UBAH FORMAT TANGGAL PERGI
  const handleSelectDate = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setDeparture_date(formattedDate);
  };

  // FUNGSI UNTUK COUNTER PENUMPANG
  const handlePenumpang = (name, operation) => {
    setPenumpang((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? penumpang[name] + 1 : penumpang[name] - 1,
      };
    });
  };

  // BUAT JUMLAHIN TOTAL PENUMPANG
  useEffect(() => {
    const getTotalPenumpang = () => {
      return penumpang?.dewasa + penumpang?.anak + penumpang?.bayi;
    };

    setTotal_passenger(getTotalPenumpang());
  }, [penumpang]);

  // FUNGSI UNTUK MODAL FILTER URUTAN
  const handleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  // FUNGSI UNTUK MENGHAPUS FILTER
  const handleClearFilter = () => {
    setFilter("");
    setDetailOpen(null);
    setCurrentPage(1);
    setIsFilterModalOpen(false);
    toast("Data diurutkan tanpa filter.", {
      style: {
        background: "#28A745", // Background hijau
        color: "#FFFFFF", // TEKS PUTIH
        borderRadius: "12px",
        fontSize: "14px", // Ukuran font
        textAlign: "center", //TEKS TENGAH
        padding: "10px 20px", // Padding
        width: "full",
        maxWidth: "900px",
      },
      position: "top-center", // Posisi toast
      duration: 3000, // Durasi toast
    });
  };

  // FUNGSI UNTUK MEMFILTER URUTAN
  const handleFilter = (e) => {
    notify(e?.target?.value);
    setFilter(e?.target?.value);
    setCurrentPage(1);
    setDetailOpen(null);
  };

  // FUNGSI UNTUK MENGATUR TEKS NOTIFIKASI
  const notify = (tempFilter) => {
    if (tempFilter === "price.asc") {
      toast("Berhasil mengurutkan berdasarkan harga termurah", {
        style: {
          background: "#28A745", // Background hijau
          color: "#FFFFFF", // TEKS PUTIH
          borderRadius: "12px",
          fontSize: "14px", // Ukuran font
          textAlign: "center", //TEKS TENGAH
          padding: "10px 20px", // Padding
          width: "full",
          maxWidth: "900px",
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
    } else if (tempFilter === "duration.asc") {
      toast("Berhasil mengurutkan berdasarkan durasi terpendek", {
        style: {
          background: "#28A745", // Background hijau
          color: "#FFFFFF", // TEKS PUTIH
          borderRadius: "12px",
          fontSize: "14px", // Ukuran font
          textAlign: "center", // TEKS TENGAH
          padding: "10px 20px", // Padding
          width: "full",
          maxWidth: "900px",
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
    } else if (tempFilter === "departure_time.asc") {
      toast("Berhasil mengurutkan berdasarkan keberangkatan paling awal", {
        style: {
          background: "#28A745", // Background hijau
          color: "#FFFFFF", // TEKS PUTIH
          borderRadius: "12px",
          fontSize: "14px", // Ukuran font
          textAlign: "center", // TEKS TENGAH
          padding: "10px 20px", // Padding
          width: "full",
          maxWidth: "900px",
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
    } else if (tempFilter === "departure_time.desc") {
      toast("Berhasil mengurutkan berdasarkan keberangkatan paling akhir", {
        style: {
          background: "#28A745", // Background hijau
          color: "#FFFFFF", // TEKS PUTIH
          borderRadius: "12px",
          fontSize: "14px", // Ukuran font
          textAlign: "center", // TEKS TENGAH
          padding: "10px 20px", // Padding
          width: "full",
          maxWidth: "900px",
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
    } else if (tempFilter === "arrival_time.asc") {
      toast("Berhasil mengurutkan berdasarkan kedatangan paling awal", {
        style: {
          background: "#28A745", // Background hijau
          color: "#FFFFFF", // TEKS PUTIH
          borderRadius: "12px",
          fontSize: "14px", // Ukuran font
          textAlign: "center", // TEKS TENGAH
          padding: "10px 20px", // Padding
          width: "full",
          maxWidth: "900px",
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
    } else if (tempFilter === "arrival_time.desc") {
      toast("Berhasil mengurutkan berdasarkan keberangkatan paling akhir", {
        style: {
          background: "#28A745", // Background hijau
          color: "#FFFFFF", // TEKS PUTIH
          borderRadius: "12px",
          fontSize: "14px", // Ukuran font
          textAlign: "center", // TEKS TENGAH
          padding: "10px 20px", // Padding
          width: "full",
          maxWidth: "900px",
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
    }
  };

  // FUNGSI UNTUK MENAMPILKAN DETAIL TIKET PENERBANGAN
  const handleDetail = (flight_id) => {
    setDetailOpen(detailOpen === flight_id ? null : flight_id);
  };

  // MODAL MILIH KELAS PENERBANGAN
  const handleSeatModal = () => {
    setSeatModalOpen(!seatModalOpen);
  };

  // MODAL JUMLAH PENUMPANG
  const handlePassengerModal = () => {
    setPassengerModalOpen(!passengerModalOpen);
  };

  // MODAL UNTUK MENGUBAH PENCARIAN
  const handleSearchModal = () => {
    setSearchModalOpen(!searchModalOpen);
  };

  // MODAL PILIH TANGGAL PENERBANGAN
  const handleDateModal = () => {
    setDateModalOpen(!dateModalOpen);
  };

  // FUNGSI UNTUK SUBMIT HASIL PENCARIAN
  const handleSubmit = (e) => {
    if (typeof e === "object") {
      e?.preventDefault();
    }

    if (departure_code === "" || arrival_code === "") {
      toast("Harap pilih destinasi Anda!", {
        style: {
          background: "#FF0000",
          color: "#FFFFFF", // TEKS PUTIH
          borderRadius: "12px",
          fontSize: "14px", // Ukuran font
          textAlign: "center", // TEKS TENGAH
          padding: "10px 20px", // Padding
          width: "full",
          maxWidth: "900px",
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      return;
    }

    const departureDate = format(new Date(date[0].startDate), "yyyy-MM-dd");
    const returnDate = format(new Date(date[0].endDate), "yyyy-MM-dd");

    if (isChecked && departureDate === returnDate) {
      toast("Harap pilih tanggal yang berbeda!", {
        style: {
          background: "#FF0000",
          color: "#FFFFFF", // TEKS PUTIH
          borderRadius: "12px",
          fontSize: "14px", // Ukuran font
          textAlign: "center", // TEKS TENGAH
          padding: "10px 20px", // Padding
          width: "full",
          maxWidth: "900px",
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      return;
    }

    if (return_date && isChecked) {
      dispatch(
        getFlight(
          typeof e === "object" ? departure_code : arrival_code,
          typeof e === "object" ? arrival_code : departure_code,
          typeof e === "object" ? departureDate : returnDate,
          seat_class,
          total_passenger,
          filter,
          currentPage
        )
      );
    } else {
      dispatch(
        getFlight(
          departure_code,
          arrival_code,
          departure_date,
          seat_class,
          total_passenger,
          filter,
          currentPage
        )
      );
      dispatch(setChoosenFlight([]));
    }

    setSelectedDate(departure_date);

    if (returnDate && isChecked) {
      navigate(
        `/hasil-pencarian?from=${departure_code}&to=${arrival_code}&departureDate=${departureDate}&returnDate=${returnDate}&class=${seat_class}&passenger=${total_passenger}&adult=${penumpang.dewasa}&child=${penumpang.anak}&infant=${penumpang.bayi}`,
        { replace: true }
      );
      setCurrentPage(1);
      setFilter("");
      setSearchModalOpen(false);
      setDeparture_date(departureDate);
      setReturn_date(returnDate);
    } else {
      navigate(
        `/hasil-pencarian?from=${departure_code}&to=${arrival_code}&departureDate=${departure_date}&class=${seat_class}&passenger=${total_passenger}&adult=${penumpang.dewasa}&child=${penumpang.anak}&infant=${penumpang.bayi}`,
        { replace: true }
      );
      setCurrentPage(1);
      setFilter("");
      setSearchModalOpen(false);
    }
  };

  // FUNGSI UNTUK MENGUBAH DURASI PENERBANGAN
  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}j${hours > 1 ? "" : ""} ${remainingMinutes}m${
      remainingMinutes > 1 ? "" : ""
    }`;
  }

  // FUNGSI UNTUK KE PAGE SELANJUTNYA
  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
    setDetailOpen(null);
  };

  // FUNGSI UNTUK KE PAGE SEBELUMNYA
  const goToPrevPage = () => {
    setCurrentPage((page) => page - 1);
    setDetailOpen(null);
  };

  // UNTUK MEMBUAT STATE AWAL DARI QUERY URL
  useEffect(() => {
    setDeparture_code(from);
    setArrival_code(to);
    setSeat_class(seatClass);
    setTotal_passenger(passenger);
    setDeparture_date(departureDate);
    setPenumpang({
      dewasa: adult,
      anak: child,
      bayi: infant,
    });

    // UNTUK MEMBUAT FORMAT TANGGAL
    const tanggal = new Date(departure_date).toLocaleString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    setSelectedDate(tanggal);
  }, [from, to, seatClass, passenger, departureDate]);

  // UNTUK MENGHAPUS TIKET YANG SUDAH DIPILIH SAAT DI REFRESH
  useEffect(() => {
    dispatch(setChoosenFlight([]));
    setDeparture_date(departureDate);
    setReturn_date(returnDate);
  }, []);

  // UNTUK MENJALANKAN FUNGSI GET FLIGHT SAAT GANTI PAGE ATAU FILTER
  useEffect(() => {
    dispatch(
      getFlight(
        return_date
          ? choosenFlight?.length === 0
            ? departure_code
            : arrival_code
          : departure_code,
        return_date
          ? choosenFlight?.length === 0
            ? arrival_code
            : departure_code
          : arrival_code,
        return_date
          ? choosenFlight?.length === 0
            ? departure_date
            : return_date
          : departure_date,
        seat_class,
        total_passenger,
        filter,
        currentPage
      )
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setDetailOpen(null);
  }, [choosenFlight, filter, currentPage]);

  // UNTUK PINDAH PAGE JIKA BUTTON PILIH TIKET DI KLIK
  useEffect(() => {
    // JIKA PULANG-PERGI
    if (returnDate) {
      if (choosenFlight?.length == 2) {
        setTimeout(() => {
          navigate(
            `/checkout?&adult=${penumpang.dewasa}&child=${penumpang.anak}&infant=${penumpang.bayi}`
          );
        }, 1000);
      }
    } else {
      // JIKA SEKALI JALAN
      if (choosenFlight?.length == 1) {
        setTimeout(() => {
          navigate(
            `/checkout?&adult=${penumpang.dewasa}&child=${penumpang.anak}&infant=${penumpang.bayi}`
          );
        }, 1000);
      }
    }
  }, [choosenFlight]);

  // FUNGSI UNTUK MENDAPATKAN TANGGAL DAN HARI PERMINGGU
  useEffect(() => {
    const startDateObj = new Date(departureDate);
    const daysOfWeekArray = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];

    let daysOfWeekTemp = [];
    let datesTemp = [];
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(
        startDateObj.getTime() + i * 24 * 60 * 60 * 1000
      );
      const dayName = daysOfWeekArray[dayDate.getDay()];
      const dayDateStr = dayDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      daysOfWeekTemp.push(dayName);
      datesTemp.push(dayDateStr);
    }

    setDaysOfWeek(daysOfWeekTemp);
    setDates(datesTemp);
  }, [departureDate, selectedDate]);

  const handleDateClick = (date) => {
    const [day, month, year] = date.split(" ");
    const monthNumber =
      [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ].indexOf(month) + 1;

    const formattedDate = `${year}-${padZero(monthNumber)}-${padZero(day)}`;

    function padZero(num) {
      return (num < 10 ? "0" : "") + num;
    }

    dispatch(
      getFlight(
        departure_code,
        arrival_code,
        formattedDate,
        seat_class,
        total_passenger,
        filter,
        currentPage
      )
    );

    dispatch(setChoosenFlight([]));
    setDeparture_date(formattedDate);
    setSelectedDate(date);
    setCurrentPage(1);
    setFilter("");
  };

  return (
    <div className="bg-[#FFF0DC] py-5 md:py-0">
      {isMobile ? <NavbarMobile /> : <Navbar />}
      <div className="m-5 md:m-10 md:py-20">
        {/* BACK BUTTON AND TOASTER */}
        <div className="lg:w-1/12 mb-5">
          <Link to="/">
            <div className="flex font-medium items-center text-[#003285] hover:text-[#40A2E3]">
              <IoIosArrowBack className="text-3xl" />
              <h6 className="text-lg">Kembali</h6>
            </div>
          </Link>
        </div>
        <div>
          <Toaster />
        </div>
        <p className="text-3xl font-bold text-[#003285]">Hasil Pencarian</p>

        <div className="flex justify-between items-center mt-5 lg:mx-10 bg-white rounded-full overflow-x-scroll shadow-lg whitespace-nowrap">
          {daysOfWeek.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(dates[index])}
              className={`flex flex-col items-center py-3 px-5 mx-5 my-1 rounded-xl text-sm ${
                selectedDate === dates[index] ? "text-white bg-[#2A629A]" : ""
              }`}
            >
              <div>{day}</div>
              <div>{dates[index]}</div>
            </button>
          ))}
        </div>

        {/* JIKA HASILNYA KOSONG ATAU TIDAK ADA */}
        {flights?.length === 0 ? (
          <div className="my-5">
            <div className="flex justify-end w-full">
              <button
                className="text-white flex justify-center bg-[#2A629A] transition-colors duration-300 hover:bg-[#003285] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleSearchModal}
              >
                Ubah Pencarian
                <RiSearchLine className="text-lg ml-1" />
              </button>
            </div>
          </div>
        ) : (
          // JIKA HASILNYA ADA
          <>
            {isMobile ? (
              <div className="flex justify-end my-5">
                <button
                  className="text-white flex justify-center bg-[#2A629A] transition-colors duration-300 hover:bg-[#003285] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleSearchModal}
                >
                  Ubah Pencarian
                  <RiSearchLine className="text-lg ml-1" />
                </button>
              </div>
            ) : (
              ""
            )}
            <div className="flex md:justify-end justify-center items-center my-6 gap-5">
              {isMobile ? (
                ""
              ) : (
                <div className="flex justify-end">
                  <button
                    className="text-white flex justify-center bg-[#2A629A] transition-colors duration-300 hover:bg-[#003285] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={handleSearchModal}
                  >
                    Ubah Pencarian
                    <RiSearchLine className="text-lg ml-1" />
                  </button>
                </div>
              )}
              {/* FILTER AND PAGE SECTION */}
              <button onClick={handleFilterModal}>
                <div
                  className={`flex items-center border-[#003285] border-2 py-2 px-3 rounded-full ${
                    filter ? "bg-[#003285] text-white" : ""
                  }`}
                >
                  <IoFilter className="mr-1 text-xl" />
                  Urutkan
                </div>
              </button>
              <div>
                <div className="flex items-center">
                  <button
                    className="text-2xl mr-2"
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                  >
                    <FaArrowCircleLeft
                      className={`${
                        currentPage === 1
                          ? "text-[#564d4d] hover:text-[#564d4d]/50"
                          : "text-[#003285] hover:text-[#003285]/75"
                      }`}
                    />
                  </button>
                  {currentPage} dari {pages}
                  <button
                    className="text-2xl ml-2"
                    onClick={goToNextPage}
                    disabled={currentPage === pages}
                  >
                    <FaArrowCircleRight
                      className={`${
                        currentPage === pages
                          ? "text-[#564d4d] hover:text-[#564d4d]/50"
                          : "text-[#003285] hover:text-[#003285]/75"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* SEARCH RESULT */}
        {/* JIKA HASILNYA KOSONG ATAU TIDAK ADA */}
        {flights?.length === 0 ? (
          <div className="flex flex-col justify-center items-center text-center my-12">
            <iframe src="https://lottie.host/embed/31de7bda-4460-481f-9ba3-b26a92252434/ZtAJ9lwHGA.json"></iframe>
            <p className="text-3xl font-bold text-[#003285] mt-6 mb-2">
              Penerbangan yang Anda cari tidak tersedia
            </p>
            <p>
              Silahkan ganti tanggal atau destinasi lainnya untuk menemukan
              perjalanan seru.
            </p>
          </div>
        ) : (
          <>
            {/* JIKA HASILNYA ADA */}

            <div
              className={`flex gap-10 ${
                isMobile || isTablet ? "flex-col" : "flex-row"
              }`}
            >
              {returnDate ? (
                <div className="bg-white shadow-lg p-6 rounded-xl h-full lg:w-2/5">
                  <div className="flex items-center gap-1 border-0 border-b-2 border-[#003285] py-1 mb-3">
                    <BiSolidPlaneAlt className="text-3xl text-[#003285]" />
                    <h5 className="text-xl font-semibold">Penerbangan Anda</h5>
                  </div>
                  {choosenFlight.length === 0 ? (
                    <div>
                      <p className="text-center">
                        Silahkan Pilih Tiket Penerbangan Anda
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {choosenFlight.map((flight, i) => {
                        const index = i + 1;
                        return (
                          <div key={flight?.flight_id}>
                            <div className="flex items-center gap-2">
                              <div className="bg-[#2A629A] text-white py-1 px-3 rounded-lg">
                                {index}
                              </div>
                              <div className="text-sm">
                                <div>
                                  {new Date(flight?.flight_date).toLocaleString(
                                    "id-ID",
                                    {
                                      day: "2-digit",
                                      month: "long",
                                      year: "numeric",
                                    }
                                  )}
                                  , {flight?.departure_time}
                                </div>
                                <div className="font-medium">
                                  {flight?.departure_city} →{" "}
                                  {flight?.arrival_city}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center ms-9 my-4 text-sm">
                              <img
                                src={flight?.airline_icon_url}
                                className="h-5"
                                alt="Airline Logo"
                              />
                              <h5 className="mx-2">{flight?.airline_name}</h5>
                            </div>

                            <div className="flex items-center ms-9 my-4 text-sm">
                              <div className="flex flex-col">
                                <div className="flex gap-3">
                                  <div>
                                    <h5>{flight?.departure_time}</h5>
                                  </div>
                                  <hr className="my-2 w-[5vh] bg-[#003285] p-0.5 rounded" />
                                  <div>
                                    <h5>{flight?.arrival_time}</h5>
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="bg-[#EEF5FF] px-2 py-0.5 rounded-full">
                                    {flight?.departure_code}
                                  </div>
                                  <div className="bg-[#EEF5FF] px-2 py-0.5 rounded-full">
                                    {flight?.arrival_code}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-col gap-5 w-full">
                {flights?.map((flight) => (
                  <div
                    className={`${
                      detailOpen === flight?.flight_id
                        ? " border-[#003285] border-2"
                        : ""
                    }
                    bg-white shadow-lg p-6 rounded-xl`}
                    key={flight?.flight_id}
                  >
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-8">
                      <div className="flex items-center">
                        {isLoading ? (
                          <div className="max-w-sm animate-pulse">
                            <div className="p-4 border shadow md:p-6 w-10 h-10 bg-gray-300 rounded-full"></div>
                          </div>
                        ) : (
                          <img
                            src={flight?.airline_icon_url}
                            className="h-8"
                            alt="Airline Logo"
                          />
                        )}
                        {isLoading ? (
                          <div className="max-w-sm animate-pulse ms-2">
                            <div className="h-2.5 bg-gray-300 rounded-full w-48 md:w-32 lg:w-48"></div>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <h5 className="font-medium text-lg mx-2">
                              {flight?.airline_name}
                            </h5>
                            {flight?.baggage ? (
                              <LuLuggage className="text-2xl" />
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex gap-3 items-center">
                          {isLoading ? (
                            <div>
                              <div className="max-w-sm animate-pulse h-2.5 bg-gray-300 rounded-full w-10 mb-2"></div>
                              <div className="max-w-sm animate-pulse h-2.5 bg-gray-300 rounded-full w-10"></div>
                            </div>
                          ) : (
                            <div>
                              <h5 className="text-xl font-semibold">
                                {flight?.departure_time}
                              </h5>
                              <div>{flight?.departure_code}</div>
                            </div>
                          )}
                          {isLoading ? (
                            <div className="max-w-sm animate-pulse h-2.5 bg-gray-300 rounded-full w-56 md:w-32 lg:w-56"></div>
                          ) : (
                            <div className="border-b-2 border-[#003285] lg:w-[30vh] md:w-[10vh] w-[25vh] text-center text-sm pb-2">
                              <time>{formatDuration(flight?.duration)}</time>
                            </div>
                          )}
                          {isLoading ? (
                            <div>
                              <div className="max-w-sm animate-pulse h-2.5 bg-gray-300 rounded-full w-10 mb-2"></div>
                              <div className="max-w-sm animate-pulse h-2.5 bg-gray-300 rounded-full w-10"></div>
                            </div>
                          ) : (
                            <div>
                              <h5 className="text-xl font-semibold">
                                {flight?.arrival_time}
                              </h5>
                              <div>{flight?.arrival_code}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        {isLoading ? (
                          <div className="max-w-sm animate-pulse">
                            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                          </div>
                        ) : (
                          <>
                            {detailOpen === flight?.flight_id ? (
                              <button
                                onClick={() => handleDetail(flight?.flight_id)}
                              >
                                <TfiArrowCircleUp className="text-3xl text-[#003285]" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleDetail(flight?.flight_id)}
                              >
                                <TfiArrowCircleDown className="text-3xl text-[#003285]" />
                              </button>
                            )}
                          </>
                        )}
                        {isLoading ? (
                          <div className="max-w-sm animate-pulse h-3 bg-gray-300 rounded-full w-56"></div>
                        ) : (
                          <h5 className="text-xl font-semibold text-[#003285]">
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(flight.price)}
                            /orang
                          </h5>
                        )}
                        {isLoading ? (
                          <div className="max-w-sm animate-pulse h-5 bg-gray-300 rounded-full w-32"></div>
                        ) : (
                          <button
                            type="button"
                            className="py-2 px-10 rounded-2xl bg-[#2A629A] text-white transition-colors duration-300 hover:bg-[#003285]"
                            onClick={() => {
                              const newFlight = [...choosenFlight, flight];
                              dispatch(setChoosenFlight(newFlight));
                              if (return_date && isChecked) {
                                handleSubmit(newFlight?.length);
                              }
                            }}
                          >
                            <div className="flex items-center font-medium">
                              <span className="text-md">Pilih</span>
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                    {/* DETAIL TIKET */}
                    {detailOpen === flight?.flight_id && (
                      <div className="border-t-2 py-2 mt-4 ">
                        <div>
                          <h4 className="text-lg font-semibold text-[#003285] my-3">
                            Detail Penerbangan
                          </h4>

                          <div className="flex flex-row gap-3">
                            <div className="flex flex-col justify-between items-center">
                              <div className="flex flex-col text-center mt-1.5">
                                <time className="mb-1 text-lg font-semibold leading-none ">
                                  {flight?.departure_time}
                                </time>
                                <div className="text-sm">
                                  {new Date(flight?.flight_date).toLocaleString(
                                    "id-ID",
                                    {
                                      day: "2-digit",
                                      month: "long",
                                      year: "numeric",
                                    }
                                  )}
                                </div>
                              </div>
                              <div className="pt-12">
                                <span className="text-sm">
                                  <time>
                                    {formatDuration(flight?.duration)}
                                  </time>
                                </span>
                              </div>
                              <div></div>
                              <div className="flex flex-col text-center mt-1.5">
                                <time className="mb-1 text-lg font-semibold leading-none ">
                                  {flight?.arrival_time}
                                </time>
                                <div className="text-sm">
                                  {new Date(flight?.flight_date).toLocaleString(
                                    "id-ID",
                                    {
                                      day: "2-digit",
                                      month: "long",
                                      year: "numeric",
                                    }
                                  )}
                                </div>
                              </div>
                              <div></div>
                            </div>
                            <div>
                              <ol className="relative border-s border-gray-200">
                                <li className="mb-5 ms-4">
                                  <div className="absolute w-3 h-3 bg-[#2A629A] rounded-full mt-1.5 -start-1.5 border border-white"></div>
                                  <h3 className="text-lg font-semibold">
                                    {flight?.departure_city} (
                                    {flight?.departure_code})
                                  </h3>
                                  <p className="text-sm ">
                                    {flight?.departure_airport}
                                  </p>
                                  <p className="mb-4 text-sm ">
                                    {flight?.departure_terminal}
                                  </p>
                                </li>
                                <li className="mb-5 ms-4">
                                  <div className="flex items-center">
                                    <p>{flight?.airline_name}</p>
                                    <img
                                      src={flight?.airline_icon_url}
                                      className="h-8 ml-2"
                                      alt="Airline Logo"
                                    />
                                  </div>
                                  <div className="text-sm">
                                    <span>{flight?.class}</span>
                                  </div>
                                  <div className="flex gap-5 md:gap-20 my-3 flex-col md:flex-row">
                                    {flight?.baggage ? (
                                      <div className="flex gap-3">
                                        <div>
                                          <PiBagSimpleBold className="text-xl" />
                                        </div>
                                        <div className="gap-1 flex flex-col">
                                          <p className="text-sm">
                                            Kabin : {flight?.cabin_baggage} kg
                                          </p>
                                          <p className="text-sm">
                                            Bagasi : {flight?.free_baggage} kg
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
                                          {flight?.airplane_model}
                                        </p>
                                        <p className="text-sm">
                                          {flight?.flight_entertaiment
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
                                    {flight?.arrival_city} (
                                    {flight?.arrival_code})
                                  </h3>
                                </li>
                              </ol>

                              <div className="ms-4">
                                <p className="text-sm">
                                  {flight?.arrival_airport}
                                </p>
                                <p className="text-sm">
                                  {flight?.arrival_terminal}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* MODAL UBAH PENCARIAN */}
      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-scroll transition-opacity duration-300  ${
          searchModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`relative p-4 w-full max-w-lg max-h-full transform transition-transform duration-300 ease-in-out ${
            searchModalOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Ubah Pencarian
              </h3>
              <button
                className=" bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
                onClick={handleSearchModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-lg">
                <div className="flex flex-col p-3">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h5 className="text-gray-500 text-sm font-medium mr-1">
                        Dari
                      </h5>
                      <div className="flex flex-row items-center">
                        <MdFlightTakeoff className="text-xl text-gray-500 absolute" />
                        <div className="w-full">
                          <AirportInput
                            value={departure_code}
                            onChange={(airportCode) =>
                              setDeparture_code(airportCode)
                            }
                            placeholder="Pilih bandara awal"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#2A629A] peer"
                          />
                        </div>
                      </div>
                    </div>
                    {/* BUTTON TUKER POSISI */}
                    <div className="mt-10">
                      <button
                        type="button"
                        className="bg-[#003285] text-white p-3 rounded-full "
                        onClick={handleRotateClick}
                      >
                        <FaArrowsRotate />
                      </button>
                    </div>
                  </div>
                  <div className="my-5">
                    <h5 className="text-gray-500 text-sm font-medium">Ke</h5>
                    <div className="flex flex-row items-center">
                      <MdFlightLand className="text-xl text-gray-500 absolute" />
                      <div className="w-full">
                        <AirportInput
                          value={arrival_code}
                          onChange={(airportCode) =>
                            setArrival_code(airportCode)
                          }
                          placeholder="Pilih bandara tujuan"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#2A629A] peer"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-5">
                    <h5 className="text-[#2A629A] text-sm font-medium mr-3.5">
                      Pulang-Pergi?
                    </h5>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        onChange={handleToggleChange}
                      />
                      <div
                        className={`group peer ring-0 ${
                          isChecked ? "bg-[#003285]" : "bg-[#86B6F6]"
                        } rounded-full outline-none duration-300 after:duration-300 w-12 h-7 shadow-md peer-focus:outline-none after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-5 after:w-5 after:top-1 after:left-0 after:translate-x-1 peer-checked:after:translate-x-6 peer-hover:after:scale-95 peer-checked:translate-x-0
                        }`}
                      ></div>
                    </label>
                  </div>
                  <div>
                    <h5 className="text-gray-500 text-sm font-medium mr-3.5">
                      Tanggal Pergi
                    </h5>
                    <div className="flex flex-row items-center">
                      <span
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300"
                        onClick={handleDateModal}
                      >
                        {isChecked ? (
                          <div>
                            {`${format(date[0].startDate, "dd/MM/yyyy")} `}
                          </div>
                        ) : (
                          <div>{`${format(
                            departure_date,
                            "dd/MM/yyyy"
                          )} `}</div>
                        )}
                      </span>
                    </div>
                  </div>
                  {isChecked ? (
                    <div className="mt-5">
                      <h5 className="text-gray-500 text-sm font-medium mr-3.5">
                        Tanggal Pulang
                      </h5>
                      <div className="flex flex-row items-center">
                        <span
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300"
                          onClick={handleDateModal}
                        >
                          {format(date[0].endDate, "dd/MM/yyyy")}
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="my-5 flex justify-around">
                    <div>
                      <h5 className="text-gray-500 text-sm font-medium mr-3.5">
                        Penumpang
                      </h5>
                      <div className="flex flex-col">
                        <div
                          className="flex items-center"
                          onClick={handlePassengerModal}
                        >
                          <FaPerson className="text-xl absolute" />
                          <div className="relative flex gap-2 z-0">
                            <div className="block py-2.5 px-6 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300">
                              {total_passenger} Penumpang
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-gray-500 text-sm font-medium mr-3.5">
                        Kelas Penerbangan
                      </h5>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <PiSeatFill className="text-xl absolute" />
                          <div className="relative flex gap-2 z-0">
                            <div
                              className="block py-2.5 px-6 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300"
                              onClick={handleSeatModal}
                            >
                              {seat_class}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full p-4 bg-[#2A629A] transition-colors duration-300 hover:bg-[#003285] text-white rounded-lg"
                  >
                    Cari Penerbangan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* FILTER MODAL */}
      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-scroll transition-opacity duration-300  ${
          isFilterModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`relative p-4 w-full max-w-md max-h-full transform transition-transform duration-300 ease-in-out ${
            isFilterModalOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Urutkan berdasarkan
              </h3>
              <button
                className=" bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
                onClick={handleFilterModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5">
              <ul className="space-y-2 mb-4">
                <li>
                  <input
                    type="radio"
                    id="hargaMurah"
                    name="filter"
                    value="price.asc"
                    className="hidden peer"
                    checked={filter === "price.asc"}
                    onChange={handleFilter}
                  />
                  <label
                    htmlFor="hargaMurah"
                    className="inline-flex items-center justify-between w-full p-3 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:bg-[#2A629A] peer-checked:text-white hover:text-gray-900 hover:bg-[#EEF5FF]"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-medium">
                        Harga - Termurah
                      </div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="durasiPendek"
                    name="filter"
                    value="duration.asc"
                    className="hidden peer"
                    checked={filter === "duration.asc"}
                    onChange={handleFilter}
                  />
                  <label
                    htmlFor="durasiPendek"
                    className="inline-flex items-center justify-between w-full p-3 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:bg-[#2A629A] peer-checked:text-white hover:text-gray-900 hover:bg-[#EEF5FF]"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-medium">
                        Durasi - Terpendek
                      </div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="keberangkatanAwal"
                    name="filter"
                    value="departure_time.asc"
                    className="hidden peer"
                    checked={filter === "departure_time.asc"}
                    onChange={handleFilter}
                  />
                  <label
                    htmlFor="keberangkatanAwal"
                    className="inline-flex items-center justify-between w-full p-3 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:bg-[#2A629A] peer-checked:text-white hover:text-gray-900 hover:bg-[#EEF5FF]"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-medium">
                        Keberangkatan - Paling Awal
                      </div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="keberangkatanAkhir"
                    name="filter"
                    value="departure_time.desc"
                    className="hidden peer"
                    checked={filter === "departure_time.desc"}
                    onChange={handleFilter}
                  />
                  <label
                    htmlFor="keberangkatanAkhir"
                    className="inline-flex items-center justify-between w-full p-3 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:bg-[#2A629A] peer-checked:text-white hover:text-gray-900 hover:bg-[#EEF5FF]"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-medium">
                        Keberangkatan - Paling Akhir
                      </div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="kedatanganAwal"
                    name="filter"
                    value="arrival_time.asc"
                    className="hidden peer"
                    checked={filter === "arrival_time.asc"}
                    onChange={handleFilter}
                  />
                  <label
                    htmlFor="kedatanganAwal"
                    className="inline-flex items-center justify-between w-full p-3 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:bg-[#2A629A] peer-checked:text-white hover:text-gray-900 hover:bg-[#EEF5FF]"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-medium">
                        Kedatangan - Paling Awal
                      </div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="kedatanganAkhir"
                    name="filter"
                    value="arrival_time.desc"
                    className="hidden peer"
                    checked={filter === "arrival_time.desc"}
                    onChange={handleFilter}
                  />
                  <label
                    htmlFor="kedatanganAkhir"
                    className="inline-flex items-center justify-between w-full p-3 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:bg-[#2A629A] peer-checked:text-white hover:text-gray-900 hover:bg-[#EEF5FF]"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-medium">
                        Kedatangan - Paling Akhir
                      </div>
                    </div>
                  </label>
                </li>
              </ul>
              <button
                className="text-white inline-flex w-full justify-center bg-[#2A629A] transition-colors duration-300 hover:bg-[#003285] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleClearFilter}
              >
                Hapus Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL PILIH KELAS KURSI PENERBANGAN */}
      <div
        className={`${
          seatModalOpen ? "" : "hidden"
        } fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Pilih kelas penerbangan
              </h3>
              <button
                className="text-gray-400 bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
                onClick={handleSeatModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5">
              <ul className="space-y-4 mb-4">
                <li>
                  <input
                    type="radio"
                    id="economy"
                    name="kelas"
                    value="Economy"
                    className="hidden peer"
                    onChange={handleSeat}
                  />
                  <label
                    htmlFor="economy"
                    className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:bg-[#2A629A] peer-checked:text-white hover:text-gray-900 hover:bg-[#EEF5FF]"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-semibold">
                        Economy
                      </div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="prEconomy"
                    name="kelas"
                    value="Premium Economy"
                    className="hidden peer"
                    onChange={handleSeat}
                  />
                  <label
                    htmlFor="prEconomy"
                    className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:bg-[#2A629A] peer-checked:text-white hover:text-gray-900 hover:bg-[#EEF5FF]"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-semibold">
                        Premium Economy
                      </div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="business"
                    name="kelas"
                    value="Business"
                    className="hidden peer"
                    onChange={handleSeat}
                  />
                  <label
                    htmlFor="business"
                    className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:bg-[#2A629A] peer-checked:text-white hover:text-gray-900 hover:bg-[#EEF5FF]"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-semibold">
                        Business
                      </div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="frClass"
                    name="kelas"
                    value="First Class"
                    className="hidden peer"
                    onChange={handleSeat}
                  />
                  <label
                    htmlFor="frClass"
                    className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:bg-[#2A629A] peer-checked:text-white hover:text-gray-900 hover:bg-[#EEF5FF]"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-semibold">
                        First Class
                      </div>
                    </div>
                  </label>
                </li>
              </ul>
              <button
                className="text-white inline-flex w-full justify-center bg-[#2A629A] transition-colors duration-300 hover:bg-[#003285] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleSeatModal}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL PILIH JUMLAH PENUMPANG */}
      <div
        className={`${
          passengerModalOpen ? "" : "hidden"
        } fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50`}
      >
        <div className="relative p-4 w-full lg:w-2/5 max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Pilih Jumlah Penumpang
              </h3>
              <button
                onClick={handlePassengerModal}
                className="text-gray-400 bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="flex items-center mb-1">
                    <FaPerson className="text-xl mr-1" />
                    Dewasa
                  </span>
                  <span className="text-sm text-slate-500">
                    (12 tahun keatas)
                  </span>
                </div>
                <div className="flex gap-5 items-center">
                  <button
                    className="border-2 border-[#2A629A] px-3 py-1 rounded-lg"
                    disabled={penumpang?.dewasa <= 1}
                    onClick={() => handlePenumpang("dewasa", "d")}
                  >
                    -
                  </button>
                  <span className="border-b-2 border-[#2A629A] px-3 pb-1">
                    {penumpang?.dewasa}
                  </span>
                  <button
                    className="border-2 border-[#2A629A] px-3 py-1 rounded-lg"
                    onClick={() => handlePenumpang("dewasa", "i")}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center my-3">
                <div className="flex flex-col">
                  <span className="flex items-center mb-1">
                    <FaChildDress className="text-xl mr-1" />
                    Anak
                  </span>
                  <span className="text-sm text-slate-500">(2 - 11 tahun)</span>
                </div>
                <div className="flex gap-5 items-center">
                  <button
                    className="border-2 border-[#2A629A] px-3 py-1 rounded-lg"
                    disabled={penumpang?.anak === 0}
                    onClick={() => handlePenumpang("anak", "d")}
                  >
                    -
                  </button>
                  <span className="border-b-2 border-[#2A629A] px-3 pb-1">
                    {penumpang?.anak}
                  </span>
                  <button
                    className="border-2 border-[#2A629A] px-3 py-1 rounded-lg"
                    onClick={() => handlePenumpang("anak", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="flex items-center mb-1">
                    <FaBaby className="text-xl mr-1" />
                    Bayi
                  </span>
                  <span className="text-sm text-slate-500">
                    (Dibawah 2 tahun)
                  </span>
                </div>
                <div className="flex gap-5 items-center">
                  <button
                    className="border-2 border-[#2A629A] px-3 py-1 rounded-lg"
                    disabled={penumpang?.bayi === 0}
                    onClick={() => handlePenumpang("bayi", "d")}
                  >
                    -
                  </button>
                  <span className="border-b-2 border-[#2A629A] px-3 pb-1">
                    {penumpang?.bayi}
                  </span>
                  <button
                    className="border-2 border-[#2A629A] px-3 py-1 rounded-lg"
                    onClick={() => handlePenumpang("bayi", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b ">
              <button
                onClick={handlePassengerModal}
                className="text-white bg-[#2A629A] transition-colors duration-300 hover:bg-[#003285] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL PILIH TANGGAL PENERBANGAN */}
      <div
        className={`${
          dateModalOpen ? "" : "hidden"
        } fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Pilih tanggal penerbangan
              </h3>
              <button
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
                onClick={handleDateModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div
              className={`p-5 flex flex-col items-center ${
                isChecked ? "" : "pt-0"
              }`}
            >
              {isChecked ? (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => {
                    setDate([item.selection]);
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  minDate={new Date()}
                  rangeColors={["#2A629A", "#3472b0", "#003285"]}
                />
              ) : (
                <Calendar
                  value={departure_date}
                  onChange={handleSelectDate}
                  minDate={new Date()}
                  color="#2A629A"
                  date={departure_date}
                />
              )}
              <button
                className="text-white inline-flex w-full justify-center bg-[#2A629A] transition-colors duration-300 hover:bg-[#003285] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleDateModal}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobile ? "" : <BtnScrollTop />}
      <Footer />
    </div>
  );
}
