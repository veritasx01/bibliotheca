import { eventBusService } from "../services/eventBusService.js";
const { useState, useEffect } = React;

export function UserMsg({ duration = 3000 }) {
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  eventBusService.on("show-user-msg", (data) => {
    setVisible(true);
    if (data.type === "success") {
      setSuccess(true);
    }
    setMessage(data.txt);
  });

  const colorString = success ? "success" : "failure";
  const opacityStyle = { opacity: visible ? 1 : 0 };
  const classString = `user-msg ${colorString}`;

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setMessage("");
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  return (
    <div className={classString} style={opacityStyle}>
      {message}
    </div>
  );
}
