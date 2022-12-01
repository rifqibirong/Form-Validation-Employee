import React, { useState, useEffect } from "react";
import "./App.css";
import dailybox_img from "../src/assets/singapore-db_white-removebg-preview.png";
import Loading from "./loading";
import axios from "axios";

const App = () => {
  const [phone, setPhone] = useState("");
  const [idCard, setIdCard] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhone = (event) => {
    console.log(event);
    setPhone(event.target.value);
  };

  const handleIdCard = (event) => {
    console.log(event);
    setIdCard(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const id = Math.random() * 10;
    axios
      .post("http://localhost:3004/posts", { id: id, phone, idCard })
      .then((res) => {
        console.log(res.data);
        const resCode = res.status;
        if (resCode === 201) {
          setPhone("");
          setIdCard("");
          alert("Mantap");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err);
        setIsLoading(false);
      });
    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 4000);
  };

  const fetchData = () => {
    axios.get("http://localhost:3004/posts").then((res) => {
      console.log(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <h2> Form Validation Employee</h2>
            <form className="form">
              <div className="form1">
                <p>Phone Number</p>
                <input
                  className="form-field"
                  placeholder="08XXXXXX"
                  type="number"
                  onChange={handlePhone}
                  value={phone}
                />
              </div>
              <div className="form2">
                <p>Id Card</p>
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
