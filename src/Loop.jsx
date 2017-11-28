import React from 'react';
import PropTypes from 'prop-types';

const isObject = data => typeof data === 'object';

export const Loop = ({ items, primaryKey, destructure, indexKey, itemKey, children, as: Items, ...others }) => {
  const child = React.Children.only(children);
  const { type: Item, props: itemProps } = child;

  return (
    <Items {...others}>
      {items.map((item, idx) => {
        const mappedProps = destructure && isObject(item)
          ? {
            key: primaryKey ? item[primaryKey] : idx,
            ...item,
          }
          : {
            key: primaryKey ? item[primaryKey] : item,
            [itemKey]: item,
          };
        mappedProps[indexKey] = idx;

        return <Item {...mappedProps} {...itemProps} />;
      })}
    </Items>
  );
};

Loop.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  primaryKey: PropTypes.string,
  itemKey: PropTypes.string,
  indexKey: PropTypes.string,
  destructure: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

Loop.defaultProps = {
  primaryKey: null,
  items: [],
  as: 'ul',
  itemKey: 'item',
  indexKey: 'index',
  destructure: true,
  children: null,
};

export const ItemLoop = props => <Loop destructure={false} {...props} />;
export const SimpleLoop = props => <Loop destructure={false} itemKey="children" {...props} />;

export default Loop;
