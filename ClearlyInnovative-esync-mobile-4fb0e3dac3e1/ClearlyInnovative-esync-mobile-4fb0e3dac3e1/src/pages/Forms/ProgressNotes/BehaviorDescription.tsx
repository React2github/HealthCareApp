import {
  IonButton,
  IonCard,
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const BehaviorDescription: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();
  const [serv, setServ] = useState<any>([
    {
      antecedent: "",
      behavior: "",
      consequence: "",
      start: "",
      end: "",
    },
  ]);
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  console.log(errors);
  return (
    <div style={{ height: "100%" }}>
      <h3>
        Behavior(s)/Unusual Event(s)/Incident(s) (Please be Specific in
        documenting Target Behavior(s)
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IonList>
          {serv.map((i: any, index: number) => {
            return (
              <div key={index}>
                <IonCard>
                  <IonItem>
                    <IonLabel>Antecedent</IonLabel>
                    <IonInput
                      type="text"
                      name={`antecedent[${index}]`}
                      placeholder="Antecedent"
                      ref={register({ required: "Antecedent Is Required" })}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Behavior</IonLabel>
                    <IonInput
                      type="text"
                      name={`behavior[${index}]`}
                      placeholder="Behavior"
                      ref={register({ required: "Behavior Is Required" })}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Consequence</IonLabel>
                    <IonInput
                      type="text"
                      name={`consequence[${index}]`}
                      placeholder="Consequence"
                      ref={register({ required: "Consequence Is Required" })}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Start</IonLabel>
                    <IonDatetime
                      minuteValues={"0,10,20,30,40,45,50"}
                      displayFormat="h:mm A"
                      name={`start[${index}]`}
                      placeholder="start time"
                      ref={register({ required: "Start Time Is Required" })}
                    ></IonDatetime>
                  </IonItem>
                  <IonItem>
                    <IonLabel>End</IonLabel>
                    <IonDatetime
                      minuteValues={"0,10,20,30,40,45,50"}
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
        </IonList>

        <IonButton
          type="button"
          onClick={(_event: any) => {
            setServ([
              ...serv,
              {
                antecedent: "",
                behavior: "",
                consequence: "",
                start: "",
                end: "",
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
export default React.memo(BehaviorDescription);
