import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { FaPlus, FaMinus } from "react-icons/fa";
import { useSelector } from 'react-redux';


export default function details() {

    const [formData, setFormData] = useState({});
    const [quantityMap, setQuantityMap] = useState(new Map());
    const { currentUser } = useSelector((state) => state.user);
    console.log(formData)
  

    const { itemId } = useParams();


    useEffect(() => {
        try {
          const fetchStudents = async () => {
            const res = await fetch(`/api/items/IgetAll?itemId=${itemId}`);
            const data = await res.json();
            console.log("data", data);
    
            if (!res.ok) {
              console.log(data.message);
            }
            if (res.ok) {
              const selected = data.items.find((item) => item._id === itemId);
              if (selected) {
                setFormData(selected);
              }
            }
          };
          fetchStudents();
        } catch (error) {
          console.log(error.message);
        }
      }, [itemId]);

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
      

      

      const quantity = quantityMap.get(itemId) || 1;

      const response = await fetch("/api/items/Ccreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CurrentuserId: currentUser._id,
          ItemsN: formData.ItemsN,
          quantity: quantity,
          price: formData.price,
          image: formData.image,
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



  return (
    <div className="min-h-screen relative flex items-center justify-center">

<img
        src="https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
<div className="relative bg-white mt-14 mb-28 bg-opacity-60 shadow-sm shadow-black w-[900px] max-w-[900px] p-6 md:p-8 rounded-3xl border border-opacity-50 flex flex-col items-center">
<div className="flex justify-center items-center">
              <Link to={`/home`}>
                <button className="text-md hover:text-blue-400   font-serif underline text-gray-800">
                  Back
                </button>
              </Link>
            </div>


        <div className=' absolute ml-[1200px] mt-[-50px] '>
        <Link to={`/cart`}>
            <button className='w-32 uppercase font-serif
             text-white hover:text-black  bg-red-600 rounded-full'>
            Cart
            </button>
            </Link>
           
        </div>
        <div className='flex justify-center items-center gap-20'>
            <div>

        
           <img src={formData.image} alt="" className='w-72 rounded-3xl shadow-sm shadow-black h-96' />



          
            </div>


            <div>
                <div>
                    <div className='font-serif text-xl'>
                        <h1>{formData.ItemsN}</h1>
                    </div>
                    <div className='font-mono text-lg mt-2 text-red-600'>
                        <p>Rs{formData.price}</p>
                    </div>
                    <div className='mt-4 w-96 font-serif text-slate-700 break-words'>
                        <h1>{formData.descrip}</h1>
                    </div>

                    <div className='mt-4'>
                     <button className='w-28 rounded-full bg-white bg-opacity-60 cursor-default'>
                     <h1>{formData.size}</h1>

                     </button>


                       
                    </div>
                    <div className='mt-4'>
                      <div className='w-28 rounded-full bg-white bg-opacity-60 cursor-default'>
                      <h1 className=' ml-4 self-center font-serif'>{formData.flavor}</h1>
                      </div>
              
                      
                    </div>

                    <div className='mt-4'>
                    <div className="">
                            <div className="flex mt-10">
                              <div
                                className="w-[30px] border  bg-red-600 rounded-md flex justify-center items-center  cursor-pointer "
                                onClick={() => decrement(formData._id)}
                              >
                                <FaMinus className="text-slate-100 hover:text-black" />
                              </div>
                              <div className="text-[20px] w-[30px]  text-black flex justify-center items-center  ">
                                {quantityMap.get(formData._id) || formData.quantity}
                              </div>

                              <div
                                className="w-[30px]  border  bg-red-600 rounded-md   flex justify-center items-center cursor-pointer "
                                onClick={() => increment(formData._id)}
                              >
                                <FaPlus className="text-slate-100 hover:text-black" />
                              </div>
                            </div>
                          </div>
                    </div>

                    <div className="flex justify-center items-center mt-8">
                            <div>
                              <button
                                onClick={() => handleAddToCart(formData._id)}
                                className="w-56 h-8 rounded-full text-white bg-opacity-90 uppercase bg-red-600 hover:opacity-80 shadow-lg"
                              >
                                Add to cart
                              </button>
                            </div>
                          </div>






                </div>
            </div>
        </div>
        </div>
        


    </div>
  )
}
