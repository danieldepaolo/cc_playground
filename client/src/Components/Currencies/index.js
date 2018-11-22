import React, { Component } from 'react';
import { Button, Container, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const BorderedItem = styled(List.Item)`
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 5px;
  margin: 0.5em 0;
`;

class Currencies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: []
    };
  }

  componentDidMount = async () => {
    const response = await axios("/currencies");
    this.setState({currencies: response.data.currencies});
  }

  onDelete = async id => {
    const response = await axios.delete(`/currencies/${id}`);
    console.log(response);
  }

  render() {
    const { currencies } = this.state;
    const { loggedIn } = this.props;
    const sortedCurrencies = currencies.sort( (a,b) => +(a.name > b.name) || -(a.name < b.name));

    const style = {
      borderedItem: {
        padding: '0.4em'
      },
      miniBtn: {
        padding: '0.3em 0.7em',
        marginLeft: '0.3em',
        fontSize: '12px',
        float: 'right'
      }
    };

    return (
      <Container text>
        <h3>Point Currencies</h3>
        <List>
        {sortedCurrencies.map(currency => (
          <BorderedItem style={style.borderedItem} key={currency.name}>
            <List.Header>
              {currency.name}
              {loggedIn && (
                <div>
                  <Button style={style.miniBtn} onClick={() => this.onDelete(currency._id)}>Delete</Button>
                  <Link to={`/currencies/${currency._id}/edit`}>
                    <Button style={style.miniBtn}>Edit</Button>
                  </Link>
                </div>
              )}
            </List.Header>
            <List.Content>
              <p>Value: {currency.defaultValue}c</p>
              <p>{currency.description || "No description."}</p>
            </List.Content>
          </BorderedItem>
        ))}
        </List>
      </Container>
    );
  }
};

export default Currencies;
