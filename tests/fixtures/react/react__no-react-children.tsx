/* AUTO-GENERATED from oxc docs — rule react/no-react-children. Do not edit. */

import { Children } from 'react';

Children.toArray(children);
Children.map(children, child => <div>{child}</div>);
Children.only(children);
Children.count(children);
Children.forEach(children, (child, index) => {});

import React from 'react';

function Table({ children }) {
  const mappedChildren = React.Children.map(children, (child) =>
    <tr>{child}</tr>
  );

  return <table>{mappedChildren}</table>;
}

import { Children } from 'react';

function RowList({ children }) {
  return (
    <>
      <h1>Total rows: {Children.count(children)}</h1>
    </>
  );
}
