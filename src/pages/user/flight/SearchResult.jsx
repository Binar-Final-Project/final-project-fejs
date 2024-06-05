import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Navbar from "../../../assets/components/navigations/navbar/Navbar";
import Footer from "../../../assets/components/navigations/Footer";
import NavbarMobile from "../../../assets/components/navigations/navbar/Navbar-mobile";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import airports from "../../../assets/airports/airports.json";
// ICON
import { RiSearchLine } from "react-icons/ri";
import { IoFilter } from "react-icons/io5";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { TfiArrowCircleDown, TfiArrowCircleUp } from "react-icons/tfi";
import { PiBagSimpleBold } from "react-icons/pi";
import { FiInfo } from "react-icons/fi";
import { LuLuggage } from "react-icons/lu";
import {
  FaArrowsRotate,
  FaPerson,
  FaBaby,
  FaChildDress,
} from "react-icons/fa6";

export default function SearchResult() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // TOGGLE TANGGAL KEPULANGAN
  const [seatModalOpen, setSeatModalOpen] = useState(false); // MODAL KELAS PENERBANGAN
  const [passengerModalOpen, setPassengerModalOpen] = useState(false); // MODAL JUMLAH PENUMPANG
  const [dateModalOpen, setDateModalOpen] = useState(false); // MODAL TANGGAL PENERBANGAN
  const [filter, setFilter] = useState(null);
  const [detailOpen, setDetailOpen] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [departure_code, setDeparture_code] = useState("");
  const [arrival_code, setArrival_code] = useState("");
  const [seat_class, setSeat_class] = useState("Economy");
  const [total_passenger, setTotal_passenger] = useState(1);
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
    setSeat_class(e.target.value);
  };

  // BUAT NAMPILIN INPUT TANGGAL KEPULANGAN
  const handleToggleChange = () => {
    setIsChecked(!isChecked);
  };

  // BUAT TANGGAL KEPULANGAN TRUE ATAU FALSE
  useEffect(() => {
    if (isChecked) {
      setDate([
        {
          ...date[0],
          endDate: null,
        },
      ]);
    } else if (!isChecked) {
      setDate([
        {
          ...date[0],
          endDate: new Date(),
        },
      ]);
    }
  }, [isChecked]);

  // BUAT COUNTER JUMLAH PENUMPANG
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
  }, [penumpang, isChecked]);

  // FUNGSI UNTUK MODAL FILTER URUTAN
  const handleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  // FUNGSI UNTUK MENGHAPUS FILTER
  const handleReset = () => {
    setFilter(null);
  };

  // FUNGSI UNTUK MENAMPILKAN DETAIL TIKET PENERBANGAN
  const handleDetail = (index) => {
    setDetailOpen(!detailOpen);
  };

  // MODAL MILIH KELAS PENERBANGAN
  const handleSeatModal = () => {
    setSeatModalOpen(!seatModalOpen);
  };

  // MODAL JUMLAH PENUMPANG
  const handlePassengerModal = () => {
    setPassengerModalOpen(!passengerModalOpen);
  };

  // MODAL TANGGAL
  const handleDateModal = () => {
    setDateModalOpen(!dateModalOpen);
  };

  return (
    <div className="bg-[#FFF0DC] py-5 md:py-0">
      {isMobile ? <NavbarMobile /> : <Navbar />}
      <div className="m-5 md:m-10">
        <p className="text-3xl font-bold text-[#003285] mb-4">
          Hasil Pencarian
        </p>

        {/* SEARCH CARD */}
        {isMobile ? (
          ""
        ) : (
          <div className="w-full bg-white shadow-lg py-3 px-8 rounded-lg">
            <div className="flex lg:flex-row md:flex-col justify-between">
              <div className="flex md:gap-3 lg:gap-5 items-center">
                <RiSearchLine className="text-2xl text-[#003285]" />
                <div>
                  <select
                    value={departure_code}
                    onChange={(e) => setDeparture_code(e.target.value)}
                    className="text-sm focus:outline-none"
                  >
                    {airports.map((airport) => (
                      <option key={airport.iata_code} value={airport.iata_code}>
                        {airport.city} - {airport.iata_code}
                      </option>
                    ))}
                  </select>
                </div>
                <button onClick={handleRotateClick}>
                  <div className="shadow-lg rounded-xl bg-[#EEF5FF] p-3">
                    <FaArrowsRotate className="" />
                  </div>
                </button>
                <div>
                  <select
                    value={arrival_code}
                    onChange={(e) => setArrival_code(e.target.value)}
                    className="text-sm focus:outline-none"
                  >
                    {airports.map((airport) => (
                      <option key={airport.iata_code} value={airport.iata_code}>
                        {airport.city} - {airport.iata_code}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="border-x-2 px-5" onClick={handleDateModal}>
                  {`${format(date[0].startDate, "MM/dd/yyyy")} `}
                </div>
                <div className="border-r-2 pr-5" onClick={handlePassengerModal}>
                  {total_passenger} Penumpang
                </div>
                <div onClick={handleSeatModal}>{seat_class}</div>
              </div>
              <div className="flex md:justify-end md:mt-4 lg:mt-0">
                <button
                  type="button"
                  className="py-2 px-10 rounded-2xl bg-[#2A629A] text-white hover:bg-[#3472b0]"
                >
                  <div className="flex items-center font-medium">
                    <span className="text-md">Cari</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
        {/* FILTER AND PAGE SECTION */}
        <div className="flex justify-end items-center my-6 gap-5">
          {filter === null ? (
            <button onClick={handleFilterModal}>
              <div className="flex items-center border-[#003285] border-2 py-2 px-3 rounded-full">
                <IoFilter className="mr-1 text-xl" />
                Urutkan
              </div>
            </button>
          ) : (
            <button onClick={handleFilterModal}>
              <div className="flex items-center bg-[#003285] py-2 px-3 rounded-full text-white">
                <IoFilter className="mr-1 text-xl" />
                Urutkan
              </div>
            </button>
          )}

          <div>
            <div className="flex items-center">
              <button className="text-2xl mr-2">
                <FaArrowCircleLeft className="text-[#003285] hover:text-[#003285]/75" />
              </button>
              1 dari n
              <button className="text-2xl ml-2">
                <FaArrowCircleRight className="text-[#003285] hover:text-[#003285]/75" />
              </button>
            </div>
          </div>
        </div>

        {/* SEARCH RESULT */}
        {/* JIKA HASILNYA KOSONG ATAU TIDAK ADA */}
        {/* <div className="flex flex-col justify-center items-center text-center">
          <iframe src="https://lottie.host/embed/31de7bda-4460-481f-9ba3-b26a92252434/ZtAJ9lwHGA.json"></iframe>
          <p className="text-3xl font-bold text-[#003285] mt-6 mb-2">
            Penerbangan yang Anda cari tidak tersedia
          </p>
          <p>
            Silahkan ganti tanggal atau destinasi lainnya untuk menemukan
            perjalanan seru.
          </p>
        </div> */}
        {/* JIKA HASILNYA ADA */}
        <div className="flex flex-col gap-5">
          <div className="bg-white shadow-lg p-6 rounded-xl">
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-8">
              <div className="flex items-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/f5/AirAsia_New_Logo.svg"
                  className="h-10"
                  alt="Airasia Logo"
                />
                <h5 className="font-medium text-lg mx-2">Air Asia</h5>
                <LuLuggage className="text-2xl" />
              </div>
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <div>
                    <h5 className="text-xl font-semibold">23:35</h5>
                  </div>
                  <div className="border-b-2 border-[#003285] lg:w-[30vh] md:w-[10vh] w-[25vh] text-center text-sm">
                    <time>1 Abad 100 Tahun</time>
                  </div>
                  <div>
                    <h5 className="text-xl font-semibold">09:00</h5>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>CGK</div>
                  <div>SUB</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                {detailOpen ? (
                  <button onClick={handleDetail}>
                    <TfiArrowCircleUp className="text-3xl text-[#003285]" />
                  </button>
                ) : (
                  <button onClick={handleDetail}>
                    <TfiArrowCircleDown className="text-3xl text-[#003285]" />
                  </button>
                )}
                <h5 className="text-xl font-semibold text-[#003285]">
                  Rp 1.254.000/orang
                </h5>
                <button
                  type="button"
                  className="py-2 px-10 rounded-2xl bg-[#2A629A] text-white hover:bg-[#3472b0]"
                >
                  <div className="flex items-center font-medium">
                    <span className="text-md">Pilih</span>
                  </div>
                </button>
              </div>
            </div>
            {detailOpen && (
              <div className="border-t-2 py-2 mt-4 ">
                <div>
                  <h4 className="text-lg font-semibold text-[#003285] my-3">
                    Detail Penerbangan
                  </h4>
                  <ol className="relative border-s border-gray-200">
                    <li className="mb-5 ms-4">
                      <div className="absolute w-3 h-3 bg-[#2A629A] rounded-full mt-1.5 -start-1.5 border border-white"></div>
                      <time className="mb-1 text-md leading-none ">
                        5 Juni 2024, 23:25
                      </time>
                      <h3 className="text-lg font-semibold">Jakarta (CGK)</h3>
                      <p className="mb-4 text-sm ">Terminal 1A</p>
                    </li>
                    <li className="mb-5 ms-4">
                      <div className="flex items-center">
                        <p>Air Asia</p>
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/f/f5/AirAsia_New_Logo.svg"
                          className="h-8 ml-2"
                          alt="Airasia Logo"
                        />
                      </div>
                      <div className="text-sm">
                        <span>Economy</span>
                      </div>
                      <div className="flex gap-5 md:gap-20 my-3 flex-col md:flex-row">
                        <div className="flex gap-3">
                          <div>
                            <PiBagSimpleBold className="text-xl" />
                          </div>
                          <div className="gap-1 flex flex-col">
                            <p className="text-sm">Kabin : 90 kg</p>
                            <p className="text-sm">Bagasi : 1 ton</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div>
                            <FiInfo className="text-xl" />
                          </div>
                          <div>
                            <p className="text-sm">Airbus</p>
                            <p className="text-sm">Entertaiment</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="ms-4">
                      <div className="absolute w-3 h-3 bg-[#2A629A] rounded-full mt-1.5 -start-1.5 border border-white"></div>
                      <time className="mb-1 text-md leading-none ">
                        6 Juni 2024, 09:00
                      </time>
                    </li>
                  </ol>
                  <div className="ms-4">
                    <h3 className="text-lg font-semibold">Surabaya (SUB)</h3>
                    <p className="text-sm">Terminal Domestik</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FILTER MODAL */}
      <div
        className={`${
          isFilterModalOpen ? "" : "hidden"
        } fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Urutkan berdasarkan
              </h3>
              <button
                className=" bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
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
                    value="Harga - Termurah"
                    className="hidden peer"
                    checked={filter === "Harga - Termurah"}
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
                    value="Durasi - Terpendek"
                    className="hidden peer"
                    checked={filter === "Durasi - Terpendek"}
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
                    value="Keberangkatan - Paling Awal"
                    className="hidden peer"
                    checked={filter === "Keberangkatan - Paling Awal"}
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
                    value="Keberangkatan - Paling Akhir"
                    className="hidden peer"
                    checked={filter === "Keberangkatan - Paling Akhir"}
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
                    value="Kedatangan - Paling Awal"
                    className="hidden peer"
                    checked={filter === "Kedatangan - Paling Awal"}
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
                    value="Kedatangan - Paling Akhir"
                    className="hidden peer"
                    checked={filter === "Kedatangan - Paling Akhir"}
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
              <div className="flex gap-5">
                <button
                  type="button"
                  className="text-white inline-flex w-full justify-center bg-[#2A629A] hover:bg-[#3472b0] font-medium rounded-lg px-5 py-2.5 text-center"
                  onClick={handleReset}
                >
                  Hapus Filter
                </button>
                <button
                  className="text-white inline-flex w-full justify-center bg-[#2A629A] hover:bg-[#3472b0] font-medium rounded-lg px-5 py-2.5 text-center"
                  onClick={handleFilterModal}
                >
                  Pilih
                </button>
              </div>
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
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
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
                className="text-white inline-flex w-full justify-center bg-[#2A629A] hover:bg-[#3472b0] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
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
                className="text-white bg-[#2A629A] hover:bg-[#3472b0] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
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
            <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t ">
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

            <div className="p-5 flex flex-col items-center">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  setDate([item.selection]);
                  if (!isChecked) {
                    setDate([
                      {
                        ...item.selection,
                        endDate: null,
                      },
                    ]);
                  } else {
                    setDate([item.selection]);
                  }
                }}
                moveRangeOnFirstSelection={false}
                ranges={date}
                minDate={new Date()}
              />
              <button
                className="text-white inline-flex w-full justify-center bg-[#2A629A] hover:bg-[#3472b0] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleDateModal}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
