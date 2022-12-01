import React, { useState, useEffect } from "react";
import "./App.css";
import dailybox_img from "../src/assets/singapore-db_white-removebg-preview.png";
import Loading from "./loading";
import axios from "axios";
import swal from "sweetalert";

export const formatPhoneNumberToIntlNumber = (phoneNumber) => {
  let intlCode = "";
  switch (phoneNumber.substring(0, 1)) {
    case "0":
      intlCode = `62${phoneNumber.substring(1)}`;
      break;
    case "6":
      intlCode = phoneNumber;
      break;
    case "8":
      intlCode = `62${phoneNumber}`;
      break;
    default:
      intlCode = phoneNumber;
      break;
  }
  return intlCode;
};

const App = () => {
  const [phone, setPhone] = useState("");
  const [idCard, setIdCard] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhone = (event) => {
    // console.log(event);
    setPhone(event.target.value);
  };

  const handleIdCard = (event) => {
    // console.log(event);
    setIdCard(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const phones = formatPhoneNumberToIntlNumber(phone);
    if (phones === "" && idCard === "") {
      swal("Error", "Data tidak boleh kososng", "error");
    } else {
      axios
        .post(
          "https://t1n12x6qn0.execute-api.ap-southeast-1.amazonaws.com/Prod/employee",
          { employeeId: idCard.toUpperCase(), phone: phones }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 1000) {
            setPhone("");
            setIdCard("");
            swal(
              "Success",
              "Selamat id karyawan anda sudah terdaftar mendapatkan cashback",
              "success"
            );
          } else if (res.data.code === 2001) {
            swal(
              "Error",
              " Id karyawan anda belum terdaftar untuk mendapatkan cashback (hubungi HRD / Tim IT Development )",
              "error"
            );
          } else if (res.data.code === 2003) {
            swal(
              "Error",
              "Daftarkan nomor telepon anda pada aplikasi Daily Apps",
              "error"
            );
          } else if (res.data.code === 2004) {
            swal(
              "Error",
              "Id karyawan sudah terdaftar pada aplikasi Daily Apps",
              "error"
            );
          } else if (res.data.code === 2005) {
            swal(
              "Error",
              "Daftarkan nomor telepon anda pada aplikasi Daily Apps",
              "error"
            );
          } else if (res.data.code === 2006) {
            swal(
              "Error",
              "Nomor telepon sudah terdaftar sebagai karyawan pada aplikasi Daily Apps",
              "error"
            );
          } else {
            swal(
              "Error",
              `Terjadi kesalahan pada sistem dengan kode : ${res.data.code}`,
              "error"
            );
          }
          setIsLoading(false);
        });
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="wrapper">
          <div className="text">
            <img className="main-img" src={dailybox_img} />
          </div>
          <div className="wrapper-form">
            <h2> Form Cashback Topup Karyawan</h2>
            <form className="form">
              <div className="form1">
                <p className="title">Nomor Telepon</p>
                <input
                  className="form-field"
                  placeholder="08XXXXXX"
                  type="number"
                  onChange={handlePhone}
                  value={phone}
                />
              </div>
              <div className="form2">
                <p className="title">Id Karyawan</p>
                <input
                  className="form-field"
                  placeholder="DBXXX"
                  onChange={handleIdCard}
                  value={idCard}
                />
              </div>
              <button className="button" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
