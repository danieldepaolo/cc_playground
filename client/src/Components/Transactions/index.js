import React, { Component } from 'react';
import FileInput from 'react-simple-file-input';
import csvtojson from 'csvtojson';
import { Button, Container } from 'semantic-ui-react';
import axios from 'axios';

import TransactionTable from './TransactionTable';

/*
  - This component handles CRUD for transactions
    Also displays a table of transactions
  - Adding transactions can be done via CSV which will either wipe out existing transactions
  or attempt to merge with the transactions that are already there
*/

class Transaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: '',
      fileContents: '',
      transactions: []
    };
  }

  reset = () => {
    this.setState({
      file: '',
      fileContents: ''
    });
  }

  componentDidMount = async () => {
    this.fetchTransactions();
  }

  fetchTransactions = async () => {
    const response = await axios('/transactions');
    this.setState({transactions: response.data.transactions});
  }

  handleFileSelected = (event, file) => {
    console.log(event);
    this.setState({
      file: file,
      fileContents: event.target.result
    });
  };

  handleSubmit = async (event) => {
    const { fileContents } = this.state;
    const jsonData = await csvtojson().fromString(fileContents);

    const response = await axios.post('/transactions', {
      transactions: jsonData
    });

    this.fetchTransactions();
    this.reset();
    console.log(response);
  };

  render() {
    const { transactions } = this.state;

    return (
      <Container>
        <div className="spaciousBox">
          <FileInput
            readAs="text"
            onLoad={(e, file) => this.handleFileSelected(e, file)}
          />
          <Button onClick={(e) => this.handleSubmit(e)}>
            Submit
          </Button>
        </div>
        <TransactionTable transactions={transactions} />
      </Container>
    );
  }
};

export default Transaction;
