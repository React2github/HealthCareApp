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
  
  const DiagnosticInfo: React.FC<{ 
    initialValues: any
  }> = ({ initialValues }) => {
    const { register, formState } = useFormContext(); // retrieve all hook methods
    return (
      <div>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>ICD CODE</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'diagnosticInfo.icd'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.icd?.message}</p>
            </IonCol>
          </IonRow>
  
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Description</IonLabel>
                <IonInput
                  type="text"
                  ref={register({ required: false })}
                  name={'diagnosticInfo.description'}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Onset</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'diagnosticInfo.onset'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.onset?.message}</p>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel>Resolved</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'diagnosticInfo.resolved'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.resolved?.message}</p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    );
  };
  export default React.memo(DiagnosticInfo);
  