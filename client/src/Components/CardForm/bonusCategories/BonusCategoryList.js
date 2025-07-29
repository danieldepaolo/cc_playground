import React from "react";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "semantic-ui-react";
import _ from "underscore";
import styled from "styled-components";

const ListBox = styled.div`
  padding: 1em;
`;

const BonusCategoryList = ({ categories }) => {
  const categoryList = _.flatten(_.values(categories));

  return (
    <Table celled>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Category</TableHeaderCell>
          <TableHeaderCell>Return</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categoryList.map((category) => (
          <TableRow key={category.name}>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.bonusReturn}x</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BonusCategoryList;
