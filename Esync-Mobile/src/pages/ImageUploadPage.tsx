import { ErrorMessage } from "@hookform/error-message";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
  IonAlert,
  IonRow,
  IonCol,
  IonBackButton,
  IonCardContent,
  IonInput,
} from "@ionic/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useAuth } from "../hooks/auth";
import { useAddImage } from "../hooks/image-data";
import "./Page.css";

/**
 *
 * @returns
 */
const ImageUploadPage: React.FC = () => {
  const { authInfo } = useAuth();
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm();

  const { mutate: addImage, status, error } = useAddImage();

  const onSubmit = async (data: any) => {
    console.log(data);
    await addImage({ ...data, authInfo });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Image Upload Page</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonAlert
          message={
            status === "error"
              ? "Error: " + (error as any).message
              : "Image Saved Successfully"
          }
          isOpen={status === "success" || status === "error"}
          buttons={["OK"]}
          onDidDismiss={() => {
            history.goBack();
          }}
        />
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonCardContent>
              {/*image*/}
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="fixed">Image</IonLabel>
                    <input
                      type="file"
                      placeholder="File"
                      disabled={status === "loading"}
                      ref={register({ required: "File Is Require Field" })}
                      name="image"
                    />
                  </IonItem>
                  <ErrorMessage name="image" errors={errors} />
                </IonCol>
              </IonRow>
              {/*image*/}
              {/*name*/}
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="fixed">Name</IonLabel>
                    <IonInput
                      type="text"
                      placeholder="Name"
                      name="name"
                      disabled={status === "loading"}
                      ref={register({ required: "Name Is Require Field" })}
                    ></IonInput>
                  </IonItem>
                  <ErrorMessage name="name" errors={errors} />
                </IonCol>
              </IonRow>
              {/*name*/}
              {/*description*/}
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="fixed">Description</IonLabel>
                    <IonInput
                      type="text"
                      placeholder="Description"
                      name="description"
                      disabled={status === "loading"}
                      ref={register({
                        required: "Description Is Require Field",
                      })}
                    ></IonInput>
                  </IonItem>
                  <ErrorMessage name="caption" errors={errors} />
                </IonCol>
              </IonRow>
              {/*description*/}
            </IonCardContent>

            <IonButton type="submit" disabled={status === "loading"}>
              Add Image
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(ImageUploadPage);
