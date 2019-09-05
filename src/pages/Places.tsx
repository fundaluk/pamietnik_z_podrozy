import * as React from 'react';
import { useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { useCollection } from 'react-firebase-hooks/firestore';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonLabel,
  IonCardContent,
  IonList,
  IonItem,
  IonButton,
} from '@ionic/react';

import FirebaseContext from '../components/FirebaseContext';
import UserContext from '../components/UserContext';

import noPhoto from '../images/no-photo-available.png';

type PlaceItemProps = {
  id: string;
  place: Record<string, any>;
  history: Record<string, any>;
};

const PlaceItem: React.FunctionComponent<PlaceItemProps> = props => {
  const { place, id, history } = props;

  const editPlace = async (event: Event) => {
    if (!event.currentTarget) {
      return;
    }
    event.preventDefault();
    history.push(`/places/${id}/edit`);
  };

  return (
    <IonCard>
      <IonCardHeader color="primary">
        <IonLabel>{place.name}</IonLabel>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          <img src={noPhoto}></img>
          <IonItem>
            <IonLabel>{place.description}</IonLabel>
          </IonItem>
          <IonButton expand="block" color="primary" onClick={() => console.log(id)}>
            Dodaj Zdjęcie
          </IonButton>
          <IonButton expand="block" color="primary" onClick={editPlace}>
            Edytuj
          </IonButton>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

const Places: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  // Pobierz wsztstkie mejsca dla jeednego usera
  const [places, loading, error] = useCollection(firebase.db.collection('places').where('user', '==', user.uid), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Moje Miejsca</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid style={{ padding: '0px' }}>
          <IonRow align-items-center justify-content-center>
            {places &&
              places.docs.map(doc => (
                <IonCol size="12" key={doc.id}>
                  <PlaceItem id={doc.id} place={doc.data()} history={history} />
                </IonCol>
              ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default Places;
