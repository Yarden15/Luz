import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import Menu from '../layout/Menu';

const CreateEvent = (props) => {
  return (
    <Fragment>
      <div className="tables-matching text-center">
        <h3>courses</h3>
        <div id="courses-table" className="table-container text-center">
          <table>
            <thead>
              <tr>
                <th>{props.t.course_title}</th>
                <th>{props.t.serial_number}</th>
                <th>{props.t.year}</th>
                <th>{props.t.semester}</th>
                <th>{props.t.course_hours}</th>
                <th>{props.t.location}</th>
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
                <td>א'</td>
                <td>א'</td>
                <td>4</td>
                <td>חרידי</td>
              </tr>
              <tr>
                <td>אלגברה לינארית ב'</td>
                <td>212121211</td>
                <td>א'</td>
                <td>ב'</td>
                <td>4</td>
                <td>חרידי</td>
              </tr>
              <tr>
                <td>אלגברה לינארית א'</td>
                <td>313131312</td>
                <td>א'</td>
                <td>א'</td>
                <td>4</td>
                <td>נביאים</td>
              </tr>
              <tr>
                <td>אלגברה לינארית ב'</td>
                <td>312223331</td>
                <td>א'</td>
                <td>ב'</td>
                <td>4</td>
                <td>נביאים</td>
              </tr>
              <tr>
                <td>oop 1</td>
                <td>113344556</td>
                <td>ב'</td>
                <td>א'</td>
                <td>6</td>
                <td>נביאים</td>
              </tr>
              <tr>
                <td>oop 2</td>
                <td>113344557</td>
                <td>ב'</td>
                <td>ב'</td>
                <td>6</td>
                <td>נביאים</td>
              </tr>
              <tr>
                <td>ארכיטקטורת מחשבים</td>
                <td>456745677</td>
                <td>ג'</td>
                <td>א'</td>
                <td>0</td>
                <td>מקוון</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="tables-matching text-center">
        <h3>Lecturer</h3>
        <div id="courses-table" className="table-container text-center">
          <table>
            <thead>
              <tr>
                <th>{props.t.first_name}</th>
                <th>{props.t.last_name}</th>
                <th>{props.t.id}</th>
                <th>{props.t.email_address}</th>
                <th>{props.t.user_color}</th>
              </tr>
            </thead>
            <tbody className={props.dir}>
              <tr>
                <td>מערכות הפעלה</td>
                <td>152365548</td>
                <td>ב'</td>
                <td>א'</td>
                <td>4</td>
              </tr>
              <tr>
                <td>מערכות לומדות</td>
                <td>143361548</td>
                <td>ג'</td>
                <td>א'</td>
                <td>3</td>
              </tr>
              <tr>
                <td>אלגוריתמים</td>
                <td>26584555</td>
                <td>ב'</td>
                <td>ב'</td>
                <td>4</td>
              </tr>
              <tr>
                <td>תושבע</td>
                <td>11111111</td>
                <td>א'</td>
                <td>א'</td>
                <td>5</td>
              </tr>
              <tr>
                <td>מבנה נתונים</td>
                <td>222222222</td>
                <td>ב'</td>
                <td>א'</td>
                <td>4</td>
              </tr>
              <tr>
                <td>אלגברה לינארית א'</td>
                <td>121212121</td>
                <td>א'</td>
                <td>א'</td>
                <td>4</td>
              </tr>
              <tr>
                <td>אלגברה לינארית ב'</td>
                <td>212121211</td>
                <td>א'</td>
                <td>ב'</td>
                <td>4</td>
              </tr>
              <tr>
                <td>אלגברה לינארית א'</td>
                <td>313131312</td>
                <td>א'</td>
                <td>א'</td>
                <td>4</td>
              </tr>
              <tr>
                <td>אלגברה לינארית ב'</td>
                <td>312223331</td>
                <td>א'</td>
                <td>ב'</td>
                <td>4</td>
              </tr>
              <tr>
                <td>oop 1</td>
                <td>113344556</td>
                <td>ב'</td>
                <td>א'</td>
                <td>6</td>
              </tr>
              <tr>
                <td>oop 2</td>
                <td>113344557</td>
                <td>ב'</td>
                <td>ב'</td>
                <td>6</td>
              </tr>
              <tr>
                <td>ארכיטקטורת מחשבים</td>
                <td>456745677</td>
                <td>ג'</td>
                <td>א'</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
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