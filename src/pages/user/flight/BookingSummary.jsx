import React from "react";
import { useSelector } from "react-redux";
import { RiFileList2Fill } from "react-icons/ri";

export default function BookingSummary() {
  const { bookingCode, selectedFlight, passengerDetails } = useSelector(
    (state) => state.booking
  );

  return (
    <div className="w-full max-w-md mx-auto bg-white mt-5 rounded-lg shadow-lg mb-5 relative">
      <h2 className="text-lg font-semibold mb-3 bg-[#2A629A] text-white rounded-t-md shadow-md px-4 py-3 flex items-center relative z-10">
        <RiFileList2Fill className="text-xl mr-2" />
        Format Pemesanan
      </h2>
      <div className="px-4 py-3">
        <div className="mb-4">
          <p className="font-semibold text-lg">Kode Pemesanan:</p>
          <p className="font-semibold text-lg text-[#2A629A]">{bookingCode}</p>
        </div>
        {selectedFlight && (
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-3 sm:mb-0">
              <p className="text-sm font-medium">
                {selectedFlight.departureTime}
              </p>
              <p className="text-xs">Keberangkatan</p>
            </div>
            <div>
              <p className="text-sm font-medium">
                {selectedFlight.arrivalTime}
              </p>
              <p className="text-xs">Kedatangan</p>
            </div>
          </div>
        )}
        {selectedFlight && (
          <div className="mb-4">
            <p className="text-sm font-medium">Tanggal Keberangkatan:</p>
            <p className="text-lg font-semibold">
              {selectedFlight.departureDate}
            </p>
          </div>
        )}
        {selectedFlight && (
          <div className="mb-4">
            <p className="text-sm font-medium">Rute:</p>
            <p className="text-lg font-semibold">
              {selectedFlight.origin} - {selectedFlight.destination}
            </p>
          </div>
        )}
        {selectedFlight && (
          <>
            <hr className="my-4" />
            <div className="mb-4">
              <p className="text-lg font-semibold">
                {selectedFlight.airline} - {selectedFlight.class}
              </p>
              <p className="text-sm font-medium">
                {selectedFlight.flightNumber}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold">Informasi:</p>
              <p className="text-sm">{selectedFlight.baggage}</p>
              <p className="text-sm">{selectedFlight.cabinBaggage}</p>
              <p className="text-sm">{selectedFlight.inFlightEntertainment}</p>
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
