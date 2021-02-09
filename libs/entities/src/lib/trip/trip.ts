import { BaseEntity, IBaseEntity, IBaseEntityState, IEntityDefinition } from '@bsmp/core';
import { tripFormatter } from './tripFormatter';
import { tripTranslations } from './tripTranslations';
import {ITripEntity, ITripState, ITripStateFormatted} from './trip-interfaces';

export class Trip extends BaseEntity {
  public state: ITripState;
  public stateFormatted: ITripStateFormatted;
  public initialState: ITripState;
  public type = 'trip';
  public typeDefinition = tripEntityDefinition;
  public formattedFields = ['dateDisplay', 'dateDisplayShort'];
  public translations = tripTranslations;
  public formatter = tripFormatter;

  constructor(initialState: ITripState) {
    super(initialState);
  }
}

export const tripEntityDefinition: IEntityDefinition = {
  type: 'trip',
  name: 'Trip',
  description: '',
  namePlural: 'Trips',
  path: 'trip',
  pathPlural: 'trips',
};

export const tripFormDefinitions = {
  default: {
    data: {
      type: 'trip',
      id: 'trip',
      attributes: {
        username: '',
        password: '',
      },
      meta: {
        definitions: {
          id: {
            hidden: true,
          },
          username: {
            label: 'USERNAME',
            tag: 'input',
            type: 'text',
            constraints: {
              presence: true,
              length: {
                minimum: 3,
                maximum: 70,
              },
            },
            permissions: ['read', 'update'],
          },
          password: {
            label: 'PASSWORD',
            tag: 'input',
            type: 'password',
            placeholder: '',
            constraints: {
              presence: true,
              length: {
                minimum: 8,
                message:
                  '^This field must be at least %{count} characters long',
              },
            },
            permissions: ['read', 'update'],
          },
        },
        permissions: ['read', 'update'],
      },
    },
  },
};

export const tripFragment = `fragment TripFragment on Trip {
  id
  vehicleId
  deviceId
  driverId
  startTime
  endTime
  description
  startMileage
  endMileage
  distanceInKm
  endAddress
  averageSpeed
  tripType
  startAddress
  durationInHour
  vehicle {
    identification
    brand
  }
}`;
