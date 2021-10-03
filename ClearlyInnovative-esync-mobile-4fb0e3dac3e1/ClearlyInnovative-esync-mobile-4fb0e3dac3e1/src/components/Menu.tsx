import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonButton,
  IonFooter,
  IonToolbar,
  IonNote,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";

import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  calendar,
  calendarSharp,
  clipboard,
  compass,
  compassSharp,
  mailOutline,
  mailSharp,
  people,
  peopleSharp,
  settings,
} from "ionicons/icons";
import "./Menu.css";
import { useAuth } from "../hooks/auth";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const adminPages: AppPage[] = [
  {
    title: "Dashboard",
    url: "/home",
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: "Forgot Password",
    url: "/resetPassword",
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: "Locations",
    url: "/list-locations",
    iosIcon: compass,
    mdIcon: compassSharp,
  },
  {
    title: "Appointments",
    url: "/list-appointments",
    iosIcon: calendar,
    mdIcon: calendarSharp,
  },
  // {
  //   title: "Check In",
  //   url: "/check-in",
  //   iosIcon: mailOutline,
  //   mdIcon: mailSharp,
  // },
  // {
  //   title: "List Images",
  //   url: "/list-images",
  //   iosIcon: phonePortraitSharp,
  //   mdIcon: phonePortraitSharp,
  // },
  {
    title: "List Individuals",
    url: "/list-individuals",
    iosIcon: people,
    mdIcon: peopleSharp,
  },
  {
    title: "List Users",
    url: "/list-users",
    iosIcon: clipboard,
    mdIcon: clipboard,
  },
  {
    title: "Profile",
    url: "/settings",
    iosIcon: settings,
    mdIcon: settings,
  },
];

const userPages: AppPage[] = [
  {
    title: "Dashboard",
    url: "/home",
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: "Forgot Password",
    url: "/resetPassword",
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: "Check In",
    url: "/check-in",
    iosIcon: compass,
    mdIcon: compassSharp,
  },
  {
    title: "List Individuals",
    url: "/list-individuals",
    iosIcon: people,
    mdIcon: peopleSharp,
  },
  {
    title: "Profile",
    url: "/settings",
    iosIcon: settings,
    mdIcon: settings,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { user, authInfo, logOut } = useAuth();
  return (
    <IonMenu contentId="main" type="overlay">
      {authInfo?.loggedIn ? (
        <>
          <IonContent>
            <IonList id="inbox-list">
              <IonListHeader>Inbox</IonListHeader>
              <IonGrid>
                <IonRow>
                  <IonCol size="4">
                    {user?.img?.data ? (
                      <IonImg
                        src={`data:image/${
                          user.img.contentType
                        };base64,${Buffer.from(user?.img?.data).toString(
                          "base64"
                        )}`}
                      />
                    ) : (
                      <IonImg src={"assets/no_image_available.jpeg"}></IonImg>
                    )}
                  </IonCol>
                </IonRow>
              </IonGrid>
              <IonNote>
                {user?.email}
                <br></br>
                {user?.role}
              </IonNote>
              {(user?.role === "ADMIN" ? adminPages : userPages).map(
                (appPage, index) => {
                  return (
                    <IonMenuToggle key={index} autoHide={false}>
                      <IonItem
                        className={
                          location.pathname === appPage.url ? "selected" : ""
                        }
                        routerLink={appPage.url}
                        routerDirection="none"
                        lines="none"
                        detail={false}
                      >
                        <IonIcon
                          slot="start"
                          ios={appPage.iosIcon}
                          md={appPage.mdIcon}
                        />
                        <IonLabel>{appPage.title}</IonLabel>
                      </IonItem>
                    </IonMenuToggle>
                  );
                }
              )}
            </IonList>
          </IonContent>
          <IonFooter>
            <IonToolbar
              style={{
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 8,
                paddingBottom: 8,
              }}
            >
              <IonMenuToggle></IonMenuToggle>
            </IonToolbar>
            <IonButton
              expand="block"
              fill="outline"
              type="button"
              onClick={async () => {
                await logOut();
                history.replace("/login");
              }}
            >
              LOGOUT
            </IonButton>
          </IonFooter>{" "}
        </>
      ) : null}
    </IonMenu>
  );
};

export default React.memo(Menu);
