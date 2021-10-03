import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

export interface SelectDSPModalProps {
  isOpen: boolean;
  onDidDismiss: any;
  onCancel: any;
  onSelected: any;
  DSPData: Array<any>;
}
export const SelectDSPModal: React.FC<SelectDSPModalProps> = ({
  onDidDismiss,
  onSelected,
  isOpen,
  onCancel,
  DSPData = [],
}) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>DSP</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onCancel}>CANCEL</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {DSPData.map((dsp: any, index: number) => (
            <IonItem
              key={dsp._id}
              onClick={() => {
                onSelected(DSPData[index]);
              }}
            >
              <IonLabel>
                <p>{dsp.first}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};
