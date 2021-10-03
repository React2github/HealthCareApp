import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import PatientsDetail from "../../pages/Forms/Patients/PatientsDetail";

export default {
  title: "PatientComponents/PatientsDetail",
  component: PatientsDetail,
  argTypes: {
    onViewReports: { action: "onViewReports" },
    onCreateReport: { action: "onCreateReport" },
  },
} as Meta;

const Template: Story<any> = (args) => {
  return <PatientsDetail {...args} />;
};

export const Default = Template.bind({});
Default.args = {
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

export const NoProgressNotes = Template.bind({});
NoProgressNotes.args = {
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
    progressNotes: [],
  },
};

export const NoActions = Template.bind({});
NoActions.args = {
  displayActions : false,
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
    progressNotes: [],
  },
};
