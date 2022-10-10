export const REDIRECT_URI = `${window.location.origin}${window.location.pathname}`;
export const OAUTH_PROXY_URL = 'https://pco.oap.muscatech.co.uk';
export const OAUTH_CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID;
export const PCO_AUTH_URL = `https://api.planningcenteronline.com/oauth/authorize?client_id=${OAUTH_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=services`;
