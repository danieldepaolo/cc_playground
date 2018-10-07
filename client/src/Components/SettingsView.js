import React, { Component } from 'react';
import FileInput from 'react-simple-file-input';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import _ from 'underscore';
import update from 'immutability-helper';

import CardSettingsItem from './CardSettingsItem';

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

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { cards, selectedCard } = this.state;

    const cardIndex = _.findIndex(cards, {id: selectedCard});
    const ptValue = this.state.cards[cardIndex].pointValue;
    //const perks = this.state.cards[cardIndex].perks;

    console.log(prevState);
    console.log(this.state);

    if (prevState.cards.length > 0) {
      if (prevState.cards[cardIndex].pointValue !== ptValue) {
        const url = `http://localhost:8000/cardmanager/${selectedCard}/editpointvalue/`;
        console.log(url);

        // $TODO Capture response and do something
        await fetch(url, {
          method: 'PUT',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({value: ptValue})
        });
      }
    }
  }

  fetchData = async () => {
    let response = await fetch('http://localhost:8000/cardmanager/creditcards/');
    const cards = await response.json();

    response = await fetch('http://localhost:8000/cardmanager/cardperks/');
    const cardPerks = await response.json();

    let perkMap = {};
    cardPerks.forEach(perk => {
      perk.creditCard.forEach(cardId => {
        perkMap[cardId] 
        ? perkMap[cardId].push(perk) 
        : perkMap[cardId] = [perk];
      });
    });

    const cardsWithPerks = cards.map(card => {
      card.perks = perkMap[card.id] || [];
      return card;
    });

    this.setState({
      cards: cardsWithPerks,
      selectedCard: cardsWithPerks[0].id
    });
  }

  handleFileSelected = (event, file) => {
    console.log(event);
    this.setState({file: file, fileContents: event.target.result});
  };

  handleCsvSubmit = async (event) => {
    console.log("Submitted file: ", this.state.file.name);
    console.log("File contents: ", this.state.fileContents);

    const url = `http://localhost:8000/cardmanager/transaction/addcsv/`;
    console.log(url);

    // $TODO Capture response and do something
    await fetch(url, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({csv_transactions: this.state.fileContents})
    });
  };

  handleChangeCard = cardId => {
    this.setState({
      selectedCard: cardId
    });
  };

  handleChangePointValue = async event => {
    let { cards, selectedCard } = this.state;
    const index = _.findIndex(cards, {id: selectedCard});

    // Create a new copy of cards array ...
    // where the point value of selected card is updated
    const cardsCopy = update(cards, {
      [index]: {
        $merge: {pointValue: +event.target.value}
      }
    });

    this.setState({
      cards: cardsCopy
    });
  };

  handleChangePerk = async (event, perkId) => {
    let { cards, selectedCard } = this.state;
    const cardIndex = _.findIndex(cards, {id: selectedCard});
    const perkIndex = _.findIndex(cards[cardIndex].perks, {id: perkId});

    // Create a new copy of cards array ...
    // where the value of particular perk of selected card is updated
    const cardsCopy = update(cards, {
      [cardIndex]: {
        perks: {
          [perkIndex]: {
            $merge: {value: +event.target.value}
          }
        }
      }
    });

    this.setState({
      cards: cardsCopy
    });

    // $TODO Capture response and do something
    const url = `http://localhost:8000/cardmanager/${perkId}/editperkvalue/`;
    console.log(url);

    await fetch(url, {
      method: 'PUT',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({value: event.target.value})
    });
  };

  render() {
    const { cards, selectedCard } = this.state;

    return (
      <div className="settingsArea">
        <div className="spaciousBox">
          <FileInput
            readAs="text"
            onLoad={(e, file) => this.handleFileSelected(e, file)}
          />
          <Button 
            bsStyle="primary" 
            onClick={(e) => this.handleCsvSubmit(e)}
          >
            Submit
          </Button>
        </div>
        
        <div className="valueEditArea">
          <div className="cardListBox">
            <ListGroup>
              {cards.map(card => (
                <ListGroupItem
                  key={card.id}
                  onClick={() => this.handleChangeCard(card.id)}
                  active={card.id === selectedCard}
                >
                  {card.name}
                </ListGroupItem>
              ))}
            </ListGroup>
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
