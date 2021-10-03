import React, { useState } from "react";
import PatientInfoForm, { PatientInfoSchema } from "../ProgressNotes/PatientInfoForm"
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonAlert,
  IonBackButton,
  IonLoading,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import "./Page.css";
import { useAuth } from "../../../hooks/auth";
import {
  useAddPatient,
  useGetPatient,
  useUpdatePatient,
} from "../../../hooks/patients-data";
import AddImage from "../../../components/AddImage";
import { yupResolver } from "@hookform/resolvers/yup";

const CreatePatientPage: React.FC = () => {
  const { authInfo } = useAuth();
  const history = useHistory();
  const [image, setImage] = useState<any>(null);
  const {
    mutate: addPatient,
    status: addPatientStatus,
    error: addPatientError
  } = useAddPatient();
  const {
    mutate: updatePatient,
    status: updatePatientStatus,
    error: updatePatientError,
  } = useUpdatePatient()


  const { patientId } = useParams<{
    patientId: string;
  }>();


  const [editMode, setEditMode] = useState(patientId ? true : false);

  const { status, data: patientData, error } = useGetPatient(
    patientId,
    authInfo
  );

  /**
   *
   * @param data
   */
  const onSubmit = async (data: { [x: string]: any }) => {
    console.log("Onsubmit", data);
   const server = {
    ...data.header,
    name: data.name,
    staffName: data.staffName.first,
    locations: data.locations.name,
    date: data.date,
    start_end: data.start_end,
    signature: data.signature,
    managerReview: data.managerReview,
    medicaidId: data.medicaidId,
    pa: data.pa,
    service: data.service,
    dob: data.dob,
    image: image?.file
   };
  debugger
  console.log(data.locations)

    const serverData = {...server};

    if (editMode) {
      await updatePatient({
        params: { ...serverData, id: patientData._id },
        authInfo,
      });
    } else {
      await addPatient({
        params: serverData,
        authInfo,
      });
    }

    // // go back to lists of location
    // history.goBack();
  };


  const methods = useForm({
    mode: "onBlur",
    resolver: yupResolver(PatientInfoSchema),
  });

  if (status === "loading") {
    return <IonLoading isOpen={true} />;
  }

  console.log("Errors:", methods.errors);
  console.log("Values:", methods.getValues());



  const handleImageChange = (data: any) => {
    debugger;
    console.log(data);
    setImage(data);
  };



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Create New Individual</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <StatusAlert
          header="Create New Information Sheet"
          successMsg="Individual Created Successfully"
          status={addPatientStatus}
          error={addPatientError}
          onOk={(success: boolean) => history.goBack()}
        />
        <StatusAlert
          header="Update Information Sheet"
          successMsg="Individual Updated Successfully"
          status={updatePatientStatus}
          error={updatePatientError}
          onOk={(success: boolean) => history.goBack()}
        />

        {/* <IonAlert
          header="CREATE NEW PATIENT"
          message={
            status === "error"
              ? "Error: " + (error as any).message
              : "Patient Created Successfully"
          }
          isOpen={status === "success" || status === "error"}
          buttons={["OK"]}
          onDidDismiss={() => {
            history.goBack();
          }}
        /> */}

        <AddImage onChange={handleImageChange} />

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <PatientInfoForm initialValues={patientData || null} />
            <IonButton type="submit">
              {editMode ? "UPDATE Patient" : "SAVE Patient"}
            </IonButton>
            <IonButton
              type="button"
              color="danger"
              onClick={() => history.goBack()}
            >
              CANCEL
            </IonButton>
          </form>
        </FormProvider>
      </IonContent>
    </IonPage>
  );
};

export default CreatePatientPage;

export interface StatusAlertProps {
  status: string;
  error: any;
  header: string;
  successMsg: string;
  onOk: any;
}

const StatusAlert: React.FC<StatusAlertProps> = ({
  status,
  header,
  successMsg,
  error,
  onOk,
}) => {
  return (
    <IonAlert
      header={header}
      message={
        status === "error" ? "Error: " + (error as any).message : successMsg
      }
      isOpen={status === "success" || status === "error"}
      buttons={[{ text: "OK", handler: () => onOk(status === "success") }]}
    />
  );
};
