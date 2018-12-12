import React from 'react';

const Item = props => (
  <div>
    <div>
      {props.item.name}
    </div>
    <div>
      {props.item.duration}
    </div>
    <div>
      {props.item.status}
    </div>
    <span><button onClick={() => props.onDelete(props.index)}>x</button></span>
  </div>
)

export default Item
