import * as React from 'react';
import { useEffect, useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { useCollection } from 'react-firebase-hooks/firestore';

import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';

import { Marker } from 'google-maps-react';

import MapPlaces from '../components/MapPlaces';

import FirebaseContext from '../components/FirebaseContext';
import UserContext from '../components/UserContext';

const Maps: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  // Pobierz wsztstkie mejsca dla jeednego usera
  const [places, loading, error] = useCollection(firebase.db.collection('places').where('user', '==', user.uid), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (places) {
      const newPoints = places.docs.map(doc => {
        const point = { lat: 0, lng: 0 };
        point.lat = doc.data().location.latitude;
        point.lng = doc.data().location.longitude;
        return point;
      });
      setPoints(newPoints);
    }
  }, [places]);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mapa Miejsc</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid style={{ padding: '0px' }}>
          <IonRow align-items-center justify-content-center>
            <IonCol size="12" style={{ height: '100vh', padding: '0px' }}>
              {points.length > 0 ? (
                <MapPlaces points={points}>
                  {places.docs.map(doc => (
                    <Marker
                      key={doc.id}
                      position={{
                        lat: doc.data().location.latitude,
                        lng: doc.data().location.longitude,
                      }}
                    />
                  ))}
                </MapPlaces>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100vh',
                    padding: '8px 0',
                    textAlign: 'center',
                  }}
                >
                  <IonGrid fixed>
                    <IonRow align-items-end justify-content-center>
                      <IonCol align-self-center>
                        <IonText color="primary">
                          <p>Brak Miejsc</p>
                        </IonText>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </div>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default Maps;
