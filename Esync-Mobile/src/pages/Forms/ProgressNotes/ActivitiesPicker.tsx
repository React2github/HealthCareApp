import { ErrorMessage } from "@hookform/error-message";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export interface AppointmentEntryProps {
  initialValues?: any;
}

const ActivitiesPicker: React.FC<AppointmentEntryProps> = ({
  initialValues,
}) => {
  const [editMode, setEditMode] = useState(false);
  const { control } = useFormContext(); // retrieve all hook methods
  const [activities, setActivities] = useState<any>("");

  const { errors } = useFormContext();

  useEffect(() => {
    // this sets form values if they are provided
    if (initialValues) {
      setEditMode(true);
      setActivities(initialValues?.activities);
    }
  }, [initialValues]);


  return (
    <div>
      <h3>ActivitiesPicker</h3>
      <IonItem>
        <IonLabel>Activities</IonLabel>

        <Controller
          name="header.activities"
          control={control}
          defaultValue={initialValues?.activities}
          rules={{ required: "This is a required field" }}
          render={(props) => (
            <IonSelect
              interface="alert"
              value={activities}
              multiple={true}
              cancelText="CANCEL"
              okText="OK"
              onIonChange={(e: any) => {
                props.onChange(e.detail?.value);
                setActivities(e.detail?.value);
              }}
            >
              <IonSelectOption>Bathing </IonSelectOption>
              <IonSelectOption>House Keeping </IonSelectOption>
              <IonSelectOption>Physical Fitness </IonSelectOption>
              <IonSelectOption>Community Exploration </IonSelectOption>
              <IonSelectOption>Grooming </IonSelectOption>
              <IonSelectOption>Laundry </IonSelectOption>
              <IonSelectOption>Ambulation </IonSelectOption>
              <IonSelectOption>Supervision </IonSelectOption>
              <IonSelectOption>Dressing </IonSelectOption>
              <IonSelectOption>Meal Prep </IonSelectOption>
              <IonSelectOption>Travel Training </IonSelectOption>
              <IonSelectOption>Financial Literacy</IonSelectOption>
              <IonSelectOption>Shaving </IonSelectOption>
              <IonSelectOption>Community resources </IonSelectOption>
              <IonSelectOption>Leadership </IonSelectOption>
              <IonSelectOption>Assist On/Off Transportation</IonSelectOption>
              <IonSelectOption>Toileting </IonSelectOption>
              <IonSelectOption>Computer Skills </IonSelectOption>
              <IonSelectOption>Medical appointments </IonSelectOption>
              <IonSelectOption>Respite </IonSelectOption>
              <IonSelectOption>Oral Hygiene </IonSelectOption>
              <IonSelectOption>Functional academics </IonSelectOption>
              <IonSelectOption>Errands/Shopping </IonSelectOption>
              <IonSelectOption>Other: </IonSelectOption>
            </IonSelect>
          )} // props contains: onChange, onBlur and value
        />
      </IonItem>
      <span className="error-message">
        <ErrorMessage name="header.activities" errors={errors} />
      </span>
    </div>
  );
};

export default React.memo(ActivitiesPicker);
