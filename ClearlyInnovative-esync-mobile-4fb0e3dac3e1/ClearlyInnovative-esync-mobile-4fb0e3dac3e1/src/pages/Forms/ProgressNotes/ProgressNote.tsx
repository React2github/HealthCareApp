import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButton,
  IonLabel,
  IonLoading,
  IonAlert,
} from "@ionic/react";
import React, { useState } from "react";
import { useAuth } from "../../../hooks/auth";
import { useHistory, useParams } from "react-router";
import TextAreaInput from "../../../components/TextAreaInput";
import ActivitiesPicker from "./ActivitiesPicker";
// import BehaviorDescription from "./BehaviorDescription";
import FluidInfo from "./FluidInfo";
import HealthWellness from "./HealthWellness";
import MealsInfo from "./MealsInfo";
// import ServicesDescription from "./ServicesDescription";
// import SleepBehaviorDescription from "./SleepBehaviorDescription";

import { useForm, FormProvider } from "react-hook-form";
import PatientsDetail from "../Patients/PatientsDetail";
import { useGetPatient } from "../../../hooks/patients-data";
import {
  useAddProgressNote,
  useGetProgressNote,
  useUpdateProgressNote,
} from "../../../hooks/progress-notes-data";
import { ErrorMessage } from "@hookform/error-message";

const ProgressNote: React.FC<{ initialValues: any }> = ({ initialValues }) => {
  const { patientId, noteId } = useParams<{
    noteId: string;
    patientId: string;
  }>();
  const history = useHistory();
  const { authInfo } = useAuth();

  const {
    mutateAsync: updateProgressNote,
    status: updateProgressNoteStatus,
    error: updateProgressNoteError,
  } = useUpdateProgressNote();

  const { progressNoteId } = useParams<{ progressNoteId: string }>();
  const [editMode, setEditMode] = useState(noteId ? true : false);

  // useEffect(() => {
  //   // this sets form values if they are provided
  //   if (initialValues) {
  //     Object.keys(initialValues).map((k) => {
  //       setValue(k, initialValues[k]);
  //     });
  //     setEditMode(true);
  //   }
  // }, [initialValues]);

  /* hook for retrieving the patient when form is presented */
  const { status, data: patientData, error 
  } = useGetPatient(
    patientId,
    authInfo
  );
  const { data: ProgressNoteData } = useGetProgressNote(noteId, authInfo);
  const {
    mutate: addProgressNote,
    status: addProgressNoteStatus,
    error: addProgressNoteError,
  } = useAddProgressNote();
  console.log(ProgressNoteData);
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
    var server = {
      activities: data.header.activities,
      protein: data.meals.protein,
      fruit: data.meals.fruit,
      grains: data.meals.grains,
      vegetables: data.meals.vegetables,
      otherMealAmount: data.meals.otherMealAmount,
      otherMealDescription: data.meals.otherMealDescription,
      otherFluidAmount: data.fluids.otherFluidAmount,
      otherFluidDescription: data.fluids.otherFluidDescription,
      juices: data.fluids.juices,
      water: data.fluids.water,
      one: data.one,
      two: data.two,
      three: data.three,
      four: data.four,
      five: data.five,
      six: data.six,
      seven: data.seven,
      eight: data.eight,
      health_wellness: data.health_wellness,
      patientId: { patientData }.patientData.id,
    };
    const serverData = { ...server };

    if (editMode) {
      console.log(ProgressNoteData);
      await updateProgressNote({
        params: {
          ...serverData,
          id: ProgressNoteData._id,
          patientId: patientId,
        },
        authInfo,
      });
    } else {
      await addProgressNote({
        params: serverData,
        authInfo,
      });
    }
  };

  if (status === "loading") {
    return <IonLoading isOpen={true} />;
  }

  /**
   * this code handles toggling open the accordians in the
   * view
   *
   * @param _event
   */
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

  /**
   *
   * @param data
   */
  // const onErrors = (data: any) => {
  //   alert("Form Is Not Complete");
  // };
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions

  // here we handle display the error message and the loading
  // screen when the page is first being opened
  // if (!patientData && !error) {
  //   return (
  //     <IonLoading message={"Loading Patient Information..."} isOpen={true} />
  //   );
  // } else if (error) {
  //   return (
  //     <IonAlert
  //       message={"Error Retrieving Patient Information"}
  //       isOpen={status === "error"}
  //       buttons={["OK"]}
  //       onDidDismiss={() => {
  //         history.goBack();
  //       }}
  //     />
  //   );
  // }
  
 


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Progress Note</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* ALERT FOR STATUS ON CREATING PROGRESS NOTE */}
        <IonAlert
          header="CREATE NEW PROGRESS NOTE"
          message={
            addProgressNoteStatus === "error"
              ? "Error: " + (addProgressNoteError as any).message
              : "Progress Note Created Successfully"
          }
          isOpen={
            addProgressNoteStatus === "success" ||
            addProgressNoteStatus === "error"
          }
          buttons={["OK"]}
          onDidDismiss={() => {
            addProgressNoteStatus === "success" && history.goBack();
          }}
        />

        {/* Alert for Updating Progress Note */}
        <IonAlert
          header="Update PROGRESS NOTE"
          message={
            updateProgressNoteStatus === "error"
              ? "Error: " + (updateProgressNoteError as any).message
              : "Progress Note Updated Successfully"
          }
          isOpen={
            updateProgressNoteStatus === "success" ||
            updateProgressNoteStatus === "error"
          }
          buttons={["OK"]}
          onDidDismiss={() => {
            updateProgressNoteStatus === "success" && history.goBack();
          }}
        />

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <button className="accordion" onClick={headerClicked} type="button">
              <IonLabel>Individual's Info</IonLabel>
            </button>
            <div className="panel" style={{ width: "100%" }}>
              <PatientsDetail
                patientData={patientData}
                displayActions={false}
              />
            </div>
            <button className="accordion" onClick={headerClicked} type="button">
              <IonLabel
                className={`${methods.errors.header && "error-message"}`}
              >
                Activities
              </IonLabel>
            </button>
            <div className="panel">
              <ActivitiesPicker initialValues={ProgressNoteData || null} />
            </div>
            {/*  <button className="accordion" onClick={headerClicked}>
          Services Description
        </button>
         <div className="panel">
          <ServicesDescription />
        </div>
        <button className="accordion" onClick={headerClicked}>
          Behavior Reporting
        </button>
        <div className="panel">
          <BehaviorDescription />
        </div> */}
            <button className="accordion" onClick={headerClicked} type="button">
              <IonLabel
                className={`${
                  methods.errors.health_wellness && "error-message"
                }`}
              >
                Health / Wellness
              </IonLabel>
            </button>
            <div className="panel">
              <HealthWellness initialValues={ProgressNoteData || null}/>
            </div>
            <button className="accordion" onClick={headerClicked} type="button">
              <IonLabel
                className={`${methods.errors.meals && "error-message"}`}
              >
                Meals / Fluids
              </IonLabel>
            </button>
            <div className="panel">
              <MealsInfo  initialValues={ProgressNoteData || null}/>
              <FluidInfo  initialValues={ProgressNoteData || null}/>
            </div>
            {/* <button className="accordion" onClick={headerClicked}>
          Bathroom / Eat / Sleep
        </button>
        <div className="panel">
          <SleepBehaviorDescription />
        </div> */}
            <button className="accordion" onClick={headerClicked} type="button">
              <IonLabel
                className={`${methods.errors.extra && "error-message"}`}
              >
                Additional Questions
              </IonLabel>
            </button>
            <div className="panel">
              <TextAreaInput
                name={"one"}
                title={"Summary of other activities"}
                description={""}
                initialValues={ProgressNoteData || null}
              />
              <span className="error-message">
                <ErrorMessage name="one" errors={methods.errors} />
              </span>
              <TextAreaInput
                name={"two"}
                title={
                  "Name of the activity Location of Activity Length of Time in activity Who did they interact with What worked well? "
                }
                description={""}
                initialValues={ProgressNoteData || null}
              />
              <span className="error-message">
                <ErrorMessage name="two" errors={methods.errors} />
              </span>
              <TextAreaInput
                name={"three"}
                title={
                  "What did the person like about the activity, the place and/or people they interacted with?"
                }
                description={""}
                initialValues={ProgressNoteData || null}
              />
              <span className="error-message">
                <ErrorMessage name="three" errors={methods.errors} />
              </span>
              <TextAreaInput
                name={"four"}
                title={
                  "What did not work well? What did the person like about the activity, the place and/or people they interacted with?"
                }
                description={""}
                initialValues={ProgressNoteData || null}
              />
              <span className="error-message">
                <ErrorMessage name="four" errors={methods.errors} />
              </span>
              <TextAreaInput
                name={"five"}
                title={
                  "What barriers if any encountered with planning and or participating in the activity?"
                }
                description={""}
                initialValues={ProgressNoteData || null}
              />
              <span className="error-message">
                <ErrorMessage name="five" errors={methods.errors} />
              </span>
              <TextAreaInput
                name={"six"}
                title={
                  "What specific outcome/goal area addressed with this activity? "
                }
                description={""}
                initialValues={ProgressNoteData || null}
              />
              <span className="error-message">
                <ErrorMessage name="six" errors={methods.errors} />
              </span>
              <TextAreaInput
                name={"seven"}
                title={
                  "What skills did the person use during this activity (already possessed/mastered) or (skills being developed or learned)  during this activity."
                }
                description={""}
                initialValues={ProgressNoteData || null}
              />
              <span className="error-message">
                <ErrorMessage name="seven" errors={methods.errors} />
              </span>
              <TextAreaInput
                name={"eight"}
                title={
                  "Describe progress on skills being developed or learned, teaching methods used and the effectiveness of the teaching  methods used by the DSP for this activity."
                }
                description={""}
                initialValues={ProgressNoteData || null}
              />
              <span className="error-message">
                <ErrorMessage name="eight" errors={methods.errors} />
              </span>
            </div>
            <div className="ion-padding">
              <IonButton type="submit">
                {editMode ? "UPDATE ProgressNote" : "Submit ProgressNote"}
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

export default ProgressNote;
