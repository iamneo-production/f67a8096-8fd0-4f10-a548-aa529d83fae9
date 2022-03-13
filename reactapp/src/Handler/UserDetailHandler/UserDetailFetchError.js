class UserDetailFetchError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserDetailFetchError';
    }
}

export default UserDetailFetchError;