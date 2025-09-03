const {useState} = React;

export function LongText({ children, length = 100}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const str =
    typeof children === "string" || typeof children === "number"
      ? String(children)
      : "";
  const cutText = isExpanded ? str : str.substring(0, length);
  const toggle = () => setIsExpanded((prev) => !prev);
  return (<div>
    <p>{cutText+'...'}</p>
    <button onClick={toggle}>
      Read More
    </button>
  </div>)
}
