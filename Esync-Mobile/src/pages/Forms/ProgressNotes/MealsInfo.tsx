import { ErrorMessage } from "@hookform/error-message";
import {
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const MealsInfo: React.FC<{ initialValues: any }> = ({ initialValues }) => {
  const { register, errors, setValue } = useFormContext(); // retrieve all hook methods
  
  useEffect(() => {
    // this sets form values if they are provided
    if (initialValues) {
      debugger;
      setValue("meals.protein", initialValues?.protein)
      setValue("meals.grains", initialValues?.grains)
      setValue("meals.fruit", initialValues?.fruit)
      setValue("meals.vegetables", initialValues?.vegetables)
      setValue("meals.otherMealDescription", initialValues?.otherMealDescription)
      setValue("meals.otherMealAmount", initialValues?.otherMealAmount)
    }
  }, [initialValues, setValue]);
  
  return (
    <div style={{ fontWeight: "normal", fontSize: "smaller" }}>
      <h3>Meals</h3>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="fixed">Protein</IonLabel>
              <IonInput
                type="number"
                ref={register({ required: "Protein is required" })}
                name="meals.protein"
              ></IonInput>
            </IonItem>
            <span className="error-message">
              <ErrorMessage name="meals.protein" errors={errors} />
            </span>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel position="fixed">Grains</IonLabel>
              <IonInput
                type="number"
                ref={register({ required: "Grains are required" })}
                name="meals.grains"
              ></IonInput>
            </IonItem>
            <span className="error-message">
              <ErrorMessage name="meals.grains" />
            </span>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="fixed">Fruit</IonLabel>
              <IonInput
                type="number"
                ref={register({ required: "Fruit are required" })}
                name="meals.fruit"
              ></IonInput>
            </IonItem>
            <span className="error-message">
              <ErrorMessage name="meals.fruit" />
            </span>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel position="fixed">Vegetables</IonLabel>
              <IonInput
                type="number"
                ref={register({ required: "Vegetables are required" })}
                name="meals.vegetables"
              ></IonInput>
            </IonItem>
            <span className="error-message">
              <ErrorMessage name="meals.vegetables" />
            </span>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Meal Description</IonLabel>
              <IonInput
                type="text"
                ref={register({ required: "Other Description is required" })}
                name="meals.otherMealDescription"
              ></IonInput>
            </IonItem>
            <span className="error-message">
              <ErrorMessage name="meals.otherMealDescription" />
            </span>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonInput
                type="number"
                placeholder="Meal Amount"
                ref={register({ required: "Other meals are required" })}
                name="meals.otherMealAmount"
              ></IonInput>
            </IonItem>
            <span className="error-message">
              <ErrorMessage name="meals.otherMealAmount" />
            </span>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};
export default React.memo(MealsInfo);
