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

const ContactsForm: React.FC = () => {
    const { register, formState } = useFormContext(); // retrieve all hook methods
  return (
    <div >
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Name</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name="contact.name"
              ></IonInput>
            </IonItem>
            <p>{formState.errors.contact?.name?.message}</p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Contact Type</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name="contact.type"
              ></IonInput>
            </IonItem>
            <p>{formState.errors.contact?.type?.message}</p>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>Relationship</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name="contact['relationship']"
              ></IonInput>
            </IonItem>
            <p>{formState.errors.contact?.relationship?.message}</p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Address</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name="contact['address']"
              ></IonInput>
            </IonItem>
            <p>{formState.errors.contact?.address?.message}</p>
          </IonCol>
        </IonRow>
        {/* phone email */}
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Phone/Email</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name="contact['phone']"
              ></IonInput>
            </IonItem>
            <p>{formState.errors.contact?.phone?.message}</p>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};
export default React.memo(ContactsForm);
