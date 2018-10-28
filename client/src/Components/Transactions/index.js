import React, { Component } from 'react';
import FileInput from 'react-simple-file-input';
import { Button } from 'semantic-ui-react';
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
      fileContents: '',
    });
  }

  componentDidMount = async () => {
    const response = await axios('http://localhost:8080/transactions');
    this.setState({transactions: response.data});
  }

  handleFileSelected = (event, file) => {
    console.log(event);
    this.setState({
      file: file,
      fileContents: event.target.result,
    });
  };

  handleCsvSubmit = async (event) => {
    console.log("Submitted file: ", this.state.file.name);
    console.log("File contents: ", this.state.fileContents);

    const url = `http://localhost:8000/cardmanager/transaction/addcsv/`;
    console.log(url);

    // $TODO Capture response and do something
    const response = await axios.post(url, {
      csv_transactions: this.state.fileContents
    });

    this.reset();
    console.log(response);
  };

  render() {
    const { transactions } = this.state;

    return (
      <section>
        <div className="spaciousBox">
          <FileInput
            readAs="text"
            onLoad={(e, file) => this.handleFileSelected(e, file)}
          />
          <Button onClick={(e) => this.handleCsvSubmit(e)}>
            Submit
          </Button>
        </div>
        <TransactionTable transactions={transactions} />
      </section>
    );
  }
};

export default Transaction;
