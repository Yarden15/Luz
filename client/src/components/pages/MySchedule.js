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
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { semester: 'a' };
  }
  handleChange(e) {
    this.setState({ semester: e.target.value });
  }

  render() {
    if (0) {
      return (
        <Fragment>
          <Menu />
          <div id='tables-spinner'>
            <Spinner />
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Menu />
          <div>
            <div>
              <h1 className='center-horizontaly text-center'>
                {this.props.t.my_schedule}
              </h1>
            </div>
            <div className={`form-group ${this.props.dir}`}>
              <label htmlFor='semester'>{this.props.t.semester}</label>
              <select
                id='select-semester'
                className={this.props.dir}
                dir={this.props.dir}
                name='semester'
                onChange={(e) => {
                  this.handleChange(e);
                }}
              >
                <option className={this.props.dir} value={'a'}>
                  {this.props.t.a}
                </option>
                <option className={this.props.dir} value={'b'}>
                  {this.props.t.b}
                </option>
                <option className={this.props.dir} value={'summer'}>
                  {this.props.t.summer}
                </option>
              </select>
            </div>
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
                events={getMySchedule(this.state.semester)}
                locale={this.props.lang.lang}
                dir={this.props.lang.dir}
              />
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userObj: state.user,
    authObj: state.auth,
    t: state.literals.literals,
    dir: state.literals.dir,
    lang: state.literals,
  };
};

export default connect(mapStateToProps)(MySchedule);
