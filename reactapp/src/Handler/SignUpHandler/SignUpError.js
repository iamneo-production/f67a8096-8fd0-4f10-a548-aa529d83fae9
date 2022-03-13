class SignUpError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SignUpError';
    }
}

export default SignUpError;