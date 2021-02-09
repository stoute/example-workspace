import React, { useEffect, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { Css } from '@bsmp/core';
import { Flex, IconButton, LanguageChooser, Spacer } from '@bsmp/react';
import { Fade } from 'react-animation-components';
import i18n from '../../i18n';
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent';
import { useActions, useAppService } from '../hooks';

type props = {
  match: any;
};

const AccountPage = ({ match }: props) => {
  const {
    setAuthenticated,
    appState,
    appService,
    ability,
    Can,
    t,
  } = useAppService();
  const { logout } = useActions();
  const [user, setUser] = useState(appState.user);

  return (
    <IonPage>
      <PageHeader pageTitle={t('account')} />
      <PageContent>
          {match?.params?.id === 'account' && (
            <div className={'container text-center pl-5 pr-5'}>
              {/*<Can do={'login'} on={'all'}>*/}
              <Spacer height={20} />
              <h4>{t('account').toLowerCase()}</h4>
              <IconButton
                name={'person-circle-outline'}
                padding={10}
                margin={20}
                size={'60px'}
                backgroundColor={Css.getVar('ion-color-dark-shade')}
              />
              <b>{t('logged-in-as')}</b>
              <div>{user.email}</div>
              {/*<Flex className={'text-center'} flexDirection={'column'} width={'240px'} height={'200px'} alignItems={'center'} container >*/}
              <div >
                <Spacer height={20} display={'block'} />
                <LanguageChooser
                  i18n={i18n}
                  languages={appState.config.languages}
                />
                <Spacer height={20} display={'block'} />
                <Can do={'logout'} on={'all'}>
                  <button
                    className={'btn btn-primary'}
                    onClick={async () => {
                      await logout();
                    }}
                  >
                    {t('logout')}
                  </button>
                </Can>
              </div>
              {/*</Flex>*/}

            </div>
          )}
      </PageContent>
    </IonPage>
  );
};

export default AccountPage;
