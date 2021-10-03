import {
  IonButton,
  IonCard,
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const SleepBehaviorDescription: React.FC = () => {
  const { register, handleSubmit, errors, control } = useForm();
  const [serv, setServ] = useState<any>([
    {
      action: "",
      start: "",
      end: "",
      description: "",
    },
  ]);
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  console.log(errors);
  return (
    <div>
      <h3>
        Behavior(s)/Unusual Event(s)/Incident(s) (Please be Specific in
        documenting Target Behavior(s)
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {serv.map((i: any, index: number) => {
          return (
            <div key={index}>
              <IonCard>
                <IonItem>
                  <IonLabel>Action</IonLabel>

                  <Controller
                    name={`action[${index}]`}
                    render={({ value, onChange, ref }) => (
                      <IonSelect
                        name={`action[${index}]`}
                        value={value}
                        ref={register}
                        onIonChange={onChange}
                      >
                        <IonSelectOption value="A">Awake</IonSelectOption>
                        <IonSelectOption value="B">Bathroom</IonSelectOption>
                        <IonSelectOption value="E">Eat</IonSelectOption>
                        <IonSelectOption value="S">Sleep</IonSelectOption>
                      </IonSelect>
                    )}
                    control={control}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel>Description</IonLabel>
                  <IonInput
                    type="text"
                    name={`description[${index}]`}
                    placeholder="Description"
                    ref={register({ required: "Description Is Required" })}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel>Start</IonLabel>
                  <IonDatetime
                    minuteValues={"0"}
                    displayFormat="h:mm A"
                    name={`start[${index}]`}
                    placeholder="start time"
                    ref={register({ required: "Start Time Is Required" })}
                  ></IonDatetime>
                </IonItem>
                <IonItem>
                  <IonLabel>End</IonLabel>
                  <IonDatetime
                    minuteValues={"0"}
                    displayFormat="h:mm A"
                    name={`end[${index}]`}
                    placeholder="end time"
                    ref={register({ required: "End Time Is Required" })}
                  ></IonDatetime>
                </IonItem>
              </IonCard>
            </div>
          );
        })}

        <IonButton
          type="button"
          onClick={(_event: any) => {
            setServ([
              ...serv,
              {
                action: "",
                start: "",
                end: "",
                description: "",
              },
            ]);
            const panel =
              _event.target.parentElement.parentElement.parentElement;
            setTimeout(() => {
              panel.style.maxHeight = panel.scrollHeight + "px";
            }, 200);
          }}
        >
          Add Service
        </IonButton>
        <IonButton type="submit">Finished</IonButton>
      </form>
    </div>
  );
};
export default React.memo(SleepBehaviorDescription);
