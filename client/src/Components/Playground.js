import React, { Component } from 'react';
import ReactTable from "react-table";
import _ from 'underscore';

import CardGridView from './CardGridView';
import BonusBox from './BonusBox';

const columns = [{
  Header: 'Date',
  accessor: 'date',
  width: 100
}, {
  Header: 'Merchant',
  accessor: 'merchant',
  filterable: true
}, {
  Header: 'Product Type',
  accessor: 'productType',
  filterable: true
}, {
  Header: 'Amount',
  accessor: 'amount',
  width: 80
}];

class Playground extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      transactions: [],
      bonus: '$0.00',
      cardSelectStatus: {},
      bonusLoading: false
    }
  }

  async componentDidMount() {
    this.fetchData();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.cardSelectStatus !== this.state.cardSelectStatus) {
      this.fetchBonusAmount();
    }
  }

  fetchData = async () => {
    let response = await fetch('http://localhost:8080/cards');
    const cards = await response.json();

    response = await fetch('http://localhost:8080/transactions');
    const transactions = await response.json();

    const cardStatus = {};
    cards.forEach( (card) => {
      cardStatus[card.id] = false;
    });
    this.setState({
      cardSelectStatus: cardStatus,
      cards: cards,
      transactions: transactions
    });
  }

  fetchBonusAmount = async () => {
    let url = 'http://localhost:8080/playground/calcbonus?';

    let cardIdsToGet = _.filter(
      _.keys(this.state.cardSelectStatus),
      cardId => this.state.cardSelectStatus[cardId] === true
    );
    let args = cardIdsToGet.map(cardId => `card_id=${cardId}`);
    url += args.join('&');
    console.log(url);

    this.setState({bonusLoading: true});

    let response = await fetch(url);
    // $TODO also return bonus for each transaction or similar
    let data = await response.json();

    this.setState({
      bonus: data.bonus,
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
    const { cards, cardSelectStatus, 
      transactions, bonus } = this.state;

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
          <div className="tableContainer">
            <ReactTable
              columns={columns}
              data={transactions}
              defaultPageSize={20}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Playground;
