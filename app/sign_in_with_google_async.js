import Expo from 'expo';

async function signInWithGoogleAsync() {
  try {
    const result = await Expo.Google.logInAsync({
      androidClientId: process.env.GOOGLE_AUTH_CLIENT_ID,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      return result.accessToken;
    } else {
      return {cancelled: true};
    }
  } catch(e) {
    return {error: true};
  }
}

export default signInWithGoogleAsync;