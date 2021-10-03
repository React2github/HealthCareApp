import {
  IonButton,
  IonCard,
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ServicesDescription: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();
  const [serv, setServ] = useState<any>([
    {
      description: "",
      start: "",
      end: "",
    },
  ]);
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  console.log(errors);
  return (
    <div>
      <h3>Description Of Services</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {serv.map((i: any, index: number) => {
          return (
            <div key={index}>
              <IonCard>
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

        <IonButton
          type="button"
          onClick={(_event: any) => {
            setServ([
              ...serv,
              {
                description: "",
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
export default React.memo(ServicesDescription);
