import store from '../store';
import { SORT_USERS, SORT_COURSES, SORT_EVENTS } from '../actions/types';

//sort users gets a function that determines which attribute to sort
export const sortUsers = (func) => {
  store.dispatch({
    type: SORT_USERS,
    payload: func
  });
}
//sorts the user by first name
export const sortUsersByFirstName = (a, b) => {
  const nameA = a.first_name.toUpperCase();
  const nameB = b.first_name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}
//sorts the user by last name
export const sortUsersByLastName = (a, b) => {
  const nameA = a.last_name.toUpperCase();
  const nameB = b.last_name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}
//sorts the user by ID
export const sortUsersByID = (a, b) => {
  return a.id_number - b.id_number;
}
//sorts the user by email
export const sortUsersByEmail = (a, b) => {
  const emailA = a.email.toUpperCase();
  const emailB = b.email.toUpperCase();

  let comparison = 0;
  if (emailA > emailB) {
    comparison = 1;
  } else if (emailA < emailB) {
    comparison = -1;
  }
  return comparison;
}
//sort user by color
export const sortUsersByColor = (a, b) => {
  const colorA = hexToHSL(a.color);
  const colorB = hexToHSL(b.color);

  let comparison = 0;
  if (
    (colorA.h < colorB.h)
    || (colorA.h === colorB.h && colorA.s < colorB.s)
    || (colorA.h === colorB.h && colorA.s === colorB.s && colorA.l < colorB.l)) {
    comparison = 1;
  } else {
    comparison = -1;
  }
  return comparison;
}

//this function convert hex color to hsl
function hexToHSL(H) {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (H.length === 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length === 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta === 0)
    h = 0;
  else if (cmax === r)
    h = ((g - b) / delta) % 6;
  else if (cmax === g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h: h, s: s, l: l };
}

//sort courses gets a function that determines which attribute to sort
export const sortCourses = (func) => {
  store.dispatch({
    type: SORT_COURSES,
    payload: func
  });
}

//sorts the courses by title
export const sortCourseByName = (a, b) => {
  const nameA = a.title.toUpperCase();
  const nameB = b.title.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}
//sorts the courses by serial number
export const sortCourseBySN = (a, b) => {
  return a.serial_num - b.serial_num;
}
//sorts the courses by hours
export const sortCourseByHours = (a, b) => {
  return a.course_hours - b.course_hours;
}
//sorts the courses by year
export const sortCourseByYear = (a, b) => {
  const nameA = a.year.toUpperCase();
  const nameB = b.year.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}
//sorts the courses by semester
export const sortCourseBySemester = (a, b) => {
  const nameA = a.semester.toUpperCase();
  const nameB = b.semester.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}
//sorts the courses by location
export const sortCourseByLocation = (a, b) => {
  const nameA = a.location.toUpperCase();
  const nameB = b.location.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

//this method gets function and sorts the events by the function
export const sortEvents = (func) => {
  store.dispatch({
    type: SORT_EVENTS,
    payload: func
  });
}
//sorts events by first name
export const sortEventByFirst = () => {

}
//sorts events by last name
export const sortEventByLast = () => {

}
//sorts events by serial number
export const sortEventBySN = () => {

}
//sorts events by year
export const sortEventByYear = () => {

}
//sorts events by semester
export const sortEventBySemester = () => {

}
//sorts events by location
export const sortEventByLocation = () => {

}
//sorts events by hours
export const sortEventByHours = () => {

}
//sorts events by ID
export const sortEventByID = () => {

}
//sorts events by color
export const sortEventByColor = () => {

}