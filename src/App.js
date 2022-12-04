import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  // const axiosData = axios.create("http://localhost:5000", {
  //   item: "hhhh",
  // });

  const [Input, setInput] = useState("");
  const [Datas, setdatas] = useState("");
  // const [update, setUpdate] = useState("");

  // console.log(Input);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (Input !== "") {
      try {
        const getdata = await axios.post(
          "https://tame-cyan-fox-garb.cyclic.app/api/item",
          {
            item: Input,
          }
        );
        setdatas((prev) => [...prev, getdata.data]);
        setInput("");
        console.log("Added successfully");
      } catch (error) {
        console.log("error is -->  " + error);
      }
    } else {
      alert("enter something");
    }
  };

  const deletItem = async (e) => {
    try {
      const detetedItem = await axios.delete(
        `https://tame-cyan-fox-garb.cyclic.app/api/items/${e}`
      );
      const newItems = Datas.filter((i) => i._id !== e);
      setdatas(newItems);
      console.log("deleted successfully");
    } catch (error) {
      console.log("error is -->  " + error);
    }
  };

  const update = async (id) => {
    try {
      let updateText = prompt("enter");
      const updateData = await axios.put(
        `https://tame-cyan-fox-garb.cyclic.app/api/items/${id}`,
        {
          item: updateText,
        }
      );
      const updateIndex = Datas.findIndex((item) => item._id === id);
      Datas[updateIndex].item = updateText;
      setdatas((prev) => [...prev]);
      console.log("updated successfully");
    } catch (error) {
      console.log("error is -->  " + error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const datas = await axios.get(
          "https://tame-cyan-fox-garb.cyclic.app/api/items"
        );
        // console.log(datas.data);
        setdatas(datas.data);
      } catch (error) {
        console.log("error is -->  " + error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="App">
      <h1>To do</h1>
      <form onSubmit={(e) => submitHandler(e)}>
        <input
          type="text"
          name="text"
          value={Input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>Submit</button>
      </form>
      <div className="add_content">
        {typeof Datas !== undefined && Datas !== "" ? (
          Datas.map((item) => (
            <div key={item._id} className="todo-container">
              <div className="text">{item.item}</div>
              <div className="btn-container">
                <button onClick={() => update(item._id)}>update</button>
                <button onClick={() => deletItem(item._id)}>Detete</button>
              </div>
            </div>
          ))
        ) : (
          <h1>wait..............</h1>
        )}
      </div>
    </div>
  );
}

export default App;
