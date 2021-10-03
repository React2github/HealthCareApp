import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IonButton } from "@ionic/react";
import AddressForm from "../../pages/Forms/DemographicsISP/AddressForm";

export default {
  title: "DemographicsISP/HomeAndBusinessAddrForm",
  component: AddressForm,
  argTypes: { onSave: { action: "onSave" } },
} as Meta;

// NOTICE NAME OF THE SCHEMA OBJECT "business"
const schemaBiz = yup.object().shape({
  business: yup.object({
    street1: yup.string().required("Street 1 Is Required"),
    street2: yup.string(),
    city: yup.string().required("City Is Required"),
    state: yup.string().required("State Is Required"),
    zipCode: yup.string().required("Zip Code Is Required"),
  }),
});

const schemaHome = yup.object().shape({
  home: yup.object({
    street1: yup.string().required("Street 1 Is Required"),
    street2: yup.string(),
    city: yup.string().required("City Is Required"),
    state: yup.string().required("State Is Required"),
    zipCode: yup.string().required("Zip Code Is Required"),
  }),
});

const Template: Story<any> = (args) => {
  const methods = useForm({
    mode: "onBlur",
    resolver: yupResolver(schemaBiz.concat(schemaHome)),
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => args.onSave(data))}>
        <AddressForm {...args} prefix={"business"}/>
        <AddressForm {...args} prefix={"home"}/>
        <IonButton type="submit">SAVE</IonButton>
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
};
