import { bookService } from "../services/bookService.js";
const { useState, useEffect } = React;

export function FilterInput({ onSetFilter }) {
  const [formFilter, setFormFilter] = useState(bookService.getEmptyFilter());
  // useEffect(() => {
  //   onSetFilter(formFilter);
  // }, [formFilter]);
  function handleSubmit(event) {
    event.preventDefault();
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
    <form className="filter-form" onSubmit={handleSubmit}>
      <label>Title: </label>
      <input type="text" name="title" onChange={handleChange}></input>
      <label>max Price: </label>
      <input type="text" name="maxAmount" onChange={handleChange}></input>
      <label>min Price: </label>
      <input type="text" name="minAmount" onChange={handleChange}></input>
      <button type="submit">Submit</button>
    </form>
  );
}
