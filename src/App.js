import React from "react";

const urlRoot = "http://localhost:5000/";

function App() {
  const [data, setData] = React.useState([]);
  const [input, setInput] = React.useState("");

  function GetListItem() {
    fetch(urlRoot)
      .then((res) => res.json())
      .then((data) => setData(data));
  }

  function CreateListitem() {
    fetch(urlRoot + input, { method: "POST" }).then(() => GetListItem());
    setInput("");
  }

  function DeleteListitem(item) {
    fetch(urlRoot + item, { method: "DELETE" }).then(() => GetListItem());
  }

  function updateInputValue(e) {
    setInput(e.target.value);
  }

  React.useEffect(() => {
    GetListItem();
  }, []);

  return (
    <div className="col-8 py-5 vh-100 mx-auto">
      <h1 className="text-center mb-5">To-Do-List</h1>
      <ul
        className="list-group mb-4 overflow-auto"
        style={{ maxHeight: "60vh" }}
      >
        {data.map((item) => (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <p className="col-6 m-0">{item.name}</p>
            <button
              className="w-10 btn btn-danger"
              onClick={() => DeleteListitem(item._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <input
        type="text"
        class="form-control mb-3"
        placeholder='Press "Enter" to Submit'
        onChange={updateInputValue}
        value={input}
        onKeyPress={(e) => e.key === "Enter" && CreateListitem()}
      ></input>
    </div>
  );
}

export default App;
