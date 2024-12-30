import { useEffect, useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";


export default function Task( {count} ) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/data")
        .then((resp) => resp.json())
        .then((res) => {
            setData(res)
        })
        .catch((err) => console.log(err));
    }, [count])

    const clearAll = () => {
        fetch("http://localhost:3001/clear", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
        })
         .then((response) => {
            if (response.ok){
                setData([]);
            }
         })
         .catch((err) => {
            console.log(err);
         })
    }

    const deleteRow = (itemId) => {
        fetch("http://localhost:3001/deleteRow", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({itemId})
        }) 
         .then((response) => {
            if (response.ok){
                const filteredData = data.filter((item) => item.id !== itemId);
                setData(filteredData);
            }
         })
    }

    return (
        <div className="max-w-4xl mx-auto mt-3 p-6 bg-white rounded-xl shadow-lg">
            <table className="min-w-full table-auto">
                {data.length > 0 && 
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Task</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Action</th>
                        </tr>
                    </thead>
                }
                <tbody>
                    {data.length > 0 && 
                        data.map(item => (
                            <tr className="hover:bg-gray-100" key={item.id}>
                                <td className="px-6 py-4 text-sm text-gray-800">{item.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{item.text}</td>
                                <td className="px-6 py-4 flex gap-3 text-base text-gray-800">
                                    <FaPencilAlt className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors duration-200" />
                                    <FaTrash onClick={() => deleteRow(item.id)} className="text-red-600 hover:text-red-800 cursor-pointer transition-colors duration-200" />
                                </td>
                            </tr>
                        ))
                    }
                    {data.length == 0 && 
                        <tr className="text-center font-semibold tracking-wider">
                            <td className="border border-b-gray-200 py-2 px-4">Empty!</td>
                        </tr>
                    }
                </tbody>
            </table>
            <div className="flex mt-3 justify-end pr-5">
                <button onClick={clearAll} className="border border-gray-400 text-black font-semibold px-4 rounded-lg border-solid hover:bg-gray-900 hover:text-white transition-all duration-300 outline-none py-2">Delete All</button>
            </div>
        </div>
    );
}
