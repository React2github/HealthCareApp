import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonText,
  IonCardSubtitle,
} from "@ionic/react";
import React from "react";
import "./Page.css";

import { useForm, FormProvider } from "react-hook-form";
import { MyIonTextItem } from "../../components/MyIonTextItem";

const ForgotPasswordPage: React.FC = () => {

  const methods = useForm({ defaultValues: { email: "" } });

  const sendEmail = (data: any) => {
    console.log(data);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Forgot Password</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>
              <IonText style={{ paddingBottom: 16 }}>
                 I forgot my password and I need it sent
              </IonText>
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(sendEmail)}>
                <MyIonTextItem
                  labelName="Email"
                  name="email"
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
              <span style={{ fontWeight: "bold" }}>SEND EMAIL</span>
            </IonButton>
          </IonToolbar>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(ForgotPasswordPage);
