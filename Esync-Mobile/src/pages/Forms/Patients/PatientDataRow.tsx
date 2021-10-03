import {
  IonThumbnail,
  IonCard,
  IonCardContent,
  IonImg,
  IonLabel,
  IonItem,
} from "@ionic/react";
import React from "react";
import "./Page.css";

const PatientDataRow: React.FC<any> = ({ patientData, onRowClicked }) => {
  return (
    <>
      {patientData ? (
        <>
          <IonCard
            onClick={() => onRowClicked(patientData._id)}
            key={patientData._id}
          >
            <IonCardContent>
              {patientData?.image ? (
                <div>
                  <IonThumbnail
                    style={{
                      margin: 12,
                      marginTop: 0,
                      width: 100,
                      height: 100,
                    }}
                  >
                    <IonImg src={patientData.image}></IonImg>
                  </IonThumbnail>
                </div>
              ) : (
                <div>
                  <IonThumbnail
                    style={{
                      margin: 12,
                      marginTop: 0,
                      width: 100,
                      height: 100,
                    }}
                  >
                    <IonImg src={"assets/no_image_available.jpeg"}></IonImg>
                  </IonThumbnail>
                </div>
              )}
              <IonItem>
                <IonLabel>
                  Name:
                  {patientData.name}
                </IonLabel>
                <IonLabel>
                  ID:
                  {patientData._id}
                </IonLabel>
                <IonLabel>
                  Staff Name:
                  {patientData.staffName}
                </IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        </>
      ) : null}
    </>
  );
};

export default React.memo(PatientDataRow);
