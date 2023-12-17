export default class AuthenticationService {
    static isAuthenticated = false

    static login(username: string, password: string) {
        // Hardcoded credentials for simplicity.
        if (username === 'user' && password === 'password') {
            AuthenticationService.isAuthenticated = true
            return true
        } else {
            return false
        }
    }

    static logout() {
        AuthenticationService.isAuthenticated = false
    }
}
