import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import HealthWellness from "../pages/Forms/ProgressNotes/HealthWellness";
import { FormProvider, useForm } from "react-hook-form";
import { IonButton } from "@ionic/react";

export default {
  title: "ProgressNoteComponents/HealthWellness",
  component: HealthWellness,
  argTypes: { onSave: { action: 'onSave' } },
} as Meta;

const Template: Story<any> = (args) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => args.onSave(data))}
      >
        <HealthWellness {...args} />
        <IonButton type="submit">SAVE</IonButton>
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  primary: true,
  label: "Button",
};
