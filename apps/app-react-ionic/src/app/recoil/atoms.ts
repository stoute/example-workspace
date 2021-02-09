import { atom } from 'recoil';
import { userEntityDefinition } from '@bsmp/entities';
import {appService} from '../providers/app-service';

export const initialGlobalAppState = atom({
  key: 'initialGlobalAppState',
  default: {...appService.state},
});

export const globalAppState = atom({
  key: 'globalAppState',
  default: initialGlobalAppState,
});

export const cacheState = atom({
  key: 'cacheState',
  default: false,
});

export const entitiesCollectionsState = atom({
  key: 'entitiesCollectionsState',
  default: {}
});

export const entitiyDefinitionsState = atom({
  key: 'entitiyDefinitionsState',
  default: {
    user: userEntityDefinition,
    todo: {"type": "todo","description":"","name":"Todo","namePlural":"Todos","path":"todo","pathPlural":"todos"},
  }
});

export const activeEntityState = atom({
  key: 'activeEntityState',
  default: null,
});

export const activeIdState = atom({
  key: 'activeIdState',
  default: null,
});



