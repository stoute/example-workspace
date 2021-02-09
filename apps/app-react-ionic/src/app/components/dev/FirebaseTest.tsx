import React, { useEffect, useState } from 'react';
import { useAppService } from '../../hooks';
import { FirebaseService } from '@bsmp/api';
import { DataViewer, Flex } from '@bsmp/react';
import { Util } from '@bsmp/core';
import { BsmCollapsible } from '@bsmp/webcomponents-react';
import { useRecoilState } from 'recoil';
import { entitiesCollectionsState } from '../../recoil/atoms';
import { entitiesState } from '../../recoil/selectors';

const firebaseService = FirebaseService.instance

type props = {
  collapsed: boolean
}

const FirebaseTest = ({ collapsed }: props) => {
  const { appService, t , Can} = useAppService();
  const [entitiesCollections, setEntitiesCollections] = useRecoilState(
    entitiesCollectionsState
  );
  const [entities, setEntities] = useRecoilState(entitiesState);

  // rest api
  // https://firestore.googleapis.com/v1/projects/bsmp-workspace/databases/(default)/documents/trips

  const getCollection = (id) => {
    // firebaseService.getCollection(id).then((documents) => {
    firebaseService.getCollection(id).then((documents) => {
      console.log(documents);
      documents.map((doc) => {
        //appService.setStateItem('entities',{...appService.state.entities,...{[doc.id]: doc}})
      })
      // appService.setStateItem('entityCollections',{...appService.state.entityCollections,...{[id]: documents}})
    })
  }

  const addDocuments = async (type, data) => {
    data.forEach( async (item) => {
      await firebaseService.addDocument(type, item)
    })
  }

  return (
    <BsmCollapsible collapsed={collapsed} label={'FirebaseTest'}>
      <Flex container justifyContent="space-around" flexDirection={'row'} padding={'15px'}>
        <button
          className={'btn btn-primary'}
          onClick={() => {
            getCollection('users')
          }}
        >
          get user cllection
        </button>
        <button
          className={'btn btn-primary'}
          onClick={() => {
            getCollection('trips')
          }}
        >
          get trips colection
        </button>
        <button
          className={'btn btn-primary'}
          onClick={() => {
            getCollection('non-existent')
          }}
        >
          get non-existent collection
        </button>
        {/*<button*/}
        {/*  className={'btn btn-primary'}*/}
        {/*  onClick={() => {*/}
        {/*    addDocuments('test',entitiesCollections.users)*/}
        {/*  }}*/}
        {/*>*/}
        {/*  add test collection*/}
        {/*</button>*/}
      </Flex>
      <Flex className={'text-center'} container justifyContent={'space-around'} flexDirection={'row'} >

      </Flex>
      <DataViewer label={'entityCollections'} collapsed={true} data={entitiesCollections} />
      <DataViewer label={'entities'} collapsed={true} data={entities} />
      {/*<DataViewer label={'ability'} collapsed={false} data={state} />*/}
    </BsmCollapsible>
  );
};

export default FirebaseTest;
