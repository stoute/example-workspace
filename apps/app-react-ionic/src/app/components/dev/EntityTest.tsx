import React, { useEffect, useState } from 'react';
import { DataForm, Flex } from '@bsmp/react';
import { BsmCollapsible, BsmLoadingSpinner } from '@bsmp/webcomponents-react';
import { useEntityState } from '../../hooks';

type props = {
  id?: unknown,
  data?: unknown,
  collapsed: boolean
}

export const EntityTest = ({data, collapsed}: props) => {

  const collectionPath = 'users';
  const id = 10;

  const {state, stateFormatted, updateEntity} = useEntityState({id: id, path: collectionPath})

  useEffect(() => {
      console.log(stateFormatted);
  }, [stateFormatted])

  const renderItem = () => {
    return Object.keys(stateFormatted).map((key,i) => (
      <div key={i}>{key} :: {stateFormatted[key]}</div>
    ));
  };

  return (
    <BsmCollapsible collapsed={collapsed} label={'EntityTest'}>
      {stateFormatted &&
      <div className={'container p-t3'}>
        <Flex container flexDirection={'column'} margin="32px auto">
          {renderItem()}
        </Flex>
        <hr/>
        <DataForm data={state} onFormSubmit={(formData) => updateEntity(formData)} language={'nl-NL'} />
      </div>
      }
    </BsmCollapsible>

  );
};

export default EntityTest;
