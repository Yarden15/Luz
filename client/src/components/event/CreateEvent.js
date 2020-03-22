import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import Menu from '../layout/Menu';

const CreateEvent = (props) => {
  return (
    <Fragment>
      <div id="courses-table" className="table-container text-center">
        <h3>courses</h3>
        <table>
          <thead>
            <tr>
              <td>{props.t.course_title}</td>
              <td>{props.t.serial_number}</td>
              <td>{props.t.year}</td>
              <td>{props.t.semester}</td>
              <td>{props.t.course_hours}</td>
              <td>{props.t.location}</td>
            </tr>
          </thead>
          <tbody className={props.dir}>
            <tr>
              <td>מערכות הפעלה</td>
              <td>152365548</td>
              <td>ב'</td>
              <td>א'</td>
              <td>4</td>
              <td>נביאים</td>
            </tr>
            <tr>
              <td>מערכות לומדות</td>
              <td>143361548</td>
              <td>ג'</td>
              <td>א'</td>
              <td>3</td>
              <td>נביאים</td>
            </tr>
            <tr>
              <td>אלגוריתמים</td>
              <td>26584555</td>
              <td>ב'</td>
              <td>ב'</td>
              <td>4</td>
              <td>נביאים</td>
            </tr>
            <tr>
              <td>תושבע</td>
              <td>11111111</td>
              <td>א'</td>
              <td>א'</td>
              <td>5</td>
              <td>קמפוס חרידי</td>
            </tr>
            <tr>
              <td>מבנה נתונים</td>
              <td>222222222</td>
              <td>ב'</td>
              <td>א'</td>
              <td>4</td>
              <td>נביאים</td>
            </tr>
            <tr>
              <td>אלגברה לינארית א'</td>
              <td>121212121</td>
              <td>aaaaaaaaaaaaaaaaaa</td>
              <td>sssaass</td>
              <td>a</td>
              <td>a</td>
            </tr>
            <tr>
              <td>אלגברה לינארית ב'</td>
              <td>ss</td>
              <td>ssssssss</td>
              <td>sssss</td>
              <td>ssssssss</td>
              <td>ssssssss</td>
            </tr>
            <tr>
              <td>aaaaaaaaa</td>
              <td>saaaaaaaaas</td>
              <td>aaaaaaaaaaaaaaaaaa</td>
              <td>sssaass</td>
              <td>a</td>
              <td>a</td>
            </tr>
            <tr>
              <td>aaaaaaaaa</td>
              <td>saaaaaaaaas</td>
              <td>aaaaaaaaaaaaaaaaaa</td>
              <td>sssaass</td>
              <td>a</td>
              <td>a</td>
            </tr>
            <tr>
              <td>aaaaaaaaa</td>
              <td>saaaaaaaaas</td>
              <td>aaaaaaaaaaaaaaaaaa</td>
              <td>sssaass</td>
              <td>a</td>
              <td>a</td>
            </tr>
            <tr>
              <td>aaaaaaaaa</td>
              <td>saaaaaaaaas</td>
              <td>aaaaaaaaaaaaaaaaaa</td>
              <td>sssaass</td>
              <td>a</td>
              <td>a</td>
            </tr>
            <tr>
              <td>aaaaaaaaa</td>
              <td>saaaaaaaaas</td>
              <td>aaaaaaaaaaaaaaaaaa</td>
              <td>sssaass</td>
              <td>a</td>
              <td>a</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="lecturers-table" className="table-container text-center">
        <h3>Lecturers</h3>
        <table>
          <thead>
            <tr>
              <td>{props.t.first_name}</td>
              <td>{props.t.last_name}</td>
              <td>{props.t.id}</td>
              <td>{props.t.email_address}</td>
              <td>{props.t.user_color}</td>
            </tr>
          </thead>
          <tbody className={props.dir}>
            <tr>
              <td>ssssssssssssssssssssssssss</td>
              <td>ss</td>
              <td>ssssssss</td>
              <td>sssss</td>
              <td>ssssssss</td>
              <td>ssssssss</td>
            </tr>
            <tr>
              <td>aaaaaaaaa</td>
              <td>saaaaaaaaas</td>
              <td>aaaaaaaaaaaaaaaaaa</td>
              <td>sssaass</td>
              <td>a</td>
              <td>a</td>
            </tr>
            <tr>
              <td>aaaaaaaaa</td>
              <td>saaaaaaaaas</td>
              <td>aaaaaaaaaaaaaaaaaa</td>
              <td>sssaass</td>
              <td>a</td>
              <td>a</td>
            </tr>
            <tr>
              <td>aaaaaaaaa</td>
              <td>saaaaaaaaas</td>
              <td>aaaaaaaaaaaaaaaaaa</td>
              <td>sssaass</td>
              <td>a</td>
              <td>a</td>
            </tr>
            <tr>
              <td>aaaaaaaaa</td>
              <td>saaaaaaaaas</td>
              <td>aaaaaaaaaaaaaaaaaa</td>
              <td>sssaass</td>
              <td>a</td>
              <td>a</td>
            </tr>
            <tr>
              <td>aaaaaaaaa</td>
              <td>saaaaaaaaas</td>
              <td>aaaaaaaaaaaaaaaaaa</td>
              <td>sssaass</td>
              <td>a</td>
              <td>a</td>
            </tr>
            <tr>
              <td>ssssssssssssssssssssssssss</td>
              <td>ss</td>
              <td>ssssssss</td>
              <td>sssss</td>
              <td>ssssssss</td>
              <td>ssssssss</td>
            </tr>
            <tr>
              <td>aaaaaaaaa</td>
              <td>saaaaaaaaas</td>
              <td>aaaaaaaaaaaaaaaaaa</td>
              <td>sssaass</td>
              <td>a</td>
              <td>a</td>
            </tr>
            <tr>
              <td>aaaaaaaaa</td>
              <td>saaaaaaaaas</td>
              <td>aaaaaaaaaaaaaaaaaa</td>
              <td>sssaass</td>
              <td>a</td>
              <td>a</td>
            </tr>
            <tr>
              <td>aaaaaaaaa</td>
              <td>saaaaaaaaas</td>
              <td>aaaaaaaaaaaaaaaaaa</td>
              <td>sssaass</td>
              <td>a</td>
              <td>a</td>
            </tr>
            <tr>
              <td>aaaaaaaaa</td>
              <td>saaaaaaaaas</td>
              <td>aaaaaaaaaaaaaaaaaa</td>
              <td>sssaass</td>
              <td>a</td>
              <td>a</td>
            </tr>
            <tr>
              <td>aaaaaaaaa</td>
              <td>saaaaaaaaas</td>
              <td>aaaaaaaaaaaaaaaaaa</td>
              <td>sssaass</td>
              <td>a</td>
              <td>a</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    t: state.literals.literals,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps)(CreateEvent);