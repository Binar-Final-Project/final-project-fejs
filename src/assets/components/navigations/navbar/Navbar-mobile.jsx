import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoListOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoHomeOutline,
} from "react-icons/io5";

export default function NavbarMobile() {
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed bottom-0 z-50 w-full shadow-2xl">
        <div className="flex h-full items-center justify-between bg-white px-5 py-2">
          <div
            className="flex flex-col items-center justify-center gap-2"
            onClick={() => {
              navigate("/");
            }}
          >
            <div
              className={
                location.pathname === "/" ? `text-[#2A629A]` : `text-slate-500`
              }
            >
              <IoHomeOutline size={25} />
            </div>
            <span
              className={`text-sm
                ${
                  location.pathname === "/"
                    ? `font-semibold text-[#2A629A]`
                    : `text-slate-500`
                }`}
            >
              Home
            </span>
          </div>
          <div
            className="flex flex-col items-center justify-center gap-2"
            onClick={() => {
              navigate("/notification");
            }}
          >
            <div
              className={
                location.pathname === "/notification"
                  ? `text-[#2A629A]`
                  : `text-slate-500`
              }
            >
              <IoNotificationsOutline size={25} />
            </div>
            <span
              className={`text-sm
                ${
                  location.pathname === "/notification"
                    ? `font-semibold text-[#2A629A]`
                    : `text-slate-500`
                }`}
            >
              Notifikasi
            </span>
          </div>
          <div
            className="flex flex-col items-center justify-center gap-2"
            onClick={() => {
              navigate("/pesanan-saya");
            }}
          >
            <div
              className={
                location.pathname === "/pesanan-saya"
                  ? `text-[#2A629A]`
                  : `text-slate-500`
              }
            >
              <IoListOutline size={25} />
            </div>
            <span
              className={`text-sm
                ${
                  location.pathname === "/pesanan-saya"
                    ? `font-semibold text-[#2A629A]`
                    : `text-slate-500`
                }`}
            >
              Pesanan
            </span>
          </div>
          <div
            className="flex flex-col items-center justify-center gap-2"
            onClick={() => {
              navigate("/profil");
            }}
          >
            <div
              className={
                location.pathname === "/profil" ||
                location.pathname === "/pengaturan-akun"
                  ? `text-[#2A629A]`
                  : `text-slate-500`
              }
            >
              <IoPersonOutline size={25} />
            </div>
            <span
              className={`text-sm
                ${
                  location.pathname === "/profil" ||
                  location.pathname === "/pengaturan-akun"
                    ? `font-semibold text-[#2A629A]`
                    : `text-slate-500`
                }`}
            >
              Akun
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
