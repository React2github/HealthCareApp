import React from "react";
import { IonItem, IonLabel, IonInput } from "@ionic/react";
import { Controller } from "react-hook-form";
import { MyErrorDisplay } from "./MyErrorDisplay";
import { useFormContext } from "react-hook-form";
/**
 * custom component to render the text fields
 * @param param0
 */
export const MyIonTextItem: React.FunctionComponent<{
  name: string;
  type?: any;
  optional?: boolean;
  labelName: string;
  labelProps?: any;
  style?: any;
}> = ({ name, labelName, type, optional, style, labelProps }) => {
  const { control, errors, register } = useFormContext();

  // type email
  const emailRules = {
    required: "'Email Address' is a required field",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: "Invalid email address",
    },
  };

  let defaultRules = optional
    ? { required: false }
    : {
        required: labelName + " is a required field",
      };

  return (
    <>
      <IonItem style={style}>
        <IonLabel {...labelProps}>{labelName}</IonLabel>
        <Controller
          name={name}
          autocomplete="new-password"
          render={({ value, onChange, ref }) => (
            <IonInput
              autocomplete="new-password"
              name={name}
              type={type ? type : "text"}
              ref={register}
              step={type === "number" ? "any" : undefined}
              onIonChange={onChange}
            />
          )}
          control={control}
          rules={type === "email" ? emailRules : defaultRules}
        />
      </IonItem>
      <MyErrorDisplay errors={errors} elementName={name} />
    </>
  );
};
