import {
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonBackButton,
} from "@ionic/react";
import React from "react";
import { useParams } from "react-router";
import { useAuth } from "../../../hooks/auth";
import { useGetPatient } from "../../../hooks/patients-data";


const DemoListPage: React.FC = () => {
    // const [progressNotesData, setProgressNotesData] = useState([]);
    const { authInfo } = useAuth();
    const { patientId} = useParams<{
        patientId: string;
      }>();

      const {  data: patientData } = useGetPatient(patientId, authInfo);
    console.log(patientData)


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="home" />
                    </IonButtons>
                    <IonTitle>Demo Page</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding">

                        <IonItem
                            button
                            detail
                            routerLink={`/demo-data/demoInfo/${patientId}`}
                            key={patientId}
                        >
                            <IonLabel>
                                DemoInfo Form 
                            </IonLabel>
                        </IonItem>
                        <IonItem
                            button
                            detail
                            routerLink={`/demo-data/diagnosticInfo/${patientId}`}
                            key={patientId}
                        >
                            <IonLabel>
                                Diagnostic Form 
                            </IonLabel>
                        </IonItem>
                        <IonItem
                            button
                            detail
                            routerLink={`/demo-data/functionalform/${patientId}`}
                            key={patientId}
                        >
                            <IonLabel>
                                Functional Form 
                            </IonLabel>
                        </IonItem>
                        <IonItem
                            button
                            detail
                            routerLink={`/demo-data/generalsupportform/${patientId}`}
                            key={patientId}
                        >
                            <IonLabel>
                                General Support Form 
                            </IonLabel>
                        </IonItem>
                        <IonItem
                            button
                            detail
                            routerLink={`/demo-data/goallistform/${patientId}`}
                            key={patientId}
                        >
                            <IonLabel>
                                GoalList Form 
                            </IonLabel>
                        </IonItem>
                        <IonItem
                            button
                            detail
                            routerLink={`/demo-data/individualsupportform/${patientId}`}
                            key={patientId}
                        >
                            <IonLabel>
                                Individual Support Form 
                            </IonLabel>
                        </IonItem>
                        <IonItem
                            button
                            detail
                            routerLink={`/demo-data/medicationsform/${patientId}`}
                            key={patientId}
                        >
                            <IonLabel>
                                Medications Form 
                            </IonLabel>
                        </IonItem>
                        <IonItem
                            button
                            detail
                            routerLink={`/demo-data/personsupportform/${patientId}`}
                            key={patientId}
                        >
                            <IonLabel>
                                Person Support Form 
                            </IonLabel>
                        </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default React.memo(DemoListPage);
