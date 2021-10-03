import Menu from "./components/Menu";
import React from "react";
import {
  IonApp,
  IonLoading,
  IonRouterOutlet,
  IonSplitPane,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

// ACCOUNT INFORMATION
import LoginPage from "./pages/Account/LoginPage";
import CreateAccountPage from "./pages/Account/CreateAccountPage";
import ForgotPasswordPage from "./pages/Account/ForgotPasswordPage";
import SettingsPage from "./pages/Account/SettingsPage";

// FORMS
import ProgressNote from "./pages/Forms/ProgressNotes/ProgressNote";
import ProgressNotesListPage from "./pages/Forms/ProgressNotes/ProgressNotesListPage";
import PatientsDetailPage from "./pages/Forms/Patients/PatientsDetailPage";
import PatientsListPage from "./pages/Forms/Patients/PatientsListPage";

// PAGES
import HomePage from "./pages/HomePage";
import CheckInPage from "./pages/CheckInPage";
import MapPage from "./pages/MapPage";
import { useAuth } from "./hooks/auth";
import ProgressNotesDetailPage from "./pages/Forms/ProgressNotes/ProgressNotesDetailPage";
import CreatePatientPage from "./pages/Forms/Patients/CreatePatientPage";
import ImageListPage from "./pages/ImageListPage";
import ImageUploadPage from "./pages/ImageUploadPage";
import UsersListPage from "./pages/Admin/UsersListPage";
import CreateLocation from "./pages/Admin/CreateLocation";
import CreateAppointments from "./pages/Admin/CreateAppointments";
import AppointmentListPage from "./pages/Admin/AppointmentListPage";
import LocationListPage from "./pages/Admin/LocationListPage";
import editSettings from "./pages/Account/editSettings";
import createUser from "./pages/Admin/createUser";
import resetPassword from "./pages/Account/resetPassword";
import DemoListPage from "./pages/Forms/DemographicsISP/DemoListPage";
import PersonSupportForm from "./pages/Forms/DemographicsISP/PersonSupportForm/PersonSupportForm";
import DemoInfoForm from "./pages/Forms/DemographicsISP/DemoInfoForm/DemoInfoForm";
import DiagnosticForm from "./pages/Forms/DemographicsISP/DiagnosticForm/DiagnosticForm";
import FunctionalForm from "./pages/Forms/DemographicsISP/FunctionalForm/FunctionalForm";
import GeneralSupportForm from "./pages/Forms/DemographicsISP/GeneralSupportForm/GeneralSupportForm";
import GoalListForm from "./pages/Forms/DemographicsISP/GoalListForm/GoalListForm";
import IndividualSupportForm from "./pages/Forms/DemographicsISP/IndividualSupportForm/IndividualSupportForm";
import MedicationsForm from "./pages/Forms/DemographicsISP/MedicationsForm/MedicationsForm";

const App: React.FC = () => {
  const { authInfo, user } = useAuth();

  return (
    <IonApp
      style={{ margin: "auto", maxWidth: 1024, border: "lightgray solid 1px" }}
    >
      {!authInfo?.initialized ? (
        <IonLoading isOpen={true} message="Starting App" />
      ) : (
        <IonReactRouter>
          <IonSplitPane contentId="main">
            {authInfo.loggedIn && <Menu />}
            <IonRouterOutlet id="main">
              {/* // ACCOUNT INFO ======================================== */}
              <Route
                path="/login"
                exact
                render={(props) => {
                  return authInfo?.loggedIn ? (
                    <Redirect to="/home" />
                  ) : (
                    <LoginPage />
                  );
                }}
              />

              <Route
                path="/create-account"
                component={CreateAccountPage}
                exact
              />
              <Route
                path="/forgot-password"
                component={ForgotPasswordPage}
                exact
              />

              <ProtectedRoute
                path="/settings"
                component={SettingsPage}
                exact />

              <ProtectedRoute
                path="/edit-profile/:Id"
                component={editSettings}
                exact />


              <ProtectedRoute
                path="/demo-data/:patientId"
                component={DemoListPage}
                exact />

              <ProtectedRoute
                path="/demo-data/demoInfo/:patientId"
                component={DemoInfoForm}
                exact />

              <ProtectedRoute
                path="/demo-data/diagnosticInfo/:patientId"
                component={DiagnosticForm}
                exact />

              <ProtectedRoute
                path="/demo-data/functionalform/:patientId"
                component={FunctionalForm}
                exact />

              <ProtectedRoute
                path="/demo-data/generalsupportform/:patientId"
                component={GeneralSupportForm}
                exact />

              <ProtectedRoute
                path="/demo-data/goallistform/:patientId"
                component={GoalListForm}
                exact />

              <ProtectedRoute
                path="/demo-data/individualsupportform/:patientId"
                component={IndividualSupportForm}
                exact />

              <ProtectedRoute
                path="/demo-data/medicationsform/:patientId"
                component={MedicationsForm}
                exact />

              <ProtectedRoute
                path="/demo-data/personsupportform/:patientId"
                component={PersonSupportForm}
                exact />
              {/* // LOCATIONS INFO ======================================== */}
              <ProtectedRoute
                path="/list-locations"
                component={LocationListPage}
                exact
              />
              <ProtectedRoute
                path="/create-location"
                component={CreateLocation}
                exact
              />
              <ProtectedRoute
                path="/edit-location/:locationId"
                component={CreateLocation}
                exact
              />
              {/* // APPOINTMENTS INFO ======================================== */}
              <ProtectedRoute
                path="/list-appointments"
                component={AppointmentListPage}
                exact
              />
              <ProtectedRoute
                path="/create-appointment"
                component={CreateAppointments}
                exact
              />

              <ProtectedRoute
                path="/edit-appointments/:appointmentId"
                component={CreateAppointments}
                exact
              />
              {/* // IMAGES INFO ======================================== */}
              <ProtectedRoute
                path="/list-images"
                component={ImageListPage}
                exact
              />

              <ProtectedRoute
                path="/create-image"
                component={ImageUploadPage}
                exact
              />

              {/* // Users INFO ======================================== */}

              <ProtectedRoute
                path="/list-users"
                component={UsersListPage}
                exact
              />
              <ProtectedRoute
                path="/edit-users/:Id"
                component={editSettings}
                exact
              />
              <ProtectedRoute
                path="/create-users"
                component={createUser}
                exact
              />
              <ProtectedRoute
                path="/resetPassword"
                component={resetPassword}
                exact
              />

              {/* // PATIENT INFO ======================================== */}
              <ProtectedRoute
                path="/list-individuals"
                component={PatientsListPage}
                exact
              />

              <ProtectedRoute
                path="/individual-details/:id"
                component={PatientsDetailPage}
                exact
              />

              <ProtectedRoute
                path="/create-patient"
                component={CreatePatientPage}
                exact
              />

              <ProtectedRoute
                path="/edit-patient/:patientId"
                component={CreatePatientPage}
                exact
              />

              {/* // PROGRESS NOTES ======================================== */}
              <ProtectedRoute
                path="/list-progress-notes"
                component={ProgressNotesListPage}
                exact
              />
              <ProtectedRoute
                path="/list-individual-progress-notes/:id"
                component={ProgressNotesListPage}
                exact
              />
              <ProtectedRoute
                path="/create-progress-note/:patientId"
                component={ProgressNote}
                exact
              />
              <ProtectedRoute
                path="/progress-note-details/:noteId/:patientId"
                component={ProgressNotesDetailPage}
                exact
              />
              <ProtectedRoute
                path="/edit-progressNote/:noteId/:patientId"
                component={ProgressNote}
                exact
              />

              <ProtectedRoute path="/home" component={HomePage} exact />
              <ProtectedRoute path="/map" component={MapPage} exact />
              <ProtectedRoute path="/check-in" component={CheckInPage} exact />
              <Redirect from="/" to="/home" exact />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      )}
    </IonApp>
  );
};

/**
 *
 */
const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const { user, authInfo } = useAuth();
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) => {
        return authInfo?.loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default App;
