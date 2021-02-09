import React from 'react';
import {
  IonButton,
  IonMenu,
  IonMenuToggle,
  IonHeader,
  IonContent,
  IonList,
  IonItem,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButtons,
} from '@ionic/react';
import { closeCircle, personCircleOutline } from 'ionicons/icons';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { alertState, authenticatedState } from '@bsmp/react';
import { useActions } from '../hooks';

const UserMenu = (props) => {
  const { t } = useTranslation();
  const {logout} = useActions();

  const menuId = 'userMenu';

  const doLogout = async () => {
    await logout();
  };

  return (
    <IonMenu
      side={'end'}
      type={'overlay'}
      contentId={'main-content'}
      menuId={menuId}
    >
      <IonHeader>
        <IonToolbar>
          <IonIcon icon={personCircleOutline} size={'large'} />
          <IonButtons slot={'end'}>
            <IonMenuToggle menu={menuId}>
              <IonIcon icon={closeCircle} size={'large'} color={'primary'} />
            </IonMenuToggle>
          </IonButtons>
          <IonTitle>{''}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <NavLink to={'/account/account'}>
            <IonMenuToggle menu={menuId}>
              <IonItem>{t('account')}</IonItem>
            </IonMenuToggle>
          </NavLink>
          <a onClick={() => doLogout()}>
            <IonMenuToggle menu={menuId}>
              <IonItem>{t('logout')}</IonItem>
            </IonMenuToggle>
          </a>
          {/*<NavLink to={'/account/logout'}>*/}
          {/*  <IonMenuToggle menu={menuId}>*/}
          {/*    <IonItem>{t('logout')}</IonItem>*/}
          {/*  </IonMenuToggle>*/}
          {/*</NavLink>*/}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default UserMenu;
