import React, { useEffect, useState } from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import AppointmentEntry, { AppointmentEntrySchema } from "./AppointmentEntry";
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import {
  useAddAppointment,
  useGetAppointment,
  useUpdateAppointment,
} from "../../hooks/appointments";
import { useAuth } from "../../hooks/auth";
import { useHistory, useParams } from "react-router";

const CreateAppointments: React.FC = () => {
  const { authInfo } = useAuth();
  const history = useHistory();
  const {
    mutate: AddAppointments,
    status: addAppointmentStatus,
    error: addAppointmentError
  } = useAddAppointment();
  const {
    mutateAsync: updateAppointment,
    status: updateAppointmentStatus,
    error: updateAppointmentError,
  } = useUpdateAppointment();

  const { appointmentId } = useParams<{
    appointmentId: string;
  }>();

  const [editMode, setEditMode] = useState(appointmentId ? true : false);

  /* hook for retrieving the patient when form is presented */
  const { status, data: appointmentData, error } = useGetAppointment(
    appointmentId,
    authInfo
  );
  /**
   *
   * @param data
   */
  const onSubmit = async (data: { [x: string]: any }) => {
    console.log("Onsubmit", data);

    const server = {
      location: data.location,
      DSP: data.DSP,
      date: data.date,
      start_time: data.start_time,
      end_time: data.end_time,
    };
    const serverData = { ...server };

    if (editMode) {
      await updateAppointment({
        params: { ...serverData, id: appointmentData._id },
        authInfo,
      });
    } else {
      await AddAppointments({
        params: serverData,
        authInfo,
      });
    }

    // // go back to lists of location
    // history.goBack();
  };

  const methods = useForm({
    mode: "onBlur",
    resolver: yupResolver(AppointmentEntrySchema),
  });

  if (status === "loading") {
    return <IonLoading isOpen={true} />;
  }
  console.log(methods.formState.errors);
  console.log("VALUES:", methods.getValues());
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="home" />
          </IonButtons>
          <IonTitle>Appointments Page</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <StatusAlert
          header="CREATE NEW APPOINTMENT"
          successMsg="Appointment Created Successfully"
          status={addAppointmentStatus}
          error={addAppointmentError}
          onOk={(success: boolean) => history.goBack()}
        />
        <StatusAlert
          header="Update Appointment"
          successMsg="Appointment Updated Successfully"
          status={updateAppointmentStatus}
          error={updateAppointmentError}
          onOk={(success: boolean) => history.goBack()}
        />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <AppointmentEntry initialValues={appointmentData || null} />
            <IonButton type="submit">
              {editMode ? "UPDATE APPOINTMENT" : "SAVE APPOINTMENT"}
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

export default CreateAppointments;

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
