import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { MdEdit } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";

import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");

  //this is an array to hold all our 'todos'
  const [todos, setTodos] = useState([]);

  const [showFinished, setShowFinished] = useState(true);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);

    //local storage functionality
    saveToLS();
  };

  const handleDelete = (e, id) => {
    // console.log(id);

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);

    //local storage functionality
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");

    //local storage functionality
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = [...todos];

    newTodos[index].isCompleted = !newTodos[index].isCompleted;

    setTodos(newTodos);

    //local storage functionality
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 p-5 rounded-xl py-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-3xl w-full">
          Manage your task-list offline!
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className=" text-2xl font-bold">Add a Todo</h2>

          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-lg px-3 py-1"
            id="1"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-500 p-2 font-bold py-1 text-sm text-white rounded-md"
          >
            Save
          </button>

          <hr className="border-2 bg-violet-800 border-dashed" />
        </div>
        <input
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
          id="2"
        />
        <h3 className="mx-3 inline">Show Finished</h3>
        {/* <label className="mx-2 my-4" htmlFor="show">
          Show Finished
        </label> */}
        <h2 className=" text-2xl font-bold my-4 ">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5">You have no tasks to finish!</div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="w-full todo flex  justify-between my-3"
                >
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 font-bold py-1 text-sm text-white rounded-md mx-1"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 font-bold py-1 text-sm text-white rounded-md mx-1"
                    >
                      <FaDeleteLeft />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
