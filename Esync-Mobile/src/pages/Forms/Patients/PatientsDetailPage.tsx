import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonLoading,
  IonAlert,
} from "@ionic/react";
import React from "react";
import { useHistory, useParams } from "react-router";
import { useAuth } from "../../../hooks/auth";
import { useGetPatient } from "../../../hooks/patients-data";
import "./Page.css";
import PatientsDetail from "./PatientsDetail";

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { authInfo } = useAuth();
  const history = useHistory();

  /* hook for retrieving the patient when form is presented */
  const { status, data: patientData, error } = useGetPatient(id, authInfo);
  const handleViewReports = (patientId: string) => {
    history.push(`/list-individual-progress-notes/${patientId}`);
  };

  const handleCreateReport = (patientId: string) => {
    history.push(`/create-progress-note/${patientId}`);
  };

const handleCreateNewReport = (patientId: string) => {
  history.push(`/demo-data/${patientId}`);

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
}
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="home" />
          </IonButtons>
          <IonTitle>Individual Details</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <PatientsDetail
          patientData={patientData}
          onViewReports={handleViewReports}
          onCreateReport={handleCreateReport}
          onCreateNewReport={handleCreateNewReport}
        />
      </IonContent>
    </IonPage>
  );
};

export default React.memo(PatientDetailPage);
