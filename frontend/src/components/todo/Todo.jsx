import { useState } from "react";
import Task from "../task/Task";

export default function Todo() {
    const [text, setText] = useState("");
    const [error, setError] = useState(false);
    const [count, setCount] = useState(1);

    const addTask = () => {
        if (text !== "") {
            fetch("http://localhost:3001/getData", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ text })
            }).then(() => {
                setCount(prevCount => prevCount + 1);
                setText(""); 
                setError(false); 
            }).catch((error) => {
                console.error("Error adding task:", error);
                setError(true);
            });
            setCount(prevCount => prevCount + 1);
        } else {
            setError(true); 
        }
    };

    return (
        <>
            <div className="max-w-lg mt-4 mx-auto p-8 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-3xl shadow-2xl">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Create a New Task</h2>
                <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="text" className="text-lg font-medium text-white">Task</label>
                        <input
                            type="text"
                            name="text"
                            id="text"
                            required
                            placeholder="Enter task..."
                            className="w-full px-6 py-4 text-gray-800 placeholder-gray-500 bg-white rounded-xl shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        {error && 
                            <span className="text-red-600 font-semibold text-center bg-white py-1 rounded-lg">Task name cannot be empty!</span>
                        }
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-700 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200"
                            onClick={addTask}
                        >
                            Add Task
                        </button>
                    </div>
                </div>
            </div>
            <Task count={count} />
        </>
    );
}
