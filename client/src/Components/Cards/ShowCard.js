import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/*
  Show all details of one credit card on a page
*/

class ShowCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardData: {}
    };
  }

  componentDidMount = async () => {
    const { match } = this.props;

    const response = await axios.get(`http://localhost:8080/cards/${match.params.id}`);
    this.setState({cardData: response.data.card});
  }

  render() {
    const { cardData } = this.state;
    console.log(cardData);
    const cardId = this.props.match.params.id;
    const editUrl = `/cards/${cardId}/edit`;

    return (
      <div>
        <Link to={editUrl}>
          <Button>Edit</Button>
        </Link>
        <h3>{cardData.name}</h3>
      </div>
    );
  }
}

export default ShowCard;
