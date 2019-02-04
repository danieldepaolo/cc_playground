import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
import csvtojson from 'csvtojson';
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
      files: [],
      transactions: [],
      loading: false
    };
  }

  reset = () => {
    this.setState({
      file: [],
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

  handleInit = () => {
    console.log("File pond is ready to go");
  }

  render() {
    const { files, transactions, loading } = this.state;

    return (
      <Container>
        <h3>Upload transactions</h3>
        <FilePond ref={ref => this.pond = ref}
          files={files}
          allowMultiple={true}
          maxFiles={7}
          server={{
            url: "http://localhost:8080/transactions",
            process: {
              headers: {
                Authorization: `Bearer ${getToken()}`
              }
            }
          }}
          oninit={() => this.handleInit() }
          onupdatefiles={fileItems => {
            // Set currently active file objects to this.state
            this.setState({
                files: fileItems.map(fileItem => fileItem.file)
            });
          }}>
        </FilePond>
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
