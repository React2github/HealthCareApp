import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import TextAreaInput from "../components/TextAreaInput";
import { FormProvider, useForm } from "react-hook-form";
import { IonButton } from "@ionic/react";

export default {
  title: "ProgressNoteComponents/TextAreaInput",
  component: TextAreaInput,
  argTypes: { onSave: { action: 'onSave' } },
} as Meta;

const Template: Story<any> = (args) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => args.onSave(data))}
      >
        <TextAreaInput {...args} />
        <IonButton type="submit">SAVE</IonButton>
      </form>
    </FormProvider>
  );
  };

export const Default = Template.bind({});
Default.args = {
title : "Summary of Other Activities ",
description : "document any signs and symptoms of illness, information regarding any purchases the person made or other financial info and other items that were no addressed in the  note"
};
