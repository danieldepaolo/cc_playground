import React, { Component } from 'react';
import ReactTable from "react-table";
import Loader from 'react-loader';
import classNames from 'classnames';

import CardGridView from './CardGridView';

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
    let response = await fetch('http://localhost:8000/cardmanager/creditcards/');
    const cards = await response.json();

    response = await fetch('http://localhost:8000/cardmanager/transactions/');
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
    let url = 'http://localhost:8000/cardmanager/playground';

    let firstArg = true;
    for (let cardId in this.state.cardSelectStatus) {
      if (this.state.cardSelectStatus[cardId]) {
        firstArg ? url += ('?card_id=' + cardId)
          : url += ('&card_id=' + cardId);
        firstArg = false;
      }
    }

    this.setState({bonusLoading: true});

    let response = await fetch(url);
    let data = await response.json();

    this.setState({
      bonus: data.calc_bonus,
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

    const bonusBoxClass = classNames({
      bonusBox: true,
      loadingDimmer: this.state.bonusLoading
    });

    return (
      <div>
        <div className={bonusBoxClass}>
          <Loader
            loaded={!this.state.bonusLoading}
            length={5}
            width={3}
            radius={5}
          >
          </Loader>
          <p className="bonus">Bonus: {bonus}</p>
        </div>
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
              SubComponent={row => {
                const text = row.original.description;
                return (
                  <div className="transactionDesc">
                    {text}
                  </div>
                );
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Playground;
