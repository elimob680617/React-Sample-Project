import React, { useState } from "react";

const List = () => {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  const submitHandler = () => {
    setList([...list, value]);
    setValue("");
  };

  const deletHandler = (item) => {
    setList(list.filter((el) => el !== item));
  };

  return (
    <>
      <input type="text" value={value} onChange={changeHandler} />
      <button onClick={submitHandler}>Add Something!</button>
      <hr />
      <ul>
        {list.map((item) => (
          <li onClick={() => deletHandler(item)}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default List;
