/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "react-query";

/** - *************************************************************************
 *
 * @param param0
 * @returns
 */
async function postdemoData({
  params,
  Id,
  authInfo,
}: {
  params: any;
  Id: any;
  authInfo: any;
}) {
  debugger;
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/patients/${Id}`, {
    method: "PATCH",
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

/* 
*/

async function postPatient({
  params,
  authInfo,
}: {
  params: any;
  authInfo: any;
}) {
  console.log(params);
debugger 
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/patients`, {
    method: "POST",
    headers: {
      "auth-token": authInfo?.token as string,
    },
    body: params,
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
/** - *************************************************************************
 *
 * Add New demo data to individual
 *
 * @returns
 */
export const useUpdateDemo = () => {
  const queryClient = useQueryClient();
  return useMutation(postdemoData, {
    onSuccess: (data: any) => {
      debugger;
      queryClient.invalidateQueries(["patient", data._id]);
      queryClient.invalidateQueries("patients");
      return Promise.resolve();
    },
  });
};


/**  
* ADD NEW PATIENT
*
* @returns
*/

export const useAddDemo = () => {
 const queryClient = useQueryClient();
 return useMutation(postPatient, {
   onSuccess: () => {
     queryClient.invalidateQueries("patients");
   },
 });
};

// GET ONE individual
export const useGetDemo = (patientId: string, authInfo: any) => {
  return useQuery(["patient", patientId], () =>
    ({ patientId, authInfo })
  );
};

