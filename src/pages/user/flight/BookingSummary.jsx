import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RiFileList2Fill } from "react-icons/ri";

export default function BookingSummary() {
  const { ticket } = useSelector((state) => state.ticket);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // console.log("ticket data: ", ticket);

  // // Fungsi untuk Mengubah Durasi Penerbangan
  // function formatDuration(minutes) {
  //   const hours = Math.floor(minutes / 60);
  //   const remainingMinutes = minutes % 60;
  //   return `${hours}j${hours > 1 ? "" : ""} ${remainingMinutes}m${
  //     remainingMinutes > 1 ? "" : ""
  //   }`;
  // }

  if (!ticket) {
    return null;
  }

  // Menampilkan Modal Konfirmasi
  const handlePrintTicket = () => {
    setShowConfirmationModal(true);
  };

  // Menutup semua modals
  const handleCloseModals = () => {
    setShowConfirmationModal(false);
    setShowSuccessModal(false);
  };

  // Menangani konfirmasi pencetakan tiket
  const handleConfirmPrint = () => {
    // Untuk sementara, menampilkan modal sukses secara langsung
    setShowConfirmationModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="max-w-[500px] w-full mx-auto bg-white mt-5 rounded-lg shadow-lg mb-5 relative">
      <h1 className="text-lg font-semibold mb-3 bg-[#2A629A] text-white rounded-t-md shadow-md px-4 py-3 flex items-center relative z-10">
        <RiFileList2Fill className="w-7 h-7 mr-2" />
        Format Pemesanan
      </h1>
      <div className="px-4 py-3">
        <div>
          <div className="flex mb-3 font-semibold">
            <h5>Kode Pemesanan: </h5>
            <p className="text-[#003285] text-xl font-semibold ml-2">
              {ticket?.booking_code}
            </p>
          </div>

          <div className="flex mb-4">
            <h5 className="font-medium bg-[#86B6F6] rounded-lg text-white px-5 py-0.5 mt-3">
              Pergi
            </h5>
          </div>
          <div className="flex flex-row gap-3">
            <div className="flex flex-col justify-between items-center">
              <div className="flex flex-col text-center mt-1.5">
                <time className="mb-1 text-lg font-semibold leading-none ">
                  {ticket?.departure?.departure_time}
                </time>
                <div className="text-sm">
                  {new Date(ticket?.departure?.flight_date).toLocaleString(
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
              <div className="flex flex-col text-center mt-1.5">
                <time className="mb-1 text-lg font-semibold leading-none ">
                  {ticket?.departure?.arrival_time}
                </time>
                <div className="text-sm">
                  {new Date(ticket?.departure?.flight_date).toLocaleString(
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
                    {ticket?.departure?.departure_airport}
                  </h3>
                  <p className="mb-4 text-sm ">
                    {ticket?.departure?.departure_terminal}
                  </p>
                </li>
                <li className="mb-5 ms-4 flex flex-col gap-1">
                  <div className="flex items-center">
                    <p>{ticket?.departure?.airline}</p>
                  </div>
                </li>
                <li className="ms-4">
                  <div className="absolute w-3 h-3 bg-[#2A629A] rounded-full mt-1.5 -start-1.5 border border-white"></div>
                  <h3 className="text-lg font-semibold">
                    {ticket?.departure?.arrival_airport}
                  </h3>
                </li>
              </ol>
              <div className="ms-4">
                <p className="text-sm">{ticket?.departure?.arrival_terminal}</p>
              </div>
            </div>
          </div>

          {/* Menampilkan Tiket Pulang Jika PP */}
          {ticket?.return && (
            <div>
              <div className="flex my-4">
                <h5 className="font-medium bg-[#86B6F6] rounded-lg text-white px-3 py-0.5">
                  Pulang
                </h5>
              </div>
              <div className="flex flex-row gap-3">
                <div className="flex flex-col justify-between items-center">
                  <div className="flex flex-col text-center mt-1.5">
                    <time className="mb-1 text-lg font-semibold leading-none ">
                      {ticket?.return?.departure_time}
                    </time>
                    <div className="text-sm">
                      {new Date(ticket?.return?.flight_date).toLocaleString(
                        "id-ID",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </div>
                  </div>
                  {/* <div className="pt-7">
                    <span className="text-sm">
                      {formatDuration(ticket?.return?.duration)}
                    </span>
                  </div> */}
                  <div></div>
                  <div className="flex flex-col text-center mt-1.5">
                    <time className="mb-1 text-lg font-semibold leading-none ">
                      {ticket?.return?.arrival_time}
                    </time>
                    <div className="text-sm">
                      {new Date(ticket?.return?.flight_date).toLocaleString(
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
                        {ticket?.return?.departure_airport}
                      </h3>
                      <p className="mb-4 text-sm ">
                        {ticket?.return?.departure_terminal}
                      </p>
                    </li>
                    <li className="mb-5 ms-4 flex flex-col gap-1">
                      <div className="flex items-center">
                        <p>{ticket?.return?.airline}</p>
                      </div>
                    </li>
                    <li className="ms-4">
                      <div className="absolute w-3 h-3 bg-[#2A629A] rounded-full mt-1.5 -start-1.5 border border-white"></div>
                      <h3 className="text-lg font-semibold">
                        {ticket?.return?.arrival_airport}
                      </h3>
                    </li>
                  </ol>

                  <div className="ms-4">
                    <p className="text-sm">
                      {ticket?.return?.arrival_terminal}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="my-4 py-3 border-y-2">
            <h5 className="font-semibold text-base">Rincian Harga</h5>
            <div className="flex justify-between">
              <div>
                <p className="text-sm">Total Harga Tiket</p>
                <p className="text-sm">Pajak</p>
              </div>
              <div className="text-sm">
                <p>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(ticket?.total_before_tax)}
                </p>
                <p>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(ticket?.tax)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between font-semibold text-lg text-[#003285]">
            <h5>Total Harga</h5>
            <h5>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(ticket?.total_price)}
            </h5>
          </div>
        </div>

        {/* Tombol Cetak Tiket */}
        <div className="w-full">
          <button
            className="w-full p-3 rounded-lg bg-[#2A629A] text-white text-base font-medium mt-3 transition-colors duration-300 hover:bg-[#003285] active:bg-[#003285]"
            onClick={handlePrintTicket}
          >
            Cetak Tiket
          </button>
        </div>
      </div>

      {/* Modal Konfirmasi Cetak Tiket */}
      {showConfirmationModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative w-full max-w-[90%] md:max-w-[60%] lg:max-w-[40%] max-h-full animate__animated animate__zoomIn mx-4">
            <div className="relative bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Konfirmasi Cetak Tiket
                </h3>
                <button
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={handleCloseModals}
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
                  Apakah Anda yakin ingin mencetak tiket ini?
                </p>
              </div>
              <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                <button
                  onClick={handleCloseModals}
                  className="py-2 px-4 md:px-7 me-3 text-sm font-medium text-gray-900 bg-white rounded-lg border hover:text-[#2A629A]"
                >
                  Nanti
                </button>
                <button
                  className="text-white bg-[#2A629A] hover:bg-[#3472B0] font-medium rounded-lg text-sm px-5 py-2 text-center"
                  onClick={handleConfirmPrint}
                >
                  Cetak
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sukses */}
      {showSuccessModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative w-full max-w-[90%] md:max-w-[50%] lg:max-w-[30%] max-h-full animate__animated animate__zoomIn mx-4">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">Sukses!</h3>
                <button
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={handleCloseModals}
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
                  Tiket berhasil dikirim ke Email Anda!
                </p>
              </div>
              <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                <button
                  className="text-white bg-[#2A629A] hover:bg-[#3472B0] font-medium rounded-lg text-sm px-5 py-2 text-center"
                  onClick={handleCloseModals}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
