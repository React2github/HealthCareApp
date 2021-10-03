import { ErrorMessage } from "@hookform/error-message";
import { IonDatetime, IonItem, IonLabel } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useAuth } from "../../hooks/auth";
import * as yup from "yup";
import "./AdminPages.css";
import { SelectDSPModal } from "./SelectDSPModal";
import { SelectLocationModal } from "./SelectLocationModal";
import { useGetAllLocations } from "../../hooks/locations";
import { useGetAllUsers } from "../../hooks/users-data";

export interface AppointmentEntryProps {
  initialValues?: any;
}

export const AppointmentEntrySchema = yup.object().shape({
  location: yup.object().required("Location Is Required"),
  DSP: yup.object().required("DSP Is Required"),
  date: yup.string().required("Date Is Required"),
  start_time: yup.string().required("Start Time Is Required"),
  end_time: yup.string().required("End Time Is Required"),
});

const AppointmentEntry: React.FC<AppointmentEntryProps> = ({
  initialValues,
}) => {
  const { authInfo } = useAuth();
  const { data: locationData } = useGetAllLocations(authInfo);
  const { data: userData } = useGetAllUsers(authInfo);
  const [editMode, setEditMode] = useState(false);

  console.log(locationData);

  // Get location from database

  console.log(userData);

  // Query DSP from Users database
  const [showLocations, setShowLocations] = useState<boolean>(false);
  const [showDSPs, setShowDSPs] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [selectedDSP, setSelectedDSP] = useState<any>(null);

  const { register, setValue, errors } = useFormContext();

  useEffect(() => {
    // Validate input element DSP and input element location
    register("DSP");
    register("location");
    debugger;
    // this sets form values if they are provided
    if (initialValues) {
      Object.keys(initialValues).map((k) => {
        setValue(k, initialValues[k]);
      });
      setEditMode(true);

      setSelectedLocation(initialValues["location"]);
      setSelectedDSP(initialValues["DSP"]);
    }
  }, [initialValues, setValue]);

  return (
    <div>
      {/* <!-- locations modal --> */}
      <SelectLocationModal
        isOpen={showLocations}
        onDidDismiss={() => setShowLocations(false)}
        locationData={locationData}
        onCancel={() => setShowLocations(false)}
        onSelected={(value: any) => {
          setSelectedLocation(value);
          setValue("location", value);
          setShowLocations(false);
        }}
      />

      {/* <!-- dsp modal --> */}
      <SelectDSPModal
        isOpen={showDSPs}
        onDidDismiss={() => setShowDSPs(false)}
        onCancel={() => setShowDSPs(false)}
        DSPData={userData}
        onSelected={(value: any) => {
          setValue("DSP", value);
          setSelectedDSP(value);
          setShowDSPs(false);
        }}
      />

      {/* <!-- main form --> */}
      <div>{editMode ? "EDIT APPOINTMENT" : "CREATING APPOINTMENT"}</div>
      <IonItem onClick={() => setShowLocations(true)}>
        <IonLabel>Location</IonLabel>
        <IonLabel slot="end">
          <div className="ion-float-right">{selectedLocation?.name}</div>
        </IonLabel>
      </IonItem>
      <span className="error">
        <ErrorMessage name="location" errors={errors} />
      </span>

      <IonItem onClick={() => setShowDSPs(true)}>
        <IonLabel>DSP</IonLabel>
        <IonLabel slot="end">
          <div className="ion-float-right">{selectedDSP?.first}</div>
        </IonLabel>
      </IonItem>
      <span className="error">
        <ErrorMessage name="DSP" errors={errors} />
      </span>

      <IonItem>
        <IonLabel>Date</IonLabel>
        <IonDatetime
          name="date"
          ref={register({ required: true })}
          pickerFormat="MMM DD, YYYY"
          displayFormat="MMM DD, YYYY"
          pickerOptions={{}}
        />
      </IonItem>
      <span className="error">
        <ErrorMessage name="date" errors={errors} />
      </span>

      <IonItem>
        <IonLabel>Start Time</IonLabel>
        <IonDatetime
          name="start_time"
          ref={register({ required: true })}
          minuteValues="0,15,30,45"
          pickerFormat="hh:mm A"
          displayFormat="hh:mm A"
          pickerOptions={{}}
        />
      </IonItem>
      <span className="error">
        <ErrorMessage name="start_time" errors={errors} />
      </span>

      <IonItem>
        <IonLabel>End Time</IonLabel>
        <IonDatetime
          name="end_time"
          ref={register({ required: true })}
          minuteValues="0,15,30,45"
          pickerFormat="hh:mm A"
          displayFormat="hh:mm A"
          pickerOptions={{}}
        />
      </IonItem>
      <span className="error">
        <ErrorMessage name="end_time" errors={errors} />
      </span>
    </div>
  );
};

export default AppointmentEntry;
