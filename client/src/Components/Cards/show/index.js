import React, { Component } from 'react';
import { Container, Button, Label, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import CurrencyView from './currencyView';
import BonusCategoryList from '../../CardForm/bonusCategories/BonusCategoryList';
import { processorLookup } from './constants';

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
    const response = await axios(`/cards/${match.params.id}`);
    this.setState({cardData: response.data.card});
  }

  onDelete = async (e) => {
    const { match } = this.props;
    const response = await axios.delete(`/cards/${match.params.id}`);
    console.log(response);
  }

  render() {
    const { cardData } = this.state;
    console.log(cardData);
    const cardId = this.props.match.params.id;

    const processor = cardData.processor && processorLookup[cardData.processor].label;

    return (
      <Container text>
        <h3>{cardData.name}</h3>
        <SmallImage src={cardData.imageUrl} alt={cardData.name} />
        <Label>Processor</Label> {processor}
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
        <Link to={`/cards/${cardId}/edit`}>
          <Button>Edit</Button>
        </Link>
        <Button onClick={this.onDelete}>Delete</Button>
        
      </Container>
    );
  }
}

export default ShowCard;
