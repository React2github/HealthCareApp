import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonRow,
  IonCol,
  IonButton,
  IonAlert,
  useIonViewWillLeave,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "./Page.css";

import { useForm, FormProvider } from "react-hook-form";
import { MyIonTextItem } from "../../components/MyIonTextItem";
import { useAuth } from "../../hooks/auth";
import AddImage from "../../components/AddImage";

const CreateAccountPage: React.FC = () => {
  const [showErrorAlert, setShowErrorAlert] = useState("");
  const { createNewUser, authInfo } = useAuth();
  const [image, setImage] = useState<any>(null);

  const history = useHistory();
  const methods = useForm({
    defaultValues: {
      first: "",
      last: "",
      jobTitle: "",
      phone: "",
      username: "",
      email: "",
      password: "",
      role: "",
      image: "",
    },
  });

  console.log(methods.errors);
  console.log(methods.getValues());

  /**
   * clear errors when the users leaves the
   * page
   */
  useIonViewWillLeave(() => {
    methods.clearErrors();
    methods.reset();
  });

  /**
   * create the user when button clicked
   * @param data
   */
  const createUser = async (data: any) => {
    try {
      data.image = image?.file;

      await createNewUser(data);
      console.log("createUser: success", data);
    } catch (e) {
      setShowErrorAlert(e.message);
    } finally {
    }
  };

  /**
   * update state to hold the image that was selected by the user
   * 
   * @param data 
   */
  const handleImageChange = (data: any) => {
    console.log(data);
    setImage(data);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"></IonButtons>
          <IonTitle>CREATE ACCOUNT</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/**  Show Error when problem Logging In **/}
        <IonAlert
          isOpen={showErrorAlert !== ""}
          onDidDismiss={() => setShowErrorAlert("")}
          header={"Application Error"}
          subHeader={"Error Creating Account"}
          message={showErrorAlert}
          buttons={["OK"]}
        />

        <IonAlert
          isOpen={authInfo?.loggedIn as any}
          onDidDismiss={() => history.push("/home")}
          header={"Application Message"}
          message={"Account Created Successfully"}
          buttons={["OK"]}
        />

        <AddImage onChange={handleImageChange} />

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(createUser)}>
            <MyIonTextItem
              style={{ "--padding-start": 0 }}
              labelName="First Name"
              name="first"
              labelProps={{ position: "fixed" }}
            />
            <MyIonTextItem
              style={{ "--padding-start": 0 }}
              labelName="Last Name"
              name="last"
              labelProps={{ position: "fixed" }}
            />
            <MyIonTextItem
              style={{ "--padding-start": 0 }}
              labelName="Job Title"
              name="jobTitle"
              labelProps={{ position: "fixed" }}
            />
            <MyIonTextItem
              style={{ "--padding-start": 0 }}
              labelName="Phone"
              name="phone"
              labelProps={{ position: "fixed" }}
            />
            <MyIonTextItem
              style={{ "--padding-start": 0 }}
              labelName="Username"
              name="username"
              labelProps={{ position: "fixed" }}
            />
            <MyIonTextItem
              style={{ "--padding-start": 0 }}
              labelName="Email"
              name="email"
              labelProps={{ position: "fixed" }}
            />
            <MyIonTextItem
              style={{ "--padding-start": 0 }}
              labelName="Password"
              name="password"
              labelProps={{ position: "fixed" }}
            />
            <IonItem style={{ "--padding-start": 0 }}>
              <IonLabel>Role: </IonLabel>
              <IonSelect
                name="role"
                ref={methods.register({ required: true }) as any}
              >
                <IonSelectOption value="ADMIN">Admin</IonSelectOption>
                <IonSelectOption value="NURSE">Nurse</IonSelectOption>
                <IonSelectOption value="DSP">Direct Support Professional</IonSelectOption>
                <IonSelectOption value="QIDP">Qualified Intellectual Disability Professional</IonSelectOption>
                <IonSelectOption value="Auditors">Auditors</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonButton
              style={{ display: "none" }}
              id="subBtn-create-account"
              type="submit"
            ></IonButton>
          </form>
        </FormProvider>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonRow>
            <IonCol>
              <IonButton
                expand="block"
                fill="outline"
                type="button"
                onClick={() => {
                  document.getElementById("subBtn-create-account")?.click();
                }}
              >
                <span style={{ fontWeight: "bold" }}>SAVE</span>
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                expand="block"
                color="danger"
                type="button"
                fill="outline"
                onClick={() => {
                  history.replace("/login");
                }}
              >
                <span style={{ fontWeight: "bold" }}>CANCEL</span>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default React.memo(CreateAccountPage);
