import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
// import { apps, flash, send } from 'ionicons/icons';
// import Add from './pages/Add';
// import Maps from './pages/Maps';
// import Places from './pages/Places';
// import Profile from './pages/Profile';

import LandingPage from './pages/Landing';
import SingupPage from './pages/Singup';
import GoogleSignupPage from './pages/GoogleSignup';

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

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonPage id="main">
        <IonRouterOutlet>
          <Route path="/signup" component={SingupPage} />
          <Route path="/signup-google" component={GoogleSignupPage} />
          <Route exact path="/" component={LandingPage} />
        </IonRouterOutlet>
        {/* <IonTabs>
          <IonRouterOutlet>
            <Route path="/:tab(add)" component={Add} exact={true} />
            <Route path="/:tab(maps)" component={Maps} exact={true} />
            <Route path="/:tab(places)" component={Places} exact={true} />
            <Route path="/:tab(profile)" component={Profile} exact={true} />
            <Route exact path="/" render={() => <Redirect to="/places" />} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="places" href="/places">
              <IonIcon icon={flash} />
              <IonLabel>Miejsca</IonLabel>
            </IonTabButton>
            <IonTabButton tab="maps" href="/maps">
              <IonIcon icon={apps} />
              <IonLabel>Mapa</IonLabel>
            </IonTabButton>
            <IonTabButton tab="add" href="/add">
              <IonIcon icon={send} />
              <IonLabel>Dodaj</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/profile">
              <IonIcon icon={send} />
              <IonLabel>Pofil</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs> */}
      </IonPage>
    </IonReactRouter>
  </IonApp>
);

export default App;
