import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonAlert,
  useIonViewWillLeave,
} from "@ionic/react";
import React, { useState } from "react";
import "./Page.css";

import { useForm, FormProvider } from "react-hook-form";
import { MyIonTextItem } from "../../components/MyIonTextItem";
import { useAuth } from "../../hooks/auth";
import { useHistory } from "react-router";

const LoginPage: React.FC = () => {
  const { logIn } = useAuth();
  const history = useHistory();
  const [showErrorAlert, setShowErrorAlert] = useState("");

  const methods = useForm({ defaultValues: { email: "", password: "" } });

  const loginUser = async (data: any) => {
    methods.clearErrors();
    methods.reset();
   
    try {
      let r = await logIn(data.email, data.password);
      console.log("user", r)
      history.replace("/home");
    } catch (e) {
      setShowErrorAlert(e.message);
    }
  };

  useIonViewWillLeave(() => {
    methods.clearErrors();
    methods.reset();
  });

  const doSubmit = async (data: any) => {
    await loginUser(data);
    history.replace("/home")
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
          </IonButtons>
          <IonTitle>LOG IN USER</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/**  Show Error when problem Logging In **/}
        <IonAlert
          isOpen={showErrorAlert !== ""}
          onDidDismiss={() => setShowErrorAlert("")}
          header={"Application Error"}
          subHeader={"Error Logging In"}
          message={showErrorAlert}
          buttons={["OK"]}
        />
        <IonCard>
          <IonCardHeader>
            <IonCardTitle></IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(doSubmit)}>
                <MyIonTextItem
                  labelName="Email"
                  name="email"
                  type="email"
                  style={{ "--padding-start": 0 }}
                  labelProps={{ position: "fixed" }}
                />
                <MyIonTextItem
                  labelName="Password"
                  name="password"
                  type="password"
                  style={{ "--padding-start": 0 }}
                  labelProps={{ position: "fixed" }}
                />
                <IonButton
                  style={{ display: "none" }}
                  id="subBtn"
                  type="submit"
                ></IonButton>
              </form>
            </FormProvider>
          </IonCardContent>
          <IonToolbar
            style={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }}
          >
            <IonButton
              expand="block"
              fill="outline"
              type="button"
              onClick={() => {
                document.getElementById("subBtn")?.click();
              }}
            >
              <span style={{ fontWeight: "bold" }}>LOGIN</span>
            </IonButton>
          </IonToolbar>
        </IonCard>

        <IonToolbar
          style={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }}
        >
          <IonRow>
            <IonCol>
              <IonButton
                type="button"
                fill="outline"
                size="small"
                expand="block"
                routerLink="/create-account"
              >
                <span style={{ fontWeight: "bold" }}>CREATE ACCOUNT</span>
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                size="small"
                type="button"
                fill="outline"
                expand="block"
                routerLink="/forgot-password"
              >
                <span style={{ fontWeight: "bold" }}>FORGOT PASSWORD</span>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(LoginPage);
