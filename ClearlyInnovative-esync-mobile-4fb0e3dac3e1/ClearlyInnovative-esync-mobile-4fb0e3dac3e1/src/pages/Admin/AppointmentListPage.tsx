import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonLoading,
  IonAlert,
} from "@ionic/react";
import React from "react";
import {
  useGetAllAppointments,
  useDeleteAppointment,
} from "../../hooks/appointments";
import { alertController } from "@ionic/core";
import { useHistory } from "react-router";
import { useAuth } from "../../hooks/auth";

export interface AppointmentListPageProps {}

const AppointmentListPage: React.FC<AppointmentListPageProps> = () => {
  const { authInfo } = useAuth();
  const history = useHistory();

  /* Hook for getting all appointments */
  const { status, data: appointmentData, error } = useGetAllAppointments(authInfo);

  /* Hook for deleting an appointment */
  const {
    mutateAsync: deleteAppointment,
    status: pgNoteStatus,
    error: pgNoteError,
  } = useDeleteAppointment();

  /**
   *
   * @param appointmentId
   */
  const handleDeleteAppointment = async (appointmentId: string) => {
    try {
    await deleteAppointment({ 
      appointmentId,
       authInfo 
      });
    } catch (e) {
      console.log(e);
    }
  };

  async function showAlert(locationId: string) { 
    const alert = alertController.create({
      header: "Confirmation",
      message: "Do you really want to remove this?",
      buttons: [{
        text: "Yes",
        handler: () => 
        handleDeleteAppointment(locationId)
      }, 
   "cancel"]
    
    });
        (await alert).present();
    }


  if (status === "loading") {
    return <IonLoading isOpen={true} />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Appointment List </IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/create-appointment">NEW</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>


      <IonContent fullscreen>

      <IonAlert
        header="Delete Appointment"
        message={
          pgNoteStatus === "error"
            ? "Error: " + (pgNoteError as any).message
            : "Appointment deleted Successfully"
        }
        isOpen={pgNoteStatus === "success" || pgNoteStatus === "error"}
        buttons={["OK"]}
      />
        {appointmentData &&
          appointmentData.map((p: any) => (
            <IonItem key={p._id}>
              <AppointmentListItem
                entry={p}
                onDelete={() => showAlert(p._id)}
              />
            </IonItem>
          ))}
      </IonContent>
    </IonPage>
  );
};

export default React.memo(AppointmentListPage);

export interface AppointmentListItemProps {
  entry: any;
  onDelete: any;
}

const AppointmentListItem: React.FC<AppointmentListItemProps> = React.memo(
  ({ entry, onDelete }) => {
    return (
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonLabel>
              <h2>{entry.DSP.first} {entry.DSP.last}</h2>
            </IonLabel>
            <IonLabel>{entry.location.name}</IonLabel>
            <IonLabel className="ion-text-wrap">
              {entry.location.street_address_1}{" "}
              {entry.location.street_address_2
                ? entry.location.street_address_2 + ", "
                : ", "}{" "}
              {entry.location.city} {entry.location.state} {entry.location.zip}
            </IonLabel>
            <IonLabel>
              <div>
                {new Date(entry.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div>
                {new Date(entry.start_time).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                })}
                {" - "}
                {new Date(entry.end_time).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
            </IonLabel>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <div className="ion-float-end">
              <IonButton routerLink={`/edit-appointments/${entry._id}`}>
                EDIT
              </IonButton>
              <IonButton onClick={onDelete} color="danger">
                DELETE
              </IonButton>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    );
  }
);
