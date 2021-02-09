import { useEffect, useState } from 'react';
import { Util } from '@bsmp/core';
import {
  User
} from './user';
import {
  IUserEntity,
  IUserState,
  IUserStateFormatted,
} from './user-interfaces';
import { Trip } from '../trip';

export const useUser = (
  initialState: IUserState = null,
  updateAction: Function = null,
  entityRef: User = null
) => {
  const entity: User = entityRef || new User(initialState);
  const [state, setState] = useState<IUserState>(initialState);
  const [
    stateFormatted,
    setStateFormatted,
  ] = useState<IUserStateFormatted | null>();

  useEffect(() => {
    entity.initialState = state;
    return () => {
      exitUser();
    };
  }, []);

  useEffect(() => {
    if (state) entity.setState(state);
    setStateFormatted(entity.stateFormatted);
  }, [state]);

  const updateUser = async (updatedUser: IUserState) => {
    let response;
    entity.setState({ ...entity.state, ...{ timestamp: Util.getTimeStamp() } });
    if (updateAction) response = await updateAction(updatedUser);
    entity.setState({ ...entity.state, ...updatedUser });
    setState({ ...state, ...updatedUser });
    if (response) entity.setState({ ...entity.state, ...response });
    setState({ ...state, ...response });
    setStateFormatted(entity.stateFormatted);
  };

  const exitUser = async () => {};

  return {
    ...entity,
    ...{
      // fixme: use entity.state ?
      state,
      // state: entity.state,
      setState,
      stateFormatted,
      updateUser,
    },
  };
};
