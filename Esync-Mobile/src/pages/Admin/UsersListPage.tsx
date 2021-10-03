import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { alert } from "ionicons/icons";
import React from "react";
import { useAuth } from "../../hooks/auth";
import { useGetAllUsers, deleteAUser, useGetUser } from "../../hooks/users-data";

import "../../pages/Page.css"

const UsersListPage: React.FC = () => {
  const { authInfo } = useAuth();

  const { status, data: userData, error } = useGetAllUsers(authInfo);
  console.log(userData);

// Hook for deleting a user */ 
const { mutate: deleteUser } = deleteAUser();
const disableUsers = (data: any) => {
  // Get request using ID
  // Post an alert using that info 
console.log("ID:", data)
  // deleteUser({id: data, authInfo});
};

  // here we handle display the error message and the loading
  // screen when the page is first being opened
  if (!userData && !error) {
    return <IonLoading message={"Loading Users..."} isOpen={true} />;
  } else if (error) {
    return (
      <IonAlert
        header={"Error Loading Image"}
        message={error as string}
        isOpen={status === "error"}
        buttons={["OK"]}
        onDidDismiss={() => {
          // history.goBack();
        }}
      />
    );
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Users</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/create-users">NEW</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {userData &&
          userData.map((p: any) => (
            <IonCard key={p.id}>
              <IonItem>
                <IonGrid>
                  <IonRow>
                    <IonCol size="4">
                      {p?.img ? (
                          <IonImg
                            src={`data:image/${
                              p.img.contentType
                            };base64,${Buffer.from(p.img.data).toString(
                              "base64"
                            )}`}
                          />
                      ) : (
                          <IonImg
                            src={"assets/no_image_available.jpeg"}
                          ></IonImg>
                      )}
                    </IonCol>
                    <IonCol>
                      <IonLabel>
                        <>
                          <IonLabel>
                            Name: {p.first} {p.last}
                          </IonLabel>
                          <IonLabel>Email: {p.email}</IonLabel>
                          <IonLabel>Username: {p.username} </IonLabel>
                          <IonLabel>Role: {p?.role} </IonLabel>
                          <br></br>
                        </>
                      </IonLabel>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                  <IonCol>
                    <div className="ion-float-end">
                      <IonButton routerLink={`/edit-users/${p._id}`}>
                        EDIT
                      </IonButton>
                      <IonButton
                        onClick={() => disableUsers(p._id)}
                        color="danger"
                      >
                        DISABLE
                      </IonButton>
                    </div>
                  </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
            </IonCard>
          ))}
      </IonContent>
    </IonPage>
  );
};

export default React.memo(UsersListPage);
