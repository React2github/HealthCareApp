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

export interface SelectLocationModalProps {
  isOpen: boolean;
  onDidDismiss: any;
  onSelected: any;
  onCancel: any;
  locationData: Array<any>;
}
export const SelectLocationModal: React.FC<SelectLocationModalProps> = ({
  onDidDismiss,
  onSelected,
  isOpen,
  onCancel,
  locationData = [],
}) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>LOCATIONS</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onCancel}>CANCEL</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {locationData.map((location: any, index: number) => (
            <IonItem
              key={location._id}
              onClick={() => {
                onSelected(locationData[index]);
              }}
            >
              <IonLabel>
                <p>{location.name}</p>
                <p>
                  {location.street_address_1} {location.street_address_2}
                </p>
                <p>
                  {location.city} {location.state}
                </p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};
