import { useRef, useState } from "react";
import Todo from "./Components/Todo";
const App = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");
    const [showCompleted, setCompleted] = useState(false);
    const inputBox = useRef(null);
    function handleChange(e) {
        setTask(e.target.value) 
    }
    function addTodo() {
        if (task.trim() === "") return;
        const id = crypto.randomUUID();
        const newTask = {
            id,
            task,
            completed: false,
        };
        console.log(task)
        setTodos((prev) => [...prev, newTask]);
        setTask((prev) => "");
    }
    function deleteTodo(id) {
        console.log("Reaching here")
        setTodos((prev) => prev.filter((t) => t.id !== id));
    }
    function completeTodo(id) {
        setTodos((prev) => {
            const newTodo = prev.map((t) => {
                if (t.id === id) {
                    t.completed = true;
                }
                return t;
            });
            return [...newTodo];
        });
    }
    function handleRemove() {
        setTodos((prev) => {
            console.log(prev);
            return prev.filter((p) => p.completed === false);
        });
    }
    const completedTodos = todos.filter((t) => t.completed !== true)
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
                        ref={inputBox}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                    <button
                        className="bg-blue-500 px-6 py-2 rounded-2xl cursor-pointer"
                        onClick={addTodo}
                    >
                        ADD
                    </button>
                </div>
                <div className="mt-4 flex gap-6">
                    <button
                        className="bg-blue-500  px-4 py-2 rounded-xl cursor-pointer"
                        onClick={() => {
                            setCompleted((prev) => !prev);
                        }}
                    >
                        Show Remaining
                    </button>
                    <button
                        className="bg-red-500 px-4 py-2 rounded-xl cursor-pointer"
                        onClick={handleRemove}
                    >
                        Remove Completed
                    </button>
                </div>

                <div className="mt-4 flex flex-col gap-4">
                    {todos.length > 0 ? (todos.map((t) => <Todo deleteTodo={deleteTodo} completeTodo={completeTodo} addTodo={addTodo} />)) : (<p>Add todos</p>)}
                </div>
            </div>
        </div>
    );
};

export default App;
