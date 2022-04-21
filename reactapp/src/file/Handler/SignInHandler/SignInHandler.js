import SignInAPI from "server/SignInAPI/SignInAPI";
import SignInError from "./SignInError";

function signIn(credentials) {
    let signInMsgPacket = SignInAPI.signIn(credentials);
    return signInMsgPacket;
}

async function signInHandler(credentials, onSuccess) {
    let signInMsgPacket = await signIn(credentials);

    if (signInMsgPacket.payload) {
        onSuccess(signInMsgPacket);
    } else {
        throw new SignInError(signInMsgPacket.message);
    }
}

export default signInHandler;