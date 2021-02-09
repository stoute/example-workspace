import * as moment_ from 'moment';
import { ITripState } from './trip-interfaces';
const moment: any = moment_;

export const tripFormatter = (fieldName: string, state: ITripState) => {
  let formatted: any;
  const field = fieldName;
  switch (field) {
    case 'startTime':
      formatted = moment(state[field]).format('HH:mm');
      break;
    case 'endTime':
      formatted = moment(state[field]).format('HH:mm');
      break;
    case 'currentTime':
      formatted = moment(state[field]).format('HH:mm:ss');
      break;
    case 'distanceInKm':
      formatted = Math.round( state[field] || 0 * 10 ) / 10 + ' km';
      break;
    case 'averageSpeed':
      formatted = Math.round(state[field] as number);
      break;
    case 'durationInHour':
      formatted = timeToString(state[field] as number * 60);
      break;
    case 'dateDisplay':
      if (state && state.startTime) formatted = moment(state['startTime']).format('dddd DD MMMM');
      break;
    case 'dateDisplayShort':
      if (state && state.startTime) formatted = moment(state['startTime']).format('DD-MM-YY');
      break;
    default:
      formatted = state[field]
  }
  return formatted;
};

const timeToString = (num: number): string => {
  let hours = (Math.floor(num / 60)).toString();
  let minutes = (Math.floor(num % 60)).toString();
  if (hours.length === 1) hours = '0' + hours;
  if (minutes.length === 1) minutes = '0' + minutes;
  return `${hours}:${minutes}`;
}
