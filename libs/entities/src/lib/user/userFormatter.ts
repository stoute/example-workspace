import * as moment_ from 'moment';
import { IUserState } from './user-interfaces';
const moment: any = moment_;

export const userFormatter = (fieldName: string, state: IUserState) => {
  let formatted: any;
  const field = fieldName;
  switch (field) {
    case 'address':
      // formatted = moment(state[field]).format('HH:mm');
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
