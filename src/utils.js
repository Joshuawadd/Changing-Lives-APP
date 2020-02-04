import { AsyncStorage } from 'react-native';

const storeData = async (key, value) => {
  await AsyncStorage.setItem(key, value)
}

const retrieveData = async (key) => {
  const value = await AsyncStorage.getItem(key);
  return value
};

function genericGet(baseroute, subroute, query = '', silent = false) {
  const fetchArgs = {
    method: 'GET',
  }
  return genericRequest(fetchArgs, baseroute, subroute, query, silent)
}

function genericPost(baseroute, subroute, body = '', silent = false) {
  const fetchArgs = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body
  }
  return genericRequest(fetchArgs, baseroute, subroute, '', silent)
}

function genericRequest(fetchArgs, baseroute, subroute, query = '', silent) {
  //controller is used to abort as a timeout
  let controller = new AbortController();
  const timeout = 10 //seconds
  setTimeout(() => controller.abort(), timeout * 1000);
  fetchArgs.signal = controller.signal

  return fetch(baseroute + subroute + query, fetchArgs)
    .then((response) => {
      if (response.ok) {
        const contentType = response.headers.get("content-type")
        if (contentType.indexOf("application/json") === 0) { // data is JSON format 
          return response.json()
            .then((responseJson) => {
              return responseJson;
            })
        } else { // data is text format
          return response.text()
            .then((responseText) => {
              return responseText
            })
        }
      } else { //response not ok
        return response.text()
          .then((responseText) => {
            var errorText
            errorText = "Error: " + responseText
            errorText += " (status code " + response.status + ")"
            if (response.status === 403) {
              errorText += "\nYour credentials may have expired, try logging in again.";
            }
            throw new Error(errorText)
          })
      }
    }).catch((e) => {
      if (!silent) {
        var errorText
        if ((e.message == "Network request failed") || (e.message == "Aborted")) {
          errorText = "Failed to connect to server within the time limit."
          errorText += `\nAddress: ${baseroute}`
          errorText += `\nPath: ${subroute}`
          errorText += `\nTime limit: ${timeout} seconds`
          errorText += `\nCheck the server is running at the specified address`
          errorText += `, and that your device is connected to the same network as the server`
          errorText += `.`
        } else {
          errorText = e.message
        }
        alert(errorText)
      }
    })
}

module.exports = { genericGet, genericPost, storeData, retrieveData };