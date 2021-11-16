import * as db from "./db";

export function createUserLog(msg: any, callback: (arg0: Error | null, arg1: { username: any, password: any, email: any } | null) => any) {
    const doc: {
        username: any,
        password: any,
        email: any
    } = {
        username: msg.username,
        password: msg.password,
        email: msg.email
    };
    db.user.insert(doc, (err: Error | null, newDoc: { username: any, password: any, email: any }) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, newDoc);
        }
    });
}

export function queryUser(username: string, callback: (arg0: Error | null, arg1: any) => void) {
    db.user.find(username ? {username: new RegExp(username)} : {}, (err: Error | null, data: any) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}
