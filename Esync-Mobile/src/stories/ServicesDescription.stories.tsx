import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import ServicesDescription from "../pages/Forms/ProgressNotes/ServicesDescription";

export default {
  title: "ProgressNoteComponents/ServicesDescription",
  component: ServicesDescription,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<any> = (args) => <ServicesDescription {...args} />;

export const Default = Template.bind({});
Default.args = {
  primary: true,
  label: "Button",
};
