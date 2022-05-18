import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='toolbar-header'>
          <IonTitle className='tile-header' color='light'>Demo Learn React and Ionic</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
        </IonHeader>
        <ExploreContainer name="Khương Huy Hiếu" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
