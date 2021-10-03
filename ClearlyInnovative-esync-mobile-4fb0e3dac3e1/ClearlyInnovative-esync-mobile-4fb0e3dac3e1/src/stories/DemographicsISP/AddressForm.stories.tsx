import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IonButton } from "@ionic/react";
import AddressForm from "../../pages/Forms/DemographicsISP/AddressForm";

export default {
  title: "DemographicsISP/AddressForm",
  component: AddressForm,
  argTypes: { onSave: { action: "onSave" } },
} as Meta;

// NOTICE NAME OF THE SCHEMA OBJECT "business"
const schema = yup.object().shape({
  business: yup.object({
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
    resolver: yupResolver(schema),
  });

  console.log(methods.formState.errors);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => args.onSave(data))}>
        <AddressForm {...args} />
        <IonButton type="submit">SAVE</IonButton>
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  prefix: "business",
};
