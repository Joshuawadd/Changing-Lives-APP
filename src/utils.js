import { AsyncStorage, Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

const storeData = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

const retrieveData = async (key) => {
  const value = await AsyncStorage.getItem(key);
  return value;
};

function resetAndNavigate (pathArray) {
  const resetAction = StackActions.reset({
    index: pathArray.length - 1,
    actions: pathArray.map(routeName => NavigationActions.navigate({ routeName }))
  });
  this.props.navigation.dispatch(resetAction);
}

async function genericGet (baseroute, subroute, query = '', silent = false) {
  const authToken = await retrieveData('authToken');
  const fetchArgs = {
    method: 'GET'
  };
  query += (query === '' ? '?' : '&');
  query += `token=${authToken}`;
  var response = await genericRequest(fetchArgs, baseroute, subroute, query, silent);
  return new Promise((resolve, reject) => {
    if (response.ok) {
      this.setState({ isLoading: false });
      response.action = 'success';
      resolve(response);
    } else {
      if (silent && response.status === 403) {
        const resetAction = StackActions.reset({
          index: 1,
          actions: [NavigationActions.navigate({ routeName: 'Home' }), NavigationActions.navigate({ routeName: 'Login' })]
        });
        this.props.navigation.dispatch(resetAction);
        response.action = 'retryLogin';
        resolve(response);
      } else {
        Alert.alert(
          'Error',
          response.content,
          [
            {
              text: 'Continue Offline',
              style: 'cancel',
              onPress: () => {
                storeData('offlineModeEnabled', JSON.stringify(true));
                this.setState({ offlineModeEnabled: true });
                this.setState({ isLoading: false });
                response.action = 'continueOffline';
                resolve(response);
              }
            },
            {
              text: 'Retry Login',
              onPress: () => {
                const resetAction = StackActions.reset({
                  index: 1,
                  actions: [NavigationActions.navigate({ routeName: 'Home' }), NavigationActions.navigate({ routeName: 'Login' })]
                });
                response.action = 'retryLogin';
                this.props.navigation.dispatch(resetAction);
                resolve(response);
              }
            }
          ],
          { cancelable: false }
        );
      }
    }
  });
};

const genericPost = (baseroute, subroute, body = '', silent = false) => {
  return retrieveData('authToken').then((authToken) => {
    const fetchArgs = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: authToken
      },
      body: body
    };
    return genericRequest(fetchArgs, baseroute, subroute, '', silent);
  });
};

const genericRequest = (fetchArgs, baseroute, subroute, query = '', silent) => {
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
      try {
        errorInfo = JSON.parse(e.message);
      } catch (err) {
        errorInfo = { errorText: e.message, status: -1 };
      }
      var errorText = errorInfo.errorText;
      if ((errorInfo.errorText === 'Network request failed') || (errorInfo.errorText === 'Aborted')) {
        errorText = 'Failed to connect to server within the time limit.';
        /*
        errorText += `\nAddress: ${baseroute}`;
        errorText += `\nPath: ${subroute}`;
        errorText += `\nTime limit: ${timeout} seconds`;
        errorText += '\nCheck the server is running at the specified address';
        errorText += ', and that your device is connected to the same network as the server';
        errorText += '.';
        */
      }
      if (!silent) {
        alert(errorText);
      }
      return { content: errorText, status: errorInfo.status, ok: false };
    });
};

module.exports = { genericGet, genericPost, storeData, retrieveData, resetAndNavigate };
