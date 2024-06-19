const UploadTodo = () => {
  // form handle
  const handleForm = (e) => {
    e.preventDefault();
    const formInfo = e.target;

    const name = formInfo.Title.value;
    const des = formInfo.Description.value;

    const todoObj = {
      name,
      des,
    };

    // Get token (assuming it's stored somewhere accessible)
    const token = localStorage.getItem("token");

    // Send request
    fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // Send cookies and credentials with the request
      body: JSON.stringify(todoObj),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(() => {
        alert("Uploaded successfully");
        formInfo.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to upload todo");
      });
  };

  return (
    <div className="flex justify-center items-center w-full h-full flex-col">
      <h2 className="text-3xl py-10">Upload a todo</h2>
      <form onSubmit={handleForm} className="flex flex-col">
        <input
          className="outline-none border-b-2 py-2 my-2"
          type="text"
          placeholder="Title"
          name="Title"
          required
        />
        <textarea
          className="outline-none border-b-2 py-2 my-2"
          type="text"
          placeholder="Description"
          name="Description"
          required
        />
        <button
          className="border-2 border-black px-4 py-2 mt-5 rounded"
          type="submit"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadTodo;
