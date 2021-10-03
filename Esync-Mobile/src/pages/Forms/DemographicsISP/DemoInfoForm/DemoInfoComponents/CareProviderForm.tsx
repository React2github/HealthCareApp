import {
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import React from "react";
import { useFormContext } from "react-hook-form";

const CareProviderForm: React.FC = () => {
    const { register, formState } = useFormContext(); // retrieve all hook methods
    return (
    <div >
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Provider</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name={"provider.name"}
              ></IonInput>
            </IonItem>
            <p>{formState.errors.provider?.name?.message}</p>

          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Speciality</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name="provider.speciality"
              ></IonInput>
            </IonItem>
            <p>{formState.errors.provider?.speciality?.message}</p>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>Phone/Email</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name="provider.phone"
              ></IonInput>
            </IonItem>
            <p>{formState.errors.provider?.phone?.message}</p>

          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Address</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name="provider.address"
              ></IonInput>
            </IonItem>
            <p>{formState.errors.provider?.address?.message}</p>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};
export default React.memo(CareProviderForm);
