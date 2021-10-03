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
import Medications from "./MedicationsComponent/Medications";


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
        medications: {
          date: data.medications.date,
          dosage: data.medications.dosage,
          medication: data.medications.medication,
          reason: data.medications.reason,
          sideEffects: data.medications.sideEffects,
          time: data.medications.time,
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
                <IonLabel>Medications</IonLabel>
              </button>
              <div className="panel">
                <Medications
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

