import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { FormProvider, useForm } from "react-hook-form";
import { IonButton } from "@ionic/react";
import ContactsForm from "../../pages/Forms/DemographicsISP/DemoInfoForm/DemoInfoComponents/ContactsForm";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default {
  title: "DemographicsISP/ContactsForm",
  component: ContactsForm,
  argTypes: { onSave: { action: "onSave" } },
} as Meta;

const schema = yup.object().shape({
  contact: yup.object({
    name: yup.string().required("Name Is Required"),
    type: yup.string().required("Type Is Required"),
    relationship: yup.string().required("Relationship Is Required"),
    address: yup.string().required("Address Is Required"),
    phone: yup.string().required("Phone Is Required"),
    email: yup.string().email().required("Email Is Required"),
  }),
});

const Template: Story<any> = (args) => {
  const methods = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => args.onSave(data))}>
        <ContactsForm {...args} />
        <IonButton type="submit">SAVE</IonButton>
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};
