/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';

import React, {useEffect} from 'react';
import { IonApp } from '@ionic/react';
import { BsmLoadingSpinner } from '@bsmp/webcomponents-react/dist/index';
import { useObserve } from '@bsmp/react';
import { useAppService } from './hooks';
import AppRouter from './AppRouter';

const App: React.FC = () => {
  const { appService, initAppState, AppServiceContext, ability, AbilityContext } = useAppService();
  const initialized: boolean = useObserve(appService.state$, 'initialized') as boolean;

  useEffect(() => {
    if (initialized === true) {
      initAppState();
    }
  },[initialized])

  if (!initialized) {
    return <BsmLoadingSpinner />;
  }

  return (
      <AppServiceContext.Provider value={appService}>
        <AbilityContext.Provider value={ability}>
          <IonApp>
            <AppRouter />
          </IonApp>
        </AbilityContext.Provider>
      </AppServiceContext.Provider>
  );
};

export default App;
