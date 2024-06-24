import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoListOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../../../../redux/actions/flight/notificationActions";
import toast from "react-hot-toast";

export default function NavbarMobile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.login); // VALIDASI NAVBAR
  const { notifikasi } = useSelector((state) => state.notification); // UNTUK JUMLAH NOTIFIKASI

  // MENDAPATKAN DATA NOTIFIKASI BUAT JUMLAH NOTIFIKASI
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getNotification());
    }
  }, [dispatch]);

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
              if (isLoggedIn) {
                navigate("/notifikasi");
              } else {
                navigate("/login");
                setTimeout(() => {
                  toast("Silahkan Masuk Terlebih Dahulu", {
                    style: {
                      background: "#FF0000", // Background merah
                      color: "#FFFFFF",
                      textAlign: "center", // Posisi teks di tengah
                    },
                  });
                }, 100);
              }
            }}
          >
            <div
              className={
                location.pathname === "/notifikasi"
                  ? `text-[#2A629A]`
                  : `text-slate-500`
              }
            >
              <IoNotificationsOutline size={25} />
            </div>
            <span
              className={`text-sm
                ${
                  location.pathname === "/notifikasi"
                    ? `font-semibold text-[#2A629A]`
                    : `text-slate-500`
                }`}
            >
              Notifikasi
            </span>
            {isLoggedIn ? (
              <div>
                {notifikasi?.filter(
                  (notification) => notification.status === "unread"
                ).length === 0 ? (
                  ""
                ) : (
                  <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full top-1">
                    {
                      notifikasi?.filter(
                        (notification) => notification.status === "unread"
                      ).length
                    }
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            className="flex flex-col items-center justify-center gap-2"
            onClick={() => {
              if (isLoggedIn) {
                navigate("/riwayat-pemesanan");
              } else {
                navigate("/login");
                setTimeout(() => {
                  toast("Silahkan Masuk Terlebih Dahulu", {
                    style: {
                      background: "#FF0000", // Background merah
                      color: "#FFFFFF",
                      textAlign: "center", // Posisi teks di tengah
                    },
                  });
                }, 100);
              }
            }}
          >
            <div
              className={
                location.pathname === "/riwayat-pemesanan"
                  ? `text-[#2A629A]`
                  : `text-slate-500`
              }
            >
              <IoListOutline size={25} />
            </div>
            <span
              className={`text-sm
                ${
                  location.pathname === "/riwayat-pemesanan"
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
              if (isLoggedIn) {
                navigate("/profil");
              } else {
                navigate("/login");
                setTimeout(() => {
                  toast("Silahkan Masuk Terlebih Dahulu", {
                    style: {
                      background: "#FF0000", // Background merah
                      color: "#FFFFFF",
                      textAlign: "center", // Posisi teks di tengah
                    },
                  });
                }, 100);
              }
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
