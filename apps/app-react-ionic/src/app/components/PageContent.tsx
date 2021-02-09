import React, { useEffect, useState } from 'react';
import { IonContent } from '@ionic/react';
import { Fade } from 'react-animation-components';
import { BsmLoadingSpinner } from '@bsmp/webcomponents-react';
// import { IonContent } from '@bsmp/react';

type props = {
  children?:  any,
  fadeDuration?:  number,
  fadeDelay?:  number,
}

export const PageContent = ({ children, fadeDuration, fadeDelay }: props) => {
  const [state, setState] = useState({});

  return (
    <React.Suspense fallback={<BsmLoadingSpinner type={'ios'} />}>
      <IonContent fullscreen>
        <Fade in out delay={fadeDelay || 0} duration={fadeDuration || 400}>
          {children}
        </Fade>
      </IonContent>
    </React.Suspense>
  );
};

export default PageContent;
