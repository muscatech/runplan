import type { AnyAction } from "@reduxjs/toolkit";
import type { Dispatch } from "react";
import { OAUTH_PROXY_URL, REDIRECT_URI } from "./constants";
import { getCodeFromQueryString } from "./functions";
import { reset, setCurrentStep, setToken } from "./slice";
import { ImportStep } from "./types";

export const performPCOLogin = (dispatch: Dispatch<AnyAction>) => {

  const fail = () => {
    dispatch(reset());
  };

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
};

export const refreshPCOToken = (refreshToken: string) => fetch(`${OAUTH_PROXY_URL}/refresh?token=${refreshToken}`);
