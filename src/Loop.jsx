import React, { Component } from 'react';
import PropTypes from 'prop-types';

const [reactMajorVersion] = React.version.split('.');
const canReturnArray = parseInt(reactMajorVersion, 10) >= 16;
const isObject = data => typeof data === 'object';

class Loop extends Component {
  static defaultProps = {
    primaryKey: null,
    as: canReturnArray ? undefined : 'div',
    itemKey: 'item',
    indexKey: 'index',
    destructure: true,
  };

  mapItem = this.mapItem.bind(this);

  mapItem(item, idx) {
    const { primaryKey, indexKey, destructure, itemKey, children } = this.props;
    const child = React.Children.only(children);
    const { type: Item, props: itemProps } = child;
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
  }
  
  render() {
    // don't pass along: primaryKey, indexKey, destructure, itemKey
    const { items, as: Items, primaryKey, indexKey, destructure, itemKey, ...others } = this.props;
    const results = items.map(this.mapItem);

    return (
      Items
        ? <Items {...others}>{results}</Items>
        : results
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  Loop.propTypes = {
    items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])).isRequired,
    primaryKey: PropTypes.string,
    itemKey: PropTypes.string,
    indexKey: PropTypes.string,
    destructure: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  };
}

export default Loop;
