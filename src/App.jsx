import { useEffect } from "react";
import { useState } from "react";
import Navbar from "./UI/Navbar";
import List from "./UI/List";
import Input from "./Components/Input";
import Skeleton from "./UI/Skeleton";
function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const submitHandler = (description) => {
    setData((prev) => {
      return [
        ...prev,
        { id: Math.floor(Math.random() * 10000), description, complete: false },
      ];
    });
  };
  const completeHandler = (id) => {
    setData((prev) => {
      return prev.map((p) => {
        if (p.id === id) {
          return { ...p, completed: !p.completed };
        }
        return p;
      });
    });
  };
  const deleteHandler = (id) => {
    setData((prev) => {
      return prev.filter((p) => p.id !== id);
    });
  };
  const editHandler = (id, description) => {
    if (description.trim() === "") {
      return deleteHandler(id);
    }
    setData((prev) => {
      return prev.map((p) => {
        if (p.id === id) {
          return { ...p, description: description };
        }
        return p;
      });
    });
  };
  return (
    <div className="min-h-[80dvh] bg-dark-300 text-accent-100  relative ">
      <Navbar />
      <div className="flex justify-center mt-28 md:mt-32 items-center">
        {data?.length > 0 ? (
          <List
            data={[...data].reverse()}
            // data={}
            completeHandler={completeHandler}
            deleteHandler={deleteHandler}
            submitHandler={submitHandler}
            editHandler={editHandler}
          />
        ) : (
          <Skeleton />
        )}
      </div>
      <Input submitHandler={submitHandler} />
    </div>
  );
}

export default App;
