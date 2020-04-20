import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { filterEvents } from '../../actions/eventsActions';

const FilterEvents = (props) => {
  const [filter, setFilter] = useState(
    { type: '', text: '', year: '', semester: '', location: '', state: true }
  );
  const { type, text, year, semester, location, state } = filter;

  const onChange = e => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const cleanFilterEvents = () => {
    setFilter({ ...filter, type: '', text: '', year: '', semester: '', location: '' });
    filterEvents({ type: '' });
  }

  if (props.eventObj.loading) {
    return (
      <div className='center-horizontaly'>
        <Spinner />
      </div>
    )
  } else {
    return (
      <Fragment key="filter-evnets">
        {/* hide filter/show filter button  */}
        {state && <div dir={props.dir} className={props.dir}><i onClick={() => { setFilter({ ...filter, type: '', state: false }) }} className="fas fa-eye-slash"></i>הסתר מסנן</div>}
        {!state && <div dir={props.dir} className={props.dir}><i onClick={() => { setFilter({ ...filter, type: '', state: true }) }} className="fas fa-eye"></i>הצג מסנן</div>}
        {/* display select input - which type of filtering the user wants */}
        {
          state &&
          <select name="type" id="type-filter-event" className="swal2-input filter-event" dir={props.dir}
            onChange={onChange}>
            <option dir={props.dir} value={''}>סנן לפי...</option>
            <option dir={props.dir} value={'first_name'}>שם פרטי</option>
            <option dir={props.dir} value={'last_name'}>שם משפחה</option>
            <option dir={props.dir} value={'course_title'}>שם קורס</option>
            <option dir={props.dir} value={'year'}>שנה</option>
            <option dir={props.dir} value={'location'}>מיקום</option>
            <option dir={props.dir} value={'semester'}>סמסטר</option></select>
        }
        {/* if the type of the filter is first name or last name or course title we display text input */}
        {((type === 'first_name' || type === 'last_name' || type === 'course_title') && state) && <input type="text" name="text" value={text} className="swal2-input filter-event" dir={props.dir} onChange={onChange} />}
        {/* if the type of the filter is year we display select input with match options */}
        {
          (type === 'year' && state) && <select id="select-year" className={`${props.dir} filter-event`} dir={props.dir} name='year' onChange={onChange}>
            <option className={props.dir} defaultValue></option>
            <option className={props.dir} value={'a'}>{props.t.a}</option>
            <option className={props.dir} value={'b'}>{props.t.b}</option>
            <option className={props.dir} value={'c'}>{props.t.c}</option>
            <option className={props.dir} value={'d'}>{props.t.d}</option></select>
        }
        {/* if the type of the filter is semester we display select input with match options */}
        {
          (type === 'semester' && state) && <select id="select-semester" className={`${props.dir} filter-event`} dir={props.dir} name="semester" onChange={onChange}>
            <option className={props.dir} defaultValue></option>
            <option className={props.dir} value={'a'}>{props.t.a}</option>
            <option className={props.dir} value={'b'}>{props.t.b}</option>
            <option className={props.dir} value={'yearly'}>{props.t.yearly}</option>
            <option className={props.dir} value={'summer'}>{props.t.summer}</option></select>
        }
        {/* if the type of the filter is location we display select input with match options from the locations */}
        {
          (type === 'location' && state) && <select id="select-location" className={`${props.dir} filter-event`} dir={props.dir} name="location" onChange={onChange}>
            <option className={props.dir} defaultValue></option>
            {props.adminObj.locations.map(location => (
              <option className={props.dir} value={location.name}>{location.name}</option>
            ))};
            </select>
        }
        {
          state && <div id="filter-button-container">
            <button id="btn-filter" className='btn-filter btn btn-primary btn-block center-horizontaly btn-nfm' onClick={() => { filterEvents({ type, text, year, semester, location }); }}>סנן</button>
            <button id="btn-clear" className='btn-filter btn btn-primary btn-block center-horizontaly btn-nfm' onClick={() => { cleanFilterEvents() }}>נקה</button>
          </div>
        }

      </Fragment >
    );
  }
};


const mapStateToProps = state => {
  return {
    authObj: state.auth,
    adminObj: state.admin,
    eventObj: state.event,
    t: state.literals.literals,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps)(FilterEvents);
