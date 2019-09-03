import * as React from 'react';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { IonContent, IonGrid, IonCol, IonRow, IonText, IonButton, IonItem, IonLabel, IonInput } from '@ionic/react';

const Login: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  let user;

  const [email, setEmail] = useState<string | null>('');
  const [password, setPassowrd] = useState<string | null>('');
  const [valid, setValid] = useState<boolean>(false);
  const [error, setError] = useState<string | null>('');

  // Funckja odpowiedzialna za zalogowanie użytkownia z Google
  const handleLogin = async (event: Event) => {
    event.preventDefault();
    console.log('LOGOWANIE EMAIL');
  };

  // Sprawdź za każdym razem jak się zmieni email i passowrd  czy formularz jest poprawny
  useEffect(() => {
    if (email !== '' && password !== '') {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [email, password]);

  // Sprawdź czy użytkownik jest zalogowany, jak tak to przekieruj do głównego widoku aplikacji
  if (user) {
    console.log('Użytkownik zalogowany');
    return <h1>ZALOGOWANY</h1>;
  }

  // Wyświetl formularz logowania jeżeli użytkownik nie jest zalogowany
  return (
    <IonContent>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100vh',
          padding: '8px 0',
        }}
      >
        <IonGrid fixed>
          <IonRow justify-content-center>
            <IonCol style={{ textAlign: 'center', marginBottom: '14px' }} size="12">
              <h1>Zaloguj się</h1>
              {error && (
                <IonText color="danger">
                  <p>{error}</p>
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow justify-content-center>
            <IonCol offset="1" size="10">
              <IonItem>
                <IonLabel position="floating" color="primary">
                  Adres email
                </IonLabel>
                <IonInput
                  required
                  placeholder="Podaj swój email"
                  type="email"
                  name="email"
                  value={email}
                  onIonChange={e => setEmail((e.currentTarget as HTMLInputElement).value)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow justify-content-center>
            <IonCol offset="1" size="10">
              <IonItem>
                <IonLabel position="floating" color="primary">
                  Hasło
                </IonLabel>
                <IonInput
                  required
                  placeholder="Podaj hasło"
                  type="password"
                  name="password"
                  value={password}
                  onIonChange={e => setPassowrd((e.currentTarget as HTMLInputElement).value)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow justify-content-center>
            <IonCol style={{ marginTop: '32px' }} offset="1" size="10">
              <IonButton expand="block" color="primary" type="submit" disabled={!valid} onClick={handleLogin}>
                Zaloguj się
              </IonButton>
            </IonCol>
            <IonCol offset="1" size="10">
              <IonButton expand="block" fill="clear" onClick={() => history.push('/')}>
                Powrót
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </IonContent>
  );
};

export default Login;
