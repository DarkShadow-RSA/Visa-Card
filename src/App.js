import React, { useState } from "react";

import "react-credit-cards/es/styles-compiled.css";

import Cards from "react-credit-cards";

export default function App() {
  const [number, setNumber] = useState("1###############");
  const [valNumber, setValNumber] = useState("");

  const [name, setName] = useState("");

  const [expiry, setExpiry] = useState("");

  const [cvc, setCvc] = useState("");

  const [focus, setFocus] = useState("");

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [messageContent, setMessageContent] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const numberHandler = (cNumber) => {
    var str = cNumber;
    setValNumber(str);
    var hashcount = "";
    var numHash = 16 - str.length;

    for (var x = 0; x <= numHash; x++) {
      hashcount += "#";
    }

    if (str.length >= 12 && str.length <= 16) {
      str = str.replace(str.substring(4, 12), "********");
      setNumber(str + hashcount);
    } else {
      var numberOfStar = str.length - 4;
      var starPosition = "";
      if (str.length < 12 && str.length > 3) {
        for (var i = 1; i <= numberOfStar; i++) {
          starPosition += "*";
        }
      }
      str = str.replace(str.substring(4, 12), starPosition);
      setNumber(str + hashcount);
    }
  };

  //handle changing expiration date
  const handleMonth = (e) => {
    setMonth(e.target.value);
    setExpiry(e.target.value + year);
  };
  const handleYear = (e) => {
    setYear(e.target.value);
    if (month === "") {
      setExpiry("**".concat(e.target.value));
    } else {
      setExpiry(month.concat(e.target.value));
    }
  };

  //validate user input
  const appMsg = () => {
    setSuccessMsg("");
    setMessageContent("");
    if (valNumber.length === 16) {
      if (name.length > 0) {
        if (month !== "") {
          if (year !== "") {
            if (cvc.length === 3 && cvc > 0) {
              setSuccessMsg("Success");
            } else {
              setMessageContent("CVV length needs to be 3 positive Digits");
            }
          } else {
            setMessageContent("Experation Date Year needs to be filled");
          }
        } else {
          setMessageContent("Experation Date Month needs to be filled");
        }
      } else {
        setMessageContent("Name field is empty");
      }
    } else {
      setMessageContent("Card Number length needs to be 16 positive Digits");
    }
  };

  return (
    <>
      <Cards
        cvc={cvc}
        expiry={expiry}
        focused={focus}
        name={name}
        number={number}
      />
      <div className="bodyContent">
        <form>
          <section>
            <section>
              <label>Enter Number</label>
              <input
                name="number"
                maxlength="16"
                pattern="[0-9]+"
                val={number}
                onChange={(e) => numberHandler(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
              />
              <label>Enter Name</label>
              <input
                type="tel"
                val={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
              />
            </section>
            <div style={{ float: "left", marginRight: "20px" }}>
              <label>Expiration Date</label>

              <select name="expiry" onChange={handleMonth}>
                <option value="">Month</option>
                <option value="01">Jan</option>
                <option value="02">Feb</option>
                <option value="03">Mar</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">Aug</option>
                <option value="09">Sep</option>
                <option value="10">Oct</option>
                <option value="11">Nov</option>
                <option value="12">Dec</option>
              </select>

              <select name="expiry" onChange={handleYear}>
                <option value="">Year</option>
                <option value="21">2021</option>
                <option value="22">2022</option>
                <option value="23">2023</option>
                <option value="24">2024</option>
                <option value="25">2025</option>
                <option value="26">2026</option>
                <option value="27">2027</option>
                <option value="28">2028</option>
                <option value="29">2029</option>
                <option value="30">2030</option>
              </select>
            </div>

            <div style={{ float: "left" }}>
              <label>CVV</label>
              <input
                name="cvc"
                maxlength="3"
                pattern="[0-9]+"
                val={cvc}
                onChange={(e) => setCvc(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
              />
            </div>

            <br style={{ clear: "both" }} />
          </section>
        </form>
        <button className="submitBtn" onClick={appMsg}>
          Submit
        </button>
        <h4 style={{ color: "red" }}>
          <b>{messageContent}</b>
        </h4>
        <h4 style={{ color: "green" }}>
          <b>{successMsg}</b>
        </h4>
      </div>
    </>
  );
}
