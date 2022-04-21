import SignUpAPI from 'server/SignUpAPI/SignUpAPI.js';

import signInHandler from '../SignInHandler/SignInHandler.js';

import SignInError from 'Handler/SignInHandler/SignInError.js';
import SignUpError from './SignUpError.js';


async function signUpHandler(credentials, onSuccess) {
    let onSignInSuccess = (signInMsgPacket) => {
        onSuccess(signInMsgPacket);
    }

    let signUpMsgPacket = await SignUpAPI.createUser(credentials);

    if (signUpMsgPacket.isCreated) {
        try {
            await signInHandler(credentials, onSignInSuccess);
        } catch (err) {
            if (err instanceof SignInError) {
                throw new SignUpError('Auto SignIn failed\nTry Signing in manually');
            }
        }
    } else {
        throw new SignUpError(signUpMsgPacket.message);
    }

}

export default signUpHandler;