import React, { Component } from 'react';
import { Button, Container, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { sendRequestAuth } from '../../AuthService';

const BorderedItem = styled(List.Item)`
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 5px;
  margin: 0.5em 0;
`;

class Perks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      perks: []
    };
  }

  componentDidMount = async () => {
    this.refreshPerks();
  }

  refreshPerks = async () => {
    const response = await axios("/perks");
    this.setState({perks: response.data.perks});
  }

  onDelete = async (id) => {
    const response = await sendRequestAuth(`/perks/${id}`, 'delete');
    console.log(response);
    this.refreshPerks();
  }

  render() {
    const { perks } = this.state;
    const { loggedIn } = this.props;
    const sortedPerks = perks.sort( (a,b) => +(a.name > b.name) || -(a.name < b.name));

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
        <h3>Card Perks</h3>
        <List>
        {sortedPerks.map(perk => (
          <BorderedItem style={style.borderedItem} key={perk.name}>
            <List.Header>
              {perk.name}
              {loggedIn && (
                <div>
                  <Button style={style.miniBtn} onClick={e => this.onDelete(perk._id)}>Delete</Button>
                  <Link to={`/perks/${perk._id}/edit`}>
                    <Button style={style.miniBtn}>Edit</Button>
                  </Link>
                </div>
              )}
            </List.Header>
            <List.Content>
              <p>Default Value: ${perk.defaultValue}</p>
              <p>{perk.description || "No description."}</p>
            </List.Content>
          </BorderedItem>
        ))}
        </List>
      </Container>
    );
  }
};

export default Perks;
