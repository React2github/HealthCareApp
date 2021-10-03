import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import "./Page.css";


const HomePage: React.FC = () => {


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <DashboardView />
      </IonContent>
    </IonPage>
  );
};

export default React.memo(HomePage);


export const DashboardView: React.FC<any> = ({ onDashboardClicked }) => {

  function getMoreNotifications() {
    if (document.getElementById('moreNotifications')?.style.display === "none") {
      return (
        document.getElementById('moreNotifications')?.setAttribute("style", "display: block")
      );
    }
    else 
      return (
        document.getElementById('moreNotifications')?.setAttribute("style", "display: none")
      );
  }


  function getMoreAppointments() {
    if(document.getElementById('moreAppointments')?.style.display === "none") {
      return (
       document.getElementById('moreAppointments')?.setAttribute("style", "display: block")
      );
    }
    else 
      return (
        document.getElementById('moreAppointments')?.setAttribute("style", "display: none")
      );
  }

  
  function getMorePersonalInformation() {
    if (document.getElementById('morePersonalInfo')?.style.display === "none")  {
      return (
        document.getElementById('morePersonalInfo')?.setAttribute("style", "display: block")
      );
    }
    else 
    return (
      document.getElementById('morePersonalInfo')?.setAttribute("style", "display: none")
    );
  }


  return (
    <>
      <IonCard style={{ margin: 8 }}>
        <IonItem>
          <h2>Notifications</h2>
          <IonButton
            slot="end"
            onClick={() => getMoreNotifications()}
          >
            MORE
          </IonButton>
        </IonItem>
        <IonCardContent>
          <IonItem>
            <IonLabel>
              <IonLabel className='notifications'> Notification 1</IonLabel>
              <IonLabel className='notifications'> Notification 2</IonLabel>
              <IonLabel className='notifications'> Notification 3</IonLabel>
              <IonLabel className='notifications'> Notification 4</IonLabel>
              <div id='moreNotifications' style={{display: 'none'}}>
              <IonLabel className='notifications' > Notification 5</IonLabel>

              </div>
            </IonLabel>
          </IonItem>
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonItem>
          <h2>Scheduled Appointments</h2>
          <IonButton
            slot="end"
            onClick={() => getMoreAppointments()}
          >
            MORE
          </IonButton>
        </IonItem>
        <IonCardContent>
          <IonItem>
            <IonLabel>
              <IonLabel className="appointments"> Appointment 1</IonLabel>
              <IonLabel className="appointments"> Appointment 2</IonLabel>
              <IonLabel className="appointments"> Appointment 3</IonLabel>
              <IonLabel className="appointments"> Appointment 4</IonLabel>
              <div id='moreAppointments' style={{display: 'none'}}>
              <IonLabel className='appointments'> Appointment 5</IonLabel>
              <IonLabel className='appointments'> Appointment 6</IonLabel>

              </div>
            </IonLabel>
          </IonItem>
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonItem>
          <h2>Personal Information</h2>
          <IonButton
            slot="end"
            onClick={() => getMorePersonalInformation()}
          >
            MORE
          </IonButton>
        </IonItem>
        <IonCardContent>
          <IonItem>
            <IonLabel>
              <IonLabel className="information">Personal Information 1</IonLabel>
              <IonLabel className="information">Personal Information 2</IonLabel>
              <IonLabel className="information">Personal Information 3</IonLabel>
              <div id='morePersonalInfo' style={{display: 'none'}}>
              <IonLabel className='information'>Personal Information 4</IonLabel>
              <IonLabel className='information'>Personal Information 5</IonLabel>
              </div>
            </IonLabel>
          </IonItem>
        </IonCardContent>
      </IonCard>
    </>
  );
};