import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import LocationEntry, {
  LocationEntrySchema,
} from "../../pages/Admin/locationForm";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

export default {
  title: "admin/Location",
  component: LocationEntry,
} as Meta;


const Template: Story<any> = (args) => {
  const methods = useForm({
    mode: "onBlur",
    resolver: yupResolver(LocationEntrySchema),
  });

  const onSubmit = async (data: any ) => {
    console.log("onsubmit", data)
    }

  console.log(methods.formState.errors);
  console.log("VALUES:", methods.getValues());
  return (
    <IonPage>
      <IonContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <LocationEntry {...args} />
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
