import { useEffect, useState } from "react";

function Home() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/todo")
      .then((res) => res.json())
      .then((res) => setTodos(res));
  }, []);
  return (
    <div className="h-full w-full">
      <h1 className="text-center my-5 text-5xl border-b-2 pb-5">All todos</h1>
      <div className="flex flex-wrap gap-2 justify-around">
        {todos.map((todo) => (
          <div className="border-2 border-black p-2 w-1/6" key={Math.random()}>
            <h1>{todo.name}</h1>
            <h1>{todo.des}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
