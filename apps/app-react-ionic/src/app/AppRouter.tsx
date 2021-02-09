import React, { useEffect, useState } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { Alert, Modal } from '@bsmp/react';
import { ellipse, square, triangle } from 'ionicons/icons';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import TestPage from './components/dev/TestPage';
import Users from './pages/users/Users';
import Todos from './pages/todos/Todos';
import MainMenu from './components/MainMenu';
import UserMenu from './components/UserMenu';
import { useAppService } from './hooks';
import { BsmLoadingSpinner } from '@bsmp/webcomponents-react';

const AppRouter = () => {
  const {
    appState,
    authenticated,
    ability,
    t,
  } = useAppService();

  // app auth
  if (appState.authType && appState.authType !== '' && !authenticated) {
    return (
      <IonReactRouter>
        <IonRouterOutlet id={'main-content'}>
          <Route path="/" component={LoginPage} />
          <Route path="/:path" component={LoginPage} />
        </IonRouterOutlet>
      </IonReactRouter>
    );
  }

  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet id={'main-content'}>
          <React.Suspense fallback={<BsmLoadingSpinner type={'ios'} />}>
            <Route path="/home" component={HomePage} exact={true} />
            <Route path="/about" component={AboutPage} exact={true} />
            <Route path="/account" component={AccountPage} exact={true} />
            <Route path="/account/:id" component={AccountPage} />
            <Route path="/users" component={Users} exact={true} />
            <Route path="/users/:id" component={Users} />
            <Route path="/todos" component={Todos} exact={true} />
            <Route path="/todos/:id" component={Todos} />
            {/*<Route path="/test" component={TestPage} exact={true} />*/}
            <Route path="/test/:id" component={TestPage} />
            <Route
              path="/"
              render={() => <Redirect to={'/home'} />}
              exact={true}
            />
          </React.Suspense>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={triangle} />
            <IonLabel>{t('home')}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="about" href="/about">
            <IonIcon icon={ellipse} />
            <IonLabel>{t('about')}</IonLabel>
          </IonTabButton>
          {ability.can('logout', 'all') && (
          <IonTabButton tab="users" href="/users">
            <IonIcon icon={square} />
            <IonLabel>{t('users')}</IonLabel>
          </IonTabButton>
          )}
          {ability.can('logout', 'all') && (
          <IonTabButton tab="todos" href="/todos">
            <IonIcon icon={square} />
            <IonLabel>{t('todos')}</IonLabel>
          </IonTabButton>
          )}
          {ability.can('debug', 'all') && (
            <IonTabButton tab="test" href="/test/1">
              <IonIcon icon={triangle} />
              <IonLabel>{t('test')}</IonLabel>
            </IonTabButton>
          )}
        </IonTabBar>
      </IonTabs>

      <MainMenu />
      {ability.can('logout', 'all') && <UserMenu />}

      <Modal />
      <Alert />

    </IonReactRouter>
  );
};

export default AppRouter;
