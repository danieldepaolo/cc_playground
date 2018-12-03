import React, { Component } from 'react';
import { Container, Button, Label, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import CurrencyView from './currencyView';
import BonusCategoryList from '../../CardForm/bonusCategories/BonusCategoryList';
import { processorLookup } from './constants';
import { sendRequestAuth } from '../../../AuthService';

/*
  Show all details of one credit card on a page
*/

const SmallImage = styled.img`
  display: block;
  max-width: 350px;
`;

class ShowCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardData: {
        contributor: 'Unknown',
        bonusReward: {
          categories: {}
        },
        fees: {
          annual: 0,
          ftf: false,
          waivedFirstYear: false
        },
        rewardCurrency: {}
      }
    };
  }

  componentDidMount = async () => {
    const { match } = this.props;
    const response = await sendRequestAuth(`/cards/${match.params.id}`);
    this.setState({cardData: response.data.card});
  }

  onDelete = async (e) => {
    const { match } = this.props;
    const response = await sendRequestAuth(`/cards/${match.params.id}`, 'delete');
    console.log(response);
  }

  render() {
    const { cardData } = this.state;
    const { loggedIn } = this.props;
    console.log(cardData);
    const cardId = this.props.match.params.id;

    const processor = cardData.processor && processorLookup[cardData.processor].label;

    return (
      <Container text>
        <h3>{cardData.name}</h3>
        <SmallImage src={cardData.imageUrl} alt={cardData.name} />
        <div><Label>Added By</Label> {cardData.contributor.username}</div>
        <div><Label>Processor</Label> {processor}</div>
        <CurrencyView rewardCurrency={cardData.rewardCurrency} />
        <Label>Fees</Label>
        <List>
          <List.Item>
            <List.Content>Annual Fee: ${cardData.fees.annual}</List.Content>
          </List.Item>
          <List.Item>
            <List.Content>Foreign Transaction Fees? {cardData.fees.ftf ? 'Yes' : 'No'}</List.Content>
          </List.Item>
          <List.Item>
            <List.Content>First year waived? {cardData.fees.waivedFirstYear ? 'Yes' : 'No'}</List.Content>
          </List.Item>
        </List>
        
        <Label>Bonus Categories</Label>
        <BonusCategoryList categories={cardData.bonusReward.categories} />

        {loggedIn && (
          <div>
            <Link to={`/cards/${cardId}/edit`}>
              <Button>Edit</Button>
            </Link>
            <Button onClick={this.onDelete}>Delete</Button>
          </div>
        )}
      </Container>
    );
  }
}

export default ShowCard;
