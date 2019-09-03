import React from 'react';
import { IonContent, IonApp, IonPage, IonGrid, IonRow, IonCol, IonSpinner } from '@ionic/react';

const Loading: React.FunctionComponent = () => {
  return (
    <IonApp>
      <IonPage>
        <IonContent fullscreen>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100vh',
              padding: '8px 0',
            }}
          >
            <IonGrid fixed>
              <IonRow align-items-end justify-content-center>
                <IonCol align-self-center>
                  <IonSpinner
                    color="primary"
                    style={{ display: 'block', margin: '0 auto', width: '64px', height: '64px' }}
                    name="crescent"
                  />
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Loading;
