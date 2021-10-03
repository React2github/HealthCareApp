import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import React, { useState } from "react";
import "./Page.css";

import GoogleMapReact from "google-map-react";
import { Plugins } from "@capacitor/core";
import { home } from "ionicons/icons";
const { Geolocation } = Plugins;

const API_KEY = "AIzaSyABa4Shxt2piyAST6iEts6O5CijtKGluZI";

const MapPage: React.FC = () => {
  const [currentLoc, setCurrentLoc] = useState<any>(null);

  const [defaultLoc] = useState<any>({
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  });

  const apiIsLoaded = (map: google.maps.Map, maps : any) => {
    Geolocation.getCurrentPosition().then((loc: any) => {
      console.log(loc.coords);
      let center: google.maps.LatLngLiteral = {
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      };
      setCurrentLoc({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      });
      map.setCenter(center);
      map.setZoom(14);
    });
  };

  console.log("Current Location " + currentLoc);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>MAP PAGE</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ height: "90%", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: API_KEY }}
            defaultCenter={defaultLoc.center}
            defaultZoom={defaultLoc.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
          >
            {currentLoc ? (
              <MyLocationMarker
                lat={currentLoc.lat}
                lng={currentLoc.lng}
                text="My Marker"
              />
            ) : null}
          </GoogleMapReact>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MapPage;

const MyLocationMarker: React.FC<any> = () => (
  <IonIcon icon={home} style={{ fontSize: 24, color: "blue" }} />
);
