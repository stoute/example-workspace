import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { HttpService, Util } from '@bsmp/core';
import { useTranslation } from 'react-i18next';
// import { useAbilityContext  } from '@bsmp/react'; // fixme
import { authenticatedState, authDataState, modalState, alertState } from '@bsmp/react';
import i18n from '../../i18n';
import { useAbilityContext } from './use-ability-context';
import { appService } from '../providers/app-service';
import { useRecoilState, useRecoilValue } from 'recoil';
import { globalState } from '../recoil/selectors';

export const AppServiceContext = React.createContext(appService);

export const useAppService = () => {
  const appService = useContext(AppServiceContext);
  const [appState, setAppState] = useRecoilState(globalState);
  const [authenticated, setAuthenticated] = useRecoilState(authenticatedState);
  const [authData, setAuthData] = useRecoilState(authDataState);
  const [alert, setAlert] = useRecoilState(alertState);
  const [modal, setModal] = useRecoilState(modalState);
  const { t } = useTranslation();
  const { ability, AbilityContext, Can } = useAbilityContext(
    appState.roles
  );

  // useEffect(() => {
  //   console.log('');
  //   console.log('appService.config',appService.config.get());
  //   console.log('appState.config',appState.config);
  //   console.log('appState',appState);
  //   console.log('');
  // },[appState])

  const initAppState = async () => {
    const initialState = {...appState}
    setAppState({ ...initialState, ...appService.state });

    const {authData, userData} = await appService.getLocalAuthData();
    if (authData) {
      //  todo: decode credentials with atob on autologin
      //  setAuthData(JSON.stringify(authData))
      if(window?.btoa) setAuthData(window.btoa(JSON.stringify(authData)))
      //
      ability.update(appState.roles.AUTHENTICATED);
      if (appState.production === false && appState.config?.dev) ability.update(appState.roles.DEVELOPER);
      setAppState({ ...appState, ...{ user: userData} });
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    if(userData) {
      setAppState({...appState, user: userData})
    }
    console.log(appService.state.roles);
    console.log(appState.roles);
    console.log(ability.rules);
  };

  const renderModal = (contentComponent) => {
    setModal({
      ...modal,
      show: true,
      content: contentComponent,
    });
  };

  return {
    // recoil
    appState,
    setAppState,
    authenticated,
    setAuthenticated,
    modal,
    setModal,
    renderModal,
    alert,
    setAlert,
    //
    initAppState,
    appService,
    AppServiceContext,
    ability,
    AbilityContext,
    Can,
    config: appService.config,
    http: HttpService.instance,
    util: Util,
    t,
  };
};
