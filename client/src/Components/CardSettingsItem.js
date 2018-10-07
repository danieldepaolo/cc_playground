import React, { Component } from 'react';
import { Label, Table } from 'react-bootstrap';

class CardSettingsItem extends Component {
  handleChange = (event) => {
    this.props.notifySelectChange(this.props.cardInfo.id);
  }

  render() {
    const { 
      selectedCard, 
      onChangePerkValue, 
      onChangePointValue 
    } = this.props;

    return selectedCard 
    ? (
      <div>
        <div>
          <img src={selectedCard.card_image} />
          <p className="ptValueEdit">
            <Label htmlFor="ptValueInput">Point Value</Label>
            <input
              type="number"
              name="ptValueInput"
              value={selectedCard.pointValue}
              step="0.1"
              onChange={onChangePointValue}
            />
          </p>
        </div>
        <div style={{overflowY: 'auto'}}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Perk Name</th>
                <th>Value ($)</th>
              </tr>
            </thead>
            <tbody>
            {selectedCard.perks.map(perk => (
            <tr key={perk.id}>
              <td>{perk.name}</td>
              <td>
                <input
                  type="number"
                  value={perk.value}
                  onChange={(e) => onChangePerkValue(e, perk.id)}
                />
              </td>
            </tr>
            ))}
            </tbody>
          </Table>
        </div>
      </div>
    ) : (
      <p>Select a card from the list</p>
    );
  }
}

export default CardSettingsItem;
