import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonLabel,
  IonButton,
  IonLoading,
} from "@ionic/react";
import React, { useState } from "react";

import { useHistory, useParams } from "react-router";


import { useForm, FormProvider } from "react-hook-form";
import { useAuth } from "../../../../hooks/auth";
import { useUpdateDemo } from "../../../../hooks/demo-data";
import { useGetPatient } from "../../../../hooks/patients-data";
import PersonSupport from "./PersonSupportComponent/PersonSupport";



const MainDemoForm: React.FC<any>
  = () => {
    const { patientId} = useParams<{
      patientId: string;
    }>();
    const { authInfo } = useAuth();
    const { status, data: patientData } = useGetPatient(patientId, authInfo);
    const history = useHistory();

    const {
      mutate: addDemo,
    } = useUpdateDemo();

    const [editMode, setEditMode] = useState(patientId ? true : false);

    // react-hook-form hook for managing form validation
    const methods = useForm();
    console.log("Errors:", methods.errors);
    console.log("Values:", methods.getValues());

    // OnSubmit for form 

    const onSubmit = async (data: { [x: string]: any }) => {
      var server = {
        peopleSupport: {
          admire: data.peopleSupport.admire,
          coworkers: data.peopleSupport.coworkers,
          daySupports: data.peopleSupport.daySupports,
          family: data.peopleSupport.family,
          friends: data.peopleSupport.friends,
          importantFor: data.peopleSupport.importantFor,
          importantTo: data.peopleSupport.importantTo,
          paidSupports: data.peopleSupport.paidSupports,
          residential: data.peopleSupport.residential,
          things: data.peopleSupport.things,
        },
      };


      const serverData = { ...server };

      console.log(serverData)

      if (editMode) {
        await addDemo({
          params: { ...patientData, serverData},
          Id: patientId,
          authInfo,
        });
      }


      // // go back to lists of location
      // history.goBack();
    };


    if (status === "loading") {
      return <IonLoading isOpen={true} />;
    }

    console.log("Errors:", methods.errors);
    console.log("Values:", methods.getValues());



    // Toggle for collapsible Menu

    const headerClicked = (_event: any) => {
      console.log(_event);
      _event.currentTarget.classList.toggle("active");
      /* Toggle close all panels, except on that was clicked */
      const allPanels = document.getElementsByClassName("panel");
      Array.from(allPanels).forEach((panel: any) => {
        if (_event.currentTarget.nextElementSibling !== panel) {
          panel.style.maxHeight = null;
        }
        panel.previousElementSibling.classList.remove("active");
      });
      /* Toggle between hiding and showing the active panel */
      var panel = _event.currentTarget.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    };




    return (
      <IonPage>

        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>Demographics Form</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <button className="accordion" onClick={headerClicked} type="button">
                <IonLabel>Person Support</IonLabel>
              </button>
              <div className="panel">
                <PersonSupport
                  initialValues={patientData || null}
                />
              </div>
              <div className="ion-padding">
                <IonButton type="submit">
                  {editMode ? "UPDATE DemoInfo" : "Submit DemoInfo"}
                </IonButton>
                <IonButton onClick={() => history.goBack()} color="danger">
                  CANCEL
                </IonButton>
              </div>
            </form>
          </FormProvider>
        </IonContent>
      </IonPage>
    );
  };
export default MainDemoForm;

