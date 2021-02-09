import React from 'react';
import {
  IonPage,
} from '@ionic/react';
import { Fade } from 'react-animation-components';
import { Home, About } from '../../assets/sketch';
import './HomePage.scss';
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent';
import { Flex } from '@bsmp/react';
import { useAppService } from '../hooks';

const HomePage: React.FC = () => {

  const { t } = useAppService();
  return (
    <IonPage>
      <PageHeader pageTitle={''} />
      <PageContent fadeDuration={1000}>
          <div className="container-center ">
            <h5>{t('app.name')} </h5>
            <Home></Home>
            <h5>{t('app.description')} </h5>
          </div>
      </PageContent>
    </IonPage>
  );
};

export default HomePage;
