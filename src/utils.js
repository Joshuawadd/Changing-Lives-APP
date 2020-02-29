import { AsyncStorage } from 'react-native';

const storeData = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

const retrieveData = async (key) => {
  const value = await AsyncStorage.getItem(key);
  return value;
};

function genericGet (baseroute, subroute, query = '', silent = false) {
  const fetchArgs = {
    method: 'GET'
  };
  return genericRequest(fetchArgs, baseroute, subroute, query, silent);
}

function genericPost (baseroute, subroute, body = '', silent = false) {
  const fetchArgs = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
  };
  return genericRequest(fetchArgs, baseroute, subroute, '', silent);
}

function genericRequest (fetchArgs, baseroute, subroute, query = '', silent) {
  // console.log("FETCHING")
  // controller is used to abort as a timeout
  // eslint-disable-next-line no-undef
  const controller = new AbortController();
  const timeout = 5; // seconds
  setTimeout(() => controller.abort(), timeout * 1000);
  fetchArgs.signal = controller.signal;

  return fetch(baseroute + subroute + query, fetchArgs)
    .then((response) => {
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType.indexOf('application/json') === 0) { // data is JSON format
          return response.json()
            .then((responseJson) => {
              return { content: responseJson, status: response.status, ok: true };
            });
        } else { // data is text format
          return response.text()
            .then((responseText) => {
              return { content: responseText, status: response.status, ok: true };
            });
        }
      } else { // response not ok
        return response.text()
          .then((responseText) => {
            var errorText;
            errorText = 'Error: ' + responseText;
            errorText += ' (status code ' + response.status + ')';
            if (response.status === 403) {
              errorText += '\nYour credentials may have expired, try logging in again.';
            }
            throw new Error(JSON.stringify({ errorText: errorText, status: response.status }));
          });
      }
    }).catch((e) => {
      var errorInfo;
      if (e.name === 'AbortError') {
        errorInfo = { errorText: e.message, status: -1 };
      } else {
        errorInfo = JSON.parse(e.message);
      }
      var errorText = errorInfo.errorText;
      if ((errorInfo.errorText === 'Network request failed') || (errorInfo.errorText === 'Aborted')) {
        errorText = 'Failed to connect to server within the time limit.';
        errorText += `\nAddress: ${baseroute}`;
        errorText += `\nPath: ${subroute}`;
        errorText += `\nTime limit: ${timeout} seconds`;
        errorText += '\nCheck the server is running at the specified address';
        errorText += ', and that your device is connected to the same network as the server';
        errorText += '.';
      }
      if (!silent) {
        alert(errorText);
      }
      return { content: errorText, status: errorInfo.status, ok: false };
    });
}

module.exports = { genericGet, genericPost, storeData, retrieveData };
