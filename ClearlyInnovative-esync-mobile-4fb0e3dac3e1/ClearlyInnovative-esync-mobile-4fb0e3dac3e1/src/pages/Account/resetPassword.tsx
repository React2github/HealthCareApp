import {
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonFooter,
    IonRow,
    IonCol,
    IonButton,
    IonAlert,
} from "@ionic/react";
import React, { useState } from "react";
import { updatePass } from "../../hooks/users";
import { useHistory } from "react-router";
import "./Page.css";
import { useForm, FormProvider } from "react-hook-form";
import { MyIonTextItem } from "../../components/MyIonTextItem";
import { useAuth } from "../../hooks/auth";


const ResetPasswordPage: React.FC = () => {
    const [showErrorAlert, setShowErrorAlert] = useState("");
    const { authInfo } = useAuth();

    const history = useHistory();
    const methods = useForm({
        defaultValues: {
            password: "",
            email: "",
            token: "",
        },
    });

    console.log(methods.errors);
    console.log(methods.getValues());


    /**
     * create the user when button clicked
     * @param data
     */
    const resetPassword = async (data: any) => {
        try {
            const email = data.email
            const password = data.password
            const token = data.token
            await updatePass(email, password, token);
            // console.log("createUser: success", data);
        } catch (e) {
            setShowErrorAlert(e.message);
        } finally {
        }
    };


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start"></IonButtons>
                    <IonTitle>Reset Password</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                {/**  Show Error when problem Logging In **/}
                <IonAlert
                    isOpen={showErrorAlert !== ""}
                    onDidDismiss={() => setShowErrorAlert("")}
                    header={"Application Error"}
                    subHeader={"Error Creating Account"}
                    message={showErrorAlert}
                    buttons={["OK"]}
                />

                <IonAlert
                    isOpen={authInfo?.loggedIn as any}
                    onDidDismiss={() => history.push("/home")}
                    header={"Application Message"}
                    message={"Account Created Successfully"}
                    buttons={["OK"]}
                />


                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(resetPassword)}>
                        <MyIonTextItem
                            style={{ "--padding-start": 0 }}
                            labelName="Reset Token:"
                            name="token"
                            labelProps={{ position: "fixed" }}
                        />
                        <MyIonTextItem
                            style={{ "--padding-start": 0 }}
                            labelName="Email Address:"
                            name="email"
                            labelProps={{ position: "fixed" }}
                        />
                        <MyIonTextItem
                            style={{ "--padding-start": 0 }}
                            labelName="New Password:"
                            name="password"
                            labelProps={{ position: "fixed" }}
                        />
                        <IonButton
                            style={{ display: "none" }}
                            id="subBtn-create-account"
                            type="submit"
                        ></IonButton>
                    </form>
                </FormProvider>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonRow>
                        <IonCol>
                            <IonButton
                                expand="block"
                                fill="outline"
                                type="button"
                                onClick={() => {
                                    document.getElementById("subBtn-create-account")?.click();
                                }}
                            >
                                <span style={{ fontWeight: "bold" }}>SAVE</span>
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton
                                expand="block"
                                color="danger"
                                type="button"
                                fill="outline"
                                onClick={() => {
                                    history.replace("/login");
                                }}
                            >
                                <span style={{ fontWeight: "bold" }}>CANCEL</span>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default React.memo(ResetPasswordPage);


