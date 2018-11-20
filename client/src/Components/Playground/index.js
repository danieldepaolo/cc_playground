import React, { Component } from 'react';
import _ from 'underscore';
import axios from 'axios';

import CardGridView from './CardGridView';
import BonusBox from './BonusBox';

class Playground extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      bonus: '$0.00',
      cardSelectStatus: {},
      bonusLoading: false
    }
  }

  async componentDidMount() {
    await this.fetchData();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const prev = prevState.cardSelectStatus;
    const current = this.state.cardSelectStatus;

    if (!_.isEqual(prev, current)) {
      await this.fetchBonusAmount();
    }
  }

  fetchData = async () => {
    let response = await axios('/cards');

    const cardStatus = {};
    response.data.cards.forEach(card => {
      cardStatus[card._id] = false;
    });

    this.setState({
      cardSelectStatus: cardStatus,
      cards: response.data.cards
    });
  }

  fetchBonusAmount = async () => {
    let url = '/playground/calcbonus';

    let cardIdsToGet = _.filter(
      _.keys(this.state.cardSelectStatus),
      cardId => this.state.cardSelectStatus[cardId] === true
    );
    let args = cardIdsToGet.map(cardId => `card_id=${cardId}`);
    url += args.length > 0 ? '?' + args.join('&') : '';
    console.log(url);

    this.setState({bonusLoading: true});

    let response = await axios(url);

    this.setState({
      bonus: response.data.bonus,
      bonusLoading: false
    });
  };

  handleSelectChange = (cardId) => {
    let { cardSelectStatus } = this.state;
    this.setState({ 
      cardSelectStatus: { ...cardSelectStatus, 
        [cardId]: !cardSelectStatus[cardId] 
      } 
    });
  };
  
  render() {
    const { cards, cardSelectStatus, bonus } = this.state;

    return (
      <div>
        <BonusBox
          loading={this.state.bonusLoading}
          bonus={bonus}
        />
        <div className="playgroundArea">
          <CardGridView
            cards={cards}
            cardSelectStatus={cardSelectStatus}
            onSelectChange={this.handleSelectChange}
          />
        </div>
      </div>
    );
  }
}

export default Playground;
