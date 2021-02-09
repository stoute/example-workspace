import React ,{useEffect} from 'react';
import { IonAvatar,IonButtons, IonIcon, IonCard, IonImg } from '@ionic/react';
import { IconButton, Icon, Flex } from '@bsmp/react';
import { personCircleOutline } from 'ionicons/icons';
import { useEntityState } from '../../hooks';

export const UserListItem = ({ id, data }) => {
  const path = 'users';
  const type = 'user';
  const { state, stateFormatted } = useEntityState({id, path})

  useEffect(() => {
  },[state])

  if(!stateFormatted) return(<h4></h4>)

  return (
    <IonCard>
      <Flex container flexDirection={'row'} justifyContent={'space-between'}>
        <Flex flex={'0.5'} margin={'0 15px 0 0'}>
          <IonImg
            src="https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg"
            alt="Profile"
          />
        </Flex>
        <Flex flex={'1'}>
          <Flex
            container
            justifyContent="space-between"
            flexDirection={'column'} margin={'0 15px 0 0'}
          >
            <h4> {stateFormatted['first_name']} </h4>
            <h4> {stateFormatted['last_name']} </h4>
            <div> {stateFormatted['id']} </div>
          </Flex>
          <p>{stateFormatted['email']}</p>
        </Flex>
      </Flex>
    </IonCard>
  );
};

export default UserListItem;
