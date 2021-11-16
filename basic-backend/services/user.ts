import * as userModel from '../models/user'

export function registerUser(message: any, callback: (arg0: Error | null, arg1: { username: any, password: any, email: any } | null) => any) {
    userModel.createUserLog(message, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}

export function loginUser(message: any, callback: (arg0: Error | null, arg1: { username: any, _id: any } | null) => any) {
    userModel.queryUser(message.username, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            if (!data[0].password) {
                callback(Error("no user found"), null);
            } else {
                if (data[0].password === message.password) {
                    callback(null,  {_id: data[0]._id, username: data[0].username});
                } else {
                    callback(Error("wrong password"), null)
                }

            }
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