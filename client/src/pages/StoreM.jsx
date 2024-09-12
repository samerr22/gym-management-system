import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function StoreM() {


  
  const [Info, setInfo] = useState([]);
 
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");
  console.log("ind",DId);

  console.log();

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

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/items/delete/${DId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setInfo((prev) => prev.filter((Employe) => Employe._id !== DId));
        alert("deleted")
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
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
        (Employe) =>
          Employe.ItemsN &&
          Employe.ItemsN.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Info]);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.text("Product Report", 10, 10);

    // Define the columns for the table
    const columns = [
        { title: "Name", dataKey: "name" },
        { title: "Flavor", dataKey: "flavor" },
        { title: "Quantity", dataKey: "quantity" },
        { title: "Price", dataKey: "price" }
    ];

    // Define the data for the table
    const data = Info.map((emp) => ({
        name: emp.ItemsN,
        flavor: emp.flavor,
        quantity: emp.quantity,
        price: emp.price
    }));

    // Add table to the PDF
    doc.autoTable({
        columns: columns,
        body: data,
        styles: {
            cellPadding: 1,
            fontSize: 10,
            lineHeight: 1.2,
            overflow: "linebreak"
        },
        headStyles: {
            fillColor: [0, 128, 0],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
        },
        columnStyles: {
            0: { halign: 'left' },
            1: { halign: 'left' },
            2: { halign: 'left' },
            3: { halign: 'left' }
        }
    });

    // Save the PDF
    doc.save("productReport.pdf");
};



  


  return (
    <div className="h-[600px] relative">
      <img src="" alt="" className="w-full h-full object-cover" />

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div>
          <div className=" flex justify-center items-center">
            <div>
              <h1 className="text-4xl font-serif opacity-90 uppercase   text-gray-800">
                 Management product 
              </h1>
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center mt-2 ">
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
          <div className=" mb-1 mt-4  ">
          <Link to={`/add`}>
            <button className="w-36 bg-blue-600 uppercase rounded-lg  h-10 bg-opacity-90 border-white border border-opacity-45 text font-serif text-white text-opacity-90">
              new product
            </button>
            </Link>
            <button
              onClick={() => generatePDF()}
              className="w-24 bg-blue-600 rounded-lg  h-10 bg-opacity-90 border-white border border-opacity-45 text font-serif text-white text-opacity-90 ml-2"
            >
              Report
            </button>
          </div>
        </div>
       
        <div className=" lg:w-[900px] xl:w-[1300px] lg:h-[400px] w-[450px]  md:w-[700px] rounded-lg bg-opacity-30  bg-white">
   
          <div className="">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full border border-white border-opacity-50 divide-y divide-white divide-opacity-40 shadow-md">
                <thead className="bg-none divide-x divide-black">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs bg-blue-700 bg-opacity-70 text-white font-medium text-opacity-80   uppercase">
                      image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium   bg-blue-700 bg-opacity-70 text-white text-opacity-80   uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium bg-blue-700 bg-opacity-70 text-white text-opacity-80   uppercase">
                    flavor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium  bg-blue-700 bg-opacity-70 text-white text-opacity-80   uppercase">
                       quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium  bg-blue-700 bg-opacity-70 text-white text-opacity-80   uppercase">
                      price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium  bg-blue-700 bg-opacity-70 text-white text-opacity-80    uppercase">
                      Edit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium bg-blue-700 bg-opacity-70 text-white text-opacity-80   uppercase">
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-none bg-opacity-40 divide-y divide-gray-200">
                  {filter && filter.length > 0 ? (
                    <>
                      {filter.map((Employe) => (
                        <tr
                          key={Employe._id}
                          className=" dark:border-gray-700 dark:bg-gray-800"
                        >
                          <td className="px-6 py-4 break-words max-w-[300px]">
                            <img src={Employe.image} alt="" className="w-14 h-14" />
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            {Employe.ItemsN}
                          </td>

                          <td className="px-6 py-4 break-words max-w-[300px] ">
                            {Employe.flavor}
                          </td>

                          <td className="px-6 py-4  break-words max-w-[300px]">
                          {Employe.quantity}
                          </td>
                          
                          <td className=" px-8 py-4  whitespace-nowrap">
                           
                              
                              {Employe.price}
                            
                           
                          </td>

                          <td className="  whitespace-nowrap">
                            <Link to={`/update/${Employe._id}`}>
                              <button className="w-24 bg-lime-500 hover:opacity-80 bg-opacity-70 rounded-lg  h-10  border-white border border-opacity-45 text font-serif text-white text-opacity-80">
                                Edit
                              </button>
                            </Link>
                          </td>
                          <td className="px-2 py-4 whitespace-nowrap">
                            <span
                              onClick={() => {
                                setformId(Employe._id);
                                handleDeleteUser();
                              }}
                            >
                              <button className="w-24 bg-red-600 hover:opacity-80 rounded-lg bg-opacity-70   h-10  border-white border border-opacity-45 text font-serif text-white text-opacity-80 ">
                                Delete
                              </button>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-serif absolute ml-[480px] opacity-60 mt-14 ">
                        You have no product 
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
  );
}
