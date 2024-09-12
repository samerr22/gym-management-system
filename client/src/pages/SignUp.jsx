import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [validation, setValidation] = useState(null);
  const [Cvalidation, setCValidation] = useState(null);

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Plese fill out all fields");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  //validation
  const handlenumberChange = (e) => {
    const CNumber = e.target.value.trim();
    const quantityPattern = /^[1-9]\d*$/; // Pattern for positive integers

    if (CNumber === "") {
      setCValidation(null);
    } else if (!quantityPattern.test(CNumber)) {
      if (isNaN(CNumber)) {
        setCValidation("contact number must be a number");
      } else {
        setCValidation("contact number must be a positive integer");
      }
    } else {
      setFormData({ ...formData, CNumber });
      setCValidation(null);
    }
  };

  //validation
  const handleContactChange = (e) => {
    const Rnumber = e.target.value.trim();
    const quantityPattern = /^[1-9]\d*$/; // Pattern for positive integers

    if (Rnumber === "") {
      setValidation(null);
    } else if (!quantityPattern.test(Rnumber)) {
      if (isNaN(Rnumber)) {
        setValidation("Register number must be a number");
      } else {
        setValidation("Register number must be a positive integer");
      }
    } else {
      setFormData({ ...formData, Rnumber });
      setValidation(null);
    }
  };

  return (
    <div className=" min-h-screen relative flex items-center justify-center ">
      <img
        src="https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative bg-white bg-opacity-10 shadow-sm shadow-black w-[600px] max-w-[600px] p-6 md:p-8 rounded-3xl border border-opacity-50 flex flex-col items-center">
        <div className="">
          <div className=" flex justify-center items-center">
            <div>
              <h1 className="text-4xl font-serif opacity-70 text-gray-800">
                 Register
              </h1>
            </div>
          </div>
          <div className=" ">
            <div className="bg-white bg-opacity-60 shadow-sm shadow-black w-[480px]  md:w-[550px] lg:w-[550px] border h-[400px] mt-8 max-w-3xl mx-auto rounded-3xl border-opacity-50 ">
              <div className="flex justify-center items-center   ">
                <div className="mt-4">
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                      <h3 className="font-semibold text-gray-700 ml-1">
                        Supplier name
                      </h3>
                      <input
                        className=" bg-slate-100 bg-opacity-40 border-black shadow-sm border-opacity-50  p-3 rounded-lg w-[460px] h-11"
                        type="text"
                        placeholder="Username"
                        id="username"
                        onChange={handlchange}
                      />
                    </div>
               
                    <div>
                      <h3 className="font-semibold text-gray-700 ml-1">
                        Email
                      </h3>
                      <input
                        className=" bg-slate-100 bg-opacity-40 border-black shadow-sm border-opacity-50  p-3 rounded-lg w-[460px] h-11"
                        type="email"
                        placeholder="name@company.com"
                        id="email"
                        onChange={handlchange}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 ml-1">
                        Password
                      </h3>
                      <input
                        className=" bg-slate-100 bg-opacity-40 border-black shadow-sm p-3 border-opacity-50 rounded-lg w-[460px] h-11"
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={handlchange}
                      />
                    </div>
                    <button
                      className=" bg-[#254af0]  shadow-lg mt-6 bg-opacity-80 border-white border border-opacity-50 text-white p-3 rounded-lg w-[460px] h-[45px] hover:opacity-90"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner size="sm" />
                          <sapn className="pl-3">Loading...</sapn>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-center">
                            <div className="font-serif text-xl opacity-75">
                              SING UP
                            </div>
                          </div>
                        </>
                      )}
                    </button>
                  </form>

                  <div className="flex gap-2 text-sm mt-2 ml-2">
                    <span>Have an account?</span>
                    <Link to="/" className="text-blue-500">
                      Sign In
                    </Link>
                  </div>

                  {errorMessage && (
                    <p className="mt-5 absolute text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
