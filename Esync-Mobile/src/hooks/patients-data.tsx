/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "react-query";

// REACT QUERY HOOKS
/**
 *
 * @param param0
 * @returns
 */
const getPatientById = async ({ patientId, authInfo }: any) => {
  const resp = await fetch(
    `${process.env.REACT_APP_API_URL}/patients/${patientId}`,
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

/**
 *
 * @param param0
 * @returns
 */
const getPatients = async (authInfo: any) => {
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/patients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authInfo?.token as string,
    },
  });
  const respJSON = await resp.json();
  return respJSON;
};

/** - *************************************************************************
 *
 * @param param0
 * @returns
 */
async function postPatientv1({
  params,
  authInfo,
}: {
  params: any;
  authInfo: any;
}) {
  debugger;
  console.log(params);

  const resp = await fetch(`${process.env.REACT_APP_API_URL}/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authInfo?.token as string,
    },
    body: JSON.stringify(params),
  });

  if (!resp.ok) {
    throw Error(resp.statusText);
  }
  const respJSON = await resp.json();
  return respJSON;
}

async function postPatient({
  params,
  authInfo,
}: {
  params: any;
  authInfo: any;
}) {
  console.log(params);

  var formData = new FormData();
  formData.append("image", params.image);
  formData.append("staffName", params.staffName);
  formData.append("locations", params.locations);
  formData.append("name", params.name);
  formData.append("signature", params.signature);
  formData.append("managerReview", params.managerReview);
  formData.append("medicaidId", params.medicaidId);
  formData.append("pa", params.pa);
  formData.append("service", params.service);
  formData.append("dob", params.dob);
  formData.append("date", params.date);

debugger 
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/patients`, {
    method: "POST",
    headers: {
      "auth-token": authInfo?.token as string,
    },
    body: formData,
  });

  if (!resp.ok) {
    try {
      const r = await resp.json();
      throw Error(r.message);
    } catch (e) {
      throw Error(resp.statusText);
    }
  }
  const respJSON = await resp.json();
  return respJSON;
}

/**
 *
 * @param param0
 * @returns
 */
 async function putPatient({
  params,
  authInfo,
}: {
  params: any;
  authInfo: any;
}) {
  console.log(params);
  const { id, ...putData } = params;
  debugger;

  const resp = await fetch(`${process.env.REACT_APP_API_URL}/patients/${id}`, {
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
 * ADD NEW PATIENT
 *
 * @returns
 */
export const useAddPatient = () => {
  const queryClient = useQueryClient();
  return useMutation(postPatient, {
    onSuccess: () => {
      queryClient.invalidateQueries("patients");
    },
  });
};

// GET ALL PATIENTS
export const useGetAllPatients = (authInfo: any) => {
  return useQuery(["patients"], () => getPatients(authInfo));
};

// GET ONE PATIENT
export const useGetPatient = (patientId: string, authInfo: any) => {
  return useQuery(["patient", patientId], () =>
    getPatientById({ patientId, authInfo })
  );
};

// Edit a Patient
export const useUpdatePatient = () => {
  const queryClient = useQueryClient();
  return useMutation(putPatient, {
    onSuccess: (data: any) => {
      debugger;
      queryClient.invalidateQueries(["patient", data._id]);
      queryClient.invalidateQueries(["patients"]);
      return Promise.resolve();
    },
  });
};