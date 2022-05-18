/* Using with useIonActionSheet Hook */

import React, { useState } from "react";
import {
  IonActionSheet,
  IonButton,
  IonContent,
  IonPage,
  useIonActionSheet,
} from "@ionic/react";
import { trash, share, caretForwardCircle, heart, close } from 'ionicons/icons';

const Tab3: React.FC = () => {
  const [present, dismiss] = useIonActionSheet();
  const [showActionSheet, setShowActionSheet] = useState(false);

  return (
    <IonPage>
      <IonContent>
        <IonButton
          expand="block"
          onClick={() =>
            present({
              buttons: [{ text: "Ok" }, { text: "Cancel" }],
              header: "Action Sheet",
            })
          }
        >
          Show ActionSheet
        </IonButton>
        <IonButton
          expand="block"
          onClick={() =>
            present([{ text: "Ok" }, { text: "Cancel" }], "Action Sheet")
          }
        >
          Show ActionSheet using params
        </IonButton>
        <IonButton
          expand="block"
          onClick={() => {
            present([{ text: "Ok" }, { text: "Cancel" }], "Action Sheet");
            setTimeout(dismiss, 3000);
          }}
        >
          Show ActionSheet, hide after 3 seconds
        </IonButton>

        <IonButton onClick={() => setShowActionSheet(true)} expand="block">
          Show Action Sheet
        </IonButton>
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          cssClass='my-custom-class'
          buttons={[{
            text: 'Delete',
            role: 'destructive',
            icon: trash,
            id: 'delete-button',
            data: {
              type: 'delete'
            },
            handler: () => {
              console.log('Delete clicked');
            }
          }, {
            text: 'Share',
            icon: share,
            data: 10,
            handler: () => {
              console.log('Share clicked');
            }
          }, {
            text: 'Play (open modal)',
            icon: caretForwardCircle,
            data: 'Data value',
            handler: () => {
              console.log('Play clicked');
            }
          }, {
            text: 'Favorite',
            icon: heart,
            handler: () => {
              console.log('Favorite clicked');
            }
          }, {
            text: 'Cancel',
            icon: close,
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }]}
        ></IonActionSheet>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
