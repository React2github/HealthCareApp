import React, { useEffect, useState } from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import EditSettingsEntry, { EditSettingsSchema } from "./settingsForm";
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import {
  useGetUser,
  useAddUser,
  useUpdateUsers,
} from "../../hooks/users-data";
import { useAuth } from "../../hooks/auth";
import { useHistory, useParams } from "react-router";


const CreateSettings: React.FC = () => {
  const { authInfo } = useAuth();
  const history = useHistory();
  const {
    mutateAsync: addUser,
    status: addUserStatus,
    error: addUserError,
  } = useAddUser();
  const {
    mutateAsync: updateUsers,
    status: updateUsersStatus,
    error: updateUsersError,
  } = useUpdateUsers();

  const { Id } = useParams<{
    Id: string;
  }>();

  const [editMode, setEditMode] = useState(Id ? true : false);

  /* hook for retrieving the patient when form is presented */
  const { status, data: userData, } = useGetUser(
    Id, 
    authInfo
  );
  /**
   *
   * @param data
   */
  const OnSubmit = async (data: { [x: string]: any }) => {
    console.log("onsubmit", data);
  debugger 
    const server = {
      first: data.first,
      last: data.last,
      username: data.username,
      jobTitle: data.jobTitle,
      role: data.role,
      phone: data.phone,
      email: data.email,
      password: data.password
    };
    const serverData = { ...server };

    if (editMode) {
      await updateUsers({
        params: { ...serverData, id: userData._id },
        authInfo,
      });
    } else {
      await addUser({
        params: serverData,
        authInfo,
      });
    }
       // // go back to lists of location
    // history.goBack();
  

    };

  const methods = useForm({
    mode: "onBlur",
    resolver: yupResolver(EditSettingsSchema),
  });

  if (status === "loading") {
    return <IonLoading isOpen={true} />;
  }

  console.log(methods.formState.errors);
  console.log("VALUES:", methods.getValues());
  console.log(userData)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="home" />
          </IonButtons>
          <IonTitle>Edit Settings Page</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
      <StatusAlert
          header="Create new User"
          successMsg="User Created Successfully"
          status={addUserStatus}
          error={addUserError}
          onOk={(success: boolean) => history.goBack()}
        />
      <StatusAlert
          header="UPDATE USER"
          successMsg="User Updated Successfully"
          status={updateUsersStatus}
          error={updateUsersError}
          onOk={(success: boolean) => history.goBack()}
        />

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(OnSubmit)}>
            <EditSettingsEntry initialValues={userData || null} />
            <IonButton type="submit">
              {editMode ? "UPDATE USER" : "SAVE USER"}
            </IonButton>
            <IonButton
              type="button"
              color="danger"
              onClick={() => history.goBack()}
            >
              CANCEL
            </IonButton>
          </form>
        </FormProvider>
      </IonContent>
    </IonPage>
  );
};

export default CreateSettings;

export interface StatusAlertProps {
  status: string;
  error: any;
  header: string;
  successMsg: string;
  onOk: any;
}

const StatusAlert: React.FC<StatusAlertProps> = ({
  status,
  header,
  successMsg,
  error,
  onOk,
}) => {
  return (
    <IonAlert
      header={header}
      message={
        status === "error" ? "Error: " + (error as any).message : successMsg
      }
      isOpen={status === "success" || status === "error"}
      buttons={[{ text: "OK", handler: () => onOk(status === "success") }]}
    />
  );
};
