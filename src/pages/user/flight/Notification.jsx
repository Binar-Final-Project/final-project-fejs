import React, { useEffect, useState, Fragment } from "react";
import Navbar from "../../../assets/components/navigations/navbar/Navbar";
import Footer from "../../../assets/components/navigations/Footer";
import NavbarMobile from "../../../assets/components/navigations/navbar/Navbar-mobile";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { Listbox, Transition } from "@headlessui/react";

//ICON
import { IoFilter } from "react-icons/io5";
import { IoMdNotifications, IoMdCheckmark } from "react-icons/io";
import { HiOutlineSelector } from "react-icons/hi";

const filter = [
  { id: 1, status: "Semua" },
  { id: 2, status: "Unread" },
  { id: 3, status: "Read" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Notification() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [selected, setSelected] = useState(filter[0]);

  const navigate = useNavigate();

  return (
    <div className="bg-[#FFF0DC] py-5 md:py-0">
      {isMobile ? <NavbarMobile /> : <Navbar />}
      <div className="m-5 md:m-10 md:py-20">
        <div className="flex items-center">
          <div className={`lg:w-1/12 ${isMobile ? "hidden" : ""}`}>
            <Link to="/">
              <div className="flex font-medium items-center text-[#003285] hover:text-[#40A2E3]">
                <IoIosArrowBack className="text-3xl" />
                <h6 className="text-lg">Kembali</h6>
              </div>
            </Link>
          </div>

          <div className="text-center flex-1">
            <h5 className="text-3xl font-medium text-[#003285]">Notifikasi</h5>
          </div>
          <div className="flex items-center">
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <div className="mt-1 relative w-36">
                    <Listbox.Button className="flex items-center border-[#003285] border-2 py-2 px-3 w-full rounded-full">
                      <span className="truncate flex items-center">
                        <IoFilter className="mr-1 text-xl" />
                        {selected.status}
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
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "block truncate"
                                  )}
                                >
                                  {filtered.status}
                                </span>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? "text-white" : "text-[#2A629A]",
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
        </div>

        <Toaster />

        <div className="flex flex-col items-center my-10">
          {/* JIKA BELUM ADA NOTIFIKASI */}
          {/* <div>
            <iframe
              src="https://lottie.host/embed/397bb08f-ee92-4a3f-af20-150e6772e5a8/t586J4UID0.json"
              className="md:ml-10 ml-7"
            ></iframe>
            <h5 className="text-[#003285] text-xl font-medium text-center">
            Halaman notifikasi Anda masih kosong
            </h5>
          </div> */}

          {/* JIKA SUDAH ADA NOTIFIKASI */}
          <div className="w-full flex flex-col gap-3">
            <div className="border-[#003285] border-b-2 px-6 py-2 w-full">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <IoMdNotifications className="text-white bg-[#40A2E3] rounded-full text-3xl p-1" />
                  <p className="ml-2 font-medium">Judul Notif</p>
                </div>
                <div className="flex items-center gap-2">
                  <time>27 Mei, 15:52</time>
                  <div className="text-3xl text-green-500 font-extrabold">
                    •
                  </div>
                </div>
              </div>
              <div className="ps-10">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                  eligendi obcaecati voluptatem? Labore laboriosam nostrum
                  inventore unde dolore quos earum sunt, officia itaque
                  architecto eveniet tempora amet quidem fuga soluta?
                </p>
              </div>
            </div>
            <div className="border-[#003285] border-b-2 px-6 py-2 w-full">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <IoMdNotifications className="text-white bg-[#40A2E3] rounded-full text-3xl p-1" />
                  <p className="ml-2 font-medium">Judul Notif</p>
                </div>
                <div className="flex items-center gap-2">
                  <time>27 Mei, 15:52</time>
                  <div className="text-3xl text-red-500 font-extrabold">•</div>
                </div>
              </div>
              <div className="ps-10">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                  eligendi obcaecati voluptatem? Labore laboriosam nostrum
                  inventore unde dolore quos earum sunt, officia itaque
                  architecto eveniet tempora amet quidem fuga soluta?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
