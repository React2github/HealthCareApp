import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonImg,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import React from "react";
import { useAuth } from "../../../hooks/auth";
import "./Page.css";

type Props = {
  patientData: any;
  onViewReports?: Function;
  onCreateReport?: Function;
  onViewNewReports?: Function;
  onCreateNewReport?: Function;
  displayActions?: boolean;
};
const PatientDetail: React.FC<Props> = ({
  patientData,
  onViewReports = null,
  onCreateReport = null,
  onViewNewReports = null,
  onCreateNewReport = null,
  displayActions = true,
}) => {
  const hasProgressNotes = () => {
    return patientData?.progressNotes?.length;
  };

  const hasDemoInfo = () => {
    return false;
  };
  const { user } = useAuth();
  
// console.log(patientData.dob.split('T')[0])
  return (
    <div>
      {patientData ? (
        <div>
            <IonItem>
              <IonGrid>
                <IonRow>
                  <IonCol size="4">
                    {patientData?.img ? (
                      <div >
                        <IonImg
                          // style={{ width: 200 }}
                          src={`data:image/${
                            patientData.img.contentType
                          };base64,${Buffer.from(patientData.img.data).toString(
                            "base64"
                          )}`}
                        />
                      </div>
                    ): (
                      <div >
                      <IonImg
                        // style={{ width: 200 }}
                        src={'assets/no_image_available.jpeg'}
                      />
                    </div>
                    )}
                  </IonCol>
                  <IonCol>
                    <IonLabel>
                      <IonLabel>
                        Name: {" "}
                        {patientData.name}
                      </IonLabel>
                      <IonLabel>
                        ID: 
                        {patientData._id}
                      </IonLabel>
                      <IonLabel>
                        Staff Name: {" "}
                        {patientData.staffName}
                      </IonLabel>
                      <IonLabel>
                        Signature: {" "}
                        {patientData.signature}
                      </IonLabel>
                      <IonLabel>
                        Manager Review: {" "}
                        {patientData.managerReview}
                      </IonLabel>
                      <IonLabel>
                        {" "}
                        MedicaidID: 
                        {patientData.medicaidId}
                      </IonLabel>
                      <IonLabel>
                        {" "}
                        PA: 
                        {patientData.pa}
                      </IonLabel>
                      <IonLabel>
                        {" "}
                        Service: {" "}
                        {patientData.service}
                      </IonLabel>
                      <IonLabel>
                        DOB: {" "}
                        {patientData.dob.split('T')[0]}
                      </IonLabel>
                      <IonLabel>
                        Updated At: {" "}
                        {patientData.updatedAt.split('T')[0]}
                      </IonLabel>
                      <IonLabel>
                        Created At: {" "}
                        {patientData.updatedAt.split('T')[0]}
                      </IonLabel>
                    </IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          {displayActions ? (
            <>
              <IonCard>
                <IonCardContent>
                  {hasDemoInfo() ? (
                    <p>
                      <IonButton
                        disabled={false}
                        onClick={() =>
                          onCreateNewReport &&
                          onCreateNewReport(patientData._id)
                        }
                      >
                        EDIT DEMOGRAPHIC INFORMATION
                      </IonButton>
                    </p>
                  ) : (
                    <div>
                      <IonButton
                        disabled={false}
                        onClick={() =>
                          onCreateNewReport &&
                          onCreateNewReport(patientData._id)
                        }
                      >
                        CREATE DEMOGRAPHIC INFORMATION
                      </IonButton>
                    </div>
                  )}
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardContent>
                  {hasProgressNotes() ? (
                    <p>
                      <IonText style={{ display: "block" }}>
                        Progress Note Count: {patientData.progressNotes.length}
                      </IonText>
                      <IonButton
                        onClick={() =>
                          onViewReports && onViewReports(patientData._id)
                        }
                      >
                        VIEW PROGRESS NOTES
                      </IonButton>
                      { user?.role !== "Auditors" ?
                      <IonButton
                        onClick={() =>
                          onCreateReport && onCreateReport(patientData._id)
                        }
                      >
                        CREATE PROGRESS NOTE
                      </IonButton> : null }
                    </p>
                  ) : (
                    <div>
                      <IonText style={{ display: "block" }}>
                        There are currently no progress reports for this patient
                      </IonText>
                      <IonButton
                        onClick={() =>
                          onCreateReport && onCreateReport(patientData._id)
                        }
                      >
                        CREATE PROGRESS NOTE
                      </IonButton>
                    </div>
                  )}
                </IonCardContent>
              </IonCard>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(PatientDetail);
