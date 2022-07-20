import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

export default function Home() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [word, setWord] = useState("");
  const [inform, setInform] = useState("");

  function getWord(e) {
    setTimeout(() => {
      setWord(e.target.value);
    }, 1000);
  }
  function modelData(info) {
    setInform(info);
  }
  async function getData() {
    if (word === "") {
      return;
    }
    setIsLoading(true);
    const { data } = await axios.get("https://evening-ridge-26494.herokuapp.com/search", {
      headers: { authorization: `Bearer ${token}` },
      params: { searched: word },
    });

    if (data.message == "country" || data.message == "university") {
      setIsLoading(false);
      console.log(data);
      setData([data]);
      setError("");
    } else if (data.message === "catch error") {
      setIsLoading(false);
      setError(data.message);
      setError("session expired please login again");
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      setIsLoading(false);
      setError(data.message);
      setData([]);
    }
  }
  useEffect(() => {
    getData();
  }, [word]);
  return (
    <>
      <Modal id="first" data={data} info={inform} />
      <div className="container mt-3 ">
        <div className="row justify-content-center align-items-center  ">
          <div className="text-center mt-5"></div>
          <div className="col-md-6  mt-5 text-center">
            <div className="form-group mt-5">
              <input onChange={getWord} placeholder="Search by country ex: egypt or search by university ex: Akhbar El Yom Academy" name="searched" type="text" className=" form-control mt-5" />
            </div>
            {isLoading && <i className="py-5 mt-5 fa-solid fa-spinner fa-spin spiner"></i>}
            {data[0]?.message == "country" ? (
              <>
                {data.map((item, index) => {
                  return (
                    <div key={index} className=" row justify-content-center align-items-center">
                      {item.country.universityID.map((uni, index) => {
                        return (
                          <div key={index} className="my-2">
                            <div className="card">
                              <div className="card-body">
                                <h5 className="card-title">{uni.universityName}</h5>
                              </div>
                              <button
                                data-bs-toggle="modal"
                                data-bs-target="#first"
                                className="btn btn-primary"
                                onClick={() => {
                                  modelData(uni);
                                }}
                              >
                                Show more
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
            {data[0]?.message == "university" ? (
              <>
                <div className="card mt-3">
                  <div className="card-body">
                    <h5 className="card-title">{data[0].university.universityName}</h5>
                  </div>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#first"
                    className="btn btn-primary"
                    onClick={() => {
                      modelData(data);
                    }}
                  >
                    Show more
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
            {error && <div className="alert alert-danger mt-2">{error}</div>}
          </div>
        </div>
      </div>
    </>
  );
}
