import React, { useContext } from 'react';
import PropTypes from 'prop-types';

const EventItem = () => {
  const memoContext = useContext(MemoContext);
  const { deleteMemo, setCurrent, clearCurrent } = memoContext;

  const { _id, name, title, item, rank } = memo;

  const onDelete = () => {
    deleteMemo(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (rank === 'Hurry' ? 'badge-success' : 'badge-primary')
          }
        >
          {rank.charAt(0).toUpperCase() + rank.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {title && (
          <li>
            <i className='fas fa-shopping-cart'>{title}</i>
          </li>
        )}
        {item && (
          <li>
            <i className='fas fa-carrot'>{item}</i>
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(memo)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

MemoItem.protoType = {
  memo: PropTypes.object.isRequired
};

export default MemoItem;
