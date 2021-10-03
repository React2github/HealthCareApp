import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
  IonAlert,
  IonLoading,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import { useAuth } from "../hooks/auth";
import { useDeleteImage, useGetAllImages } from "../hooks/image-data";
import "./Page.css";

/**
 *
 * @returns
 */
const ImageListPage: React.FC = () => {
  const { authInfo } = useAuth();
  const history = useHistory();

  /* hook for retrieving the patient when form is presented */
  const { status, data: imageData, error } = useGetAllImages(authInfo);
  const {
    mutate: deleteImage,
    status: delImgStatus,
    error: delImgError,
  } = useDeleteImage();

  // here we handle display the error message and the loading
  // screen when the page is first being opened
  if (!imageData && !error) {
    return <IonLoading message={"Loading Images..."} isOpen={true} />;
  } else if (error) {
    return (
      <IonAlert
        header={"Error Loading Image"}
        message={error as string}
        isOpen={status === "error"}
        buttons={["OK"]}
        onDidDismiss={() => {
          history.goBack();
        }}
      />
    );
  } 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>IMAGES</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink={"/create-image"}>UPLOAD IMAGE</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* alert for delete error */}
        <IonAlert
          header={"Error Deleting Image"}
          message={delImgError as string}
          isOpen={delImgStatus === "error"}
          buttons={["OK"]}
          onDidDismiss={() => {
            // history.goBack();
          }}
        />

        {imageData &&
          imageData.map((p: any) => (
            <IonItem
              //   button
              //   routerLink={`/image-details/${p._id}`}
              key={p._id}
            >
              <IonGrid>
                <IonRow>
                  <IonCol size="4">
                    <div>
                      <IonImg
                        style={{ maxHeight: "80%" }}
                        src={`data:image/${
                          p.img.contentType
                        };base64,${Buffer.from(p.img.data).toString("base64")}`}
                      />
                    </div>
                  </IonCol>
                  <IonCol>
                    <IonLabel>
                      <IonItem>
                        <IonLabel>Name: </IonLabel>
                        {p.name}
                      </IonItem>
                      <IonItem>
                        <IonLabel>ID: </IonLabel>
                        {p._id}
                      </IonItem>
                      <IonItem>
                        <IonLabel>Description:</IonLabel>
                        {p.description}
                      </IonItem>
                    </IonLabel>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <div className="ion-float-right">
                      <IonButton onClick={() => null}>EDIT</IonButton>
                      <IonButton
                        color="danger"
                        onClick={() =>
                          deleteImage({ imageId: p._id, authInfo })
                        }
                      >
                        DELETE
                      </IonButton>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          ))}
      </IonContent>
    </IonPage>
  );
};

export default React.memo(ImageListPage);
