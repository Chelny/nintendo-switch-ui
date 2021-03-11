import "./ControllerButton.scss";

export default function ControllerButton(props) {
  return (
    <div className={`controller-button ${props.small ? "controller-button--small" : ""}`}>
      <span className="controller-button__icon">
        {props.button}
      </span>
      <p className="controller-button__text">
        {props.text}
      </p>
    </div>
  );
}
