import React, { useEffect, useState } from 'react';
import { DataForm, Flex } from '@bsmp/react';
import { useEntityState } from '../../hooks';

type props = {
  id: unknown;
  data?: unknown;
  collectionPath?: string
};

export const TodoItem = ({ id, collectionPath, data }: props) => {
  const path = collectionPath || 'todos';
  const type = 'todo';
  const { state, stateFormatted, updateEntity } = useEntityState({
    id,
    path
  });
  const [editing, setEditing] = useState(false);

  const renderItem = () => {
    return Object.keys(stateFormatted).map((key, i) => (
      <div key={i}>
        {key} :: {stateFormatted[key]}
      </div>
    ));
  };

  if (!stateFormatted) return <></>;

  return (
    <div className={'container p-t3'}>
      <Flex container flexDirection={'column'} margin="32px auto">
        {renderItem()}
      </Flex>
      <hr />
      <DataForm
        data={state}
        excludedFields={['id','type']}
        onFormSubmit={(formData) => updateEntity(formData)}
        language={'nl-NL'}
      />
    </div>
  );
};

export default TodoItem;
