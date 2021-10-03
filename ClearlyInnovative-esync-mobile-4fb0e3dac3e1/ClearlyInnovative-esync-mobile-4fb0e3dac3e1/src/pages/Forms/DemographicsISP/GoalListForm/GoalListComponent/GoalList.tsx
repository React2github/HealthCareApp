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
  
  const GoalList: React.FC<{ 
    initialValues: any 
  }> = ({ initialValues }) => {
    const { register, formState } = useFormContext(); // retrieve all hook methods
    return (
      <div>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Outcome</IonLabel>
                <IonInput
                  type="number"
                  ref={register}
                  name={'goalList.outcome'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.outcome?.message}</p>
            </IonCol>
          </IonRow>
  
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Goal</IonLabel>
                <IonInput
                  type="text"
                  ref={register({ required: false })}
                  name={'goalList.goal'}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Responsible Parties</IonLabel>
                <IonInput
                  type="number"
                  ref={register}
                  name={'goalList.parties'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.parties?.message}</p>
            </IonCol>
            </IonRow>
            <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Target Date</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'goalList.date'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.date?.message}</p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Plan for Natural Supports:</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'goalList.plan'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`$ {initialValues}`]?.plan?.message}</p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Action Steps</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'goalList.Steps'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.Steps?.message}</p>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Teaching Strategies</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'goalList.Steps2'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.Steps?.message}</p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Learning Style:</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'goalList.learning'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.Steps?.message}</p>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Material Needed:</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'goalList.material'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.Steps?.message}</p>
            </IonCol>
            </IonRow>
            <IonRow>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Outcome:</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'goalList.outcome2'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.Steps?.message}</p>
            </IonCol>
            </IonRow>
            <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Goal</IonLabel>
                <IonInput
                  type="text"
                  ref={register({ required: false })}
                  name={'goalList.goal'}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Responsible Parties</IonLabel>
                <IonInput
                  type="number"
                  ref={register}
                  name={'goalList.parties'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.parties?.message}</p>
            </IonCol>
            </IonRow>
            <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Target Date</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'goalList.date'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.date?.message}</p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Plan for Natural Supports:</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'goalList.plan'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`$ {initialValues}`]?.plan?.message}</p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Action Steps</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'goalList.Steps'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.Steps?.message}</p>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Teaching Strategies</IonLabel>
                <IonInput
                  type="text"
                  ref={register}
                  name={'goalList.Steps'}
                ></IonInput>
              </IonItem>
              <p>{formState.errors[`${initialValues}`]?.Steps?.message}</p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    );
  };
  export default React.memo(GoalList);
  