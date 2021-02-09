import React, { useEffect, useState } from 'react';
import { Flex, IconButton } from '@bsmp/react';
// import { useAbilityContext } from '@bsmp/react';
import { useAppService } from "../hooks";

const CrudButtons = ({ entityType, onSubmit }) => {
  const { Can, ability } = useAppService();

  return (
    <Flex
      container
      justifyContent="space-around"
      flexDirection={'row'}
      padding={'20'}
    >
      <Can do={'update'} on={entityType || 'entity'}>
        <IconButton
          size={'small'}
          name={'create-outline'}
          onClick={() => {
            onSubmit('edit');
          }}
        />
      </Can>
      <Can do={'delete'} on={entityType || 'entity'}>
        <IconButton
          size={'small'}
          name={'trash-outline'}
          onClick={() => {
            onSubmit('delete');
          }}
        />
      </Can>
    </Flex>
  );
};

export default CrudButtons;
