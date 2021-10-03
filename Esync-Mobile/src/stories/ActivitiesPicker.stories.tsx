import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import ActivitiesPicker from "../pages/Forms/ProgressNotes/ActivitiesPicker";
import { FormProvider, useForm } from "react-hook-form";
import { IonButton } from "@ionic/react";

export default {
  title: "ProgressNoteComponents/ActivitiesPicker",
  component: ActivitiesPicker,
  argTypes: { onSave: { action: 'onSave' } },
} as Meta;

const Template: Story<any> = (args) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => args.onSave(data))}
      >
        <ActivitiesPicker {...args} />
        <IonButton type="submit">SAVE</IonButton>
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});

