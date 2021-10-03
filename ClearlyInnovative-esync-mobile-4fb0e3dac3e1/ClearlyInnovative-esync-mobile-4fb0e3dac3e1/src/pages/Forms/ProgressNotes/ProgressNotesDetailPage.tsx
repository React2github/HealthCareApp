import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonItem,
  IonLabel,
  IonCardContent,
  IonAlert,
  IonLoading,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
} from "@ionic/react";
import React from "react";
import { useAuth } from "../../../hooks/auth";
import { useParams } from "react-router";
// import { useGetPatient } from "../../../hooks/patients-data";
import { useGetProgressNote } from "../../../hooks/progress-notes-data";
import "./Page.css";
import { useGetPatient } from "../../../hooks/patients-data";
import PatientsDetail from "../Patients/PatientsDetail";

const ProgressNotesDetailPage: React.FC = () => {
  const { noteId, patientId } = useParams<{ noteId: string, patientId: string }>();
  const { authInfo, user } = useAuth();

  const { data: progressNotesData, error, status } = useGetProgressNote(noteId, authInfo);
  const { data: patientData } = useGetPatient(patientId, authInfo);
  console.log(patientData)

  // here we handle display the error message and the loading
  // screen when the page is first being opened
  if (!progressNotesData && !error) {
    return <IonLoading message={"Loading Progress Note..."} isOpen={true} />;
  } else if (error) {
    return (
      <IonAlert
        header={"Error Loading Progress Notes"}
        message={error as string}
        isOpen={status === "error"}
        buttons={["OK"]}
        onDidDismiss={() => {
          // history.goBack();
        }}
      />
    );
  }
  console.log(patientData)
  console.log(progressNotesData)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="home" />
          </IonButtons>
          <IonButtons slot="end">
          {!(user?.role === 'DSP' || user?.role === "Auditors") ?
          <IonButton routerLink={`/edit-progressNote/${progressNotesData._id}/${patientData.id}`}>
            EDIT
          </IonButton> : null }
          </IonButtons>
          <IonTitle>ProgressNote Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCard>
              <PatientsDetail
                patientData={patientData}
                displayActions={false}
              />
            </IonCard>
          </IonRow>
        </IonGrid>


        {progressNotesData ? (
          <IonCardContent>
            <IonItem key={progressNotesData._id}>
              <IonLabel>
                Activities: {" "}
                {progressNotesData.activities}
              </IonLabel>
            </IonItem>
            <br></br>
            <IonLabel>Meals and Fluids</IonLabel>
            <IonItem>
              <IonLabel>
                <IonLabel>
                  Protein:
                  {progressNotesData.protein}
                </IonLabel>
                <IonLabel>
                  Fruit:
                  {progressNotesData.fruit}
                </IonLabel>
                <IonLabel>
                  otherMealDescription:
                  {progressNotesData.otherMealDescription}
                </IonLabel>
                <IonLabel>
                  otherFluidDescription:
                  {progressNotesData.otherFluidDescription}
                </IonLabel>
                <IonLabel>
                  Grains:
                  {progressNotesData.grains}
                </IonLabel>
                <IonLabel>
                  Vegetables:
                  {progressNotesData.vegetables}
                </IonLabel>
                <IonLabel>
                  Water:
                  {progressNotesData.water}
                </IonLabel>
                <IonLabel>
                  OtherMealAmount:
                  {progressNotesData.otherMealAmount}
                </IonLabel>
                <IonLabel>
                  Juices:
                  {progressNotesData.juices}
                </IonLabel>
                <IonLabel>
                  otherFluidAmount:
                  {progressNotesData.otherFluidAmount}
                </IonLabel>
              </IonLabel>
            </IonItem>
            <br></br>
            <IonLabel>Health and Wellness</IonLabel>
            <IonItem>
              <IonLabel>
                <IonLabel>
                  Medications:
                  {JSON.stringify(
                  progressNotesData.health_wellness.medications
                )}
                </IonLabel>
                <IonLabel>
                  SideEffects:
                  {JSON.stringify(
                  progressNotesData.health_wellness.sideEffects
                )}
                </IonLabel>
                <IonLabel>
                  Notes:
                  {progressNotesData.health_wellness.equipment_notes}
                </IonLabel>
                <IonLabel>
                  adaptiveEquipment:
                  {JSON.stringify(progressNotesData.health_wellness.equipment)}
                </IonLabel>
                <IonLabel>
                  needsRepairs:
                  {JSON.stringify(
                  progressNotesData.health_wellness.equipment_needs_repair
                )}
                </IonLabel>
                <IonLabel>
                  Notes 2:
                  {progressNotesData.health_wellness.exercise_notes}
                </IonLabel>
                <IonLabel>
                  Seizures:
                  {JSON.stringify(progressNotesData.health_wellness.seizure)}
                </IonLabel>
                <IonLabel>
                  Exercise:
                  {JSON.stringify(progressNotesData.health_wellness.exercise)}
                </IonLabel>
                <IonLabel>
                  Notes 3:
                  {progressNotesData.health_wellness.sideEffects_notes}
                </IonLabel>
              </IonLabel>
            </IonItem>
            <br></br>
            <IonLabel>Additional Questions</IonLabel>
            <IonItem>
              <IonLabel>
                <IonLabel>
                  One:
                  {progressNotesData.one}
                </IonLabel>
                <IonLabel>
                  Two:
                  {progressNotesData.two}
                </IonLabel>
                <IonLabel>
                  Three:
                  {progressNotesData.three}
                </IonLabel>
                <IonLabel>
                  Four:
                  {progressNotesData.four}
                </IonLabel>
                <IonLabel>
                  Five:
                  {progressNotesData.five}
                </IonLabel>
                <IonLabel>
                  Six:
                  {progressNotesData.six}
                </IonLabel>
                <IonLabel>
                  Seven:
                  {progressNotesData.seven}
                </IonLabel>
                <IonLabel>
                  Eight:
                  {progressNotesData.eight}
                </IonLabel>
              </IonLabel>
            </IonItem>
          </IonCardContent>
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default React.memo(ProgressNotesDetailPage);
