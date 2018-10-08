import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class TestArea extends Component {
  
  async sendTestRequest() {
    const response = await fetch('http://localhost:8080/transactions');
    const data = await response.json();
    console.log(data);
  }
  
  render() {
    return (
      <Button onClick={this.sendTestRequest}>Test Me!</Button>
    );
  }
};

export default TestArea;
