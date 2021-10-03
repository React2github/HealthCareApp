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
  IonAlert,
} from "@ionic/react";
import React, { useState } from "react";
import { useAuth } from "../../../../hooks/auth";
import { useHistory, useParams } from "react-router";


import { useForm, FormProvider } from "react-hook-form";
import { useGetPatient } from "../../../../hooks/patients-data";
import { useAddDemo, useUpdateDemo } from "../../../../hooks/demo-data";

import CareProviderForm from "./DemoInfoComponents/CareProviderForm";
import ContactsForm from "./DemoInfoComponents/ContactsForm";
import DemoInfo from "./DemoInfoComponents/DemoInfo";



const DemoInfoForm: React.FC<any>
  = () => {
    const { patientId} = useParams<{
      patientId: string;
    }>();
    const { authInfo } = useAuth();
    const { status, data: patientData } = useGetPatient(patientId, authInfo);
    const history = useHistory();
  
    const {
      mutate: addDemo,
      status: addDemoStatus,
      error: addDemoError
    } = useAddDemo();
    const {
      mutate: updateDemo,
      status: updateDemoStatus,
      error: updateDemoError
    } = useUpdateDemo();

    const [editMode, setEditMode] = useState(patientId ? true : false);

    // react-hook-form hook for managing form validation
    const methods = useForm();
    console.log("Errors:", methods.errors);
    console.log("Values:", methods.getValues());


    /**
* called to save the patient record to the database
* @param data
* @returns
*/

    const onSubmit = async (data: { [x: string]: any }) => {
      const server = {
        ...patientData,
        demoInfoForm: {
        demoForm: {
          medicaid: data.demoForm.medicaid,
          address: data.demoForm.address,
          age: data.demoForm.age,
          birthdate: data.demoForm.birthdate,
          date: data.demoForm.date,
          guardian: data.demoForm.guardian,
          maidenName: data.demoForm.maidenName,
          medicare: data.demoForm.medicare,
          medicareID: data.demoForm.medicareID,
          name: data.demoForm.name,
          number: data.demoForm.guardian,
          preferredName: data.demoForm.maidenName,
          provider: data.demoForm.medicare,
          security: data.demoForm.medicareID,
          sex: data.demoForm.name,
          sideEffects: data.demoForm.sideEffects,
        },
        provider: {
          address: data.provider.address,
          name: data.provider.name,
          phone: data.provider.phone,
          speciality: data.provider.speciality,
        },
        contact: {
          address: data.contact.address,
          name: data.contact.name,
          phone: data.contact.phone,
          relationship: data.contact.relationship,
          type: data.contact.type,
        }
      }
      };


      const serverData = { ...server };
      console.log(serverData)

      if (editMode) {
        await updateDemo({
          params: { ...serverData },
          Id: patientData._id,
          authInfo,
        });
       } 
       else {
        await addDemo({
          params: serverData,
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
        {/* <StatusAlert
          header="Create New Information Sheet"
          successMsg="Individual Created Successfully"
          status={addDemoStatus}
          error={addDemoError}
          onOk={(success: boolean) => history.goBack()}
        />
        <StatusAlert
          header="Update Information Sheet"
          successMsg="Individual Updated Successfully"
          status={updateDemoStatus}
          error={updateDemoError}
          onOk={(success: boolean) => history.goBack()}
        /> */}

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <button className="accordion" onClick={headerClicked} type="button">
                <IonLabel>Demo Info</IonLabel>
              </button>
              <div className="panel">
                <DemoInfo
                  initialValues={patientData || null}
                />
              </div>
              <button className="accordion" onClick={headerClicked} type="button">
                <IonLabel>Care Providers</IonLabel>
              </button>
              <div className="panel">
                <CareProviderForm />
              </div>
              <button className="accordion" onClick={headerClicked} type="button">
                <IonLabel>Contacts</IonLabel>
              </button>
              <div className="panel">
                <ContactsForm />
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
export default DemoInfoForm;

export interface StatusAlertProps {
  status: string;
  error: any;
  header: string;
  successMsg: string;
  onOk: any;
}

const StatusAlert: React.FC<StatusAlertProps> = ({
  status,
  header,
  successMsg,
  error,
  onOk,
}) => {
  return (
    <IonAlert
      header={header}
      message={
        status === "error" ? "Error: " + (error as any).message : successMsg
      }
      isOpen={status === "success" || status === "error"}
      buttons={[{ text: "OK", handler: () => onOk(status === "success") }]}
    />
  );
};