import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonContent,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonInput,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { trashOutline } from "ionicons/icons";


import { useForm, useFieldArray, Controller } from "react-hook-form";
const MyModal: React.FunctionComponent<{
  initialData?: any;
  isOpen: boolean;
  onClose: Function;
}> = ({ initialData, isOpen, onClose }) => {
  const [dataName, setDataName] = useState<string | null | undefined>();

  useEffect(() => {
    setDataName(initialData?.name);
  }, [initialData]);

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contacts Modal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <TaskList
          onComplete={(data: any, cancelled: boolean) =>
            onClose({ cancelled, data })
          }
        />
      </IonContent>
    </IonModal>
  );
};

export default MyModal;

const TaskList: React.FC<any> = ({ onComplete }) => {
  const { control, register, handleSubmit, getValues } = useForm();
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "tasks", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  console.log(getValues());

  const doSubmit = (data: any) => {
    let returnData = data;
    delete returnData["task-input"];
    console.log("TASK DATA", returnData);
    onComplete(returnData, false);
  };

  return (
    <form onSubmit={handleSubmit(doSubmit)}>
      <IonItem style={{ "--padding-start": 0 }}>
        <IonLabel>Objective:</IonLabel>
        <Controller
          render={({ onChange }) => (
            <IonInput type="text" onIonChange={onChange} />
          )}
          control={control}
          defaultValue=""
          name="task-title"
        />
      </IonItem>

      <IonCard>
        <IonCardContent>
          <IonItem style={{ "--padding-start": 0 }}>
            <IonLabel>Task:</IonLabel>
            <Controller
              render={({ onChange }) => (
                <IonInput type="text" onIonChange={onChange} />
              )}
              control={control}
              defaultValue=""
              name="task-input"
            />
          </IonItem>
          <IonItem lines="none" style={{ "--padding-start": 0 }}>
            <IonButton
              onClick={() =>
                append({ id: Date.now(), subTask: getValues("task-input") })
              }
            >
              Add Task To Objective
            </IonButton>
          </IonItem>
        </IonCardContent>
      </IonCard>
      <p>List of Tasks:</p>
      {fields.map((task: any, index: number) => {
        return (
          <IonItem key={task.id} style={{ "--padding-start": 0 }}>
            <IonIcon
              icon={trashOutline}
              onClick={() => remove(index)}
              slot="end"
            />
            <input
              type="hidden"
              name={`tasks[${index}].id`}
              ref={register()}
              defaultValue={task.id}
            />
            <Controller
              render={({ value, onChange }) => (
                <IonInput
                  type="text"
                  onIonChange={onChange}
                  name={`tasks[${index}].subTask`}
                  ref={register}
                  value={value}
                />
              )}
              control={control}
              defaultValue={task.subTask} // make sure to set up defaultValue
              name={`tasks[${index}].subTask`}
            />
          </IonItem>
        );
      })}
      <IonButton type="submit">SAVE IT ALL</IonButton>
      <IonButton onClick={() => onComplete(null, true)} color="danger">
        CANCEL
      </IonButton>
    </form>
  );
};