import React ,{useEffect} from 'react';
import { IonButtons, IonIcon, IonCard, IonImg } from '@ionic/react';
import { Css } from '@bsmp/core';
import { IconButton, Icon, Flex } from '@bsmp/react';
import { personCircleOutline } from 'ionicons/icons';
import { useEntityState } from '../../hooks';

type props = {
  id?: any,
  data?: any
}

export const TodoListItem = ({ id, data }: props) => {
  const path = 'todos';
  const type = 'todo';
  const { state, stateFormatted } = useEntityState({id,path})

  useEffect(() => {
  },[])

  if(!stateFormatted) return(<h4></h4>)

  return (
    <IonCard>
      <Flex container flexDirection={'row'} justifyContent={'space-between'}>
        {/*<Flex flex={'0.5'} margin={'0 15px 0 0'}>*/}
        {/*  <IonImg*/}
        {/*    src="https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg"*/}
        {/*    alt="Profile"*/}
        {/*  />*/}
        {/*</Flex>*/}
        <Flex flex={'1'}>
          <Flex
            container
            justifyContent="space-between"
            flexDirection={'column'} margin={'0 15px 0 0'}
          >
            <h4> {stateFormatted['name']} </h4>
            <h4> {stateFormatted['done']} </h4>
          </Flex>
        </Flex>
      </Flex>
    </IonCard>
  );
};

export default TodoListItem;
