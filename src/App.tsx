import { useEffect, useState } from "react";

function App() {
  // * Date: Fri 17th May 2024

  // *******************************************************************
  // *                                                                 *
  // *                      DEV NOTES                                  *
  // *                                                                 *
  // * I had a hard time making the table responsive for mobile        *
  // * specifically, as the table head would eventually come out of    *
  // * view. Any feedback here would be appreciated. I understand that *
  // * tables haven't always been great for screen responsivness       *
  // *                                                                 *
  // *                                                                 *
  // *                                                                 *
  // *           DEV NOTES: REQUIREMENTS & FEATURES                    *
  // *                                                                 *
  // * Originally, I wanted to implement sorting (price, name, status) *
  // * and filtering by category but there wasn't any requirement for  *
  // * it and I feel I would be wasting time for somethigng that isn't *
  // *                         a requirement                           *
  // *                                                                 *
  // *                                                                 *
  // *******************************************************************

  interface Item {
    name: string;
    priceInPounds: number;
    status: string;
    categories: string[];
  }

  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/");
      const resData = await response.json();

      setData(resData);
    } catch (err: any) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setError(true);

      throw new Error(err.message);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  const handleChangeStatus = (index: number, newStatus: string) => {
    const newData = [...data];
    newData[index].status = newStatus;
    setData(newData);
  };

  const handleRemoveItem = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center h-[100vh]">
      {error && !loading && (
        <div className="text-center">
          <p className="text-[#F07C00] text-lg lg:text-2xl font-semibold">
            Something went wrong!
          </p>
          <p className="text-lg lg:text-2xl font-thin">
            Please try again or get in contact with us if the issue persists.
          </p>
          <button
            className="bg-[#F07C00] text-slate-100 py-2 px-4 md:px-5 lg:py-3 lg:px-6 rounded capitalize font-bold hover:bg-white hover:text-[#F07C00] hover:border-[#F07C00] border-2 transition-all duration-300 ease-in-out mt-10"
            onClick={() => {
              setError(false);
            }}
          >
            Go back
          </button>
        </div>
      )}
      {loading && (
        <div className="container mt-[5rem] md:mt-0 p-5 md:p-0">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border border-gray-300 bg-[#F07C00] text-white text-left leading-tight font-semibold">
                  Name
                </th>
                <th className="py-2 px-4 border border-gray-300 bg-[#F07C00] text-white text-left leading-tight font-semibold">
                  Price
                </th>
                <th className="py-2 px-4 border border-gray-300 bg-[#F07C00] text-white text-left leading-tight font-semibold">
                  Status
                </th>
                <th className="py-2 px-4 border border-gray-300 bg-[#F07C00] text-white text-left leading-tight font-semibold">
                  Option
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={index}>
                  <td
                    className={`py-2 px-4 border border-gray-300 ${
                      index % 2 ? "bg-gray-100" : "bg-gray-200"
                    }`}
                  >
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </td>
                  <td
                    className={`py-2 px-4 border border-gray-300 ${
                      index % 2 ? "bg-gray-100" : "bg-gray-200"
                    }`}
                  >
                    <div className="animate-pulse h-4 bg-gray-300 rounded w-1/2"></div>
                  </td>
                  <td
                    className={`py-2 px-4 border border-gray-300 ${
                      index % 2 ? "bg-gray-100" : "bg-gray-200"
                    }`}
                  >
                    <div className="animate-pulse h-4 bg-gray-300 rounded w-3/4"></div>
                  </td>
                  <td
                    className={`py-2 px-4 border border-gray-300 w-10 ${
                      index % 2 ? "bg-gray-100" : "bg-gray-200"
                    }`}
                  >
                    <div className="animate-pulse h-4 bg-gray-300 rounded w-10"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {data.length > 0 && !loading && !error && (
        <div className="container mt-[5rem] md:mt-0 p-5 md:p-0">
          <h1 className="text-[#F07C00] text-2xl lg:text-4xl font-semibold text-center mb-5">
            Entries
          </h1>
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border border-gray-300 bg-[#F07C00] text-white text-left leading-tight font-semibold">
                  Name
                </th>
                <th className="py-2 px-4 border border-gray-300 bg-[#F07C00] text-white text-left leading-tight font-semibold">
                  Price
                </th>
                <th className="py-2 px-4 border border-gray-300 bg-[#F07C00] text-white text-left leading-tight font-semibold">
                  Status
                </th>
                <th className="py-2 px-4 border border-gray-300 bg-[#F07C00] text-white text-left leading-tight font-semibold">
                  Option
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td
                    className={`py-2 px-4 border border-gray-300  ${
                      index % 2 ? "bg-gray-100" : "bg-gray-200"
                    }`}
                  >
                    <div>{item.name}</div>
                    <div className="text-sm text-gray-500">
                      <span className="text-gray-500 font-semibold text-sm">
                        Category:
                      </span>{" "}
                      {item.categories.join(", ")}
                    </div>
                  </td>
                  <td
                    className={`py-2 px-4 border border-gray-300  ${
                      index % 2 ? "bg-gray-100" : "bg-gray-200"
                    }`}
                  >
                    £{item.priceInPounds.toFixed(2)}
                  </td>
                  <td
                    className={`py-2 px-4 border border-gray-300  ${
                      index % 2 ? "bg-gray-100" : "bg-gray-200"
                    } w-60`}
                  >
                    <select
                      title="Status"
                      value={item.status}
                      onChange={(e) =>
                        handleChangeStatus(index, e.target.value)
                      }
                      className="block w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    >
                      <option value="active">Active</option>
                      <option value="disabled">Disabled</option>
                      <option value="pendingReview">Pending Review</option>
                    </select>
                  </td>
                  <td
                    className={`py-2 px-4 border border-gray-300 w-10 ${
                      index % 2 ? "bg-gray-100" : "bg-gray-200"
                    }`}
                  >
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="py-[0.1rem] px-3 bg-red-500 text-white rounded focus:outline-none focus:ring focus:ring-red-400 text-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.length <= 0 && !error && !loading && (
        <div className="container mt-[5rem] md:mt-0 p-5 md:p-0">
          <h1 className="text-[#F07C00] text-2xl lg:text-4xl font-semibold text-center mb-5">
            Entries
          </h1>
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border border-gray-300 bg-[#F07C00] text-white text-left leading-tight font-semibold">
                  Name
                </th>
                <th className="py-2 px-4 border border-gray-300 bg-[#F07C00] text-white text-left leading-tight font-semibold">
                  Price
                </th>
                <th className="py-2 px-4 border border-gray-300 bg-[#F07C00] text-white text-left leading-tight font-semibold">
                  Status
                </th>
                <th className="py-2 px-4 border border-gray-300 bg-[#F07C00] text-white text-left leading-tight font-semibold">
                  Option
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border border-gray-300 bg-gray-200">
                  No data
                </td>
                <td className="py-2 px-4 border border-gray-300 bg-gray-200">
                  No data
                </td>
                <td className="py-2 px-4 border border-gray-300 bg-gray-200">
                  No data
                </td>
                <td className="py-2 px-4 border border-gray-300 bg-gray-200"></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
