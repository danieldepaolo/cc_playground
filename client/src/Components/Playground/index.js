import React, { Component } from 'react';
import _ from 'underscore';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';

import { sendRequestAuth } from '../../AuthService';
import CardSelectList from './CardSelectList';
import BonusReport from './BonusReport';
import SelectedCards from './SelectedCards';
import { loggedIn } from '../../AuthService';
// import SpendCategories from './SpendCategories'; // Re-introduce later

const OuterGrid = styled(Grid)`
  height: 62em;
  &&& {
    margin-left: 2rem;
    margin-right: 2rem;
  }

  .column {
    overflow-y: auto;
  }
`;

const FullHeightColumn = styled(Grid.Column)`
  height: 100%;
`;
const FullHeightGrid = styled(Grid)`
  height: 100%;
`;
const HalfHeightGrid = styled(Grid)`
  height: 50%;
`;

// const BorderGrid = styled(Grid)`
//   border: 1px solid rgba(0,0,0,0.4);
// `;

class Playground extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      bonusReport: null,
      cardSelectStatus: {},
      categorySpend: {},
      useTransactions: loggedIn() ? true : false,
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
    const cards = response.data.cards;

    const cardStatus = {};
    cards.forEach(card => {
      cardStatus[card._id] = false;
    });

    response = await axios('/rewardcategories');
    const categories = response.data;
    const categoryMap = categories.reduce( (map, category) => {
      map[category.name] = 0;
      return map;
    }, {});

    this.setState({
      cardSelectStatus: cardStatus,
      categorySpend: categoryMap,
      cards: cards
    });
  }

  getSelectedCards = () => {
    const { cards, cardSelectStatus } = this.state;
    let selectedCards = [];

    cards.forEach(card => {
      if (cardSelectStatus[card._id]) {
        selectedCards.push(card);
      }
    });
    
    return selectedCards;
  }

  fetchBonusAmount = async () => {
    let url = '/playground/calcbonus';

    const selectedCards = this.getSelectedCards();
    let args = selectedCards.map(card => `card_id=${card._id}`);
    url += args.length > 0 ? '?' + args.join('&') : '';

    this.setState({bonusLoading: true});

    try {
      let response = await sendRequestAuth(url);

      this.setState({
        bonusReport: response.data.bonusReport,
        bonusLoading: false
      });
    } catch (err) {
      console.error(err);

      this.setState({
        bonusLoading: false
      });
    }
  };

  handleSelectChange = (cardId) => {
    let { cardSelectStatus } = this.state;
    this.setState({ 
      cardSelectStatus: { ...cardSelectStatus, 
        [cardId]: !cardSelectStatus[cardId] 
      }
    });
  };

  handleCategorySpendChange = (category, data) => {
    this.setState(prevState => {
      let newCategorySpend = prevState.categorySpend;
      newCategorySpend[category] = +data.value;
      return {
        categorySpend: newCategorySpend
      };
    });
  }
  
  render() {
    const { cards, cardSelectStatus, bonusReport, bonusLoading, categorySpend, useTransactions } = this.state;

    return (
      <OuterGrid columns={2}>
        <FullHeightColumn width={7}>
          <FullHeightGrid columns={2}>
            <Grid.Column width={10}>
              <CardSelectList
                cards={cards}
                cardSelectStatus={cardSelectStatus}
                onSelectChange={this.handleSelectChange}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <SelectedCards cards={this.getSelectedCards()} />
            </Grid.Column>
          </FullHeightGrid>
        </FullHeightColumn>
        <FullHeightColumn width={9}>
          <BonusReport
            loading={bonusLoading}
            bonusReport={bonusReport}
          />
        </FullHeightColumn>
      </OuterGrid>
    );
  }
}

export default Playground;
