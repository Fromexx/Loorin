export enum AuthType {
    User,
    Provider
}

export class AuthTypeController {
    private static _authType: AuthType;

    static IsUserAuthType() {
        return this._authType == AuthType.User;
    }

    static IsProviderAuthType() {
        return this._authType == AuthType.Provider;
    }

    static SetAuthType(authType: AuthType) {
        this._authType = authType;
    }
}