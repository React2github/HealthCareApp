import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { DashboardView } from "../../pages/HomePage";
import { IonContent, IonPage } from "@ionic/react";

export default {
  title: "Dashboard/DashboardView",
  component: DashboardView,
  argTypes:{onDashboardClicked: { action: "onDashboardClicked" }}
} as Meta;

// const Template: Story<any> = (args) => <PatientInfoForm {...args} />;
const Template: Story<any> = (args) => {
  return (
    <IonPage>
      <IonContent>
        <DashboardView {...args}/>
      </IonContent>
    </IonPage>
  );
};
export const Default = Template.bind({});
Default.args = {};
