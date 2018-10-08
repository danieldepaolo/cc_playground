import React, { Component } from 'react';
import FileInput from 'react-simple-file-input';
import { Button } from 'semantic-ui-react';

/*
  - This component handles CRUD for transactions
    Also displays a table of transactions
  - Adding transactions can be done via CSV which will either wipe out existing transactions
  or attempt to merge with the transactions that are already there
*/

class TransactionView extends Component {

  handleFileSelected = (event, file) => {
    console.log(event);
    this.setState({file: file, fileContents: event.target.result});
  };

  handleCsvSubmit = async (event) => {
    console.log("Submitted file: ", this.state.file.name);
    console.log("File contents: ", this.state.fileContents);

    const url = `http://localhost:8000/cardmanager/transaction/addcsv/`;
    console.log(url);

    // $TODO Capture response and do something
    await fetch(url, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({csv_transactions: this.state.fileContents})
    });
  };

  render() {
    return (
      <div className="spaciousBox">
        <FileInput
          readAs="text"
          onLoad={(e, file) => this.handleFileSelected(e, file)}
        />
        <Button 
          bsStyle="primary" 
          onClick={(e) => this.handleCsvSubmit(e)}
        >
          Submit
        </Button>
      </div>
    );
  }
};

export default TransactionView;
