import {
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React from "react";
import { useFormContext } from "react-hook-form";

const DemoInfo: React.FC<{
  initialValues: any
}> = ({ initialValues }) => {
  const { register, formState } = useFormContext(); // retrieve all hook methods
  return (
    <div>
      <IonGrid>
        {/* street 1*/}
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Name</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name={'demoForm.name'}
              ></IonInput>
            </IonItem>
            <p>{formState.errors[`${initialValues}`]?.name?.message}</p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Preferred Name</IonLabel>
              <IonInput
                type="text"
                ref={register({ required: false })}
                name={'demoForm.preferredName'}
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Provider</IonLabel>
              <IonInput
                type="text"
                ref={register({ required: false })}
                name={'demoForm.provider'}
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Admission Date</IonLabel>
              <IonInput
                type="number"
                ref={register}
                name={'demoForm.date'}
              ></IonInput>
            </IonItem>
            <p>{formState.errors[`${initialValues}`]?.date?.message}</p>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>Address</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name={'demoForm.address'}
              ></IonInput>
            </IonItem>
            <p>{formState.errors[`${initialValues}`]?.address?.message}</p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonItem>
              <IonLabel>Phone Number</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name={'demoForm.number'}
              ></IonInput>
            </IonItem>
            <p>{formState.errors[`${initialValues}`]?.reason?.message}</p>
          </IonCol>
          <IonCol size="6">
            <IonItem>
              <IonLabel>Mailing Address</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name={'demoForm.sideEffects'}
              ></IonInput>
            </IonItem>
            <p>{formState.errors[`${initialValues}`]?.sideEffects?.message}</p>
          </IonCol>
          <IonCol size="6">
            <IonItem>
              <IonLabel>Guardian/SCDM</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name={'demoForm.guardian'}
              ></IonInput>
            </IonItem>
            <p>{formState.errors[`${initialValues}`]?.sideEffects?.message}</p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonItem>
              <IonLabel>Sex</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name={'demoForm.sex'}
              ></IonInput>
            </IonItem>
            <p>{formState.errors[`${initialValues}`]?.sideEffects?.message}</p>
          </IonCol>
          <IonCol size="6">
            <IonItem>
              <IonLabel>Birthdate</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name={'demoForm.birthdate'}
              ></IonInput>
            </IonItem>
            <p>{formState.errors[`${initialValues}`]?.sideEffects?.message}</p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonItem>
              <IonLabel>Age</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name={'demoForm.age'}
              ></IonInput>
            </IonItem>
            <p>{formState.errors[`${initialValues}`]?.sideEffects?.message}</p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonLabel>Marital Status</IonLabel>
            <IonRadioGroup>
              <IonItem>
                <IonLabel>Single</IonLabel>
                <IonRadio value="single" />
              </IonItem>

              <IonItem>
                <IonLabel>Married</IonLabel>
                <IonRadio value="married" />
              </IonItem>

              <IonItem>
                <IonLabel>Divorced</IonLabel>
                <IonRadio value="divorced" />
              </IonItem>

              <IonItem>
                <IonLabel>Widow(er)</IonLabel>
                <IonRadio value="widow" />
              </IonItem>
            </IonRadioGroup>
            <p>{formState.errors[`${initialValues}`]?.sideEffects?.message}</p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonItem>
              <IonLabel>Race</IonLabel>
              <IonSelect>
                <IonSelectOption>Black</IonSelectOption>
                <IonSelectOption>White</IonSelectOption>
                <IonSelectOption>Asian</IonSelectOption>
              </IonSelect>
            </IonItem>
            <p>{formState.errors[`${initialValues}`]?.sideEffects?.message}</p>
          </IonCol>
          <IonCol size="6">
            <IonItem>
              <IonLabel>Primary Lang</IonLabel>
              <IonSelect>
                <IonSelectOption>English</IonSelectOption>
                <IonSelectOption>French</IonSelectOption>
                <IonSelectOption>Spanish</IonSelectOption>
              </IonSelect>
            </IonItem>
            <p>{formState.errors[`${initialValues}`]?.sideEffects?.message}</p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonItem>
              <IonLabel>Birthplace</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name={'demoForm.birthplace'}
              ></IonInput>
            </IonItem>
            <p>{formState.errors[`${initialValues}`]?.sideEffects?.message}</p>
          </IonCol>
          <IonCol size="6">
            <IonItem>
              <IonLabel>Maiden Name</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name={'demoForm.maidenName'}
              ></IonInput>
            </IonItem>
            <p>{formState.errors[`${initialValues}`]?.sideEffects?.message}</p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonItem>
              <IonLabel>Medicare (HIC)</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name={'demoForm.medicare'}
              ></IonInput>
            </IonItem>
            <p>{formState.errors[`${initialValues}`]?.sideEffects?.message}</p>
          </IonCol>
          <IonCol size="6">
            <IonItem>
              <IonLabel>Medicare ID</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name={'demoForm.medicareID'}
              ></IonInput>
            </IonItem>
            <p>{formState.errors[`${initialValues}`]?.sideEffects?.message}</p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonItem>
              <IonLabel>DC Medicaid #</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name={'demoForm.Medicaid'}
              ></IonInput>
            </IonItem>
            <p>{formState.errors[`${initialValues}`]?.sideEffects?.message}</p>
          </IonCol>
          <IonCol size="6">
            <IonItem>
              <IonLabel>Social Security</IonLabel>
              <IonInput
                type="text"
                ref={register}
                name={'demoForm.security'}
              ></IonInput>
            </IonItem>
            <p>{formState.errors[`${initialValues}`]?.sideEffects?.message}</p>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};
export default React.memo(DemoInfo);
