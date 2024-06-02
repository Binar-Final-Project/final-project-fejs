import React from "react";

// BUAT NYIMPEN AJA SEMBARI NUNGGU API NYA AKU TARO SINI
export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#86B6F6]">
      <iframe
        src="https://lottie.host/embed/d2c487e3-a2ad-4b0a-9406-f6c0a7020ad6/HGJUzj8p7b.json"
        className="h-screen w-4/5 lg:w-2/5"
      ></iframe>
    </div>
  );
}
