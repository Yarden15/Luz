import React, { Fragment } from 'react';
import spinner from '../../styles/assets/spinner.gif';


export const Spinner = () => {
  return (
    <Fragment>
      <img id='spinner' src={spinner} alt='Loading' />
    </Fragment>
  )
}

export default Spinner;