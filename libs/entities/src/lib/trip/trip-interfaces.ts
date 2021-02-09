import { IBaseEntity, IBaseEntityState, IEntityDefinition } from '@bsmp/core';
import { tripTranslations } from './tripTranslations';

export interface ITripEntity extends IBaseEntity {
  state: ITripState;
  stateFormatted?: ITripStateFormatted;
  translations?: typeof tripTranslations;
  initialState?; ITripState;
}

export interface ITripState extends IBaseEntityState {
  vehicleId?: number;
  deviceId?: number;
  driverId?: number;
  startTime?: object;
  endTime?: string;
  currentTime?: string;
  description?: string;
  startMileage?: number;
  endMileage?: number;
  distanceInKm?: number;
  endAddress?: string;
  averageSpeed?: number;
  tripType?: string;
  startAddress?: string;
  durationInHour?: number;
  vehicle?: any;
}

export interface ITripStateFormatted extends ITripState {
  dateDisplay?: string;
  dateDisplayShort?: string;
}
