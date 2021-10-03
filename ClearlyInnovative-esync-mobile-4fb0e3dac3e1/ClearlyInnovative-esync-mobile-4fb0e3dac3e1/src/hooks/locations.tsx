/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "react-query";

/**
 *
 * @param param0
 * @returns
 */
const getLocations = async (authInfo: any) => {
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/locations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authInfo?.token as string,
    },
  });
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
const getLocationById = async ({ locationId, authInfo }: any) => {
  const resp = await fetch(
    `${process.env.REACT_APP_API_URL}/locations/${locationId}`,
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

async function postLocation({
  params,
  authInfo,
}: {
  params: any;
  authInfo: any;
}) {
  console.log(params);

  const resp = await fetch(`${process.env.REACT_APP_API_URL}/locations`, {
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
async function putLocation({
  params,
  authInfo,
}: {
  params: any;
  authInfo: any;
}) {
  console.log(params);
  const { id, ...putData } = params;
  debugger;

  const resp = await fetch(`${process.env.REACT_APP_API_URL}/locations/${id}`, {
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

/**
 *
 * @param locationId
 * @returns
 */
async function deleteLocation({
  locationId,
  authInfo,
}: {
  locationId: string;
  authInfo: any;
}) {
  const resp = await fetch(
    `${process.env.REACT_APP_API_URL}/locations/` + locationId,
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

/** - *************************************************************************
 *
 * ADD NEW LOCATION
 *
 * @returns
 */
export const useAddLocation = () => {
  const queryClient = useQueryClient();
  return useMutation(postLocation, {
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(["locations"]);
    },
  });
};

/** - *************************************************************************
 *
 * UPDATE EXISTING LOCATION
 *
 * @returns
 */
export const useUpdateLocation = () => {
  const queryClient = useQueryClient();
  return useMutation(putLocation, {
    onSuccess: (data: any) => {
      debugger;
      queryClient.invalidateQueries(["location", data._id]);
      queryClient.invalidateQueries(["locations"]);
      return Promise.resolve();
    },
  });
};

// GET ALL Locations
export const useGetAllLocations = (authInfo: any) => {
  return useQuery(["locations"], () => getLocations(authInfo));
};

// GET a Location
export const useGetLocation = (locationId: string, authInfo: any) => {
  return useQuery(["location", locationId],
   () => getLocationById({ locationId, authInfo }),
  );
};

// Delete an Location
export const useDeleteLocation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteLocation, {
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(["location", data._id]);
      queryClient.invalidateQueries(["locations"]);
    },
  });
};
