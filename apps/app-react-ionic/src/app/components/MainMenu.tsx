import React, { useEffect, useState } from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { closeOutline, closeCircle, reorderThreeOutline } from 'ionicons/icons';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MainMenu = (props) => {
  const { t } = useTranslation();
  const menuId = 'mainMenu';

  return (
    <IonMenu
      side={'start'}
      type={'overlay'}
      contentId={'main-content'}
      menuId={menuId}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonMenuToggle menu={menuId}>
              <IonIcon icon={closeCircle} size={'large'} color={'primary'} />
            </IonMenuToggle>
          </IonButtons>
          <IonTitle>{''}</IonTitle>
          <IonIcon icon={reorderThreeOutline} slot={'end'} size={'large'} />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <NavLink to={'/settings'}>
            <IonMenuToggle menu={menuId}>
              <IonItem>{t('settings')}</IonItem>
            </IonMenuToggle>
          </NavLink>
          <NavLink to={'/contact'}>
            <IonMenuToggle menu={menuId}>
              <IonItem>{t('contact')}</IonItem>
            </IonMenuToggle>
          </NavLink>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default MainMenu;
