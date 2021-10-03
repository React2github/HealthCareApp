import {
    IonCol,
    IonGrid,
    IonInput,
    IonItem,
    IonLabel,
    IonRow,
    IonSelect,
    IonSelectOption,
  } from "@ionic/react";
  import React from "react";
  import { useFormContext } from "react-hook-form";
  
  const FunctionalInfo: React.FC<{
    initialValues: any
  }> = ({ initialValues }) => {
    const { register, formState } = useFormContext(); // retrieve all hook methods
    return (
      <div>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Cognitive Skill Level</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'functionalForm.cognitive'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.cognitive?.message}</p>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel>Communication Level</IonLabel>
                <IonInput
                  type="text"
                  ref={register({ required: false })}
                  name={'functionalForm.communication'}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Adaptive Skill Level</IonLabel>
                <IonInput
                  type="text"
                  ref={register({ required: false })}
                  name={'functionalForm.adaptive'}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel>Communication Method</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'functionalForm.communicationMethod'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.communicationMethod?.message}</p>
            </IonCol>
            </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Types of Adaptive Equipment</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'functionalForm.equipment'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.adaptiveEquipment?.message}</p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Diet Order</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'functionalForm.order'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.dietOrder?.message}</p>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Food Texture</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'functionalForm.Foodtexture'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.foodTexture?.message}</p>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Food Intolerances</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'functionalForm.intolerance'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.intolerance?.message}</p>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Ambulatory</IonLabel>
                <IonSelect>
                  <IonSelectOption>Fully</IonSelectOption>
                  <IonSelectOption>With Assistance</IonSelectOption>
                  <IonSelectOption>Non-ambulatory</IonSelectOption>
                </IonSelect>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.ambulatory?.message}</p>
            </IonCol>
            </IonRow>
            <h2>Consent Procedures</h2>
            <IonRow>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Individual has the capacity to make medical decisions</IonLabel>
                <IonSelect>
                  <IonSelectOption>Yes</IonSelectOption>
                  <IonSelectOption>No</IonSelectOption>
                </IonSelect>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.sideEffects?.message}</p>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Individual has a substitue health care decision maker:</IonLabel>
                <IonSelect>
                  <IonSelectOption>Yes</IonSelectOption>
                  <IonSelectOption>No</IonSelectOption>
                </IonSelect>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.sideEffects?.message}</p>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel>To obtain consent contact:</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'functionalForm.intolerance'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.sideEffects?.message}</p>
            </IonCol>
            <h5>In a medical emergency two physicians may agree to proceed with medical intervention.</h5>
          </IonRow>
        </IonGrid>
      </div>
    );
  };
  export default React.memo(FunctionalInfo);
  