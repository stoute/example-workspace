import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Storage } from '@bsmp/core';
import { alertState, authenticatedState } from '@bsmp/react';
import * as actions from '../actions';
import { useAppService } from './use-app-service';

export const useActions = (roles: any = null) => {
  const {
    ability,
    appService,
    appState,
    setAppState,
    t,
    Can,
  } = useAppService();
  const [authenticated, setAuthenticated] = useRecoilState(authenticatedState);
  const [alert, setAlert] = useRecoilState(alertState);

  const login = async (formData) => {
    const response = await actions.login(formData, appState.authType);
    if (response && response.code) {
      return response;
    }
    const userParsed = JSON.parse(JSON.stringify(response.user));
    Storage.setObject('auth:' + appService.config.get('appId'), formData, true);
    Storage.setObject('user:' + appService.config.get('appId'), userParsed, true);
    ability.update(appState.roles.AUTHENTICATED);
    if (appState.production === false && appState.config.dev) ability.update(appState.roles.DEVELOPER);
    setAppState({ ...appState, ...{ user: userParsed} });
    setAuthenticated(true);
    console.log(appService.state);
    console.log(appState);
    return response;
  };

  const logout = async () => {
    console.log('logout.user', appState.user);
    setAlert({
      ...alert,
      ...{
        isOpen: true,
        message: t('logout-confirm'),
        buttons: [
          { ...alert.buttons[0], text: t(alert.buttons[0].text) },
          {
            ...alert.buttons[1],
            text: t(alert.buttons[1].text),
            handler: async () => {
              await actions.logout();
              setAppState({ ...appState, ...{ user: undefined } });
              ability.update(appState.roles.ANONYMOUS);
              Storage.removeItem('auth:' + appService.config.get('appId'));
              Storage.removeItem('user:' + appService.config.get('appId'));
              if (location) location.href = '/';
              setAuthenticated(false);
            },
          },
        ],
        onDidDismiss: setAlert({ ...alert, isOpen: false }),
      },
    });
  };

  return {
    actions,
    login,
    logout,
  };
};
