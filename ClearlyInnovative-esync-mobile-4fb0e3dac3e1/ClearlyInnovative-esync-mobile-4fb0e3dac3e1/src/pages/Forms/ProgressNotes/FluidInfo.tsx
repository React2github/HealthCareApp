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

const FluidInfo: React.FC<{ initialValues: any }> = ({ initialValues }) => {
  const { register, errors, setValue } = useFormContext(); // retrieve all hook methods

  useEffect(() => {
    // this sets form values if they are provided
    if (initialValues) {
      debugger;
      setValue("fluids.water", initialValues?.water)
      setValue("fluids.juices", initialValues?.juices)
      setValue("fluids.otherFluidDescription", initialValues?.otherFluidDescription)
      setValue("fluids.otherFluidAmount", initialValues?.otherFluidAmount)
    }
  }, [initialValues, setValue]);
  return (
    <div style={{ fontWeight: "normal", fontSize: "smaller" }}>
      <h3>Fluids</h3>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Water</IonLabel>
              <IonInput
                type="number"
                ref={register({ required: "Water is required" })}
                name="fluids.water"
              ></IonInput>
            </IonItem>
            <span className="error-message">
              <ErrorMessage name="fluids.water" errors={errors} />
            </span>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>Juices</IonLabel>
              <IonInput
                type="number"
                ref={register({ required: "Juices are required" })}
                name="fluids.juices"
              ></IonInput>
            </IonItem>
            <span className="error-message">
              <ErrorMessage name="fluids.juices" errors={errors} />
            </span>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Fluid Description</IonLabel>
              <IonInput
                type="text"
                ref={register({ required: "Other is required" })}
                name="fluids.otherFluidDescription"
              ></IonInput>
            </IonItem>
            <span className="error-message">
              <ErrorMessage name="fluids.otherFluidDescription" errors={errors} />
            </span>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonInput
                type="number"
                placeholder="Fluid Amount"
                ref={register({ required: "Amount is required" })}
                name="fluids.otherFluidAmount"
              ></IonInput>
            </IonItem>
            <span className="error-message">
              <ErrorMessage name="fluids.otherFluidAmount" errors={errors} />
            </span>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};
export default React.memo(FluidInfo);
