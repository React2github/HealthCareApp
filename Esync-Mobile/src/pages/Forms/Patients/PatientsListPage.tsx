import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
  IonAlert,
  IonLoading,
  IonImg,
  IonCol,
  IonRow,
  IonGrid,
} from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../../hooks/auth";
import { useGetAllPatients } from "../../../hooks/patients-data";
import "./Page.css";

/**
 *
 * @returns
 */
const PatientsListPage: React.FC = () => {
  const { authInfo, user } = useAuth();
  const history = useHistory();


  /* hook for retrieving the patient when form is presented */
  const { status, data: patientData, error } = useGetAllPatients(authInfo);


  // here we handle display the error message and the loading
  // screen when the page is first being opened
  if (!patientData && !error) {
    return (
      <IonLoading message={"Loading Patient Information..."} isOpen={true} />
    );
  } else if (error) {
    return (
      <IonAlert
        message={"Error Retrieving Patient Information"}
        isOpen={status === "error"}
        buttons={["OK"]}
        onDidDismiss={() => {
          history.goBack();
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
          <IonTitle>Individual's Info</IonTitle>
          <IonButtons slot="end">
          {!(user?.role === 'DSP' || user?.role === "NURSE" || user?.role === "Auditors") ?
            <IonButton routerLink={"/create-patient"}>NEW Individual</IonButton> : null }
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {patientData &&
          patientData.map((p: any) => (
            
              <IonGrid>
                <IonRow>
                <IonItem routerLink={`/individual-details/${p._id}`} key={p._id}>
                  <IonCol size="4">
                    {p?.img ? (
                      <div >
                        <IonImg
                          src={`data:image/${
                            p.img.contentType
                          };base64,${Buffer.from(p.img.data).toString(
                            "base64"
                          )}`}
                        />
                      </div>
                    ) : (
                      <div >
                        <IonImg
                          src={"assets/no_image_available.jpeg"}
                        ></IonImg>
                      </div>
                    )}
                  </IonCol>
                  <IonCol>
                    <IonLabel>
                    <IonLabel>
                        ID:
                        {p._id}
                      </IonLabel>
                      <IonLabel>
                        Individual Name: {" "}
                        {p.name}
                      </IonLabel>
                      <IonLabel>
                        Staff Name: {" "}
                        {patientData[0].staffName[0]}
                      </IonLabel>
                      <IonLabel>
                        Service: {" "}
                        {p.service}
                      </IonLabel>
                      <IonLabel>
                        Location: {" "}
                        {p.locations}
                      </IonLabel>
                    </IonLabel>
                  </IonCol>
                  </IonItem>
                </IonRow>
                <IonRow>
                <IonCol>
                  <div className="ion-float-end">
                  {!(user?.role === 'DSP' || user?.role === "Auditors") ?
                  <IonButton routerLink={`/edit-patient/${p._id}`}> 
                    Edit
                    </IonButton> : null }
                  </div>
                  </IonCol>
                  </IonRow>
              </IonGrid>
          ))}
      </IonContent>
    </IonPage>
  );
};

export default React.memo(PatientsListPage);
