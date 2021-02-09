import { v4 as uuid } from 'uuid';
import { selector, selectorFamily } from 'recoil';
import memoize from '../utils/memoize';
import { globalAppState, entitiesCollectionsState } from './atoms';
import * as actions from '../actions';
import { appService, AppState } from '../providers/app-service';

export const globalState = selector({
  key: 'globalState',
  get: ({ get }): AppState => {
    const currentState = get(globalAppState)
    appService.setState({...appService.state,...currentState})
    return currentState;
  },
  set: ({ set, get }, newValue: AppState) => {
    set(globalAppState,{...appService.state, ...newValue})
    appService.setState({...appService.state,...get(globalAppState)})
  },
});


// todo: make async
export const entityState = selectorFamily({
  key: 'entityState',
  get: (id: any) => ({ get }): any => {
    if (get(entitiesState)[id]) return get(entitiesState)[id];
  },
  set: () => ({ set, get }, newValue: any) => {
    let collections = get(entitiesCollectionsState);
    Object.keys(collections).map((k) => {
      let collection = [...collections[k]];
      collection.forEach((entity, i) => {
        if (newValue['id'] === entity.id) {
          collection[i] = newValue;
          set(entitiesCollectionsState, {
            ...collections,
            ...{ [k]: collection },
          });
        }
      });
    });
  },
});

// todo: make async get
export const entitiesState = selector({
  key: 'entitiesState',
  get: ({ get }) => {
    const entities: any = {};
    const collections = get(entitiesCollectionsState);
    Object.keys(collections).map((k, i) => {
      collections[k].map((entity) => {
        entities[entity.id] = entity;
      });
    });
    return entities;
  },
  set: async ({ set, get }, newValue) => {},
});

export const usersCollection = selector({
  key: 'usersCollection',
  get: async ({ get }) => {
    const collection = await actions.collectionGet('users');
    return collection;
  },
});
export const todosCollection = selector({
  key: 'todosCollection',
  get: async ({ get }) => {
    const collection = await actions.collectionGet('todos');
    return collection;
  },
});
export const tripsCollection = selector({
  key: 'tripsCollection',
  get: async ({ get }) => {
    const collection = await actions.collectionGet('trips');
    return collection;
  }
});

export const collectionsQuery = selector({
  key: 'collectionsQuery',
  get: async ({ get }) => {
    let collections = { ...get(entitiesCollectionsState) };
    Object.keys(get(entitiesCollectionsState)).forEach(async (key, i) => {
      collections[key] = await actions.collectionGet(key);
    });
    // set(entitiesCollectionsState, collections )
    // console.log(get(entitiesCollectionsState));
    return collections;
  },
  set: async ({ set, get }, newValue) => {},
});

// export const entityWithId = memoize(id => selector({
//   key: `entity${id}`,
//   get: ({ get }) => {
//     console.log(entitiesState);
//     if (get(entitiesState)[id]) return get(entitiesState)[id]
//   },
//   set: ({ set }, newValue) => {
//     // const state = privateItemStateWithId(id);
//     // set(state, newValue);
//   }
// }));

// export const selectedItemsSelector = itemsSelector('selectedItemsSelector', selectedIdsState);

// export const entityStateFormatted= selector({
//   key: 'itemStateFormatted', // unique ID (with respect to other atoms/selectors)
//   get: ({ get }) => {
//     const item = get(activeEntityState);
//     const itemFormatted = {}
//     if (!item) return null;
//     Object.keys(item).forEach((k, i) => {
//       if(item.type === 'user') itemFormatted[k] = formatters.userFormatter(k,item)
//       if(item.type === 'todo') itemFormatted[k] = formatters.entityFormatters(k,item)
//     });
//     return itemFormatted;
//   },
// });

// export const itemWithId = selector(id => selector({
//   key: `item${id}`,
//   get: ({ get }) => {
//     console.log('get selector: itemWithId',itemWithId);
//     const todos = get(entitiesCollectionsState)
//     todos.forEach((item) => {
//       if (item.id === id)  return  item
//     })
//   },
//   set: ({ set }, newValue) => {
//     console.log('set itemWithId ',newValue);
//     // const state = privateItemStateWithId(id);
//     set(activeEntityState, newValue);
//   }
// }));
