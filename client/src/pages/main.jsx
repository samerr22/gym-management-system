import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function main() {
  const [Info, setInfo] = useState([]);
  const [quantityMap, setQuantityMap] = useState(new Map());
  const { currentUser } = useSelector((state) => state.user);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");
  console.log(quantityMap);

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`/api/items/IgetAll`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setInfo(data.items);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchinfo();
  }, []);

  const increment = (itemId) => {
    setQuantityMap((prevMap) => {
      const newMap = new Map(prevMap);
      const currentQuantity = newMap.get(itemId) || 1;
      if (currentQuantity < 3) {
        newMap.set(itemId, currentQuantity + 1);
      }
      return newMap;
    });
  };

  const decrement = (itemId) => {
    setQuantityMap((prevMap) => {
      const newMap = new Map(prevMap);
      const currentQuantity = newMap.get(itemId) || 1;
      if (currentQuantity > 1) {
        newMap.set(itemId, currentQuantity - 1);
      }
      return newMap;
    });
  };

  //after go to home page inside items add to cart
  const handleAddToCart = async (itemId) => {
    try {
      console.log(itemId);
      const selectItem = Info.find((item) => item._id === itemId);

      if (!selectItem) {
        throw new Error("Item not found");
      }

      const quantity = quantityMap.get(itemId) || 1;

      const response = await fetch("/api/items/Ccreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CurrentuserId: currentUser._id,
          ItemsN: selectItem.ItemsN,
          quantity: quantity,
          price: selectItem.price,
          image: selectItem.image,
        }),
      });

      if (response.ok) {
        alert("succesfull");
      } else {
        alert("Out of stock");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  //search
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...Info]);
    } else {
      // If there's a query, filter the data
      const filteredData = Info.filter(
        (items) =>
          items.ItemsN &&
          items.ItemsN.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Info]);
  

  return (
    <div className="min-h-screen relative flex items-center justify-center">

<img
        src="https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
<div className="relative bg-white mt-14 mb-28 bg-opacity-10 shadow-sm shadow-black w-[1400px] max-w-[1400px] p-6 md:p-8 rounded-3xl border border-opacity-50 flex flex-col items-center">  
      <div className="flex justify-center items-center mt">
        <div>
          <form>
            <div className="opacity-50">
              <input
                type="text"
                placeholder="Search... "
                className=" w-[350px] h-10 rounded-full shadow-xl border border-white bg-opacity-10"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="max-h-[600px] overflow-y-auto scrollbar-none mt-4">
          <div className="flex flex-wrap justify-center w-[1300px]">
            {filter && filter.length > 0 ? (
              <>
                {filter.map((items) => (
                  <tr
                    key={items._id}
                    className=" dark:border-gray-700   dark:bg-gray-800"
                  >
                    <div
                      key={items._id}
                      className=" w-[260px] h-[250px]  mt-10   mb-20 rounded   "
                    >
                      <div className="w-[220px] h-[330px] bg-white rounded-xl shadow-lg">

                     
                      <div className="flex justify-center  items-center gap-8 ">
                      <Link to={`/details/${items._id}`}>
                        <div>
                          <img
                            src={items.image}
                            alt=""
                            className="w-48 h-48 mt-4 object-cover"
                          />
                        </div>

                       </Link>

                        
                      </div>

                      <div className=" ml-4 mt-2">
                        <div className="font-serif w-20 truncate">
                        {items.ItemsN}
                        </div>
                        <div className="font-mono text-red-600">
                        Rs.{items.price}
                        </div>
                        <div className="font-normal text-sm text-slate-600 w-32 truncate">
                        {items.descrip}
                        </div>
                      </div>

                      <Link to={`/details/${items._id}`}>
                      <div className="flex  mt-4 justify-center items-center">
                        <div >
                    
                        <button className="rounded-full bg-red-600  w-52 text-white">
                        select option
                        </button>
                        </div>
                       
                      </div>
                      </Link>
                      </div>
                    </div>
                  </tr>
                ))}
              </>
            ) : (
              <>
                <div className="h-96">
                  <div className="flex justify-center items-center">
                    <div className="text-2xl font-serif absolute  opacity-60 mt-14 ">
                      You have no items
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mb-8 mt-16">
        <div>
          <Link to={`/cart`}>
            <button className="w-24 h-8  text-opacity-80 rounded-full text-white bg-opacity-90 uppercase bg-red-600 hover:opacity-80 shadow-lg">
              {" "}
              cart
            </button>
          </Link>
        </div>
      </div>
      </div>    
    </div>
  );
}
