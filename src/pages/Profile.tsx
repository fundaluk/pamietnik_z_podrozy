import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const Profile: React.FunctionComponent = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mój Profil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent />
    </>
  );
};

export default Profile;
