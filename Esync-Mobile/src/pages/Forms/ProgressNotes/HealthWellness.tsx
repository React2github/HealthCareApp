import { ErrorMessage } from "@hookform/error-message";
import {
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonToggle,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const HealthWellness: React.FC<{
  initialValues: any;
}> = ({ initialValues }) => {
  const { register, errors, setValue } = useFormContext(); // retrieve all hook methods
  const [medications, setMedications] = useState(false);
  const [sideEffects, setSideEffects] = useState(false);
  const [equipment, setEquipment] = useState(false);
  const [needsRepair, setNeedsRepair] = useState(false);
  const [seizure, setSeizure] = useState(false);
  const [exercise, setExercise] = useState(false);

  useEffect(() => {
    // this sets form values if they are provided
    if (initialValues) {
      // setEditMode(true);
      debugger;
      setMedications(initialValues?.health_wellness.medications);
      setSideEffects(initialValues?.health_wellness.sideEffects);
      setEquipment(initialValues?.health_wellness.equipment);
      setNeedsRepair(initialValues?.health_wellness.equipment_needs_repair);
      setSeizure(initialValues?.health_wellness.seizure);
      setExercise(initialValues?.health_wellness.exercise);

      setValue(
        "health_wellness.exercise_notes",
        initialValues?.health_wellness.exercise_notes
      );
      setValue(
        "health_wellness.equipment_notes",
        initialValues?.health_wellness.equipment_notes
      );
      setValue(
        "health_wellness.sideEffects_notes",
        initialValues?.health_wellness.sideEffects_notes
      );
    }
  }, [initialValues, setValue]);

  return (
    <div style={{ fontWeight: "normal", fontSize: "smaller" }}>
      <h3>Health & Wellness</h3>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Medications: {JSON.stringify(medications)}</IonLabel>
              <IonToggle
                checked={medications}
                ref={register({ required: "Medication is required" })}
                name="health_wellness['medications']"
                onIonChange={(e) => setMedications(e.detail.checked)}
              />
            </IonItem>
            <span className="error-message">
              <ErrorMessage
                name="health_wellness.medications"
                errors={errors}
              />
            </span>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>Side Effects: {JSON.stringify(sideEffects)}</IonLabel>
              <IonToggle
                checked={sideEffects}
                ref={register({ required: "Side Effects are required" })}
                name="health_wellness['sideEffects']"
                onIonChange={(e) => setSideEffects(e.detail.checked)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Notes</IonLabel>
              <IonInput
                type="text"
                defaultValue={initialValues?.health_wellness?.sideEffects_notes}
                ref={register({ required: "sideEffects notes is required" })}
                name="health_wellness.sideEffects_notes"
              ></IonInput>
            </IonItem>
            <span className="error-message">
              <ErrorMessage
                name="health_wellness.sideEffects_notes"
                errors={errors}
              />
            </span>
          </IonCol>
        </IonRow>
        <div
          style={{
            background: "black",
            height: 2,
            marginTop: 6,
            marginBottom: 6,
          }}
        />
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>
                Adaptive Equipment: {JSON.stringify(equipment)}
              </IonLabel>
              <IonToggle
                ref={register({ required: "Adaptive Equipment is required" })}
                name="health_wellness['equipment']"
                checked={equipment}
                onIonChange={(e) => setEquipment(e.detail.checked)}
              />
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>Needs Repair: {JSON.stringify(needsRepair)}</IonLabel>
              <IonToggle
                checked={needsRepair}
                ref={register({ required: "Needs Repair is required" })}
                name="health_wellness['equipment_needs_repair']"
                onIonChange={(e) => setNeedsRepair(e.detail.checked)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Notes</IonLabel>
              <IonInput
                type="text"
                ref={register({ required: "equipment notes is required" })}
                name="health_wellness.equipment_notes"
              ></IonInput>
            </IonItem>
            <span className="error-message">
              <ErrorMessage
                name="health_wellness.equipment_notes"
                errors={errors}
              />
            </span>
          </IonCol>
        </IonRow>
        <div
          style={{
            background: "black",
            height: 2,
            marginTop: 6,
            marginBottom: 6,
          }}
        />

        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Seizures: {JSON.stringify(seizure)}</IonLabel>
              <IonToggle
                checked={seizure}
                ref={register({ required: "Seizures are required" })}
                name="health_wellness['seizure']"
                onIonChange={(e) => setSeizure(e.detail.checked)}
              />
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>Exercise: {JSON.stringify(exercise)}</IonLabel>
              <IonToggle
                checked={exercise}
                ref={register({ required: "Exercise is required" })}
                name="health_wellness['exercise']"
                onIonChange={(e) => setExercise(e.detail.checked)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Notes</IonLabel>
              <IonInput
                type="text"
                ref={register({ required: "exercise notes is required" })}
                name="health_wellness.exercise_notes"
              ></IonInput>
            </IonItem>
            <span className="error-message">
              <ErrorMessage
                name="health_wellness.exercise_notes"
                errors={errors}
              />
            </span>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};
export default React.memo(HealthWellness);
