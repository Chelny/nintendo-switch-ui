import "./Card.scss";

export default function FeaturedNewsItem(props) {
  return (
    <div className={`card ${props.boxShadowAnimation ? "box-shadow-animation" : ""}`}>
      <p>{props.image}</p>
    </div>
  );
}
