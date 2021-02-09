import React, { useEffect, useState } from 'react';
import { BsmCollapsible } from '@bsmp/webcomponents-react';
import { useAppService } from '../../hooks';
import { DataViewer, Flex } from '@bsmp/react';
import { Util } from '@bsmp/core';

type props = {
  collapsed?: boolean
}

const AbilityTest = ({ collapsed }: props) => {
  const { ability, appService, t , Can} = useAppService();
  const [state, setState] = useState(Util.getUUID());

  useEffect(() => {
    // ability.update(store.state.roles.ANONYMOUS);
    return () => {
      // ability.update(store.state.roles.DEVELOPER);
    };
  }, []);

  return (
    <BsmCollapsible collapsed={collapsed} label={'ability-test'}>
    <div className={'pt-4'}>

      <Flex container justifyContent="space-between" flexDirection={'row'}>

        <button
          className={'btn btn-primary'}
          onClick={() => {
            ability.update(appService.state.roles.ANONYMOUS);
            setState(Util.getUUID());
          }}
        >
          ANONYMOUS
        </button>
        <button
          className={'btn btn-primary'}
          onClick={() => {
            ability.update(appService.state.roles.AUTHENTICATED);
            setState(Util.getUUID());
          }}
        >
          AUTHENTICATED
        </button>
        <button
          className={'btn btn-primary'}
          onClick={() => {
            ability.update(appService.state.roles.DEVELOPER);
            setState(Util.getUUID());
          }}
        >
          DEVELOPER
        </button>
        <button
          className={'btn btn-primary'}
          onClick={() => {
            ability.update(appService.state.roles['trip_OWNER']);
            setState(Util.getUUID());
          }}
        >
          trip_OWNER
        </button>
      </Flex>
      <Flex className={'text-center'} container justifyContent={'space-around'} flexDirection={'row'} >
        <Can do={'login'} on={'all'}>
          <li>{'can login'}</li>
        </Can>
        <Can do={'logout'} on={'all'}>
          <li>{'can logout'}</li>
        </Can>
        <Can do={'debug'} on={'all'}>
          <li>{'can debusg'}</li>
        </Can>
        <Can do={'read'} on={'trip'}>
          <li>{'can read trip'}</li>
        </Can>
        <Can do={'update'} on={'trip'}>
          <li>{'can update trip'}</li>
        </Can>
        <Can do={'delete'} on={'trip'}>
          <li>{'can delete trip'}</li>
        </Can>
      </Flex>
      <DataViewer label={'ability.rules'} collapsed={false} data={ability.rules} />
      {/*<DataViewer label={'ability'} collapsed={false} data={state} />*/}
    </div>
    </BsmCollapsible>
  );
};

export default AbilityTest;
