import { IonCheckbox, IonItem, IonLabel, IonTextarea } from "@ionic/react";
import React,{ useEffect, useState } from "react";
import {  useFormContext } from "react-hook-form";
import "./TextAreaInput.css";

const TextAreaInput: React.FC<{ title: String, description?: string, textChanged?: any, name: string, initialValues?: any }> = (
  { title, description, textChanged, name, initialValues } ,props
) => {
  const { register } = useFormContext(); // retrieve all hook methods
  const [value, setValue] = useState(props.name);
  const [checked, setChecked] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (data: any) => {
    setValue(data.target.value = 'Not Applicable')
    if(checked !== true) {
      return setValue(data.target.value = '')
    }
  };
  

  function disableHandler() 
  {
  if(value === "Not Applicable" )
  {
    return true    
  };
};

useEffect(() => {
  // this sets form values if they are provided
  if (initialValues) {
    setEditMode(true);
    setValue(initialValues?.[name])
  }
}, [initialValues,name, setValue]);

  return (
    <div style={{ background: "white", padding: 10 }}>
      <h4>{title}</h4>
      <IonItem style={{ width: "100% !important" }} lines="none">
        <IonTextarea 
          className="myTextArea"
          onIonChange={textChanged}
          value={value}
          ref={register({ required: "Text is required" })}
          name={name}
          rows={4}
          readonly={disableHandler()}
        />
      </IonItem>
      <IonItem>
      <IonLabel>Not Applicable</IonLabel>
      <IonCheckbox checked={checked} onClick={handleChange} 
      onIonChange={e => setChecked(e.detail.checked)} />
      </IonItem>
      {description && <IonItem style={{ marginTop: 6 }} lines="none">
        <span style={{ fontStyle: "italic", fontSize: "smaller" }}>
          {description}
        </span>
      </IonItem>}
    </div>
  );
};

export default TextAreaInput;


