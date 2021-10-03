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

const AddressForm: React.FC<{
  initialValues: any}> = ({ initialValues }) => {
  const {  formState, register } = useFormContext(); // retrieve all hook methods

  return (
<div>
  <IonGrid>
    <IonRow>
      <IonCol>
        <IonItem>
          <IonLabel>Street 1</IonLabel>
          <IonInput
            type="text"
            ref={register({ required: false })}
            name={'addressForm.street1'}
          ></IonInput>
        </IonItem>
        <p>{formState.errors[`${initialValues}`]?.street1?.message}</p>
      </IonCol>
    </IonRow>

    <IonRow>
      <IonCol>
        <IonItem>
          <IonLabel>Street 2</IonLabel>
          <IonInput
            type="text"
            ref={register({ required: false })}
            name={'addressForm.street2'}
          ></IonInput>
        </IonItem>
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol>
        <IonItem>
          <IonLabel>City</IonLabel>
          <IonInput
            type="text"
            ref={register}
            name={'addressForm.city'}
          ></IonInput>
        </IonItem>
        <p>{formState.errors[`${initialValues}`]?.city?.message}</p>
      </IonCol>
      <IonCol>
        <IonItem>
          <IonLabel>State</IonLabel>
          <IonInput
            type="text"
            ref={register}
            name={'addressForm.state'}
          ></IonInput>
        </IonItem>
        <p>{formState.errors[`${initialValues}`]?.state?.message}</p>
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol size="6">
        <IonItem>
          <IonLabel>Zip Code</IonLabel>
          <IonInput
            type="text"
            ref={register}
            name={'addressForm.zipCode'}
          ></IonInput>
        </IonItem>
        <p>{formState.errors[`${initialValues}`]?.zipCode?.message}</p>
      </IonCol>
    </IonRow>
  </IonGrid>
</div>
  );
};
export default React.memo(AddressForm);
