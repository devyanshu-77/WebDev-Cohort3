import React from "react";

const Todo = ({ task, deleteTodo, id, completeTodo, complete }) => {
    return (
        <div className="bg-gray-200 text-black px-3 py-2 rounded-xl flex justify-between -center">
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    onClick={
                        () => {
                        completeTodo(id);
                        }
                    }
                    className={`bg-black h-4 w-4 ${complete ? "disabled:opacity-50 cursor-none" : null}`}
                />
                <p
                    className={`flex justify-between text-shadow-white ${complete ? "line-through" : null}`}
                >
                    {task}
                </p>
            </div>
            <span
                className="bg-red-500 h-full rounded-md px-2 cursor-pointer"
                onClick={() => {
                    deleteTodo(id);
                }}
            >
                DELETE
            </span>
        </div>
    );
};

export default Todo;
