import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../layout/Menu';
import Spinner from '../layout/Spinner';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { getMySchedule } from '../../actions/userActions';

export class MySchedule extends Component {
  render() {
    if (0) {
      return (
        <Fragment>
          <Menu />
          <div id="tables-spinner">
            <Spinner />
          </div>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Menu />
          <div><h1 className='center-horizontaly text-center'>{this.props.t.my_schedule}</h1></div>
          <div className='calendar'>
            <FullCalendar
              defaultView='timeGridWeek'
              header={{
                center: '',
                left: '',
                right: '',
              }}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              hiddenDays={[6]}
              allDaySlot={false}
              slotDuration='00:30:00'
              snapDuration='00:05:00'
              minTime='07:00:00'
              maxTime='23:00:00'
              height='auto'
              titleFormat={{ weekday: 'long' }}
              columnHeaderFormat={{ weekday: 'long' }}
              selectable={false}
              selectHelper={false}
              editable={false}
              droppable={false}
              eventLimit={false}
              events={getMySchedule()}
              locale={this.props.lang.lang}
              dir={this.props.lang.dir}
            />
          </div>
        </Fragment >
      );
    }
  }
};

const mapStateToProps = state => {
  return {
    userObj: state.user,
    authObj: state.auth,
    t: state.literals.literals,
    lang: state.literals
  };
};

export default connect(mapStateToProps)(MySchedule);