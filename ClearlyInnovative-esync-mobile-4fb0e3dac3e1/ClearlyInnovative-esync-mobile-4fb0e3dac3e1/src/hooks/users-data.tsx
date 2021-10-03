/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "react-query";


/**
 *
 * @param id
 * @returns
*/
async function deleteUser({
  id,
  authInfo,
} : {
  id: any;
  authInfo: any;
}) {
 const resp = await fetch(`${process.env.REACT_APP_API_URL}/users/` + id, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "auth-token": authInfo?.token as string,
  },
  body: JSON.stringify("disabled"),
  });

  const respJSON = await resp.json();
  return respJSON;
}




// REACT QUERY HOOKS
/**
 *
 * @param param0
 * @returns
 */
const getPatientById = async ({ queryKey }: any) => {
  const [_key, { patientId, authInfo }] = queryKey;
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/patients/${patientId}`, {
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
const getUsers = async (authInfo: any) => {
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/users/`, {
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
* @param id
* @returns
*/
async function getUser({
Id,
authInfo,
} : {
Id: any;
authInfo: any;
}) {
 const resp = await fetch(`${process.env.REACT_APP_API_URL}/users/${Id}`, {
   method: "GET",
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
};

async function putUsers({
  params,
  authInfo,
}: {
  params: any;
  authInfo: any;
}) {
  console.log(params);
  const { id, ...putData } = params;
  debugger;

  const resp = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
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

async function postUser({
  params,
  authInfo,
}: {
  params: any;
  authInfo: any;
}) {

debugger
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
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




/** - *************************************************************************
 *
 * @param param0
 * @returns
 */
async function postPatient({
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
  return resp;
}

/** - *************************************************************************
 *
 * ADD NEW User
 *
 * @returns
 */
 export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation(postUser, {
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};

// GET ALL Users
export const useGetAllUsers = (authInfo: any) => {
  return useQuery(["users"], () => getUsers(authInfo));
};


// Get a Single User 
export const useGetUser = (Id: string, authInfo: any) => {
  console.log("getuser", Id)
  return useQuery(
    ["user", Id],
    () => getUser({Id, authInfo}),
    { enabled: Id ? true : false }
  );
};


// Update existing User

export const useUpdateUsers = () => {
  const queryClient = useQueryClient();
  return useMutation(putUsers, {
    onSuccess: (data: any) => {
      debugger;
      queryClient.invalidateQueries(["user", data._id]);
      queryClient.invalidateQueries(["users"]);
      return Promise.resolve();
    },
  });
};



// Delete a User 
export const deleteAUser = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryClient = useQueryClient();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(deleteUser,{
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(['users']);
    }
  });
};



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


// GET ONE PATIENT
export const useGetPatient = (patientId: string, authInfo: any) => {
  return useQuery(
    ["patient-" + patientId, { patientId, authInfo }],
    getPatientById
  );
};
