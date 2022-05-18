import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet } from '@ionic/react';
import { camera, trash, close } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { usePhotoGallery, UserPhoto } from '../hooks/usePhotoGallery';
import { useState } from 'react';

const Tab2: React.FC = () => {
  const { takePhoto } = usePhotoGallery();
  const [photos, setPhotos] = useState<UserPhoto[]>([]);
  const fileName = new Date().getTime() + '.jpeg';
  const newPhotos = [
    {
      filepath: fileName,
      webviewPath: photo.webPath,
    },
    ...photos,
  ];
  setPhotos(newPhotos);
  const { photos, tankPhoto } = usePhotoGallery();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonContent>
          <IonFab vertical='bottom' horizontal='center' slot='fixed'>
            <IonFabButton onClick={() => takePhoto()}>
              <IonIcon icon={camera}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
