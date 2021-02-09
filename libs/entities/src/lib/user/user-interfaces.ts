import { IBaseEntity, IBaseEntityState } from '@bsmp/core';
import { userTranslations } from './userTranslations';

export interface IUserEntity extends IBaseEntity {
  state: IUserState;
  stateFormatted?: IUserStateFormatted;
  translations?: typeof userTranslations;
  initialState?; IUserState;
}

export interface IUserState extends IBaseEntityState{
  name: string;
  email: string;
  roles?: unknown;
  authenticated?: boolean;
  avatar?: unknown;
}

export interface IUserStateFormatted extends IUserState {
  avatarDisplay?: string;
}
