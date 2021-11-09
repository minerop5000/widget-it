import * as userModel from '../models/user'

export function registerUser(message: any, callback: (arg0: Error | null, arg1: { username: any, password: any } | null) => any) {
    userModel.createUserLog(message, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}

export function listUsers(containsString: any, callback: (arg0: Error | null, arg1: any) => void) {
    userModel.queryUser(containsString, (err: Error | null, data: any) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}