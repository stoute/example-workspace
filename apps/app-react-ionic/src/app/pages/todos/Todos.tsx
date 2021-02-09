import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IonContent, IonList, IonItem, IonPage } from '@ionic/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import TodoListItem from './TodoListItem';
import PageHeader from '../../components/PageHeader';
import PageContent from '../../components/PageContent';
import { useAppService } from '../../hooks';
import { entitiesCollectionsState } from '../../recoil/atoms';
import TodoItem from './TodoItem';
import { todosCollection, tripsCollection, usersCollection } from '../../recoil/selectors';

type props = {
  match?: any;
};

const Todos = ({ match }: props) => {
  const { t, Can } = useAppService();
  const [entitiesCollections,setEntitiesCollections] = useRecoilState(
    entitiesCollectionsState
  );
  const collection = useRecoilValue(todosCollection);
  const collectionPath = 'todos';

  useEffect(() => {
    if(collection) setEntitiesCollections({ ...entitiesCollections, [collectionPath]:collection })
  }, [collection]);

  if (!collection) return <></>;

  return (
    <IonPage>
      <PageHeader pageTitle={t(collectionPath)} />
      <PageContent>

          <TodoItem id={match.params.id} collectionPath={collectionPath} />

        {!match.params.id && (
          <IonList>
            {collection.map((item,index) => {
              return (
                <NavLink to={'/' + collectionPath + '/' + item.id} key={index}>
                {/*<NavLink to={'/entities/' + collection + '/' + item.id} key={item.id}>*/}
                  <IonItem>
                      <TodoListItem id={item.id} data={item} />
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

export default Todos;
