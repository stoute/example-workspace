import React, {useEffect,useState}from 'react';
import { IonButtons, IonIcon, IonTitle } from '@ionic/react';
import { Css  } from '@bsmp/core';
import { IconButton, Icon, Flex, DataForm } from '@bsmp/react';
import { useEntityState } from '../../hooks';
import { useAppService } from '../../hooks';
import CrudButtons from '../../components/CrudButtons';
import { BsmCollapsible } from '@bsmp/webcomponents-react';
import { userFormDefinitions } from '@bsmp/entities';
import * as modals from '../../components/modals';

type props = {
  id: unknown,
  collectionPath?: string
  data?: unknown
}

export const UserItem = ({ id, collectionPath, data }: props) => {
  const path = collectionPath || 'users';
  const type = 'user';
  const [editing, setEditing] = useState(false);
  const {Can, renderModal,modal, setModal, t} = useAppService()
  const {state, stateFormatted, updateEntity} = useEntityState({id, path})

  if(!stateFormatted) return(<></>)

  const onCrudButtonClick = (btnId) => {
    if(btnId === 'edit') {
      renderModalForm()
      setEditing(!editing);
    }
    // if(btnId === 'delete') actions.setStateItem('showModal', true)
    // if(btnId === 'cancel')
  };

  const renderModalForm = () => {
    setModal({
      ...modal,
      show: true,
      content: <modals.DataFormModal
        data={state}
        onFormSubmit={(formData) => {
          updateEntity(formData)
          setEditing(false)
        }}
        excludedFields={['ip_address','type']}
        formDefinitions={userFormDefinitions.default}
        config={{}}
      />,
    });
  }

  return (
      <Flex container flexDirection={'column'} width="80vw" margin="32px auto">
        <img width={'25%'}
          src="https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg"
          alt="Profile"
        />
        <Flex flex={'1'} margin="0 0 0 16px">
          <Flex container justifyContent="space-between">
            <h4 > {stateFormatted['first_name']+ ' '+ stateFormatted['last_name']} </h4>
            <h5 > {id} </h5>
          </Flex>
          <p>{stateFormatted['email']}</p>
          {/*<p dangerouslySetInnerHTML={stateFormatted['email']} ></p>*/}
        </Flex>

        <Can do={'update'} on={type}>
          <CrudButtons
            entityType={type}
            onSubmit={(btnId) => {
              onCrudButtonClick(btnId);
            }}
          />
          {editing === true && (
            <>
            <BsmCollapsible label={t('edit')} collapsed={false}>
              {/*<DataForm*/}
              {/*  data={state}*/}
              {/*  onFormSubmit={(data) => {*/}
              {/*    updateState(data)*/}
              {/*  }}*/}
              {/*  formDefinitions={tripFormDefinitions.default}*/}
              {/*></DataForm>*/}
              <Can do={'delete'} on={type}>
                <button className={'btn-danger'}>{t('delete')}</button>
              </Can>
            </BsmCollapsible>
            </>
          )}
        </Can>
      </Flex>
  );
};

export default UserItem;
