import React from "react";
import { useSelector } from "react-redux";
import { RiFileList2Fill } from "react-icons/ri";

export default function BookingSummary() {
  const choosenFlight = useSelector((state) => state.flight.choosenFlight);
  const { booking_code, passengerDetails } = useSelector(
    (state) => state.booking
  );

  const selectedFlight =
    choosenFlight && choosenFlight.length > 0 ? choosenFlight[0] : null;

  return (
    <div className="w-full max-w-md mx-auto bg-white mt-5 rounded-lg shadow-lg mb-5 relative">
      <h2 className="text-lg font-semibold mb-3 bg-[#2A629A] text-white rounded-t-md shadow-md px-4 py-3 flex items-center relative z-10">
        <RiFileList2Fill className="text-xl mr-2" />
        Format Pemesanan
      </h2>
      <div className="px-4 py-3">
        <div className="mb-4">
          <p className="font-semibold text-lg">Kode Pemesanan:</p>
          <p className="font-semibold text-lg text-[#2A629A]">{booking_code}</p>
        </div>
        {selectedFlight && (
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-3 sm:mb-0">
              <p className="text-sm font-medium">
                {selectedFlight.departure_time}
              </p>
              <p className="text-xs">Keberangkatan</p>
            </div>
            <div>
              <p className="text-sm font-medium">
                {selectedFlight.arrival_time}
              </p>
              <p className="text-xs">Kedatangan</p>
            </div>
          </div>
        )}
        {selectedFlight && (
          <div className="mb-4">
            <p className="text-sm font-medium">Tanggal Keberangkatan:</p>
            <p className="text-lg font-semibold">
              {selectedFlight.flight_date}
            </p>
          </div>
        )}
        {selectedFlight && (
          <div className="mb-4">
            <p className="text-sm font-medium">Rute:</p>
            <p className="text-lg font-semibold">
              {selectedFlight.departure_city} - {selectedFlight.arrival_city}
            </p>
          </div>
        )}
        {selectedFlight && (
          <>
            <hr className="my-4" />
            <div className="mb-4">
              <p className="text-lg font-semibold">
                {selectedFlight.airline_name} - {selectedFlight.class}
              </p>
              <p className="text-sm font-medium">
                {selectedFlight.flight_number}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold">Informasi:</p>
              <p className="text-sm">{selectedFlight.baggage}</p>
              <p className="text-sm">{selectedFlight.cabin_baggage}</p>
              <p className="text-sm">
                {selectedFlight.in_flight_entertainment}
              </p>
            </div>
          </>
        )}
        {passengerDetails.length > 0 && (
          <>
            <hr className="my-4" />
            <div className="mb-4">
              <p className="text-lg font-semibold">Rincian Harga</p>
              {passengerDetails.map((passenger, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="text-sm">{passenger.type}</p>
                  <p className="text-sm">{passenger.price}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
