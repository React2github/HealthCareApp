import { ErrorMessage } from "@hookform/error-message";
import { IonInput, IonItem, IonLabel } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import * as yup from "yup";


export interface EditSettingsProps {
  initialValues?: any;
}

/**
 *
 */
export const EditSettingsSchema = yup.object().shape({
  first: yup.string().required("Name Is Required"),
  role: yup.string().required("Job Title Is Required"),
  email: yup.string().required("Email Is Required"),
  phone: yup.string().required("Phone Is Required"),
});

/**
 *
 * @returns
 */
const SettingsForm: React.FC<EditSettingsProps> = ({ initialValues }) => {
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
  }, [initialValues, setValue]);


  return (
    <div>
      <div>{editMode ? "EDIT USER" : null}</div>
      <IonItem>
        <IonLabel>First:</IonLabel>
        <IonInput type="text" ref={register({ required: true })} name="first" />
      </IonItem>
      <span className="error">
        <ErrorMessage name="first" errors={errors} />
      </span>
      <IonItem>
        <IonLabel>Last:</IonLabel>
        <IonInput
          type="text"
          ref={register({ required: false })}
          name="last"
        />
      </IonItem>
      <span className="error">
        <ErrorMessage name="last" errors={errors} />
      </span>
      <IonItem>
        <IonLabel>Job Title:</IonLabel>
        <IonInput
          type="text"
          ref={register({ required: false })}
          name="jobTitle"
        />
      </IonItem>
      <span className="error">
        <ErrorMessage name="jobTitle" errors={errors} />
      </span>
      <IonItem>
        <IonLabel>Phone:</IonLabel>
        <IonInput
          type="text"
          ref={register({ required: false })}
          name="phone"
        />
      </IonItem>
      <span className="error">
        <ErrorMessage name="phone" errors={errors} />
      </span>

    </div>
  );
};

export default SettingsForm;
