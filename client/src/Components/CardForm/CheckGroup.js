import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import styled from 'styled-components';

/*
  Displays a group of checkboxes or radio buttons with a header
  We can specify how to lay out the items using cols prop
  Items must have _id and name properties
*/

const BorderBox = styled.div`
  border: 1px solid rgba(0,0,0,0.3);
  border-radius: 5px;
  padding: 1em;
`;

class CheckGroup extends Component {
  getGroupedInputs = () => {
    const { type, items, cols, checkedFunc, onChangeFunc } = this.props;

    const numGroups = Math.ceil(items.length / cols);
    const InputType = (type === 'radio') ? Form.Radio : Form.Checkbox;

    let groupedInputs = [];
    for (let i = 0; i < numGroups; ++i) {
      let group = [];
      let start = i*cols;
      for (let j = start; j < Math.min(items.length, start+cols); ++j) {
        const item = items[j];
        group.push(
          <InputType
            key={item._id}
            label={item.name}
            value={item._id}
            checked={checkedFunc(item._id)}
            onChange={() => onChangeFunc(item._id)}
          />
        );
      }
      groupedInputs.push(group);
    }

    return groupedInputs;
  }

  render() {
    const { header } = this.props;
    const groupedInputs = this.getGroupedInputs();

    return (
      <BorderBox>
        <h4>{header}</h4>
        {groupedInputs.map( (group, i) => (
          <Form.Group key={i} widths='equal'>
            {group.map(input => input)}
          </Form.Group>
        ))}
      </BorderBox>
    );
  }
};

export default CheckGroup;
