import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useAuth } from '../../hooks/auth';
import './Page.css';

const SettingsPage: React.FC = () => {


  // const { name } = useParams<{ name: string; }>();
  const { user } = useAuth();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonTitle></IonTitle>
        <IonCard>
          <IonItem>
          <IonGrid>
             <IonRow>
              <IonCol size="4">
                {user?.img?.data ? (
                  <IonImg
                    src={`data:image/${user.img.contentType
                      };base64,${Buffer.from(user?.img?.data).toString(
                        "base64"
                      )}`}
                  />
                ) : (
                  <IonImg src={"assets/no_image_available.jpeg"}></IonImg>
                )}
              </IonCol>
              <IonCol>
            <IonLabel>
              <IonLabel>Name: {user.first + " " + user.last} </IonLabel>
              <IonLabel>Job Title: {user.jobTitle}</IonLabel>
              <IonLabel>Email: {user.email} </IonLabel>
              <IonLabel>Phone: {user.phone} </IonLabel>
              <IonLabel>ID: {user._id} </IonLabel>
            </IonLabel>
            </IonCol>
            </IonRow>
            <IonRow>
             <IonCol>
            <div className="ion-float-end">
            {!(user?.role === 'DSP' || user?.role === "Auditors") ? 
              <IonButton routerLink={`/edit-profile/${user._id}`}>
                EDIT
              </IonButton> : null }
            </div>
            </IonCol>
           </IonRow>
          </IonGrid>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(SettingsPage);
