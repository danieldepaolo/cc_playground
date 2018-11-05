import React from 'react';

import AddCategory from './AddCategory';
import BonusCategoryList from './BonusCategoryList';
import { FormBorderBox } from '../styled';

const BonusCategories = (props => {
  const { rewardCategories, addedCategories, categoryFunc } = props;

  return (
    <FormBorderBox>
      <h4>Bonus Categories</h4>
      <AddCategory
        categories={rewardCategories}
        categoryFunc={(categoryType, category, icon, returnAmt) => {
          categoryFunc(categoryType, category, icon, returnAmt)
        }}
      />
      <BonusCategoryList categories={addedCategories} />
    </FormBorderBox>
  );
});

export default BonusCategories;
