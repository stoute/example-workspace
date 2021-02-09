import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IonContent, IonList, IonItem, IonPage } from '@ionic/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import UserListItem from './UserListItem';
import PageHeader from '../../components/PageHeader';
import PageContent from '../../components/PageContent';
import { useAppService } from '../../hooks';
import { entitiesCollectionsState } from '../../recoil/atoms';
import UserItem from './UserItem';
import { usersCollection } from '../../recoil/selectors';

type props = {
  match?: any;
};

const Users = ({ match }: props) => {
  const { t, Can } = useAppService();
  const [entitiesCollections, setEntitiesCollections] = useRecoilState(
    entitiesCollectionsState
  );
  const collection = useRecoilValue(usersCollection);
  const collectionPath = 'users';

  useEffect(() => {
    if (collection) setEntitiesCollections({ ...entitiesCollections, [collectionPath]: collection });
  }, [collection]);

  if (!collection) return <></>;

  return (
    <IonPage>
      <PageHeader pageTitle={t(collectionPath)} />
      <PageContent>

        <UserItem id={match.params.id} collectionPath={collectionPath}  />

        {!match.params.id && (
          <IonList>
            {collection.map((item,index) => {
            // {entitiesCollections[collectionPath].map((item,index) => {
              return (
                <NavLink
                  to={'/'+collectionPath+'/' + item.id}
                  key={index}
                >
                  <IonItem>
                    <UserListItem id={item.id} data={item} />
                  </IonItem>
                </NavLink>
              );
            })}
          </IonList>
        )}
      </PageContent>
    </IonPage>
  );
};

export default Users;
