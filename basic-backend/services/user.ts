import * as userModel from '../models/user'
import {User} from "../models/user";

export function registerUser(message: any, callback: (arg0: Error | null, arg1: { username: any, password: any, email: any } | null) => any) {
    userModel.createUserLog(message, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}

export function loginUser(message: any, callback: (arg0: Error | null, arg1: { password: any; _id: any; email: any; username: any } | null) => any) {
    userModel.queryUser(message.username, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            console.log(data)
            if (data.length == 0) {
                callback(Error("user not found"), null);
            }
                // if (!data[0].password) {
                //     callback(Error("no user found"), null);
            // }
            else {
                if (data[0].password === message.password) {
                    callback(null, {_id: data[0]._id, username: data[0].username, password: data[0].password, email: data[0].email});
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