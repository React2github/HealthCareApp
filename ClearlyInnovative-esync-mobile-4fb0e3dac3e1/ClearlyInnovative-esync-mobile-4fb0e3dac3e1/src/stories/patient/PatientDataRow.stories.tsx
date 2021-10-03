import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import PatientsDataRow from "../../pages/Forms/Patients/PatientDataRow";


export default {
  title: "PatientComponents/PatientsDataRow",
  component: PatientsDataRow,
  // create action for onrowClicked
  argTypes: {
    onRowClicked: { action: "onRowClicked" }
  },
} as Meta;

const Template: Story<any> = (args) => {
  return <PatientsDataRow {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  patientData: {
    _id: "6049b8f85912f6bb29cc5ee9",
    name: "Patient Zero",
    image: "https://images.squarespace-cdn.com/content/v1/592702373a04114633ee6536/1565565256585-U0XXFH98O1QOQ2EIHQWC/ke17ZwdGBToddI8pDm48kP0aizXW6LeTfxgxaaA_JBoUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8GRo6ASst2s6pLvNAu_PZdJPZGT27soDeEUgz3vxuTzvi-MyCL3dqfA2QCVM9qDEGTKZH8oXidqGX2F_CF2QRkI/Actor-Headshots-NYC-AnthonyCarvello.jpg?",
    staffName: "Nurse Joan",
    signature: "signature yes",
    managerReview: "manager review value",
    medicaidId: "medicaid id 1000",
    pa: "pa value",
    service: "service value",
    dob: "1994-03-16",
    __v: 3,
    createdAt: "2021-03-16T16:11:49.743Z",
    updatedAt: "2021-03-16T16:37:35.957Z",
    progressNotes: [
      {
        createdAt: "2021-03-16T16:07:04.939Z",
        patientId: "6049b8f85912f6bb29cc5ee9",
        updatedAt: "2021-03-16T16:07:04.939Z",
        _id: "6050d7a82fe5f70e3121a549",
      },
    ],
  },
};

export const MissingImage = Template.bind({});
MissingImage.args = {
  patientData: {
    _id: "6049b8f85912f6bb29cc5ee9",
    name: "Patient Zero",
    staffName: "Nurse Joan",
    signature: "signature yes",
    managerReview: "manager review value",
    medicaidId: "medicaid id 1000",
    pa: "pa value",
    service: "service value",
    dob: "1994-03-16",
    __v: 3,
    createdAt: "2021-03-16T16:11:49.743Z",
    updatedAt: "2021-03-16T16:37:35.957Z",
    progressNotes: [ ],
  },
};
