import React, { useEffect, useState } from 'react';
import { Redirect, Route, NavLink } from 'react-router-dom';
import { IonContent, IonList, IonItem, IonPage } from '@ionic/react';
import { Css } from '@bsmp/core';
import { modalState } from '@bsmp/react';
import PageContent from '../../components/PageContent';
// import { alertState } from '@bsmp/react';
import { Button } from 'react-bootstrap';
import { BsmCollapsible } from '@bsmp/webcomponents-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import UserListItem from '../../pages/users/UserListItem';
import PageHeader from '../PageHeader';
import AbilityTest from './AbilityTest';
import EntityTest from './EntityTest';
import FirebaseTest from './FirebaseTest';
import RecoilTest from './RecoilTest';
import * as modals from '../modals';
import { Flex, alertState } from '@bsmp/react';
import { useAppService } from '../../hooks';
// import {  entitiesState } from '../recoil/selectors';

const TestPage: React.FC = () => {
  const { appService, renderModal, t, Can } = useAppService();
  const [modal, setModal] = useRecoilState(modalState);
  const [alert, setAlert] = useRecoilState(alertState);

  useEffect(() => {

  },[])

  const renderAlert = () => {
    setAlert({
      ...alert,
      ...{
        isOpen: true,
        buttons: [
          { ...alert.buttons[0], text: t(alert.buttons[0].text) },
          {
            ...alert.buttons[1],
            text: t(alert.buttons[1].text),
            handler: () => {
              console.log('closeButtonHandler');
              // closeButtonHandler();
            },
          },
        ],
        message: t('logout-confirm'),
        onDidDismiss: setAlert({ ...alert, isOpen: false }),
      },
    });
  };

  // if (match?.params && match.params?.id) return (<Tab3Sub id={match.params?.id} />)
  return (
    <IonPage>
      <PageHeader pageTitle={'Testpage'} />
      <PageContent>
        <AbilityTest collapsed={true} />
        <RecoilTest collapsed={true} />
        <FirebaseTest collapsed={true} />
        <EntityTest collapsed={false} />

        <BsmCollapsible label={'modals test'} collapsed={true}>
          <Flex
            className={'text-center p-3'}
            container
            justifyContent={'space-around'}
            flexDirection={'row'}
          >
            <Button
              variant="primary"
              onClick={() =>
                renderModal(
                  <modals.TestModal
                    config={{
                      centered: false,
                    }}
                  />
                )
              }
            >
              TestModal
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                renderModal(
                  <modals.DataFormModal
                   data={{ foo: 'foo', test: 'ja ja' }}
                    onFormSubmit={(formData) => {
                      console.log(formData);
                    }}
                    config={{}}
                  />
                )
              }
            >
              DataFormModal
            </Button>
            <Button variant="primary" onClick={() => renderAlert()}>
              alert test
            </Button>
          </Flex>
        </BsmCollapsible>
      </PageContent>
    </IonPage>
  );
};

export default TestPage;
