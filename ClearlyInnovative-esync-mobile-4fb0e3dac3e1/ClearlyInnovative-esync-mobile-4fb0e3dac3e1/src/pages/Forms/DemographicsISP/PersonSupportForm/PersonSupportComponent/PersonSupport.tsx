import {
    IonCol,
    IonGrid,
    IonInput,
    IonItem,
    IonLabel,
    IonRow,
} from "@ionic/react";
import React from "react";
import { useFormContext } from "react-hook-form";

const PersonSupport: React.FC<{
    initialValues: any
}> = ({ initialValues }) => {
    const { register, formState } = useFormContext(); // retrieve all hook methods
    return (
        <div>
            <IonGrid>
                <h5>Person Centered Planning</h5>
                <h5>Who is my Circle of Supports?</h5>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Family</IonLabel>
                            <IonInput
                                type="number"
                                ref={register}
                                name={'peopleSupport.family'}
                            ></IonInput>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.family?.message}</p>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Friends</IonLabel>
                            <IonInput
                                type="number"
                                ref={register}
                                name={'peopleSupport.friends'}
                            ></IonInput>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.friends?.message}</p>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Co-workers</IonLabel>
                            <IonInput
                                type="number"
                                ref={register}
                                name={'peopleSupport.coworkers'}
                            ></IonInput>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.coworkers?.message}</p>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Paid Supports</IonLabel>
                            <IonInput
                                type="number"
                                ref={register}
                                name={'peopleSupport.paidSupports'}
                            ></IonInput>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.paidSupports?.message}</p>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Residential</IonLabel>
                            <IonInput
                                type="number"
                                ref={register}
                                name={'peopleSupport.residential'}
                            ></IonInput>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.residential?.message}</p>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Day Supports</IonLabel>
                            <IonInput
                                type="number"
                                ref={register}
                                name={'peopleSupport.daySupports'}
                            ></IonInput>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.daySupports?.message}</p>
                    </IonCol>
                    </IonRow>
                    <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>What People Like and Admire About...</IonLabel>
                            <IonInput
                                type="number"
                                ref={register}
                                name={'peopleSupport.admire'}
                            ></IonInput>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.daySupports?.message}</p>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Things That I like and Like To Do</IonLabel>
                            <IonInput
                                type="number"
                                ref={register}
                                name={'peopleSupport.things'}
                            ></IonInput>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.daySupports?.message}</p>
                    </IonCol>
                    </IonRow>
                    <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>What's Important TO...</IonLabel>
                            <IonInput
                                type="number"
                                ref={register}
                                name={'peopleSupport.importantTo'}
                            ></IonInput>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.daySupports?.message}</p>
                    </IonCol>
                    </IonRow>
                    <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>What's Important FOR...</IonLabel>
                            <IonInput
                                type="number"
                                ref={register}
                                name={'peopleSupport.importantFor'}
                            ></IonInput>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.daySupports?.message}</p>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </div>
    );
};
export default React.memo(PersonSupport);
