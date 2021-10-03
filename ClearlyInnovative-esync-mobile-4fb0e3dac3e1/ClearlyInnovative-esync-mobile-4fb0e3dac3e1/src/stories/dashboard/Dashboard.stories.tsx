import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import AppointmentEntry, {
  AppointmentEntrySchema,
} from "../../pages/Admin/AppointmentEntry";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
// import { useAuth } from "../../hooks/auth";


export default {
  title: "admin/Appointment",
  component: AppointmentEntry,
} as Meta;


const Template: Story<any> = (args) => {

const onSubmit = async (data: any) => {
 console.log("Onsubmit", data)
 }


const methods = useForm({
  mode: "onBlur",
  resolver: yupResolver(AppointmentEntrySchema),
});


  console.log(methods.formState.errors);
  console.log("VALUES:", methods.getValues());
  return (
    <IonPage>
      <IonContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <AppointmentEntry {...args} />
            <IonButton type="submit">SAVE</IonButton>
            <IonButton
              type="button"
              color="danger"
              onClick={() => console.log(null)}
            >
              CANCEL
            </IonButton>
          </form>
        </FormProvider>
      </IonContent>
    </IonPage>
  );
};
export const Default = Template.bind({});
Default.args = {};
