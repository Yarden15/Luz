import React, { Fragment } from 'react';

const UserInfo = () => {
  const name = 'Yarden Narkissi';
  const email = 'yarden15@gmail.com';
  const birth = '23.07.1991';
  const rank = 'Dr';

  return (
    <Fragment>
      <div className='window bg-light'>
        <h3 className='text-primary text-left'>{name} </h3>
        <h3 className='text-primary text-left'>{email} </h3>
        <ul className='list'>
          {birth && (
            <li>
              <i className='fas fa-birthday-cake'>{birth}</i>
            </li>
          )}
          {rank && (
            <li>
              <i className='fas fa-user-tie'>{rank}</i>
            </li>
          )}
        </ul>
        <p>
          {/* @todo - Edit button to chenge detailes */}
          <button className='btn btn-dark btn-sm'>Edit</button>
        </p>
      </div>
    </Fragment>
  );
};

export default UserInfo;
