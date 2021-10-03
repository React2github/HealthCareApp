/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useMutation, useQuery, useQueryClient } from "react-query";

import { useMutation, useQuery, useQueryClient } from "react-query";

/**
 *
 * @param id
 * @returns
 */
async function deleteAppointment({
  appointmentId,
  authInfo,
}: {
  appointmentId: string;
  authInfo: any;
}) {
  const resp = await fetch(
    `${process.env.REACT_APP_API_URL}/appointments/` + appointmentId,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authInfo?.token as string,
      },
    }
  );
  if (!resp.ok) {
    throw Error(resp.statusText);
  }
  const respJSON = await resp.json();
  return respJSON;
}

/**
 *
 * @param param0
 * @returns
 */
const getAppointments = async (authInfo: any) => {
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/appointments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authInfo?.token as string,
    },
  });
  const respJSON = await resp.json();
  return respJSON;
};

/**
 *
 * @param param0
 * @returns
 */
const getAppointmentById = async (appointmentId: string, authInfo: any) => {
  const resp = await fetch(
    `${process.env.REACT_APP_API_URL}/appointments/${appointmentId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authInfo?.token as string,
      },
    }
  );
  const respJSON = await resp.json();
  return respJSON;
};

async function postAppointment({
  params,
  authInfo,
}: {
  params: any;
  authInfo: any;
}) {
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authInfo?.token as string,
    },
    body: JSON.stringify(params),
  });

  const respJSON = await resp.json();
  return respJSON;
}

/**
 *
 * @param param0
 * @returns
 */
async function putAppointment({
  params,
  authInfo,
}: {
  params: any;
  authInfo: any;
}) {
  console.log(params);
  const { id, ...putData } = params;
  debugger;

  const resp = await fetch(`${process.env.REACT_APP_API_URL}/appointments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authInfo?.token as string,
      },
      body: JSON.stringify(putData),
    });
    if (!resp.ok) {
      throw Error(resp.statusText);
    }
  const respJSON = await resp.json();
  return respJSON;
}
/** - *************************************************************************
 *
 * ADD NEW Appointment
 *
 * @returns
 */
export const useAddAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation(postAppointment, {
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(["appointments"]);
    },
  });
};

// GET ALL Appointments
export const useGetAllAppointments = (authInfo: any) => {
  return useQuery(["appointments"], () => getAppointments(authInfo));
};

// GET ALL Appointments
export const useGetAppointment = (appointmentId: string, authInfo: any) => {
  return useQuery(
    ["appointment", appointmentId],
    () => getAppointmentById(appointmentId, authInfo),
    { enabled: appointmentId ? true : false }
  );
};

// Delete an Appointment
export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAppointment, {
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(["appointment", data._id]);
      queryClient.invalidateQueries(["appointments"]);
    },
  });
};

// Edit an Appointment
export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation(putAppointment, {
    onSuccess: (data: any) => {
      debugger;
      queryClient.invalidateQueries(["appointment", data._id]);
      queryClient.invalidateQueries(["appointments"]);
      return Promise.resolve();
    },
  });
};
