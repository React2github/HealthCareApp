import React, { useEffect, useState } from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import LocationEntry, { LocationEntrySchema } from "./locationForm";
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import {
  useAddLocation,
  useGetLocation,
  useUpdateLocation,
} from "../../hooks/locations";
import { useAuth } from "../../hooks/auth";
import { useHistory, useParams } from "react-router";

const CreateLocation: React.FC = () => {
  const { authInfo } = useAuth();
  const history = useHistory();
  const {
    mutateAsync: addLocation,
    status: addLocationStatus,
    error: addLocationError,
  } = useAddLocation();
  const {
    mutateAsync: updateLocation,
    status: updateLocationStatus,
    error: updateLocationError,
  } = useUpdateLocation();

  const { locationId } = useParams<{
    locationId: string;
  }>();

  const [editMode, setEditMode] = useState(locationId ? true : false);

  /* hook for retrieving the patient when form is presented */
  const { status, data: locationData, error } = useGetLocation(
    locationId,
    authInfo
  );
  /**
   *
   * @param data
   */
  const OnSubmit = async (data: { [x: string]: any }) => {
    console.log("onsubmit", data);

    const server = {
      name: data.name,
      description: data.description,
      street_address_1: data.street_address_1,
      street_address_2: data.street_address_2,
      city: data.city,
      state: data.state,
      zip: data.zip,
      date: data.date,
    };
    const serverData = { ...server };

    if (editMode) {
      await updateLocation({
        params: { ...serverData, id: locationData._id },
        authInfo,
      });
    } else {
      await addLocation({
        params: serverData,
        authInfo,
      });
    }

    // // go back to lists of location
    // history.goBack();
  };

  const methods = useForm({
    mode: "onBlur",
    resolver: yupResolver(LocationEntrySchema),
  });

  if (status === "loading") {
    return <IonLoading isOpen={true} />;
  }

  console.log(methods.formState.errors);
  console.log("VALUES:", methods.getValues());
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="home" />
          </IonButtons>
          <IonTitle>
            {editMode ? "Update Location Page" : "Create Location Page"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <StatusAlert
          header="CREATE NEW LOCATION"
          successMsg="Location Created Successfully"
          status={addLocationStatus}
          error={addLocationError}
          onOk={(success: boolean) => history.goBack()}
        />

        <StatusAlert
          header="UPDATE LOCATION"
          successMsg="Location Updated Successfully"
          status={updateLocationStatus}
          error={updateLocationError}
          onOk={(success: boolean) => history.goBack()}
        />

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(OnSubmit)}>
            <LocationEntry initialValues={locationData || null} />
            <IonButton type="submit">
              {editMode ? "UPDATE LOCATION" : "SAVE LOCATION"}
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

export default CreateLocation;

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
