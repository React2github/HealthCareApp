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
  
  const Medications: React.FC<{ 
    initialValues: any 
  }> = ({ initialValues }) => {
    const { register, formState } = useFormContext(); // retrieve all hook methods
    return (
      <div>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Date Started</IonLabel>
                <IonInput
                  type="number"
                  ref={register}
                  name={'medications.date'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.date?.message}</p>
            </IonCol>
          </IonRow>
  
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Medication</IonLabel>
                <IonInput
                  type="text"
                  ref={register({ required: false })}
                  name={'medications.medication'}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Dosage</IonLabel>
                <IonInput
                  type="number"
                  ref={register}
                  name={'medications.dosage'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.date?.message}</p>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel>Time/Route</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'medications.time'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.address?.message}</p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Reason</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'medications.reason'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`$ {initialValues}`]?.reason?.message}</p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Side Effects</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={`medications.sideEffects`}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.sideEffects?.message}</p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    );
  };
  export default React.memo(Medications);
  