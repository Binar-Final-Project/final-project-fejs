import React, { useState, useEffect, Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import Navbar from "../../../assets/components/navigations/navbar/Navbar";
import Footer from "../../../assets/components/navigations/Footer";
import NavbarMobile from "../../../assets/components/navigations/navbar/Navbar-mobile";
import BtnScrollTop from "../../../assets/components/BtnScrollUp";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../assets/components/Loader";
import { Listbox, Transition } from "@headlessui/react";

//ICON
import { IoIosArrowBack, IoMdCheckmark } from "react-icons/io";
import { IoFilter, IoLocationSharp } from "react-icons/io5";
import { HiOutlineSelector } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
import { getTransactions } from "../../../redux/actions/flight/transactionActions";

const filter = [
  { id: 1, status: "Semua" },
  { id: 2, status: "Issued" },
  { id: 3, status: "Unpaid" },
  { id: 4, status: "Cancelled" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function OrderHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const { transactions } = useSelector((state) => state.transaction);
  console.log("transactions", transactions);

  const [selectedFilter, setSelectedFilter] = useState(filter[0]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [lt, setLt] = useState("");
  const [gte, setGte] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    dispatch(getTransactions(lt, gte, q));
  }, []);

  // UNTUK MODAL PENCARIAN
  const handleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  // FUNGSI UNTUK MENGUBAH DURASI PENERBANGAN
  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}j${hours > 1 ? "" : ""} ${remainingMinutes}m${
      remainingMinutes > 1 ? "" : ""
    }`;
  }

  return (
    <div className="bg-[#FFF0DC] py-5 md:py-0">
      {/* <Loader /> */}
      {isMobile ? <NavbarMobile /> : <Navbar />}
      <div className="m-5 md:m-10 md:py-20">
        {/* BACK BUTTON AND TOASTER */}
        <div>
          <Toaster />
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 mb-6">
            <div className={`${isMobile ? "hidden" : "lg:w-1/12"}`}>
              <Link to="/">
                <div className="flex font-medium items-center text-[#003285] hover:text-[#40A2E3]">
                  <IoIosArrowBack className="text-3xl" />
                  <h6 className="text-lg">Kembali</h6>
                </div>
              </Link>
            </div>
            <div className="text-center flex-1">
              <h5 className="text-3xl font-medium text-[#003285]">
                Riwayat Pemesanan
              </h5>
            </div>
            {/* BUTTON FILTER TANGGAL DAN PENCARIAN*/}
            <div className="flex items-center">
              <div className="flex items-center">
                <Listbox value={selectedFilter} onChange={setSelectedFilter}>
                  {({ open }) => (
                    <>
                      <div className="mt-1 relative w-36">
                        <Listbox.Button className="flex items-center border-[#003285] border-2 py-2 px-3 w-full rounded-full">
                          <span className="truncate flex items-center">
                            <IoFilter className="mr-1 text-xl" />
                            {selectedFilter.status}
                          </span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <HiOutlineSelector
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            {filter?.map((filtered) => (
                              <Listbox.Option
                                key={filtered.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "text-white bg-[#2A629A]"
                                      : "text-gray-900",
                                    "cursor-default select-none relative py-2 pl-3 pr-9"
                                  )
                                }
                                value={filtered}
                              >
                                {({ selectedFilter, active }) => (
                                  <>
                                    <span
                                      className={classNames(
                                        selectedFilter
                                          ? "font-semibold"
                                          : "font-normal",
                                        "block truncate"
                                      )}
                                    >
                                      {filtered.status}
                                    </span>

                                    {selectedFilter ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-[#2A629A]",
                                          "absolute inset-y-0 right-0 flex items-center pr-4"
                                        )}
                                      >
                                        <IoMdCheckmark
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>

              {/* BUTTON SEARCH */}
              <div className="ml-3">
                <button className="pt-1 w-full" onClick={handleSearchModal}>
                  <RiSearchLine className="text-3xl text-[#003285]" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* JIKA BELUM ADA RIWAYAT PEMESANAN */}
        {transactions?.length === 0 && (
          <div className="flex flex-col items-center my-10">
            {/* <div className="flex flex-col items-center">
            <iframe src="https://lottie.host/embed/d3072280-f0c3-4850-9067-359d9d6b5744/V9wwvXaroH.json"></iframe>
            <h5 className="text-[#003285] text-xl font-medium text-center">
              Anda belum memiliki riwayat pesanan.
            </h5>
            <p className="text-[#003285] text-sm font-medium">
              Silahkan lakukan pemesanan dan temukan perjalanan yang seru!
            </p>
            <Link to="/">
              <button className="bg-[#003285] text-white rounded-lg shadow-md px-4 py-2 mt-3 w-full">
                Cari Penerbangan
              </button>
            </Link>
          </div> */}
          </div>
        )}
        {/* JIKA ADA RIWAYAT PEMESANAN */}
        <div className="flex flex-col lg:flex-row justify-center gap-14 overflow-hidden">
          <div className="">
            <h4 className="text-xl text-[#003285] font-semibold">Juni 2024</h4>
            {transactions?.map((transaction) => (
              <div
                className="bg-white shadow-lg p-6 rounded-xl my-3"
                key={transaction?.transaction_id}
              >
                <div>
                  {transaction?.status === "ISSUED" && (
                    <span className="bg-[#73CA5C] text-white py-2 px-4 rounded-full">
                      Issued
                    </span>
                  )}
                  {transaction?.status === "UNPAID" && (
                    <span className="bg-[#FF0000] text-white py-2 px-4 rounded-full">
                      Unpaid
                    </span>
                  )}
                </div>
                <div className="flex flex-col mt-6 gap-4">
                  <div className="flex justify-between items-center gap-0">
                    <div className="flex">
                      <IoLocationSharp className="text-2xl font-extrabold text-[#003285]" />
                      <div>
                        <h5 className="text-xl font-medium">Jekardah</h5>
                        <div className="flex flex-col">
                          <time className="text-sm">
                            {new Date(
                              transaction?.departure_flight?.flight_date
                            ).toLocaleString("id-ID", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                          </time>
                          <time className="text-sm">
                            {transaction?.departure_flight?.departure_time}
                          </time>
                        </div>
                      </div>
                    </div>
                    <div className="border-b-2 border-[#003285] lg:w-[35vh] md:w-[35vh]  text-center text-sm">
                      <time>
                        {formatDuration(
                          transaction?.departure_flight?.duration
                        )}
                      </time>
                    </div>
                    <div className="flex">
                      <IoLocationSharp className="text-2xl font-extrabold text-[#003285]" />
                      <div>
                        <h5 className="text-xl font-medium">Jakarta</h5>
                        <div className="flex flex-col">
                          <time className="text-sm">
                            {new Date(
                              transaction?.departure_flight?.flight_date
                            ).toLocaleString("id-ID", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                          </time>
                          <time className="text-sm">
                            {transaction?.departure_flight?.arrival_time}
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* JIKA TIKET PULANG-PERGI */}
                  {transaction?.return_flight && (
                    <div className="flex justify-between items-center gap-3">
                      <div className="flex">
                        <IoLocationSharp className="text-2xl font-extrabold text-[#003285]" />
                        <div>
                          <h5 className="text-xl font-medium">Jekardah</h5>
                          <div className="flex flex-col">
                            <time className="text-sm">
                              {new Date(
                                transaction?.return_flight?.flight_date
                              ).toLocaleString("id-ID", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              })}
                            </time>
                            <time className="text-sm">
                              {transaction?.return_flight?.departure_time}
                            </time>
                          </div>
                        </div>
                      </div>
                      <div className="border-b-2 border-[#003285] lg:w-[35vh] md:w-[35vh] text-center text-sm">
                        <time>78j 9m</time>
                      </div>
                      <div className="flex">
                        <IoLocationSharp className="text-2xl font-extrabold text-[#003285]" />
                        <div>
                          <h5 className="text-xl font-medium">Jakarta</h5>
                          <div className="flex flex-col">
                            <time className="text-sm">
                              {new Date(
                                transaction?.return_flight?.flight_date
                              ).toLocaleString("id-ID", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              })}
                            </time>
                            <time className="text-sm">
                              {transaction?.return_flight?.arrival_time}
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <hr />
                  <div className="flex flex-col md:flex-row justify-between md:items-center">
                    <div className="flex flex-col">
                      <h5 className="font-medium">Booking Code:</h5>
                      <p>{transaction?.booking_code}</p>
                    </div>
                    <div className="flex flex-col">
                      <h5 className="font-medium">Class:</h5>
                      <p>
                        {transaction?.departure_flight?.class}{" "}
                        {transaction?.return_flight?.class
                          ? `/ ${transaction?.return_flight?.class}`
                          : ""}
                      </p>
                    </div>
                    <h4 className="text-lg font-semibold text-[#003285]">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(transaction?.total_price)}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-2/5">
            {/* CARD DETAIL TIKET */}
            <div className="bg-white shadow-lg p-6 rounded-xl my-3">
              <div className="flex justify-between items-center gap-3 mb-2">
                <h4 className="text-xl text-[#003285] font-semibold">
                  Detail Pesanan
                </h4>
                <span className="bg-[#73CA5C] text-white py-2 px-4 rounded-full text-sm">
                  Issued
                </span>
              </div>
              <div className="flex my-4">
                <h5>Booking Code : </h5>
                <p className="text-[#003285] font-semibold ml-2"> XXXXXXXX</p>
              </div>
              <div className="flex flex-row gap-3">
                <div className="flex flex-col justify-between items-center">
                  <div className="flex flex-col text-center mt-1.5">
                    <time className="mb-1 text-lg font-semibold leading-none ">
                      19:00
                    </time>
                    <div className="text-sm">27 apmei 2003</div>
                  </div>
                  <div className="pt-12">
                    <span className="text-sm">45j 0m</span>
                  </div>
                  <div></div>
                  <div className="flex flex-col text-center mt-1.5">
                    <time className="mb-1 text-lg font-semibold leading-none ">
                      23:00
                    </time>
                    <div className="text-sm">89 juli 2098</div>
                  </div>
                  <div></div>
                </div>
                <div>
                  <ol className="relative border-s border-gray-200">
                    <li className="mb-5 ms-4">
                      <div className="absolute w-3 h-3 bg-[#2A629A] rounded-full mt-1.5 -start-1.5 border border-white"></div>
                      <h3 className="text-lg font-semibold">jekardah (CGK)</h3>
                      <p className="text-sm ">Sukarno</p>
                      <p className="mb-4 text-sm ">terminal wahid</p>
                    </li>
                    <li className="mb-5 ms-4 flex flex-col gap-1">
                      <div className="flex items-center">
                        <p>garudah</p>
                        {/* <img
                        src={flight?.airline_icon_url}
                        className="h-8 ml-2"
                        alt="Airline Logo"
                      /> */}
                      </div>
                      <div>
                        <h5 className="text-[#003285]">
                          Penumpang 1: Mr. Fulan
                        </h5>
                        <p>ID: XXXXXXXX</p>
                      </div>
                      <div>
                        <h5 className="text-[#003285]">
                          Penumpang 2: Mrs. Fulana
                        </h5>
                        <p>ID: XXXXXXXX</p>
                      </div>
                    </li>
                    <li className="ms-4">
                      <div className="absolute w-3 h-3 bg-[#2A629A] rounded-full mt-1.5 -start-1.5 border border-white"></div>
                      <h3 className="text-lg font-semibold">baleh (DPS)</h3>
                    </li>
                  </ol>

                  <div className="ms-4">
                    <p className="text-sm">ngurai</p>
                    <p className="text-sm">terminal</p>
                  </div>
                </div>
              </div>
              <div className="my-4 py-3 border-y-2">
                <h5 className="font-semibold ">Rincian Harga</h5>
                <div className="flex justify-between">
                  <div>
                    <p>10 Dewasa</p>
                    <p>90 Anak</p>
                    <p>390 Bayi</p>
                    <p>Pajak</p>
                  </div>
                  <div>
                    <p>Rp XXXXXXXX</p>
                    <p>Rp XXXXXXXX</p>
                    <p>Rp XXXXXXXX</p>
                    <p>Rp XXXXXXXX</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between font-semibold text-xl text-[#003285]">
                <h5>Total</h5>
                <h5>Rp XXXXXXX</h5>
              </div>
            </div>
            <div className="w-full">
              <button className="mt-4 w-full inline-flex justify-center rounded-xl border-0 shadow-sm py-3 bg-[#FF0000] font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-0">
                Lanjut Bayar
              </button>
              <button className="mt-4 w-full inline-flex justify-center rounded-xl border-0 shadow-sm py-3 bg-[#2A629A] font-medium text-white hover:bg-[#3472b0] focus:outline-none focus:ring-0">
                Cetak Tiket
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL PENCARIAN */}
      <div
        className={`${
          isSearchModalOpen ? "" : "hidden"
        } fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-scroll`}
      >
        <div className="relative p-4 w-full max-w-3xl max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Cari Tiket Berdasarkan
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
            <div className="flex flex-col md:flex-row p-6 gap-3 justify-center items-center">
              <div className="border-2 rounded-lg flex flex-col items-center p-2">
                <iframe src="https://lottie.host/embed/72132a09-da5e-4a3a-8feb-12578f19460b/O2UwvcCC5S.json"></iframe>
                <h5 className="text-xl font-medium text-[#003285]">
                  Booking Code
                </h5>
              </div>
              <div className="border-2 rounded-lg flex flex-col items-center p-2">
                <iframe src="https://lottie.host/embed/0ca4c8c8-3f0d-4340-a5b9-f3634e51687c/I0PxXV0ARf.json"></iframe>
                <h5 className="text-xl font-medium text-[#003285]">
                  Tanggal Penerbangan
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMobile ? "" : <BtnScrollTop />}
      <Footer />
    </div>
  );
}
