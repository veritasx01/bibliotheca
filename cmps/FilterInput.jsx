export function FilterInput() {
  return (
    <form className="filter-form">
      <label>Title: </label>
      <input type="text" name="title"></input>
      <input type="submit" value={"Submit"}></input>
    </form>
  );
}
