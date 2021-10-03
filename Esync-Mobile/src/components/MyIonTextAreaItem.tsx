import React from "react";
import { IonItem, IonLabel, IonTextarea } from "@ionic/react";
import { Controller, useFormContext } from "react-hook-form";
import { MyErrorDisplay } from "./MyErrorDisplay";
/**
 * custom component to render the text fields
 * @param param0
 */
export const MyIonTextAreaItem: React.FunctionComponent<{
  name: string;
  rows: any;
  optional?: boolean;
  labelName: string;
  labelProps?: any;
  style?: any;
}> = ({ name, labelName, rows, optional, labelProps, style }) => {
  const { control, errors, register } = useFormContext();

  let defaultRules = optional
    ? { required: false }
    : {
        required: labelName + " is a required field",
      };

  return (
    <>
      <IonItem  style={style}>
        <IonLabel {...labelProps}>{labelName}</IonLabel>
        <Controller
          name={name}
          render={({ onChange }) => (
            <IonTextarea
              rows={rows}
              name={name}
              onIonChange={onChange}
              ref={register}
            />
          )}
          control={control}
          rules={defaultRules}
        />
      </IonItem>
      <MyErrorDisplay errors={errors} elementName={name} />
    </>
  );
};
