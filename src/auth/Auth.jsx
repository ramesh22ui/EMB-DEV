
import auth0 from "auth0-js";
import toNumber from "lodash/toNumber";
import toString from "lodash/toString";

const SESSION_KEY = {
  EXPIRES_AT: "re-auth0-expires-at",
  ACCESS_TOKEN: "re-auth0-access-token",
  ID_TOKEN: "re-auth0-id-token",
};
const hostUrl = `${window.location.protocol}//${window.location.host}`;

export default class Auth {
  constructor() {
    this.login = this.login.bind(this);
  }

  expiresAt = toNumber(localStorage.getItem(SESSION_KEY.EXPIRES_AT));

  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH_DOMAIN,
    clientID: process.env.REACT_APP_AUTH_CLIENTID, 
    redirectUri: hostUrl + process.env.REACT_APP_AUTH_CALLBACKPATH,
    response_type: "token id_token",
    scope: process.env.REACT_APP_AUTH_SCOPE,
  });
  

  login() {
    this.auth0?.authorize();
  }

  handleAuthentication = () => {
    localStorage.setItem(SESSION_KEY.EXPIRES_AT, "");
    localStorage.setItem(SESSION_KEY.ACCESS_TOKEN, "");
    localStorage.setItem(SESSION_KEY.ID_TOKEN, "");

    return this.getAuthResult().then((authResult) => this.setSession(authResult));
  };

  getAuthResult = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((error, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          resolve(authResult);
        } else {
          reject(error);
        }
      });
    });
  };

  isAuthenticated = () => {
    let expiresAt = toNumber(localStorage.getItem(SESSION_KEY.EXPIRES_AT));
    return new Date().getTime() < expiresAt;
  };

  setSession(authResult) {
    this.expiresAt = authResult.expiresIn * 1000 + Date.now();

    localStorage.setItem(SESSION_KEY.EXPIRES_AT, toString(this.expiresAt));
    localStorage.setItem(SESSION_KEY.ACCESS_TOKEN, authResult.accessToken);
    localStorage.setItem(SESSION_KEY.ID_TOKEN, authResult.idToken);

    return true;
  }

  logout = () => {
    this.clearSession();

    // Redirect to login page
    this.auth0.authorize();
  };

  clearSession() {
    // Remove tokens and expiry time
    this.expiresAt = 0;

    // Clear localStorage
    localStorage.removeItem(SESSION_KEY.EXPIRES_AT);
    localStorage.removeItem(SESSION_KEY.ACCESS_TOKEN);
    localStorage.removeItem(SESSION_KEY.ID_TOKEN);
  }
}
