import React from "react";
import "./FooterSection.scss";

export default class FooterSection extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="footer">
        <div className="nintendo-switch-mode-logo">
          {/* TODO: Add other mode logos */}
          <img className="nintendo-switch-mode-logo-handheld" src={`assets/images/icons/nintendo-switch-mode-handheld.png`} />
        </div>
        <div className="controller-hints">
          *controller hints*
        </div>
      </div>
    );
  }
}
