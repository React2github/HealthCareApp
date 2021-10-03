/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "react-query";

// REACT QUERY HOOKS
/**
 *
 * @param param0
 * @returns
 */
const getProgressNoteById = async ({ progressNoteId, authInfo }: any) => {
  const resp = await fetch(
    `${process.env.REACT_APP_API_URL}/progressNotes/${progressNoteId}`,
    {
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

/**
 *
 * @param param0
 * @returns
 */
const getProgressNotes = async (id: string, authInfo: any) => {
  let pathExt = id ? `/patient/${id}` : "";
  const resp = await fetch(
    `${process.env.REACT_APP_API_URL}/progressNotes${pathExt}`,
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

/** - *************************************************************************
 *
 * @param param0
 * @returns
 */
async function postProgressNotev1({
  params,
  authInfo,
}: {
  params: any;
  authInfo: any;
}) {
 
  console.log(params);

  const resp = await fetch(`${process.env.REACT_APP_API_URL}/progressNotes`, {
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

/**
 *
 * @param param0
 * @returns
 */
async function postProgressNote({
  params,
  authInfo,
}: {
  params: any;
  authInfo: any;
}) {
  debugger;
  console.log(params);

  const resp = await fetch(`${process.env.REACT_APP_API_URL}/progressNotes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authInfo?.token as string,
    },
    body: JSON.stringify(params),
  });

  debugger;
  if (!resp.ok) {
    const r = await resp.json();
    throw Error(r.message);
  }
  const respJSON = await resp.json();
  return respJSON;
}

/**
 *
 * @param param0
 * @returns
 */
 async function putProgressNote({
  params,
  authInfo,
}: {
  params: any;
  authInfo: any;
}) {
  console.log(params);
  const { id, patientId, ...putData } = params;
  debugger;

  const resp = await fetch(`${process.env.REACT_APP_API_URL}/progressNotes/${id}`, {
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
 * ADD NEW PROGRESS NOTE
 *
 * @returns
 */
export const useAddProgressNote = () => {
  const queryClient = useQueryClient();
  return useMutation(postProgressNote, {
    onSuccess: (data: any) => {
      debugger;
      queryClient.invalidateQueries(["progressNotes", data.patientId]);
      queryClient.invalidateQueries(["patient", data.patientId]);

    },
  });
};

// GET ALL PROGRESS NOTES
export const useGetAllProgressNotes = (id: string, authInfo: any) => {
  return useQuery(["progressNotes", id], () => getProgressNotes(id, authInfo));
};

// GET ONE PROGRESS NOTE
export const useGetProgressNote = (progressNoteId: string, authInfo: any) => {
  return useQuery(["progressNote", progressNoteId], 
  () => getProgressNoteById({ progressNoteId, authInfo })
  );
};

// Edit Progress Note 
export const useUpdateProgressNote = () => {
  const queryClient = useQueryClient();
  return useMutation(putProgressNote, {
    onSuccess: (data: any) => {
      debugger;
      queryClient.invalidateQueries(["progressNote", data._id]);
      queryClient.invalidateQueries(["progressNotes"]);
      return Promise.resolve();
    },
  });
};