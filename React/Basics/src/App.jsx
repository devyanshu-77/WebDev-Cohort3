import { useState } from "react";
import Todo from "./Components/Todo";
const App = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("")
    function handleChange(e) {
        setTask((prev) => e.target.value)
    }
    function addTodo() {
      const id = Math.ceil(todos.length * (Math.random() * 10))
      const newTask = {
        id,
        task,
      }
      setTodos((prev) => [...prev, newTask])
      setTask((prev) => "")
    }
    console.log(typeof todos)
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="px-6 py-8 bg-gray-800 text-white rounded-2xl">
                <h1 className="text-center text-3xl font-semibold mb-6">
                    TODO
                </h1>
                {/* ADD todos */}
                <div className="flex gap-8">
                    <input
                        type="text"
                        className="bg-gray-500 rounded-2xl px-4 py-2 outline-none"
                        value={task}
                        onChange={(e) => {handleChange(e)}}
                    />
                    <button
                        className="bg-blue-500 px-6 py-2 rounded-2xl cursor-pointer"
                        onClick={addTodo}
                    >
                        ADD
                    </button>
                </div>
                {/* Display TODOS */}
                <div className="mt-6 flex flex-col gap-2">
                    {todos.map((t) => {
                        return <Todo key={t.id} task={t.task} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default App;
