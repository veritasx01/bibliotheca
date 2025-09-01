import { getEmptyFilter } from "../services/bookService.js";
const { useState, useEffect } = React;

export function FilterInput({ onSetFilter }) {
  const [formFilter, setFormFilter] = useState(getEmptyFilter());
  // useEffect(() => {
  //   onSetFilter(formFilter);
  // }, [formFilter]);
  function handleSubmit(event) {
    event.preventDefault();
    console.log('hallo');
    onSetFilter(formFilter);
  }
  function handleChange({ target }) {
    let { value, name: field } = target;

    switch (target.type) {
      case "range":
      case "number":
        value = +target.value;
        break;
      case "checkbox":
        value = target.checked;
        break;
    }
    setFormFilter((prevFilter) => ({ ...prevFilter, [field]: value }));
  }
  return (
    <form className="filter-form">
      <label>Title: </label>
      <input type="text" name="title" onChange={handleChange}></input>
      <label>Price: </label>
      <input type="text" name="amount" onChange={handleChange}></input>
      <input type="submit" value={"Submit"} onClick={handleSubmit}></input>
    </form>
  );
}
