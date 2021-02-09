import React, { SyntheticEvent, useEffect, useState } from 'react';
import { HttpService } from '@bsmp/core';
import {
  atom,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { BsmCollapsible, BsmLoadingSpinner } from '@bsmp/webcomponents-react';
import { globalAppState, entitiesCollectionsState } from '../../recoil/atoms';
import {
  globalState,
  entityState,
  entitiesState,
} from '../../recoil/selectors';
import { DataViewer, Flex } from '@bsmp/react';
import { useAppService } from '../../hooks';

type props = {
  collapsed?: boolean;
  data?: any;
};

const RecoilTest = ({ collapsed }: props) => {
  const { appService, t, Can, alert, setAlert } = useAppService();
  const [data, setData] = useState({});

  const [appState, setAppState] = useRecoilState(globalState);
  const [appStateAtom, setAppStateAtom] = useRecoilState(globalAppState);

  const [entitiesCollections, setEntitiesCollections] = useRecoilState(
    entitiesCollectionsState
  );
  const [entities, setEntities] = useRecoilState(entitiesState);
  const [entity1, setEntity1] = useRecoilState(entityState(1));
  const [entity2, setEntity2] = useRecoilState(entityState(2));

  const [counter, setCounter] = useRecoilState(myCounterState);
  const multipliedNumber = useRecoilValue(myMultipliedState(100));

  const [rxState, setRxState] = useState();
  useEffect(() => {
    const subscription =  appService.state$.subscribe((rxState) => {
        // setRxState(rxState)
    })
    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
     // syncRxToRecoil()
    setAppState({...appState,  counter: 10})
  }, []);

  useEffect(() => {
    setData({
      ...data,
      ...{
        appState: appState.counter,
        appGlobalState: appStateAtom.counter,
        ['appService.state']: appService.state.counter,
        counter, multipliedNumber },
    });
  }, [appState]);

  useEffect(() => {
    setData({ ...data, ...{ entity1, entity2 } });
  }, [entities]);

  useEffect(() => {
   // console.log(counter);
    setAppState({ ...appState, counter: counter });
  }, [counter]);

  const add = (increment, statetype: string) => {
    if(statetype==='recoil') setCounter(counter + increment);
    if(statetype==='rx')
      appService.setStateItem('counter', counter + increment);
  };

  return (
    <BsmCollapsible collapsed={collapsed} label={'recoil-test'}>
      <Flex container justifyContent="space-around" flexDirection={'row'}>
        <button className={'btn'} onClick={() => add(1,'recoil')}>
          add recoil
        </button>
        <button className={'btn'} onClick={() => add(1,'rx')}>
          add rx
        </button>
        <button
          className={'btn'}
          onClick={async () =>
            await setEntity1({
              ...entity1,
              ...{ first_name: String(Math.random()) },
            })
          }
        >
          update entity
        </button>
        <button
          className={'btn'}
          onClick={async () =>
            await setEntity2({
              ...entity2,
              ...{ first_name: String(Math.random()) },
            })
          }
        >
          update entity 2
        </button>
      </Flex>
      <DataViewer label={'data'} collapsed={false} data={data} />
      {/*<DataViewer label={'appState'} collapsed={false} data={appState} />*/}
      <Component1 />
    </BsmCollapsible>
  );
};

export default RecoilTest;

const myCounterState = atom({
  key: 'myNumberState',
  default: 0,
});

const formState = atom({
  key: 'formState',
  default: {
    field1: '1',
    field2: '2',
    field3: '3',
  },
});

const formFieldState = selectorFamily({
  key: 'formFieldState',
  get: (field: string) => ({ get }) => get(formState)[field],
  set: (field: string) => ({ set, get }, newValue: SyntheticEvent) => {
    console.log(newValue.nativeEvent['data']);
    // set(formState, prevState => {...prevState, [field]: newValue}),
    set(formState, {
      ...get(formState),
      ...{ [field]: newValue.nativeEvent['data'] },
    });
    console.log(get(formState));
  },
});

const Component1 = () => {
  const [value, onChange] = useRecoilState(formFieldState('field1'));
  return (
    <>
      <input value={value} onChange={onChange} />
      <Component2 />
    </>
  );
};

const Component2 = () => {
  const [value, onChange] = useRecoilState(formFieldState('field2'));
  return <input value={value} onChange={onChange} />;
};

const myMultipliedState = selectorFamily({
  key: 'myMultipliedState',
  get: (multiplier: number) => ({ get }) => {
    return get(myCounterState) * multiplier;
  },
  // optional set
  set: (multiplier) => ({ set }, newValue: number) => {
    set(myCounterState, newValue / multiplier);
  },
});
