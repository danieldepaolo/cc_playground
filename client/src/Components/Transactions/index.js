import React, { Component } from 'react';
import FileInput from 'react-simple-file-input';
import csvtojson from 'csvtojson';
import { Button, Container, Dimmer, Loader } from 'semantic-ui-react';

import { sendRequestAuth } from '../../AuthService';
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
      transactions: [],
      loading: false
    };
  }

  reset = () => {
    this.setState({
      file: '',
      fileContents: '',
      loading: false
    });
  }

  componentDidMount = async () => {
    await this.fetchTransactions();
  }

  fetchTransactions = async () => {
    const response = await sendRequestAuth('/transactions');
    this.setState({transactions: response.data.transactions});
  }

  handleFileSelected = (event, file) => {
    this.setState({
      file: file,
      fileContents: event.target.result
    });
  };

  handleSubmit = async (event) => {
    const { fileContents } = this.state;
    const jsonData = await csvtojson().fromString(fileContents);

    this.setState({loading: true});
    const response = await sendRequestAuth('/transactions', 'post', {
      transactions: jsonData
    });

    await this.fetchTransactions();
    this.reset();
    console.log(response);
  };

  render() {
    const { transactions, loading } = this.state;

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
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <TransactionTable transactions={transactions} />
      </Container>
    );
  }
};

export default Transaction;
