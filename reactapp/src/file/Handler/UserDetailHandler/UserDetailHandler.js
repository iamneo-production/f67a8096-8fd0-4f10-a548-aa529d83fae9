import UserDetailsAPI from 'server/UserDetailsAPI/UersDetailsAPI';
import UserDetailFetchError from './UserDetailFetchError.js';

async function fetchUserDetails(email) {
    let userDetailsPacket = await UserDetailsAPI.fetch(email);
    if (userDetailsPacket.payload) {
        return userDetailsPacket.payload;
    } else {
        throw new UserDetailFetchError(userDetailsPacket.message);
    }
}

export default fetchUserDetails;