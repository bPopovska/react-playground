import React from 'react';

const Item = props => (
  <div>
    {props.name}
    <span><button onClick={() => props.onDelete(props.index)}>x</button></span>
  </div>
)

export default Item
