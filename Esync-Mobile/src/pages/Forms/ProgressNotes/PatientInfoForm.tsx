import {
  IonButtons,
  IonCol,
  IonDatetime,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { SelectDSPModal } from "../../Admin/SelectDSPModal";
import { SelectLocationModal } from "../../Admin/SelectLocationModal";
import { useGetAllUsers } from "../../../hooks/users-data";
import { useAuth } from "../../../hooks/auth";
import * as yup from "yup";
import { useGetAllPatients } from "../../../hooks/patients-data";
import { useGetAllLocations} from "../../../hooks/locations";

export interface AppointmentEntryProps {
  initialValues?: any;
}

export const PatientInfoSchema = yup.object().shape({
  name: yup.string().required("Name Is Required"),
  staffName: yup.object().required('StaffName is required'),
  locations: yup.object().required('Location is required'),
  date: yup.string(),
  start_end: yup.string(),
  signature: yup.string().required("Date Is Required"),
  managerReview: yup.string().required("Manager Review Is Required"),
  medicaidId: yup.string().required("MedicaidID Is Required"),
  pa: yup.string(),
  service: yup.string(),
  dob: yup.string(),

});


const PatientInfoForm: React.FC<AppointmentEntryProps> = ({
  initialValues,
}) => {
  const { authInfo } = useAuth();
  const { data: patientData } = useGetAllPatients(authInfo);;
  const { data: userData } = useGetAllUsers(authInfo);
  const { data: locationData } = useGetAllLocations(authInfo);
  const [editMode, setEditMode] = useState(false);
  const { register, setValue, errors } = useFormContext();

  const methods = useForm();

  console.log(patientData)
  console.log(userData)

  // Query DSP from Users database 
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedDate2, setSelectedDate2] = useState<string>();
  const [showDSPs, setShowDSPs] = useState<boolean>(false);
  const [selectedDSP, setSelectedDSP] = useState<any>(null);
  const [showLocations, setShowLocations] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);


  useEffect(() => {
    // Validate input element DSP and input element location
    register("staffName");
    if (initialValues) {
      Object.keys(initialValues).map((k) => {
        setValue(k, initialValues[k]);
        debugger
      });
      setEditMode(true);

      setSelectedDate(initialValues?.dob);
      setSelectedDate2(initialValues?.date);
      setSelectedDSP(initialValues["staffName"]);
    }
  }, [initialValues, setValue]);

  // register("locations");

  useEffect(() => {
    // Validate input element DSP and input element location
    register("locations");
    if (initialValues) {
      Object.keys(initialValues).map((j) => {
        setValue(j, initialValues[j]);
        debugger
      });
      setEditMode(true);
     
      setSelectedLocation(initialValues["locations"]);
    }
  }, [initialValues, setValue]);

  return (
    <div style={{ fontWeight: "normal", fontSize: "smaller" }}>
      <h3>Individual's Info</h3>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Name</IonLabel>
              <IonInput
                type="text"
                ref={register({ required: "Name is required" })}
                name="name"
              ></IonInput>
            </IonItem>
            <span className="error-message">
              <ErrorMessage name="name" errors={methods.errors.header} />
            </span>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>Date</IonLabel>
              <IonDatetime
                ref={register({ required: "Date is required" })}
                name="date"
                displayFormat="MMM DD, YYYY"
                pickerFormat="MMM DD, YYYY"
                placeholder="Select Date"
                value={selectedDate2} onIonChange={e => setSelectedDate2(e.detail.value!)}
              />
            </IonItem>
            <span className="error-message">
              <ErrorMessage name="date" errors={methods.errors.header} />
            </span>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>

            <SelectDSPModal
              isOpen={showDSPs}
              onDidDismiss={() => setShowDSPs(false)}
              onCancel={() => setShowDSPs(false)}
              DSPData={userData}
              onSelected={(value: any) => {
                setValue("staffName", value);
                setSelectedDSP(value.first);
                setShowDSPs(false);
              }}
            />
            <IonItem onClick={() => setShowDSPs(true)}>
              <IonLabel>Staff</IonLabel>
              <IonLabel slot="end">
                <div className="ion-float-right">{selectedDSP}</div>
              </IonLabel>
            </IonItem>
            <span className="error-message">
              <ErrorMessage name="staffName" errors={methods.errors.staffName} />
            </span>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonInput
                type="text"
                slot="start"
                placeholder="start/end"
                style={{ width: "50%" }}
                name="start_end"
                ref={register({ required: true })}
              ></IonInput>{" "}
              &nbsp; &nbsp; &nbsp;
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
        <IonCol>
        <SelectLocationModal
              isOpen={showLocations}
              onDidDismiss={() => setShowLocations(false)}
              onCancel={() => setShowLocations(false)}
              locationData={locationData}
              onSelected={(value: any) => {
                setValue("locations", value);
                setSelectedLocation(value.name);
                setShowLocations(false);
              }}
            />
            <IonItem onClick={() => setShowLocations(true)}>
              <IonLabel>Location</IonLabel>
              <IonLabel slot="end">
                <div className="ion-float-right">{selectedLocation}</div>
              </IonLabel>
            </IonItem>
            <span className="error-message">
              <ErrorMessage name="locations" errors={methods.errors.locations} />
            </span>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>Staff Signature</IonLabel>
              <IonInput
                type="text"
                ref={register({ required: "Signature is required" })}
                name="signature"
              ></IonInput>
            </IonItem>
            <span className="error-message">
              <ErrorMessage name="signature" errors={methods.errors.header} />
            </span>
          </IonCol>
          </IonRow>
          <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Mgr. Review</IonLabel>
              <IonInput
                type="text"
                ref={register({ required: "Review is required" })}
                name="managerReview"
              ></IonInput>
            </IonItem>
            <span className="error-message">
              <ErrorMessage name="managerReview" errors={methods.errors.header} />
            </span>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Medicaid ID</IonLabel>
              <IonInput
                type="text"
                ref={register({ required: "ID is required" })}
                name="medicaidId"
              ></IonInput>
            </IonItem>
            <span className="error-message">
              <ErrorMessage name="medicaidId" errors={methods.errors.header} />
            </span>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>PA#</IonLabel>
              <IonInput
                type="text"
                ref={register({ required: "PA is required" })}
                name="pa"
              ></IonInput>
            </IonItem>
            <span className="error-message">
              <ErrorMessage name="header.pa" errors={methods.errors.header} />
            </span>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Service</IonLabel>
              <IonInput
                type="text"
                ref={register({ required: "Service is required" })}
                name="service"
              ></IonInput>
            </IonItem>
            <span className="error-message">
              <ErrorMessage name="service" errors={methods.errors.header} />
            </span>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>DOB</IonLabel>
              <IonDatetime
                ref={register({ required: "DOB is required" })}
                name="dob"
                displayFormat="MMM DD, YYYY"
                pickerFormat="MMM DD, YYYY"
                placeholder="Select Date"
                value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}
              />
            </IonItem>
            <span className="error-message">
              <ErrorMessage name="dob" errors={methods.errors.header} />
            </span>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};
export default React.memo(PatientInfoForm);
