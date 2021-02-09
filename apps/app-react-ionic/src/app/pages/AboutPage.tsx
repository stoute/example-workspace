import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { About as AboutImg} from '../../assets/sketch';
import PageHeader from "../components/PageHeader";
import PageContent from '../components/PageContent';

const AboutPage: React.FC = () => {
  return (
    <IonPage>
      <PageHeader pageTitle={'about'} />
      <PageContent>
        {/*<IonHeader collapse="condense">*/}
        {/*  <IonToolbar>*/}
        {/*    <IonTitle size="large">Tab 2</IonTitle>*/}
        {/*  </IonToolbar>*/}
        {/*</IonHeader>*/}
        <div className="container-center ">
          <AboutImg />
        </div>
      </PageContent>
    </IonPage>
  );
};

export default AboutPage;
