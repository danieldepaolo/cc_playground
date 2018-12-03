import React, { Component } from 'react';

/*
  This is the main component 

*/

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valDefaultsChecked: true
    };
  }

  render() {
    const { valDefaultsChecked } = this.state;

    <div>
      <div className="pretty p-switch p-fill">
        <input
          type="checkbox"
          name="valDefault"
          checked={isSelected}
          onChange={e => this.setState({valDefaultsChecked: !valDefaultsChecked})}
        />
        <div className="state">
          <label>Use Default Currency/Perk Values</label>
        </div>
      </div>
    </div>
  }
}

export default Profile;
