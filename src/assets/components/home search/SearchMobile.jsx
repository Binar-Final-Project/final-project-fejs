import React, { useState, useEffect } from "react";
import {
  MdFlightTakeoff,
  MdFlightLand,
  MdOutlineDateRange,
} from "react-icons/md";
import { PiSeatFill } from "react-icons/pi";
import {
  FaArrowsRotate,
  FaPerson,
  FaBaby,
  FaChildDress,
} from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { getFlight } from "../../../redux/actions/flight/flightActions";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import AirportInput from "../AirportInput";
import { useNavigate } from "react-router-dom";
import { setChoosenFlight } from "../../../redux/reducers/flight/flightReducers";

export default function SearchMobile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [seatModalOpen, setSeatModalOpen] = useState(false); // MODAL KELAS PENERBANGAN
  const [passengerModalOpen, setPassengerModalOpen] = useState(false); // MODAL JUMLAH PENUMPANG
  const [dateModalOpen, setDateModalOpen] = useState(false); // MODAL TANGGAL PENERBANGAN
  const [isChecked, setIsChecked] = useState(false); // TOGGLE TANGGAL KEPULANGAN
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [departure_code, setDeparture_code] = useState("CGK");
  const [arrival_code, setArrival_code] = useState("DPS");
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
  }, [penumpang]);

  // BUAT SUBMIT SEARCH
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (departure_code === "" || arrival_code === "") {
      toast("Harap pilih destinasi Anda!");
      return;
    }

    if (departure_code === arrival_code) {
      toast("Harap pilih destinasi yang berbeda!");
      return;
    }

    if (isChecked === true && date[0].endDate === null) {
      toast("Harap isi tanggal kepulangan!");
      return;
    }

    const departureDate = date[0].startDate.toISOString().split("T")[0];
    const returnDate = date[0].endDate.toISOString().split("T")[0];

    if (isChecked && departureDate === returnDate) {
      toast("Harap pilih tanggal yang berbeda!", {
        style: {
          background: "#FF0000",
          color: "#fff",
        },
      });
      return;
    }

    dispatch(
      getFlight(
        departure_code,
        arrival_code,
        departureDate,
        seat_class,
        total_passenger,
        filter,
        page
      )
    );

    dispatch(setChoosenFlight([]));

    // Navigasi ke halaman pencarian
    if (isChecked && returnDate) {
      navigate(
        `/hasil-pencarian?from=${departure_code}&to=${arrival_code}&departureDate=${departureDate}&returnDate=${returnDate}&class=${seat_class}&passenger=${total_passenger}&adult=${penumpang.dewasa}&child=${penumpang.anak}&infant=${penumpang.bayi}`,
        { replace: true }
      );
    } else {
      navigate(
        `/hasil-pencarian?from=${departure_code}&to=${arrival_code}&departureDate=${departureDate}&class=${seat_class}&passenger=${total_passenger}&adult=${penumpang.dewasa}&child=${penumpang.anak}&infant=${penumpang.bayi}`,
        { replace: true }
      );
    }
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
    <div>
      <div className="bg-[#2A629A] rounded-b-3xl w-full h-[300px] py-3 px-4">
        <Toaster
          toastOptions={{
            className: "w-full",
            duration: 3000,
            style: {
              background: "#FF0000",
              color: "#fff",
            },
          }}
        />
        <h4 className="text-2xl text-white font-medium my-3">
          Ke mana pun Anda pergi, kami akan mengantar Anda!
        </h4>
        <div>
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
                  <h5 className="text-gray-500 text-sm font-medium mr-3.5">
                    Ke
                  </h5>
                  <div className="flex flex-row items-center">
                    <MdFlightLand className="text-xl text-gray-500 absolute" />
                    <div className="w-full">
                      <AirportInput
                        value={arrival_code}
                        onChange={(airportCode) => setArrival_code(airportCode)}
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
                      } rounded-full outline-none duration-300 after:duration-300 w-12 h-7 shadow-md peer-focus:outline-none after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-5 after:w-5 after:top-1 after:left-0 after:translate-x-1 peer-checked:after:translate-x-6 peer-hover:after:scale-95 ${
                        isChecked
                          ? "peer-checked:translate-x-0"
                          : "peer-checked:translate-x-0"
                      }`}
                    ></div>
                  </label>
                </div>
                <div>
                  <h5 className="text-gray-500 text-sm font-medium mr-3.5">
                    Tanggal Pergi
                  </h5>
                  <div className="flex flex-row items-center">
                    <MdOutlineDateRange className="text-xl text-gray-500 absolute" />
                    <span
                      className="block py-2.5 px-8 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300"
                      onClick={handleDateModal}
                    >
                      {date[0].startDate
                        ? `${format(date[0].startDate, "MM/dd/yyyy")}  `
                        : "Pilih Tanggal"}
                    </span>
                  </div>
                </div>
                {isChecked ? (
                  <div className="mt-5">
                    <h5 className="text-gray-500 text-sm font-medium mr-3.5">
                      Tanggal Pulang
                    </h5>
                    <div className="flex flex-row items-center">
                      <MdOutlineDateRange className="text-xl text-gray-500 absolute" />
                      <span
                        className="block py-2.5 px-8 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300"
                        onClick={handleDateModal}
                      >
                        {date[0].endDate
                          ? `${format(date[0].endDate, "MM/dd/yyyy")}  `
                          : "Pilih Tanggal"}
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
                      <div className="flex items-center">
                        <FaPerson className="text-xl absolute" />
                        <div className="relative flex gap-2 z-0">
                          <div
                            className="block py-2.5 px-6 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300"
                            onClick={handlePassengerModal}
                          >
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
                  className="w-full p-4 bg-[#2A629A] text-white rounded-lg"
                  onClick={handleSubmit}
                >
                  Cari Penerbangan
                </button>
              </div>
            </div>
          </form>
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

            <div className="p-4 md:p-5">
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
    </div>
  );
}
