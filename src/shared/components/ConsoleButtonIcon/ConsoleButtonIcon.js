import "./ConsoleButtonIcon.scss";
import { ConsoleButtonIconSize } from "../../enums/ConsoleButtonIconSize";

export default function ConsoleButtonIcon(props) {
  return (
    <div className={`icon ${props.size === ConsoleButtonIconSize.Small ? "icon-small" : ""}`}>
      <p>{props.content}</p>
    </div>
  );
}
