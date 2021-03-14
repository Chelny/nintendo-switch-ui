import React from 'react';
import './UnlockBar.scss';
import Bullets from '@shared/components/Bullets/Bullets';
import ControllerButton from '@shared/components/ControllerButton/ControllerButton';

export default class UnlockBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="unlock-bar">
        <p className="unlock-bar__text">Press the same button three times.</p>
        <Bullets count={this.props.bulletsCount} progress={this.props.progress} />
        <ControllerButton button="B" text="Back" small={true} />
      </div>
    );
  }
}
