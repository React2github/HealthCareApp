import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import PatientInfoForm from "../../pages/Forms/ProgressNotes/PatientInfoForm";
import { IonButton } from "@ionic/react";
import { useForm, FormProvider } from "react-hook-form";

export default {
  title: "PatientComponents/PatientInfoForm",
  component: PatientInfoForm,
  argTypes: { onSave: { action: "onSave" } },
} as Meta;

// const Template: Story<any> = (args) => <PatientInfoForm {...args} />;
const Template: Story<any> = (args) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => args.onSave(data))}>
        <PatientInfoForm {...args} />
        <IonButton type="submit">SAVE</IonButton>
      </form>
    </FormProvider>
  );
};
export const Default = Template.bind({});
Default.args = {};
