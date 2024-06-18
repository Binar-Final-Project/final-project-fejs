import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../../redux/actions/auth/loginActions";

export default function Protected() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // JIKA TOKEN TIDAK ADA, MAKA AKAN MENAMPILKAN ALERT DAN DIRECT KE LOGIN PAGE
  useEffect(() => {
    dispatch(checkToken(navigate));
  }, []);

  return;
}
