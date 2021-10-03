/**
 * @param storeData
 */

export const updateUserProfile = (updateInfo: any) => {
  throw Error("Not Implemented");
};

/**
 *
 * @param userInfo
 * @returns
 */

export const createUserOnly = async (userInfo: any) => {

  let resp = null;
  var formData = new FormData();

  formData.append("image", userInfo.image);
  formData.append("role", userInfo.role);
  formData.append("email", userInfo.email);
  formData.append("first", userInfo.first);
  formData.append("last", userInfo.last);
  formData.append("jobTitle", userInfo.jobTitle);
  formData.append("password", userInfo.password);
  formData.append("phone", userInfo.phone);
  formData.append("username", userInfo.username);

  resp = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
    method: "POST",
    body: formData,
  });

  if (!resp.ok) {
    const r = await resp.json();
    throw Error(r.message);
  }
  const respJSON = await resp.json();
  return respJSON;

};

export const updatePass = async (email: string, password: string, token: string) => {
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/auth/resetPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      token
    }),
  });
  debugger
  if (!resp.ok) {
    const error = await resp.text();
    throw Error(error);
  } else {
    const respJSON = await resp.json();
    if (!resp.ok) throw respJSON;
    return respJSON;
  }
};

export const createUser = async (userInfo: any) => {
 
  let resp = null;
  var formData = new FormData();

  formData.append("image", userInfo.image);
  formData.append("role", userInfo.role);
  formData.append("email", userInfo.email);
  formData.append("first", userInfo.first);
  formData.append("last", userInfo.last);
  formData.append("jobTitle", userInfo.jobTitle);
  formData.append("password", userInfo.password);
  formData.append("phone", userInfo.phone);
  formData.append("username", userInfo.username);

  resp = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
    method: "POST",
    body: formData,
  });

  if (!resp.ok) {
    const r = await resp.json();
    throw Error(r.message);
  }
  const respJSON = await resp.json();
  return respJSON;

};

/**
 * @param id
 * @param token
 */
export const getUser = async (id: string, token: string) => {
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/users/` + id, {
    method: "GET",
    headers: {
      "auth-token": token,
    },
  });

  const respJSON = await resp.json();
  return respJSON;
};

/**
 *
 * @param email
 * @param password
 */
export const loginUser = async (email: string, password: string) => {
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (!resp.ok) {
    const error = await resp.text();
    throw Error(error);
  } else {
    const respJSON = await resp.json();
    if (!resp.ok) throw respJSON;
    return respJSON;
  }
};

export const logoutUser = async () => {
  console.log("Not Implemented on server yet");
  Promise.resolve(true);
};

export const authCheck = () => {
  return new Promise((resolve, reject) => {
    resolve(false);
  });
};
