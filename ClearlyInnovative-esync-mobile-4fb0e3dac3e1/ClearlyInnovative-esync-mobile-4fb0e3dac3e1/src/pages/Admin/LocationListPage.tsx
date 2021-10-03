import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonLoading,
  IonAlert,
} from "@ionic/react";
import React from "react";
import { useAuth } from "../../hooks/auth";
import { useDeleteLocation, useGetAllLocations } from "../../hooks/locations";
import "./AdminPages.css";
import { alertController } from "@ionic/core";
import { useHistory } from "react-router";

export interface LocationListPageProps {}

const LocationListPage: React.FC<LocationListPageProps> = () => {
  const { authInfo } = useAuth();
  const history = useHistory();

  /* Hook for getting all locations */
  const { status, data: allLocations, error } = useGetAllLocations(authInfo);

  /* Hook for getting deleting a location */
  const {
    mutateAsync: deleteLocation,
    status: pgNoteStatus,
    error: pgNoteError,
  } = useDeleteLocation();

  /**
   *
   * @param locationId
   */
  const handleDelete = async (locationId: string) => {
    try {
      await deleteLocation({
        locationId,
        authInfo,
      });
    } catch (e) {
      console.log(e);
    }
  };

  if (status === "loading") {
    return <IonLoading isOpen={true} />;
  }

   async function showAlert(locationId: string) { 
    const alert = alertController.create({
      header: "Confirmation",
      message: "Do you really want to remove this?",
      buttons: [{
        text: "Yes",
        handler: () => 
        handleDelete(locationId)
      }, 
    "cancel"]
    
    });
        (await alert).present();
    }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Location List</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/create-location">NEW</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

      <IonAlert
        header="Delete Location"
        message={
          pgNoteStatus === "error"
            ? "Error: " + (pgNoteError as any).message
            : "Location deleted Successfully"
        }
        isOpen={pgNoteStatus === "success" || pgNoteStatus === "error"}
        buttons={["OK"]}
      />
        {/* <!-- display errors --> */}
        {/* {error || delError ? (
          <IonAlert
            header={"Error Processing Location"}
            message={(error || delError) as string}
            isOpen={true}
            buttons={["OK"]}
            // onDidDismiss={() => {}}
          />
        ) : null} */}
     
        {allLocations &&
          allLocations?.map((p: any) => (
            <IonItem key={p._id} >
              <IonGrid>
                <IonRow>
                  <IonCol>
                    {/* <IonLabel>id: {p._id}</IonLabel> */}
                    <IonLabel className="ion-text-wrap">
                      <h2>{p.name}</h2>
                    </IonLabel>
                    <IonLabel className="ion-text-wrap">
                      {p.description}
                    </IonLabel>
                    <IonLabel className="ion-text-wrap">
                      {p.street_address_1} {p.street_address_2 ? p.street_address_2 + ", " : ", " } {p.city} {" "}
                      {p.state} {p.zip}
                      {console.log(p)}
                    </IonLabel>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <div className="ion-float-end">
                      <IonButton routerLink={`/edit-location/${p._id}`}>
                        EDIT
                      </IonButton>
                      <IonButton
                        onClick={() => showAlert(p._id)}
                        color="danger"
                      >
                        DELETE
                      </IonButton>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          ))}
      </IonContent>
    </IonPage>
  );
};

export default React.memo(LocationListPage);
