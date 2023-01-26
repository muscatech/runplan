import { DialogContent, DialogTitle } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { performPCOLogin } from "../auth";
import { PCO_AUTH_URL } from "../constants";
import { useAuthTokenSelector, useCurrentStepSelector } from "../selectors";
import { setCurrentStep } from "../slice";
import { ImportStep } from "../types";

export const LoginPage = () : JSX.Element => {

  const currentStep = useCurrentStepSelector();
  const authToken = useAuthTokenSelector();
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (authToken && currentStep === ImportStep.BEGIN) {
        dispatch(setCurrentStep(ImportStep.AUTH_TOKEN_OBTAINED));
      }
      else if (!authToken && currentStep === ImportStep.NOT_STARTED) {
        performPCOLogin(dispatch);
      }
    },
    [authToken, currentStep]
  );

  if (!authToken) {
    return (
      <>
        <DialogTitle>Import service</DialogTitle>
        <DialogContent>
          <p>You will need to <a href={PCO_AUTH_URL}>log in</a> to Planning Center to import services.</p>
        </DialogContent>
      </>
    );
  }

  return <p>Please wait...</p>;


};
