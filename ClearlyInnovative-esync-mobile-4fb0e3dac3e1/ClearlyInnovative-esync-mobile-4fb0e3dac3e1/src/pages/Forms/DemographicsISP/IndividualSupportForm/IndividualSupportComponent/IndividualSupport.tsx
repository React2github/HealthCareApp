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
  
  const IndividualSupport: React.FC<{ 
    initialValues: any 
  }> = ({ initialValues }) => {
    const { register, formState } = useFormContext(); // retrieve all hook methods
    return (
      <div>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>How Best To Support</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'individualSupport.text'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.date?.message}</p>
            </IonCol>
          </IonRow>
  
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Add What's Working/ What's Not Working</IonLabel>
                <IonInput
                  type="text"
                  ref={register({ required: false })}
                  name={'individualSupport.Working'}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <h5>Places and Connections Map</h5>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Where I Spend Time Now</IonLabel>
                <IonInput
                  type="number"
                  ref={register}
                  name={'individualSupport.dosage'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.date?.message}</p>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel>Places I would Like To Spend More Time</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'individualSupport.time'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.address?.message}</p>
            </IonCol>
          </IonRow>
          <h5>Communication Map</h5>
          <IonRow>
            <IonCol size="6">
              <IonItem>
                <IonLabel>When I do this</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'individualSupport.reason'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`$ {initialValues}`]?.reason?.message}</p>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel>It Probably Means</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'individualSupport.sideEffects'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.sideEffects?.message}</p>
            </IonCol>
          <IonCol size="6">
              <IonItem>
                <IonLabel>You Should</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'individualSupport.sideEffects'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.sideEffects?.message}</p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    );
  };
  export default React.memo(IndividualSupport);
  