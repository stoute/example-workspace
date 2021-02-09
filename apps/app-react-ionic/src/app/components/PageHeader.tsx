import React, { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { personCircleOutline,americanFootball, basketball, beer, bluetooth, boat, build, flask, football, paperPlane, wifi, documents } from "ionicons/icons";
import {IconButton, Icon} from '@bsmp/react';

type props = {
  pageTitle?: string;
  icon?: string;
};

const PageHeader = ({ pageTitle, icon }: props) => {
  const [state, setState] = useState({});

  useEffect(() => {
    // return () => { };
  }, []);

  const onUserbuttonClick = (id) => {
//       console.log(id);
  }

  return (
    <IonHeader translucent>
      <IonToolbar>
        <IonButtons slot={'start'}>
          <IonBackButton />
          <IonButtons slot={'end'} onClick={() => {
            onUserbuttonClick('mainn')
          }}>
            <IonMenuButton menu={'mainMenu'} />
          </IonButtons>
        </IonButtons>
        {pageTitle && <IonTitle>{pageTitle}</IonTitle>}
        <IonButtons slot={'end'} onClick={() => {
          onUserbuttonClick('user')
        }}>
          {/*<IonMenuButton menu={'userMenu'}  />*/}
          <IonMenuButton menu={'userMenu'}  >
            <IonIcon icon={personCircleOutline} size={'large'} color={'primary'} />
          </IonMenuButton>

        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default PageHeader;
