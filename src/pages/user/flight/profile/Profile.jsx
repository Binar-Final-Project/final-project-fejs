import React, { useState, useEffect } from "react";
import Navbar from "../../../../assets/components/navigations/navbar/Navbar";
import Footer from "../../../../assets/components/navigations/Footer";
import NavbarMobile from "../../../../assets/components/navigations/navbar/Navbar-mobile";
import { IoIosArrowBack, IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { TbUserEdit } from "react-icons/tb";
import { SlSettings } from "react-icons/sl";
import { useMediaQuery } from "react-responsive";
export default function Profile() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  const handleConfirmModalToggle = () => {
    setConfirmModalOpen(!confirmModalOpen);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    setSaveModalOpen(!saveModalOpen);
  };

  return (
    <div className="bg-[#FFF0DC] py-5 md:py-0">
      {isMobile ? <NavbarMobile /> : <Navbar />}
      <div className="m-5 md:m-10">
        <div className="lg:w-1/12">
          <Link to={-1}>
            <div className="flex font-medium items-center text-[#003285] hover:text-[#40A2E3]">
              <IoIosArrowBack className="text-3xl" />
              <h6 className="text-lg">Kembali</h6>
            </div>
          </Link>
        </div>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-medium">Akun Saya</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-center">
          <div className="md:mr-12">
            <div className="w-full max-w-sm bg-white rounded-t-lg shadow p-4">
              <div className="text-center text-[#003285]">
                <h2 className="font-medium text-xl">John Doe</h2>
              </div>
            </div>
            <div className="w-full max-w-sm bg-white shadow my-2">
              <div className="divide-y divide-gray-300">
                <Link to="/profil">
                  <div className="flex items-center px-4 py-3 bg-[#2A629A] text-white">
                    <TbUserEdit className="mr-2 text-2xl" /> Ubah Profil
                  </div>
                </Link>
                <Link to="/pengaturan-akun">
                  <div className="flex items-center px-4 py-3 hover:bg-[#EEF5FF]">
                    <SlSettings className="mr-2 text-2xl text-[#003285]" />{" "}
                    Pengaturan Akun
                  </div>
                </Link>
              </div>
            </div>
            <div className="w-full max-w-sm bg-white rounded-b-lg shadow mb-2">
              <div
                className="flex items-center hover:bg-[#EEF5FF] p-4 w-full rounded-b-lg"
                onClick={handleConfirmModalToggle}
              >
                <IoMdLogOut className="mr-2 text-2xl text-[#003285]" /> Keluar
              </div>
            </div>
          </div>
          <div className="w-full max-w-sm mt-5 md:mt-0">
            <div className="bg-[#2A629A] text-white rounded-t-md shadow p-3">
              <h3 className="font-semibold text-xl">Ubah Data Diri</h3>
            </div>
            <div className=" bg-white rounded-b-md shadow p-3">
              <form>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-[#003285] "
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-[#003285] focus:border-[#003285] block w-full p-2.5 "
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="my-3">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-[#003285] "
                  >
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-[#003285] focus:border-[#003285] block w-full p-2.5 "
                    placeholder="+6281234567890"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-[#003285] "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-[#003285] focus:border-[#003285] block w-full p-2.5 "
                    placeholder="johndoe@gmail.com"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveModal}
                    className="py-2 px-4 rounded-lg bg-[#2A629A] text-white hover:bg-[#3472b0] mt-3"
                  >
                    Simpan
                  </button>
                </div>
                {saveModalOpen && (
                  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                      <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                          <h3 className="text-xl font-semibold text-gray-900">
                            Simpan Perubahan
                          </h3>
                          <button
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            onClick={handleSaveModal}
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
                          <p className="text-base leading-relaxed text-gray-500">
                            Apakah Anda yakin ingin menyimpan perubahan?
                          </p>
                        </div>

                        <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                          <button
                            onClick={handleSaveModal}
                            className="py-2.5 px-5 me-3 text-sm font-medium text-gray-900 bg-white rounded-lg border hover:text-[#2A629A]"
                          >
                            Batal
                          </button>
                          <button className="text-white bg-[#2A629A] hover:bg-[#3472b0] font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Simpan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL LOGOUT */}
      <div
        className={`${confirmModalOpen ? "" : "hidden"} 
         fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={handleConfirmModalToggle}
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
            <div className="p-4 md:p-5 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                Apakah Anda yakin ingin keluar?
              </h3>
              <button
                onClick={handleConfirmModalToggle}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#003285] focus:z-10 focus:ring-4 focus:ring-gray-100 "
              >
                Batal
              </button>
              <button
                type="button"
                className="text-white ms-3 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
