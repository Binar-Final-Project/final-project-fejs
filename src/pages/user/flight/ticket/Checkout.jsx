import React, {useState} from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { useDispatch } from "react-redux";
import { getTicket } from "../../../../redux/actions/ticket/ticketActions";

export default function TicketCheckout() {
  const dispatch = useDispatch();

  //State untuk tanggal 
  const [date, setDate] = useState(null);

  //State untuk form
  const [orderer, setOrderer] = useState({
    name: "",
    family_name: "",
    phone_number: "",
    email: "",
  });

  const [passengers, setPassengers] = useState([{
    name: "",
    email: "",
    passenger_type: "adult",
    phone_number: "",
    date_of_birth: "",
    nationality: "",
    identity_number: "",
    issuing_country: "",
    valid_until: "",
  }]);

  //Handler untuk mengupdate state ordered
  const handleOrdererChange = (e) => {
    setOrderer({
      ...orderer,
      [e.target.name]: e.target.value,
    });
  };

  //Handler untuk mengupdate state passengers
  const handlePassengerChange = (index, e) => {
    const newPassengers = [...passengers];
    newPassengers[index][e.target.name] = e.target.value;
    setPassengers(newPassengers);
  };

  //Handler untuk tanggal lahir dan berlaku sampai
  const handleDateChange = (index, name, date) => {
    const newPassengers = [...passengers];
    newPassengers[index][name] = date[0];
    setPassengers(newPassengers);
  };

  //Handler untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getTicket([1,4], 2, 0, 0, orderer, passengers));
  };


  return (
    <div className="bg-[#FFF0DC] p-3">
      {/* Countdown Bar */}
      <div className="bg-red-500 text-center py-2 text-white font-bold">
        Selesaikan dalam 00.15.00 sebelum tiket kamu hangus!
      </div>

      <form onSubmit={handleSubmit}>
        <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Data Akun */}
          <div className="col-span-2">
            <div className="bg-white shadow-md rounded p-6">
              <h2 className="text-xl font-bold mb-4">Data Diri Pemesan</h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={orderer.name}
                  onChange={handleOrdererChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={orderer.email}
                  onChange={handleOrdererChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="contoh@gmail.com"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">No Telephone</label>
                <input
                  type="text"
                  name="phone_number"
                  value={orderer.phone_number}
                  onChange={handleOrdererChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Data Tiket 1 */}
            <div className="bg-white shadow-md rounded p-6 mt-6">
              <h2 className="text-xl font-bold mb-4">Isi Data Penumpang</h2>
              {passengers.map((passenger, index) => (
                <div key={index} className="mb-4">
                  <div className="relative mb-4">
                    <select
                      name="passenger_type"
                      value={passenger.passenger_type}
                      onChange={(e) => handlePassengerChange(index, e)}
                      className="appearance-none w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white text-gray-700 py-2 pl-3 pr-10"
                    >
                      <option disabled selected>Panggilan</option>
                      <option value="adult">Tuan</option>
                      <option value="child">Nyonya</option>
                      <option value="baby">Nona</option>
                    </select>
                    <span className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 text-gray-400">
                        <path d="M10 12.586L4.707 7.293a1 1 0 011.414-1.414L10 10.758l4.879-4.879a1 1 0 111.414 1.414L10 12.586z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      name="name"
                      value={passenger.name}
                      onChange={(e) => handlePassengerChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Nama Keluarga</label>
                    <input
                      type="text"
                      name="family_name"
                      value={passenger.family_name}
                      onChange={(e) => handlePassengerChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Tanggal Lahir</label>
                    <Flatpickr
                      value={passenger.date_of_birth}
                      onChange={(date) => handleDateChange(index, 'date_of_birth', date)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      placeholder="dd-mm-yyyy"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Kewarganegaraan</label>
                    <input
                      type="text"
                      name="nationality"
                      value={passenger.nationality}
                      onChange={(e) => handlePassengerChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">KTP/Paspor</label>
                    <input
                      type="text"
                      name="identity_number"
                      value={passenger.identity_number}
                      onChange={(e) => handlePassengerChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Negara Penerbit</label>
                    <input
                      type="text"
                      name="issuing_country"
                      value={passenger.issuing_country}
                      onChange={(e) => handlePassengerChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Berlaku Sampai</label>
                    <Flatpickr
                      value={passenger.valid_until}
                      onChange={(date) => handleDateChange(index, 'valid_until', date)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      placeholder="dd-mm-yyyy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}
