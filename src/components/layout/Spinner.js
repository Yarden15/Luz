import React, {Fragment} from 'react'
import spinner from '../../styles/assets/spinner.gif'

const Spinner = () =>  <Fragment>
        <img src={spinner} alt="Loading..." style={{width: '200px', margin: 'auto', display: 
        'block' }} />
    </Fragment>

export default Spinner

