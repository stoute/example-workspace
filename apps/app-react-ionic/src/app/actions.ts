import { FirebaseService } from '@bsmp/api';
import { Storage, Util, HttpService } from '@bsmp/core';

const firebaseService = FirebaseService.instance;
const db = firebaseService.firestore;

export const login = async (formData: any, authType = 'firebase:email/password') => {
  let response: any;
  if (authType === 'firebase:email/password') {
    response = await firebaseService.login(
      formData.email,
      formData.password
    );
    // login error
    if (response && response.code) {
      return response;
    }
  }
  return response;
};

export const logout = async (authType = 'firebase:email/password') => {
  if (authType === 'firebase:email/password') {
    await firebaseService.logout();
  }
};

export const entityGet = async (collectionPath: string, id = undefined, options = {}) => {

  if (!id) return;
  //if (!id) return await collectionGet(collectionPath)

  let entity: any;
  //console.log(collectionPath,id)
  const collectionRef = firebaseService.firestore.collection(collectionPath);
  const query = collectionRef.where("id", "==", Util.castToType(id));
  const querySnapshot = await query.get().catch((error) => {
    console.log("Error getting documents: ", error);
  });
  querySnapshot.forEach((doc) => {
    //console.log(doc.id, " => ", doc.data().id);
    entity = doc.data()
  });
  //console.log('actions',entity)
  if (entity) return entity;
  return;
};

export const entityUpdate = async (entityState: any, path: string, options = {}) => {
  console.log('update; '+path, entityState);
  let documentRef;
  const querySnapshot = await firebaseService.firestore
    .collection(path)
    .where('id', '==', Util.castToType(entityState.id))
    .get()
    .catch((error) => {
      console.warn('Error getting documents: ', error);
    });
  querySnapshot.forEach((doc) => {
    documentRef = doc;
  });
  const collectionRef = firebaseService.firestore
    .collection(path)
    .doc(documentRef?.id && entityState.id);
  await collectionRef
    .set(entityState, { merge: true })
    .catch((error) => {
      console.warn('Error updating document: ', error);
    });
  return entityState

};

export const collectionGet = async (collectionPath: string, options = {}) => {
  const collection = await firebaseService.getCollection(collectionPath);
  return collection;
};
