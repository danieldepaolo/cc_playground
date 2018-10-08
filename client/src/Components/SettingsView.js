import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import _ from 'underscore';

import CardSettingsItem from './CardSettingsItem';

/*
  This component handles changing point/perk values of cards
  Changes will be done via a form for each card
*/

class SettingsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      file: null,
      fileContents: "",
      selectedCard: 1 // card id
    };
  }

  async componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    let response = await fetch('http://localhost:8080/cards');
    const cards = await response.json();

    this.setState({
      cards: cards,
      selectedCard: cards[0].id
    });
  }

  handleChangeCard = cardId => {
    this.setState({
      selectedCard: cardId
    });
  };

  render() {
    const { cards, selectedCard } = this.state;

    return (
      <div className="settingsArea">
        <div className="valueEditArea">
          <div className="cardListBox">
            <List selection verticalAlign="middle">
              {cards.map(card => (
                <List.Item
                  key={card.id}
                  onClick={() => this.handleChangeCard(card.id)}
                  active={card.id === selectedCard}
                >
                  <List.Content>
                    <List.Header>{card.name}</List.Header>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </div>
          <div className="cardSettings">
            <CardSettingsItem 
              selectedCard={_.findWhere(cards, {id: selectedCard})}
              onChangePerkValue={this.handleChangePerk}
              onChangePointValue={this.handleChangePointValue}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsView;
