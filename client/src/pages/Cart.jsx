import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const [Info, setInfo] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const CurrentuserId = currentUser ? currentUser._id : null;
  const [totalPrice, setTotalPrice] = useState(0);
  const [FormId, setdetformId] = useState(0);
  console.log(totalPrice);
  const navigate = useNavigate();

  // after click the add to cart save database after display in the dropdown menu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/items/CgetAll/${CurrentuserId}`);
        const data = await response.json();

        console.log("data", data);

        if (data.length > 0) {
          setInfo(data);

          const totalPrice = data.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
          setTotalPrice(totalPrice);
        } else {
          setItems(null);
          setTotalPrice(0);
        }
      } catch (error) {
        console.error("Error fetching bid data:", error);
      }
    };

    fetchData();
  }, [CurrentuserId]);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/items/deletes/${FormId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setInfo((prev) => prev.filter((items) => items._id !== FormId));
        alert("succesfull");
        window.location.reload()
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  


 

  


 
  

  


  return (
    <div className="min-h-screen relative flex items-center justify-center">
     
     <img
        src="https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      
     <div className="relative bg-white mt-14 mb-28 bg-opacity-10 shadow-sm shadow-black w-[1400px] max-w-[1400px] p-6 md:p-8 rounded-3xl border border-opacity-50 flex flex-col items-center">
     <div className="flex justify-center items-center">
              <Link to={`/home`}>
                <button className="text-md hover:text-blue-400   font-serif underline text-gray-800">
                  Back
                </button>
              </Link>
            </div> 
       <form >
      <div className="flex justify-center items-center ">
        <div className=" mt-4">
          <div className=" flex justify-center items-center">
            <div className="w-[1200px] h-[300px]  rounded-xl bg-opacity-10">
              <div className="flex justify-center items-center  ">
                <div className="max-h-72 scrollbar-none  overflow-y-auto mt-4">
                  <table className="w-[1000px] border border-white border-opacity-50 divide-y divide-black shadow-md">
                    <thead className="bg-none divide-x  divide-black">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs bg-slate-300 bg-opacity-90 text-black font-medium text-opacity-80   uppercase">
                          Image
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium   bg-slate-300  bg-opacity-90 text-black text-opacity-80   uppercase">
                          Item Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium  bg-slate-300  bg-opacity-90 text-black text-opacity-80   uppercase">
                          quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium  bg-slate-300  bg-opacity-90 text-black text-opacity-80   uppercase">
                          one item price
                        </th>

                        <th className="px-6 py-3 text-left text-xs font-medium bg-slate-300  bg-opacity-90 text-black text-opacity-80   uppercase">
                          Delete
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-none bg-opacity-40 divide-y divide-gray-200">
                    {Info && Info.length > 0 ? (
                    <>
                      {Info.map((items) => (
                        <tr
                          key={items._id}
                          className=" dark:border-gray-700 dark:bg-gray-800"
                        >
                          <td className="px-6 py-4 break-words max-w-[300px]">
                            <img
                              src={items.image}
                              alt=""
                              className="w-10 h-10 object-cover"
                            />
                          </td>

                          <td className="px-6 py-4 font-serif whitespace-nowrap">
                            {items.ItemsN}
                          </td>

                          <td className="px-6 py-4 font-mono break-words max-w-[300px] ">
                            {items.quantity}
                          </td>

                          <td className="px-6 py-4 font-mono  break-words max-w-[300px]">
                            RS.{items.price}
                          </td>

                          <td className="px-2 py-4 whitespace-nowrap">
                            <span
                              onClick={() => {
                                setdetformId(items._id);
                                handleDeleteUser();
                              }}
                            >
                              <div className="w-24  cursor-pointer bg-red-600 hover:opacity-80 rounded-lg  h-10 bg-opacity-70 border-white border border-opacity-45 text font-serif text-white text-opacity-80 ">
                                <div className="flex justify-center items-center mt-2">
                                    <div>
                                    Delete
                                    </div>

                                </div>
                            
                              </div>
                            </span>
                          </td>
                        </tr>
                      ))}
                      </>
                  ) : (
                    <>
                      <p className="text-2xl font-serif uppercase absolute ml-[360px] opacity-60 mt-14 ">
                        oops!. You have no items
                      </p>
                    </>
                  )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div>
          <div className="w-[1200px] h-[200px] mt-10 rounded-xl bg-opacity-10 shadow-sm bg-slate-600">
            <div className="flex justify-center items-center gap-48 ">
              <div className="mt-14">
               
                <div className="uppercase mt-8 opacity-70 font-serif text-3xl">
                  total
                </div>
              </div>

              <div className="mt-14">
               
                <div className=" mt-8 font-medium ">
                  <div
                    type="text"
                    name=""
                    id=""
                    className="rounded-full w-[200px] h-8 bg-opacity-10"
                  >
                    <div className="flex justify-center items-center">
                      <div className="text-2xl opacity-70 mt-[-10px]">
                        RS.{totalPrice}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div>
                <button className='bg-red-700 uppercase font-serif text-sm w-44 h-8 rounded-full text-white opacity-80 hover:opacity-90' >
                  Checkout
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center">
            
            </div>
          </div>
        </div>
      </div>
      </form>
      </div>
     
      
    </div>
  );
}
