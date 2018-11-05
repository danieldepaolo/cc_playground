import React from 'react';
import { Popup, Label } from 'semantic-ui-react';

const CurrencyView = ( ({rewardCurrency}) => {
  const content = (
    <div>
      <p>{rewardCurrency.description}</p>
      <p>Value per point: {rewardCurrency.defaultValue}c</p>
    </div>
  );

  return (
    <Popup
      key={rewardCurrency.name}
      trigger={<div><Label>Currency</Label> {rewardCurrency.name}</div>}
      header={rewardCurrency.name}
      content={content}
      position='bottom left'
    />
  );
});

export default CurrencyView;
