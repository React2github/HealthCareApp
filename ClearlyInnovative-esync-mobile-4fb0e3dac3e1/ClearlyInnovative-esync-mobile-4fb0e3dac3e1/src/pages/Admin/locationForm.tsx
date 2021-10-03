import { ErrorMessage } from "@hookform/error-message";
import { IonInput, IonItem, IonLabel, IonTextarea } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import * as yup from "yup";
import "./AdminPages.css";

export interface LocationEntryProps {
  initialValues?: any;
}

/**
 *
 */
export const LocationEntrySchema = yup.object().shape({
  name: yup.string().required("Name Is Required"),
  description: yup.string(),
  street_address_1: yup.string().required("Address 1 Is Required"),
  street_address_2: yup.string(),
  city: yup.string().required("City Is Required"),
  state: yup.string().required("State Is Required"),
  zip: yup.string().required("Zip Is Required"),
});

/**
 *
 * @returns
 */
const LocationForm: React.FC<LocationEntryProps> = ({ initialValues }) => {
  const { register, errors, setValue } = useFormContext();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // this sets form values if they are provided
    if (initialValues) {
      Object.keys(initialValues).map((k) => {
        setValue(k, initialValues[k]);
      });
      setEditMode(true);
    }
  }, [initialValues]);

  return (
    <div>
      <div>{editMode ? "EDIT LOCATION" : "CREATING LOCATION"}</div>
      <IonItem>
        <IonLabel>Name:</IonLabel>
        <IonInput type="text" ref={register({ required: true })} name="name" />
      </IonItem>
      <span className="error">
        <ErrorMessage name="name" errors={errors} />
      </span>
      <IonItem>
        <IonLabel position="stacked" style={{zoom : 1.2}}>Description:</IonLabel>
        <IonTextarea
          rows={3}
          ref={register({ required: false })}
          name="description"
        />
      </IonItem>
      <IonItem>
        <IonLabel>Street Address 1:</IonLabel>
        <IonInput
          type="text"
          ref={register({ required: true })}
          name="street_address_1"
        />
      </IonItem>
      <span className="error">
        <ErrorMessage name="street_address_1" errors={errors} />
      </span>
      <IonItem>
        <IonLabel>Street Address 2:</IonLabel>
        <IonInput
          type="text"
          ref={register({ required: false })}
          name="street_address_2"
        />
      </IonItem>

      <IonItem>
        <IonLabel>City:</IonLabel>
        <IonInput type="text" ref={register({ required: true })} name="city" />
      </IonItem>
      <span className="error">
        <ErrorMessage name="city" errors={errors} />
      </span>

      <IonItem>
        <IonLabel>State:</IonLabel>
        <IonInput type="text" ref={register({ required: true })} name="state" />
      </IonItem>
      <span className="error">
        <ErrorMessage name="state" errors={errors} />
      </span>

      <IonItem>
        <IonLabel>Zip:</IonLabel>
        <IonInput type="text" ref={register({ required: true })} name="zip" />
      </IonItem>
      <span className="error">
        <ErrorMessage name="zip" errors={errors} />
      </span>
      {/* <IonItem>
        <IonLabel>Coordinates:</IonLabel>
        <IonInput
          type="text"
          ref={register({ required: false })}
          name="coordinates"
        />
      </IonItem> */}
      {/* <IonItem>
        <IonLabel>Date:</IonLabel>
        <IonInput type="date" ref={register({ required: true })} name="date" />
      </IonItem> */}
    </div>
  );
};

export default LocationForm;
