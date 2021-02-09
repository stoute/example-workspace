import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Card } from 'react-bootstrap';
import { Css } from '@bsmp/core';
import { authenticatedState, Spacer, LoginForm, IconButton } from '@bsmp/react';
import { Fade } from 'react-animation-components';
import { AccessDenied } from '../../assets/sketch';
import UserListItem from './users/UserListItem';
import './HomePage.scss';
import PageHeader from '../components/PageHeader';
import { useAppService, useActions } from '../hooks';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Redirect } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { appService,appState,setAppState, t, Can } = useAppService();
  const [authenticated, setAuthenticated] = useRecoilState(authenticatedState);
  const [submitError, setSubmitError] = useState();
  const {login} = useActions();

  const onLoginFormSubmit = async (formData: any) => {
    const response = await login(formData);
    //console.log(response);
    if (response && response.code) {
      setSubmitError(t('auth:' + response.code));
      return;
    }
  };

  useEffect(() => {
    //console.log(submitError);
  }, [submitError]);

  if (authenticated) return <Redirect to="/home" />;

  return (
    <IonPage>
      {/*<PageHeader pageTitle={''} />*/}
      <IonContent fullscreen>
        <Fade in className={'text-center'}>
          <div className={'container login-form pl-5 pr-5'}>
            <Spacer height={60} />
            {/*<Can do={'login'} on={'all'}>*/}
              <Spacer height={15} />
              <h4>{t('app.name')}</h4>
              <IconButton
                name={'person-circle-outline'}
                padding={10}
                margin={10}
                size={'70px'}
                // backgroundColor={Css.getVar('ion-color-step-800')}
              />
              {/*<Spacer height={10} />*/}
              <LoginForm
                formSubmit={onLoginFormSubmit}
                errorMessage={submitError}
                // language={appService.state.language}
                loginType={'email-password'}
              />
            {/*</Can>*/}
          </div>
          {/*// fixme:*/}
          {/*<Can not do={'read'} on={'all'}>*/}
          {/*    <div className="container-center ">*/}
          {/*      <AccessDenied></AccessDenied>*/}
          {/*      <Spacer height={10} />*/}
          {/*      <div>{t('access-denied').toUpperCase()}</div>*/}
          {/*    </div>*/}
          {/*</Can>*/}
        </Fade>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
