import {
    IonCol,
    IonGrid,
    IonInput,
    IonItem,
    IonLabel,
    IonRadio,
    IonRadioGroup,
    IonRow,
} from "@ionic/react";
import React from "react";
import { useFormContext } from "react-hook-form";

const GeneralSupport: React.FC<{
    initialValues: any
}> = ({ initialValues }) => {
    const { register, formState } = useFormContext(); // retrieve all hook methods
    return (
        <div>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Communication</IonLabel>
                            <IonInput
                                type="text"
                                ref={register}
                                name={'generalSupport.communication'}
                            ></IonInput>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.cognitive?.message}</p>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Hearing and Vision</IonLabel>
                            <IonInput
                                type="text"
                                ref={register({ required: false })}
                                name={'generalSupport.hearingVision'}
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Physical and Health</IonLabel>
                            <IonInput
                                type="text"
                                ref={register({ required: false })}
                                name={'generalSupport.physicalHealth'}
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Mobility and Safety</IonLabel>
                            <IonInput
                                type="text"
                                ref={register}
                                name={'generalSupport.mobilitySafety'}
                            ></IonInput>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.communicationMethod?.message}</p>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Other Considerations</IonLabel>
                            <IonInput
                                type="text"
                                ref={register}
                                name={'generalSupport.otherConsiderations'}
                            ></IonInput>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.otherConsiderations?.message}</p>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="6">
                        <IonItem>
                            <IonLabel>Adaptive Equipment</IonLabel>
                            <IonInput
                                type="text"
                                ref={register}
                                name={'generalSupport.adaptiveEquipment'}
                            ></IonInput>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.adpativeEquipment?.message}</p>
                    </IonCol>
                </IonRow>
                <h3>Staffing Supports Needed</h3>
                <IonRow>
                    <IonCol size="6">
                        <IonItem>
                            <IonLabel>Unsupervised Time</IonLabel>
                            <IonRadioGroup>
                                <IonItem>
                                    <IonLabel>Yes</IonLabel>
                                    <IonRadio value="Yes" />
                                </IonItem>

                                <IonItem>
                                    <IonLabel>No</IonLabel>
                                    <IonRadio value="No" />
                                </IonItem>

                            </IonRadioGroup>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.foodTexture?.message}</p>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="6">
                        <IonItem>
                            <IonLabel>Day</IonLabel>
                            <IonInput
                                type="text"
                                ref={register}
                                name={'generalSupport.day'}
                            ></IonInput>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.intolerance?.message}</p>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="6">
                        <IonItem>
                            <IonLabel>Residential</IonLabel>
                            <IonInput type="text"
                                ref={register}
                                name={'generalSupport.residential'}
                            ></IonInput>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.residential?.message}</p>
                    </IonCol>
                </IonRow>
                <h5>Preferences/Interests/Strengths/Needs</h5>
                <h5>Interest/Preferences/Strengths/Needs</h5>
                <IonRow>
                    <IonCol size="6">
                        <IonItem>
                            <IonLabel>Interests/Preferences</IonLabel>
                            <IonInput type="text"
                                ref={register}
                                name={'generalSupport.interests'}
                            ></IonInput>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.interests?.message}</p>
                    </IonCol>
                    <IonCol size="6">
                        <IonItem>
                            <IonLabel>Strengths/Skills</IonLabel>
                            <IonInput type="text"
                                ref={register}
                                name={'generalSupport.strengths'}
                            ></IonInput>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.strengths?.message}</p>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="6">
                        <IonItem>
                            <IonLabel>Challenges/Barriers</IonLabel>
                            <IonInput
                                type="text"
                                ref={register}
                                name={'generalSupport.challenges'}
                            ></IonInput>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.challenges?.message}</p>
                    </IonCol>
                    <IonCol size="6">
                        <IonItem>
                            <IonLabel>Services/Supports</IonLabel>
                            <IonInput
                                type="text"
                                ref={register}
                                name={'generalSupport.services'}
                            ></IonInput>
                        </IonItem>
                        <p>{formState.errors[`${initialValues}`]?.services?.message}</p>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </div>
    );
};
export default React.memo(GeneralSupport);
