import React, { Component } from 'react';
import _ from 'underscore';
import { Label, Input } from 'semantic-ui-react';

/*
  This displays inputs for providing spend amounts for each relevant category
  In the event the user is not logged in or they choose to do so,
  they may get their bonus value from hypothetical category spend rather than their transactions
*/

class SpendCategories extends Component {
  render() {
    const { categorySpend, onChange } = this.props;
    const sortedCategories = _.keys(categorySpend).sort();

    return (
      <div>
        {sortedCategories.map(category => (
          <div key={category} style={{display: 'flex'}}>
            <Label>{category}</Label>
            <Input type={'number'} onChange={(e, data) => onChange(category, data)} />
          </div>
        ))}
      </div>
    );
  }
}

export default SpendCategories;
