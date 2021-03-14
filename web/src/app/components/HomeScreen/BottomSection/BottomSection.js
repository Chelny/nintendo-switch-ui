import React from 'react';
import './BottomSection.scss';
import ControllerButton from '@shared/components/ControllerButton/ControllerButton';
import { ActiveHomeRow } from '@shared/enums/ActiveHomeRow';

export default class BottomSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="bottom-section">
        <div className="nintendo-switch-mode-logo">
          {/* TODO: Add other console mode logos */}
          <img className="nintendo-switch-mode-logo-handheld" src={`assets/images/icons/nintendo-switch-mode-handheld.png`} />
        </div>
        <div className="controller-hints">
          {this.props.activeRow === ActiveHomeRow.Games ?
            <ControllerButton button="+" text="Options" small={true} /> : null}
          <ControllerButton button="A" text={`${this.props.activeRow === ActiveHomeRow.Games ? "Start" : "OK"}`} small={true} />
        </div>
      </section>
    );
  }
}
