import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Route } from 'react-router-dom';
import { IonApp, IonPage, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter, ViewManager } from '@ionic/react-router';

import FirebaseContext from './components/FirebaseContext';
import UserContext from './components/UserContext';

import GoogleSignupPage from './pages/GoogleSignup';
import LandingPage from './pages/Landing';
import LoadingPage from './pages/Loading';
import LoginPage from './pages/Login';
import SingupPage from './pages/Singup';

import Add from './pages/Add';
import Maps from './pages/Maps';
import Places from './pages/Places';
import Profile from './pages/Profile';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { flash } from 'ionicons/icons';

const App = () => {
  const firebase = useContext(FirebaseContext);
  const [user, initialising, error] = useAuthState(firebase.auth);
  console.log(user);
  if (initialising) {
    return <LoadingPage />;
  }

  return (
    <UserContext.Provider value={{ user, initialising, error }}>
      <IonApp>
        <IonReactRouter>
          <IonPage id="main">
            {user ? (
              <IonTabs>
                <IonRouterOutlet>
                  <Route path="/:tab(add)" component={Add} exact={true} />
                  <Route path="/:tab(maps)" component={Maps} exact={true} />
                  <Route path="/:tab(places)" component={Places} exact={true} />
                  <Route path="/:tab(profile)" component={Profile} exact={true} />
                  <Route render={() => <h1>Hi</h1>} />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                  <IonTabButton tab="places" href="/places">
                    <IonIcon icon={flash} />
                    <IonLabel>Miejsca</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="maps" href="/maps">
                    <IonIcon icon={flash} />
                    <IonLabel>Mapa</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="add" href="/add">
                    <IonIcon icon={flash} />
                    <IonLabel>Dodaj</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="profile" href="/profile">
                    <IonIcon icon={flash} />
                    <IonLabel>Pofil</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            ) : (
              <ViewManager>
                <IonRouterOutlet>
                  <Route path="/login" component={LoginPage} exact={true} />
                  <Route path="/signup" component={SingupPage} exact={true} />
                  <Route path="/signup-google" component={GoogleSignupPage} exact={true} />
                  <Route exact path="/" component={LandingPage} />
                </IonRouterOutlet>
              </ViewManager>
            )}
          </IonPage>
        </IonReactRouter>
      </IonApp>
    </UserContext.Provider>
  );
};

export default App;
