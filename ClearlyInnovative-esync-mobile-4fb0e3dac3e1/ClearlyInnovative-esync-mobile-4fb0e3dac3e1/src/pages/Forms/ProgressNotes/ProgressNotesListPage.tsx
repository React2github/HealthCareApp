import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonAlert,
  IonLoading,
  IonBackButton,
  IonImg,
  IonCol,
  IonRow,
  IonButton,
} from "@ionic/react";
import React from "react";
import { useParams } from "react-router";
import { useAuth } from "../../../hooks/auth";
import "./Page.css";
import { useGetPatient } from "../../../hooks/patients-data";
import { useGetAllProgressNotes } from "../../../hooks/progress-notes-data";

const ProgressNotesListPage: React.FC = () => {
  // const [progressNotesData, setProgressNotesData] = useState([]);
  const { authInfo } = useAuth();
  const { id } = useParams<{ id: string }>();
console.log(id)
  const { data: patientData } = useGetPatient(id, authInfo);
  const {
    data: progressNotesData,
    error: pgNoteError,
    status: pgNoteStatus,
  } = useGetAllProgressNotes(id, authInfo);
  console.log(progressNotesData);
  // here we handle display the error message and the loading
  // screen when the page is first being opened
  if (!progressNotesData && !pgNoteError) {
    return <IonLoading message={"Loading Progress Notes..."} isOpen={true} />;
  } else if (pgNoteError) {
    return (
      <IonAlert
        header={"Error Loading Progress Notes"}
        message={pgNoteError as string}
        isOpen={pgNoteStatus === "error"}
        buttons={["OK"]}
        onDidDismiss={() => {
          // history.goBack();
        }}
      />
    );
  }
console.log(patientData[0])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="home" />
          </IonButtons>
          <IonTitle>PROGRESS NOTES</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {progressNotesData &&
          progressNotesData.map((p: any) => (
            <IonItem
              button
              detail
              routerLink={`/progress-note-details/${p._id}/${id}`}
              key={p._id}
            >
              {/* style={{width: 200}} */}
              <IonLabel>
                <pre>
                  <IonRow>
                    <IonCol size="4">
                      {patientData?.img && (
                        <div>
                          <IonImg
                            // style={{ width: 10 }}
                            src={`data:image/${
                              patientData?.img?.contentType
                            };base64,${Buffer.from(
                              patientData?.img?.data
                            ).toString("base64")}`}
                          />
                        </div>
                      )}
                    </IonCol>
                    <h2>
                      <IonLabel>Name: {patientData.name}</IonLabel>
                      <IonLabel>
                        ID:
                        {patientData._id}
                      </IonLabel>
                      <IonLabel>Staff Name: {patientData.staffName}</IonLabel>
                      <IonLabel>
                        Date: {patientData.date.split("T")[0]}
                      </IonLabel>
                    </h2>
                    {/* {JSON.stringify(p, null, 2)}  */}
                  </IonRow>
                </pre>
              </IonLabel>
            </IonItem>
          ))}
      </IonContent>
    </IonPage>
  );
};

export default React.memo(ProgressNotesListPage);
