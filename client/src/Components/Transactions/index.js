import React, { Component } from "react";
import csvtojson from "csvtojson";
import FileInput from "react-simple-file-input";
import { Button, Container, Dimmer, Loader } from "semantic-ui-react";

import TransactionTable from "./TransactionTable";

import { sendRequestAuth } from "../../AuthService";
import { allowedFileTypes } from "./constants";

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
      file: "",
      fileContents: "",
      transactions: [],
      loading: false,
      error: "",
    };
  }

  reset = () => {
    this.setState({
      file: "",
      fileContents: "",
      loading: false,
      error: "",
    });
  };

  componentDidMount = async () => {
    await this.fetchTransactions();
  };

  fileIsIncorrectFiletype = (file) => {
    return !allowedFileTypes.includes(file.type);
  };

  showInvalidFileTypeMessage = (file) => {
    this.setState({
      error: "Tried to upload invalid filetype " + file.type,
    });
  };

  handleFileSelected = (event, file) => {
    csvtojson()
      .fromString(event.target.result)
      .then((jsonObj) => {
        this.setState({ file: file, fileContents: jsonObj, error: "" });
      })
      .catch(() => {
        this.setState({
          error: "Could not read file contents",
        });
      });
  };

  handleFileSubmit = async () => {
    const submitReqs = [];
    const maxRecords = 200;

    // We need to split up the requests into multiple since it doesn't
    // like very large POST body
    for (let i = 0; i < this.state.fileContents.length; i += maxRecords) {
      submitReqs.push(
        await sendRequestAuth("/transactions", "post", {
          transactions: this.state.fileContents.slice(i, i + maxRecords),
        })
      );
    }

    Promise.all(submitReqs)
      .then((responses) => {
        console.log(responses);
      })
      .catch((err) => {
        console.error(err);
      });

    this.reset();
  };

  fetchTransactions = async () => {
    const response = await sendRequestAuth("/transactions");
    this.setState({ transactions: response.data.transactions });
  };

  render() {
    const { file, transactions, loading, error } = this.state;

    return (
      <Container>
        <h3>Upload transactions</h3>
        <div className="mb-small">
          <FileInput
            readAs="text"
            onLoad={this.handleFileSelected}
            cancelIf={this.fileIsIncorrectFiletype}
            onCancel={this.showInvalidFileTypeMessage}
            style={{ color: error ? "red" : "inherit" }}
          />
        </div>
        <p style={{ fontSize: 12 }}>CSV format with extensions: .csv or .txt</p>
        <Button onClick={this.handleFileSubmit} disabled={!file || !!error}>
          Submit
        </Button>
        <h3>Your transactions</h3>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <TransactionTable transactions={transactions} />
      </Container>
    );
  }
}

export default Transaction;
