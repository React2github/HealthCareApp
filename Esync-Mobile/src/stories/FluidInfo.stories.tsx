import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import FluidInfo from "../pages/Forms/ProgressNotes/FluidInfo";
import { FormProvider, useForm } from "react-hook-form";
import { IonButton } from "@ionic/react";

export default {
  title: "ProgressNoteComponents/FluidInfo",
  component: FluidInfo,
  argTypes: { onSave: { action: 'onSave' } },
} as Meta;


const Template: Story<any> = (args) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => args.onSave(data))}
      >
        <FluidInfo {...args} />
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
