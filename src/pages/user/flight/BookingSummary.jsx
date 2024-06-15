import React from "react";
import { useSelector } from "react-redux";
import { RiFileList2Fill } from "react-icons/ri";

export default function BookingSummary() {
  const choosenFlight = useSelector((state) => state.flight.choosenFlight);
  const { ticket, passenger } = useSelector((state) => state.ticket);
  console.log("ticket isinya apa: ", ticket);
  console.log("passenger isinya apa:", passenger);

  return (
    <div className="w-full max-w-md mx-auto bg-white mt-5 rounded-lg shadow-lg mb-5 relative">
      <h2 className="text-lg font-semibold mb-3 bg-[#2A629A] text-white rounded-t-md shadow-md px-4 py-3 flex items-center relative z-10">
        <RiFileList2Fill className="text-xl mr-2" />
        Format Pemesanan
      </h2>
      <div className="px-4 py-3">
        <div className="mb-4">
          <p className="font-semibold text-lg">Kode Pemesanan:</p>
          <p className="font-semibold text-lg text-[#2A629A]">
            {ticket.booking_code}
          </p>
        </div>
        {ticket && (
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-3 sm:mb-0">
              <p className="text-sm font-medium">
                {ticket.departure.departure_time}
              </p>
              <p className="text-xs">Keberangkatan</p>
            </div>
            <div>
              <p className="text-sm font-medium">
                {ticket.departure.arrival_time}
              </p>
              <p className="text-xs">Kedatangan</p>
            </div>
          </div>
        )}
        {ticket && (
          <div className="mb-4">
            <p className="text-sm font-medium">Tanggal Keberangkatan:</p>
            <p className="text-lg font-semibold">
              {ticket.departure.flight_date}
            </p>
          </div>
        )}
        {ticket && (
          <div className="mb-4">
            <p className="text-sm font-medium">Rute:</p>
            <p className="text-lg font-semibold">
              {ticket.departure.departure_city} -{" "}
              {ticket.departure.arrival_city}
            </p>
          </div>
        )}
        {ticket && (
          <>
            <hr className="my-4" />
            <div className="mb-4">
              <p className="text-lg font-semibold">
                {ticket.departure.airline}
              </p>
              <p className="text-lg font-semibold">{ticket.departure.class}</p>
              <p className="text-sm font-medium">
                {ticket.departure.flight_number}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold">Informasi:</p>
              {/* <p className="text-sm">{ticket.baggage}</p>
              <p className="text-sm">{ticket.cabin_baggage}</p>
              <p className="text-sm">
                {selectedFlight.in_flight_entertainment}
              </p> */}
            </div>
          </>
        )}
        {/* {passenger.length > 0 && (
          <>
            <hr className="my-4" />
            <div className="mb-4">
              <p className="text-lg font-semibold">Rincian Harga</p>
              {passenger.map((passenger, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="text-sm">{passenger.type}</p>
                  <p className="text-sm">{passenger.price}</p>
                </div>
              ))}
            </div>
          </>
        )} */}
      </div>
    </div>
  );
}
