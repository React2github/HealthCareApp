/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "react-query";

// REACT QUERY HOOKS
/**
 *
 * @param param0
 * @returns
 */
const getImageById = async ({
  imageId,
  authInfo,
}: {
  imageId: string;
  authInfo: any;
}) => {
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/images/${imageId}`, {
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
const getImages = async (authInfo: any) => {
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/images`, {
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
async function postImage(params: any) {
  console.log(params);

  var formData = new FormData();
  formData.append("image", params.image[0]);
  formData.append("description", params.description);
  formData.append("name", params.name);

  const resp = await fetch(`${process.env.REACT_APP_API_URL}/images`, {
    method: "POST",
    headers: {
      "auth-token": params.authInfo?.token as string,
    },
    body: formData,
  });
  const respJSON = await resp.json();
  return respJSON;
}

/** - *************************************************************************
 *
 * @returns
 */
export const useAddImage = () => {
  const queryClient = useQueryClient();
  return useMutation(postImage, {
    onSuccess: () => {
      queryClient.invalidateQueries("images");
    },
  });
};

/** - *************************************************************************
 *
 * @param param0
 * @returns
 */
async function deleteImage({
  imageId,
  authInfo,
}: {
  imageId: string;
  authInfo: any;
}) {
  console.log(imageId);

  const resp = await fetch(`${process.env.REACT_APP_API_URL}/images/${imageId}`, {
    method: "DELETE",
    headers: {
      "auth-token": authInfo?.token as string,
    },
  });
  const respJSON = await resp.json();
  return respJSON;
}

/** - *************************************************************************
 *
 * @returns
 */
export const useDeleteImage = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteImage, {
    onSuccess: () => {
      queryClient.invalidateQueries("images");
    },
  });
};

// GET ALL IMAGES
export const useGetAllImages = (authInfo: any) => {
  return useQuery(["images"], () => getImages(authInfo));
};

// GET ONE IMAGE
export const useGetImage = (imageId: string, authInfo: any) => {
  return useQuery(["image-", imageId], () =>
    getImageById({ imageId, authInfo })
  );
};
