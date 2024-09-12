import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";


export default function AddNewTicket() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submission = {
        ...formData,
      };

      const res = await fetch("/api/Sannous/Icreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        console.log("sussessfull");
        alert("suscessfull");
        navigate("/SAnnou");
      }
    } catch (error) {
      setPublishError("");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
       <img
        src=""
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative bg-white bg-opacity-10 shadow-sm shadow-black w-[850px] max-w-[850px] p-6 md:p-8 rounded-3xl border border-opacity-50 flex flex-col items-center">
       
            <div className=" flex justify-center items-center">
              <div>
                <h1 className="text-4xl uppercase font-serif shadow-lg text-gray-800">
                  New Announcement
                </h1>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <Link to={`/SAnnou`}>
                <button className="text-md hover:text-orange-400  font-serif underline text-gray-800">
                  Back
                </button>
              </Link>
            </div>
            <div className="bg-white bg-opacity-60 shadow-sm shadow-black w-[480px]  h-[530px] md:w-[550px] lg:w-[900px] border mt-8 max-w-3xl mx-auto rounded-3xl border-opacity-50 ">
              <div className="flex justify-center items-center   ">
                <div className="mt-4">
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                      <h3 className="font-semibold uppercase text-gray-700 ml-1">
                       Item name
                      </h3>
                      <input
                        className=" bg-slate-100 bg-opacity-40 border-black shadow-sm border-opacity-50  p-3 rounded-lg w-[560px] h-11"
                        type="text"
                        placeholder=""
                        id="title"
                        onChange={handlchange}
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold uppercase text-gray-700 ml-1">
                        categories
                      </h3>

                      <select
                        className="bg-slate-100 p-3 rounded-lg w-[560px] h-11 "
                        id="categories"
                        onChange={handlchange}
                      >
                        <option value="">Select </option>
                        <option value="Furriture">Furriture</option>
                        <option value="food & beverage">food & beverage</option>
                        <option value="cleaning & manintaining">cleaning & manintaining</option>
                        <option value="Technology & Electronic">Technology & Electronic</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="font-semibold uppercase text-gray-700 ml-1">
                        Description
                      </h3>
                      <textarea
                        className=" bg-slate-100 bg-opacity-40 border-black shadow-sm p-3 border-opacity-50 rounded-lg w-[560px] h-36"
                        type="text"
                        placeholder=""
                        id="descrip"
                        onChange={handlchange}
                      />
                    </div>
                    <button
                      className=" bg-[#FF9911]  mt-6 shadow-sm shadow-black ml-14 bg-opacity-80 border-white border border-opacity-50 text-white p-3 rounded-lg w-[460px] h-[45px] hover:opacity-90"
                      type="submit"
                    >
                      <div className="flex items-center  justify-center">
                        <div className="font-serif uppercase hover:text-black text-xl opacity-75">
                          submit
                        </div>
                      </div>
                    </button>
                  </form>
                  {publishError && (
                    <p className="mt-4 text-red-600 absolute bg-slate-100 bg-opacity-50  w-300 h-12 ml-48  rounded-lg text-center ">
                      {publishError}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
    
  );
}
