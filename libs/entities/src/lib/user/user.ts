import { BaseEntity, IBaseEntity, IBaseEntityState, IEntityDefinition } from '@bsmp/core';
import {IUserEntity, IUserState, IUserStateFormatted} from "./user-interfaces";
import { userFormatter } from './userFormatter';
import { userTranslations } from './userTranslations';

export class User extends BaseEntity {
  public state: IUserState;
  public stateFormatted: IUserStateFormatted;
  public initialState: IUserState;
  public type = 'user';
  public typeDefinition = userEntityDefinition;
  public formattedFields = ['avatarDisplay'];
  public translations = userTranslations;
  public formatter = userFormatter;

  constructor(initialState: IUserState) {
    super(initialState);
  }
}

export const userEntityDefinition = {
  type: 'user',
  description: '',
  name: 'User',
  namePlural: 'Users',
  path: 'user',
  pathPlural: 'users',
}

export const userFormDefinitions = {

  default: {
    "data": {
      "type":"user",
      "id":"userForm",
      "attributes":{
        "username":"",
        "password":""
      },
      "meta":{
        "definitions":{
          "username":{
            "label":"USERNAME",
            "tag":"input",
            "type":"text",
            "constraints":{
              "presence": true,
              "length":{
                "minimum": 3,
                "maximum": 70
              }
            },
            "permissions": ["read","update"]
          },
          "password":{
            "label":"PASSWORD",
            "tag":"input",
            "type":"password",
            "placeholder":"",
            "constraints":{
              "presence": true,
              "length":{
                "minimum": 8,
                "message":"^This field must be at least %{count} characters long"
              }
            },
            "permissions": ["read","update"]
          }
        },
        "permissions":[
          "read",
          "update"
        ]
      }
    }
  }

};

export const userFragment = `fragment UserFragment on User {
  id
  type
  profile {
    name
    address
  }
}`;

