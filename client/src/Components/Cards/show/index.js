import React, { Component } from "react";
import {
  Container,
  Button,
  Label,
  List,
  Header,
  Table,
  Popup,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import update from "immutability-helper";

import BonusCategoryList from "../../CardForm/bonusCategories/BonusCategoryList";
import { processorLookup } from "./constants";
import { sendRequestAuth } from "../../../AuthService";

/*
  Show all details of one credit card on a page
*/

const SmallImage = styled.img`
  display: block;
  width: 300px;
`;

const DataLabel = styled.div`
  font-size: 13px;
  margin-bottom: 4px;
`;

const DataText = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const DataItem = styled.div`
  padding: 10px;
`;

const CurrencyView = ({ rewardCurrency }) => {
  const content = (
    <div>
      <p>{rewardCurrency.description}</p>
      <p>Value per point: {rewardCurrency.defaultValue}c</p>
    </div>
  );

  return (
    <Popup
      key={rewardCurrency.name}
      trigger={
        <DataItem>
          <DataLabel>Currency</DataLabel>
          <DataText>{rewardCurrency.name}</DataText>
        </DataItem>
      }
      header={rewardCurrency.name}
      content={content}
      position="bottom left"
    />
  );
};

class ShowCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardData: {
        contributor: "????",
        bonusReward: {
          categories: {},
        },
        fees: {
          annual: 0,
          ftf: false,
          waivedFirstYear: false,
        },
        rewardCurrency: {},
      },
    };
  }

  componentDidMount = async () => {
    const { match } = this.props;
    const response = await axios(`/cards/${match.params.id}`);

    this.setState({
      cardData: update(this.state.cardData, { $merge: response.data.card }),
    });
  };

  onDelete = async () => {
    const { match } = this.props;

    await sendRequestAuth(
      `/cards/${match.params.id}`,
      "delete"
    );
  };

  render() {
    const { cardData } = this.state;
    const { loggedIn } = this.props;
    const cardId = this.props.match.params.id;

    const processor =
      cardData.processor && processorLookup[cardData.processor].label;

    return (
      <Container>
        <Header as="h2">{cardData.name}</Header>
        {loggedIn && (
          <div style={{ marginBottom: 16 }}>
            <Link to={`/cards/${cardId}/edit`}>
              <Button>Edit</Button>
            </Link>
            <Button onClick={this.onDelete}>Delete</Button>
          </div>
        )}
        <div style={{ display: "flex", gap: 16 }}>
          <SmallImage src={cardData.imageUrl} alt={cardData.name} />
          <div>
            <DataItem>
              <DataLabel>Added By</DataLabel>
              <DataText>{cardData.contributor.username}</DataText>
            </DataItem>
            <DataItem>
              <DataLabel>Processor</DataLabel>
              <DataText>{processor}</DataText>
            </DataItem>
            <CurrencyView rewardCurrency={cardData.rewardCurrency} />
          </div>
        </div>
        <Header as="h3">Fees</Header>
        <List>
          <DataItem>
              <DataLabel>Annual Fee</DataLabel>
              <DataText>${cardData.fees.annual}</DataText>
          </DataItem>
          <DataItem>
            <List.Content>
              <DataLabel>Foreign Transaction Fees?</DataLabel>{" "}
              <DataText>{cardData.fees.ftf ? "Yes" : "No"}</DataText>
            </List.Content>
          </DataItem>
          <DataItem>
            <List.Content>
              <DataLabel>First year waived?</DataLabel>
              <DataText>{cardData.fees.waivedFirstYear ? "Yes" : "No"}</DataText>
            </List.Content>
          </DataItem>
        </List>

        <Header as="h3">Bonus Categories</Header>
        <BonusCategoryList categories={cardData.bonusReward.categories} />
      </Container>
    );
  }
}

export default ShowCard;
