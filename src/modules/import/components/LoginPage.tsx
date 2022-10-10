import { DialogContent, DialogTitle } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OAUTH_PROXY_URL, PCO_AUTH_URL, REDIRECT_URI } from "../constants";
import { getCodeFromQueryString } from "../functions";
import { useAuthTokenSelector, useCurrentStepSelector } from "../selectors";
import { setCurrentStep, setToken } from "../slice";
import { ImportStep } from "../types";

export const LoginPage = () : JSX.Element => {

  const currentStep = useCurrentStepSelector();
  const authToken = useAuthTokenSelector();
  const dispatch = useDispatch();

  const fail = () => {
    dispatch(setCurrentStep(ImportStep.NOT_STARTED));
  };

  useEffect(
    () => {
      if (authToken) {
        dispatch(setCurrentStep(ImportStep.AUTH_TOKEN_OBTAINED));
      }
      else if (currentStep === ImportStep.NOT_STARTED) {
        const code = getCodeFromQueryString();
        if (code) {
          dispatch(setCurrentStep(ImportStep.BEGIN));
          fetch(`${OAUTH_PROXY_URL}/token?code=${code}&redirect_uri=${REDIRECT_URI}`).then(
            response => {
              if (response.ok) {
                response.json().then(
                  body => {
                    if (body.access_token) {
                      dispatch(setToken(body));
                      dispatch(setCurrentStep(ImportStep.AUTH_TOKEN_OBTAINED));
                    }
                    else {
                      fail();
                    }
                  }
                );
              }
            }
          ).catch(fail);
        }

      }
    },
    [authToken]
  );

  if (!authToken) {
    return (
      <>
        <DialogTitle>Import service</DialogTitle>
        <DialogContent>
          <p>You will need to <a href={PCO_AUTH_URL}>log in</a></p>
        </DialogContent>
      </>
    );
  }

  return <p>Please wait...</p>;


};
