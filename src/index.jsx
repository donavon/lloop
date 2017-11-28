import React from 'react';
import Loop from './Loop';

export default Loop;
export const ItemLoop = props => <Loop destructure={false} {...props} />;
export const SimpleLoop = props => <Loop as="ul" destructure={false} itemKey="children" {...props} />;
