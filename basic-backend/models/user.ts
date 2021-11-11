import * as db from "./db";

export function createUserLog(msg: any, callback: (arg0: Error | null, arg1: { username: any, password: any } | null) => any) {
    const doc: {
        username: any,
        password: any
    } = {
        username: msg.username,
        password: msg.password
    };
    db.user.insert(doc, (err: Error | null, newDoc: { username: any, password: any }) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, newDoc);
        }
    });
}

export function queryUser(containsString: any, callback: (arg0: Error | null, arg1: any) => void) {
    db.user.find(containsString ? {message: new RegExp(containsString)} : {}, (err: Error | null, data: any) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}