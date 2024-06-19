import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

function ManageTodo() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const googleAuth = localStorage.getItem("googleAuth");

    const fetchUser = async () => {
      fetch("http://localhost:3000/google/data", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => setUser(res));
    };

    if (googleAuth) {
      fetchUser();
    } else if (token) {
      try {
        const tokenUser = jwtDecode(token);
        setUser(tokenUser);
      } catch (error) {
        console.error("Invalid token:", error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user) {
      setLoading(true);
      const fetchTodos = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/todo/${user.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              credentials: "include",
            }
          );
          const responseBody = await response.text();
          if (!response.ok) {
            throw new Error(responseBody || "Failed to fetch todos");
          }
          const data = responseBody ? JSON.parse(responseBody) : [];
          setTodos(data);
        } catch (error) {
          console.error("Error fetching todos:", error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchTodos();
    }
  }, [user]);

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/todo/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          setTodos(todos.filter((todo) => todo._id !== id));
          alert("Deleted successfully");
        } else {
          return res.text().then((text) => {
            throw new Error(text || "Failed to delete todo");
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting todo:", error.message);
        alert("Failed to delete todo");
      });
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center my-5 text-5xl border-b-2 pb-5">
        Manage your todo
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap gap-2 justify-around text-wrap">
          {todos.map((todo) => (
            <div key={todo._id} className="border-2 p-2 w-1/6">
              <h1>{todo.name}</h1>
              <h1>{todo.des}</h1>
              <button
                onClick={() => handleDelete(todo._id)}
                className="border-2 border-black px-4 py-2 mt-5 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageTodo;
