import React from "react";
import { useSelector } from "react-redux";
import { RiFileList2Fill } from "react-icons/ri";

export default function BookingSummary() {
  const { ticketSelected } = useSelector((state) => state.ticket);

  if (!ticketSelected) {
    return null;
  }

  console.log("ticketSelected", ticketSelected);

  return (
    <div className="max-w-[500px] w-full mx-auto bg-white mt-5 rounded-lg shadow-lg mb-5 relative">
      <h1 className="text-lg font-semibold mb-3 bg-[#2A629A] text-white rounded-t-md shadow-md px-4 py-3 flex items-center relative z-10">
        <RiFileList2Fill className="w-7 h-7 mr-2" />
        Format Pemesanan
      </h1>
      <div className="px-4 py-3">
        <div>
          <div className="flex font-semibold text-lg">
            <h5>Kode Pemesanan: </h5>
            <p className="text-[#003285] text-xl font-semibold ml-2">
              {ticketSelected?.booking_code}
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
                  {ticketSelected?.departure?.departure_time
                    ? ticketSelected?.departure?.departure_time
                    : ticketSelected?.departure_flight?.departure_time}
                </time>
                <div className="text-sm">
                  {new Date(
                    ticketSelected?.departure?.flight_date
                      ? ticketSelected?.departure?.flight_date
                      : ticketSelected?.departure_flight?.flight_date
                  ).toLocaleString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div></div>
              <div className="flex flex-col text-center mt-1.5">
                <time className="mb-1 text-lg font-semibold leading-none ">
                  {ticketSelected?.departure?.arrival_time
                    ? ticketSelected?.departure?.arrival_time
                    : ticketSelected?.departure_flight?.arrival_time}
                </time>
                <div className="text-sm">
                  {new Date(
                    ticketSelected?.departure?.flight_date
                      ? ticketSelected?.departure?.flight_date
                      : ticketSelected?.departure_flight?.flight_date
                  ).toLocaleString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div></div>
            </div>
            <div>
              <ol className="relative border-s border-gray-200">
                <li className="mb-5 ms-4">
                  <div className="absolute w-3 h-3 bg-[#2A629A] rounded-full mt-1.5 -start-1.5 border border-white"></div>
                  <h3 className="text-lg font-semibold">
                    {ticketSelected?.departure?.departure_airport
                      ? ticketSelected?.departure?.departure_airport
                      : ticketSelected?.departure_flight?.departure_airport}
                  </h3>
                  <p className="mb-4 text-sm ">
                    {ticketSelected?.departure?.departure_terminal
                      ? ticketSelected?.departure?.departure_terminal
                      : ticketSelected?.departure_flight?.departure_terminal}
                  </p>
                </li>
                <li className="mb-5 ms-4 flex flex-col gap-1">
                  <div className="flex items-center">
                    <p>
                      {ticketSelected?.departure?.airline
                        ? ticketSelected?.departure?.airline
                        : ticketSelected?.departure_flight?.airline}
                    </p>
                  </div>
                </li>
                <li className="ms-4">
                  <div className="absolute w-3 h-3 bg-[#2A629A] rounded-full mt-1.5 -start-1.5 border border-white"></div>
                  <h3 className="text-lg font-semibold">
                    {ticketSelected?.departure?.arrival_airport
                      ? ticketSelected?.departure?.arrival_airport
                      : ticketSelected?.departure_flight?.arrival_airport}
                  </h3>
                </li>
              </ol>
              <div className="ms-4">
                <p className="text-sm">
                  {ticketSelected?.departure?.arrival_terminal
                    ? ticketSelected?.departure?.arrival_terminal
                    : ticketSelected?.departure_flight?.arrival_terminal}
                </p>
              </div>
            </div>
          </div>

          {/* Menampilkan Tiket Pulang Jika PP */}
          {(ticketSelected?.return || ticketSelected?.return_flight) && (
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
                      {ticketSelected?.return?.departure_time
                        ? ticketSelected?.return?.departure_time
                        : ticketSelected?.return_flight?.departure_time}
                    </time>
                    <div className="text-sm">
                      {new Date(
                        ticketSelected?.return?.flight_date
                          ? ticketSelected?.return?.flight_date
                          : ticketSelected?.return_flight?.flight_date
                      ).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  {/* <div className="pt-7">
                    <span className="text-sm">
                      {formatDuration(ticketSelected?.return?.duration)}
                    </span>
                  </div> */}
                  <div></div>
                  <div className="flex flex-col text-center mt-1.5">
                    <time className="mb-1 text-lg font-semibold leading-none ">
                      {ticketSelected?.return?.arrival_time
                        ? ticketSelected?.return?.arrival_time
                        : ticketSelected?.return_flight?.arrival_time}
                    </time>
                    <div className="text-sm">
                      {new Date(
                        ticketSelected?.return?.flight_date
                          ? ticketSelected?.return?.flight_date
                          : ticketSelected?.return_flight?.flight_date
                      ).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <div></div>
                </div>
                <div>
                  <ol className="relative border-s border-gray-200">
                    <li className="mb-5 ms-4">
                      <div className="absolute w-3 h-3 bg-[#2A629A] rounded-full mt-1.5 -start-1.5 border border-white"></div>
                      <h3 className="text-lg font-semibold">
                        {ticketSelected?.return?.departure_airport
                          ? ticketSelected?.return?.departure_airport
                          : ticketSelected?.return_flight?.departure_airport}
                      </h3>
                      <p className="mb-4 text-sm ">
                        {ticketSelected?.return?.departure_terminal
                          ? ticketSelected?.return?.departure_terminal
                          : ticketSelected?.return_flight?.departure_terminal}
                      </p>
                    </li>
                    <li className="mb-5 ms-4 flex flex-col gap-1">
                      <div className="flex items-center">
                        <p>
                          {ticketSelected?.return?.airline
                            ? ticketSelected?.return?.airline
                            : ticketSelected?.return_flight?.airline}
                        </p>
                      </div>
                    </li>
                    <li className="ms-4">
                      <div className="absolute w-3 h-3 bg-[#2A629A] rounded-full mt-1.5 -start-1.5 border border-white"></div>
                      <h3 className="text-lg font-semibold">
                        {ticketSelected?.return?.arrival_airport
                          ? ticketSelected?.return?.arrival_airport
                          : ticketSelected?.return_flight?.arrival_airport}
                      </h3>
                    </li>
                  </ol>

                  <div className="ms-4">
                    <p className="text-sm">
                      {ticketSelected?.return?.arrival_terminal
                        ? ticketSelected?.return?.arrival_terminal
                        : ticketSelected?.return_flight?.arrival_terminal}
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
                  }).format(ticketSelected?.total_before_tax)}
                </p>
                <p>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(ticketSelected?.tax)}
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
              }).format(ticketSelected?.total_price)}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
