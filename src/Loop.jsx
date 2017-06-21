import React from 'react';
import PropTypes from 'prop-types';

const Loop = ({ items, primaryKey, children, type: Type, ...others }) => {
  const child = React.Children.only(children);
  const { type: Render } = child;

  return (
    <Type {...others}>
      {items.map((arrayItem, idx) => (
        <Render key={primaryKey ? arrayItem[primaryKey] : idx} {...arrayItem} />
      ))}
    </Type>
  );
};

Loop.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  primaryKey: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

Loop.defaultProps = {
  primaryKey: null,
  items: [],
  type: 'ul',
  children: null,
};

export default Loop;
