import React, { Component } from 'react';
import csvtojson from 'csvtojson';
import FileInput from 'react-simple-file-input';
import { Button, Container, Dimmer, Loader } from 'semantic-ui-react';

import { sendRequestAuth, getToken } from '../../AuthService';
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

  handleFileSelected = (event, file) => {
    console.log(event);
    csvtojson().fromString(event.target.result).then(jsonObj => {
      console.log(jsonObj);
      this.setState({ file: file, fileContents: jsonObj });
    });
  }

  handleFileSubmit = async () => {
    const submitReqs = [];
    const maxRecords = 200;
    // We need to split up the requests into multiple since it doesn't
    // like very large POST body
    for (let i = 0; i < this.state.fileContents.length; i += maxRecords) {
      submitReqs.push(await sendRequestAuth(
        '/transactions',
        'post',
        {transactions: this.state.fileContents.slice(i, i + maxRecords)}
      ));
    }
    Promise.all(submitReqs).then(responses => {
      console.log(responses);
    });
    this.reset();
  }

  fetchTransactions = async () => {
    const response = await sendRequestAuth('/transactions');
    this.setState({transactions: response.data.transactions});
  }

  render() {
    const { files, transactions, loading } = this.state;

    return (
      <Container>
        <h3>Upload transactions</h3>
        <FileInput
          readAs='text'        
          onLoad={this.handleFileSelected}
        />
        <Button onClick={this.handleFileSubmit}>Submit</Button>
        <h3>Your transactions</h3>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <TransactionTable transactions={transactions} />
      </Container>
    );
  }
};

export default Transaction;
