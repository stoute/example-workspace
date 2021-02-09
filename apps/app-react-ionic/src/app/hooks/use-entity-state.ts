import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { entitiesCollectionsState, entitiyDefinitionsState } from '../recoil/atoms';
import { entitiesState } from '../recoil/selectors';
import { useActions } from '../hooks/use-actions';
import * as formatters from '../utils/entityFormatters';

type props = {
  id?: any,
  type?: string,
  path?: string,
  initialState?: typeof Object,
}

export const useEntityState = ({ id, path, initialState}: props) => {
  const [state, setState] = useState(initialState);
  const [stateFormatted, setStateFormatted] = useState(null);
  const [entities, setEntities] = useRecoilState(entitiesState);
  const [entitiesCollections, setEntitiesCollections] = useRecoilState(entitiesCollectionsState);
  const [entitiyDefinitions, setEntitiyDefinitions] = useRecoilState(entitiyDefinitionsState);
  const {actions} = useActions()

  useEffect(() => {
    let entity: unknown;
    // cached
    if(id && entities[id]) entity = entities[id];
    // todo
    if(initialState) entity = initialState;
    // get http
    if(!entity) getEntity(path, id).then((result) => {
      if(result) parseEntity(result)
      return
    })
    if (entity)
      parseEntity(entity)
      return;
  }, []);

  const getEntity = async (path, id, options = {}) => {
    const entity = await actions.entityGet(path, id).catch((error) => {
        console.error('getEntity',error);
    })
    return entity;
  }

  const updateEntity = async (updatedEntitystate) => {
    const response = await actions.entityUpdate(updatedEntitystate, path)
    setTimeout(() => {
      let array = []
      let pathPlural = entitiyDefinitions[response.type].pathPlural
      entitiesCollections[pathPlural].forEach((entity,i) => {
        array.push(entity)
        // fixme:
        if(entity.id == response.id) array[i] = response
      })
      setEntitiesCollections({ ...entitiesCollections, ...{[pathPlural]: array} })
      let newState = {...state ,...response}
      setStateFormatted(formatState(newState))
      setState(newState)
    },100)
  };

  const parseEntity = (entity) => {
    setStateFormatted(formatState(entity))
    setState(entity)
  }

  const formatState = (entity) => {
    let formatted = {}
    Object.keys(entity).forEach((k, i) => {
      formatted[k] = entity[k]
      if(entity['type'] === 'user') formatted[k] = formatters.userFormatter(k,entity)
      if(entity['type'] === 'todo') formatted[k] = formatters.todoFormatter(k,entity)
    });
    return formatted
  }

  return {
    state,
    setState,
    stateFormatted,
    getEntity,
    updateEntity,
    entities
  };
};

