import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import "./Page.css";

import { Plugins } from "@capacitor/core";
import { timer, location } from "ionicons/icons";

const CheckInPage: React.FC = () => {

  const [coords, setCoords] = useState<any>();
  const [time, setTime] = useState<any>();

  const { Geolocation } = Plugins;

  const getCheckinInformation = async () => {
    let loc = await Geolocation.getCurrentPosition();
    console.log(loc.coords);
    setCoords({ lat: loc.coords.latitude, lng: loc.coords.longitude });
    setTime(new Date());

    // after one minute reset, meaning user has to select
    // a new location
    setTimeout(() => {
      setTime(null);
      setCoords(null);
    }, 6000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Check In Page</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton
          onClick={() => getCheckinInformation()}
          expand="block"
          fill="outline"
          disabled={time}
        >
          <IonIcon slot="start" icon={location} />
          GET CHECK IN INFORMATION
        </IonButton>
        {time ? (
          <>
            <IonItem>
              <IonLabel>
                <div>
                  CURRENT LOCATION:{" "}
                  <pre>
                    {coords.lat} {coords.lng}
                  </pre>
                </div>
                <h2>TIME: {(time + "").split("GMT")[0]}</h2>
              </IonLabel>
            </IonItem>
            <div>
              <IonItem style={{ paddingBottom: 8 }}>
                <IonText className="ion-padding">
                  YOU HAVE 1 MINUTE TO CHECK IN BEFORE YOU WILL NEED TO RESET
                  LOCATION
                </IonText>
              </IonItem>
              <IonButton
                expand="block"
                fill="outline"
                onClick={() => {
                  alert("Check In Complete");

                }}
              >
                <IonIcon icon={timer} slot="start"></IonIcon>
                CHECK IN NOW
              </IonButton>
            </div>
          </>
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default React.memo(CheckInPage);
