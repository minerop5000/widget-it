import * as db from "./db";

export interface User {
    _id: any,
    username: any,
    password: any,
    email: any
}

export function createUserLog(msg: any, callback: (arg0: Error | null, arg1: { username: any, password: any, email: any } | null) => any) {
    const doc: {
        username: any,
        password: any,
        email: any,
        settings: any
    } = {
        username: msg.username,
        password: msg.password,
        email: msg.email,
        settings: {}
    };
    db.user.insert(doc, (err: Error | null, newDoc: { username: any, password: any, email: any }) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, newDoc);
        }
    });
}

export function changePassword(msg: any, callback: (arg0: Error | null, message: boolean | null) => any) {
    db.user.update({username: msg.username}, {$set: {password: msg.newPassword}}, {}, (err: Error | null, passwordChanged: any) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, true);
        }
    });
}

export function setSettings(msg: any, callback: (arg0: Error | null, arg1: { username: any, settings: any } | null) => any) {
    const query: {
        _id: any
    } = {
        _id: msg._id
    };
    const keys = Object.keys(msg["settings"]);

    db.user.find(query, (err: Error | null, data: any) => {
        if (err) {
            callback(err, null);
        } else {
            if(data.length == 0) {
                callback(Error("id not found"), null);
                return
            }
            const prevSettings = data[0].settings
            keys.forEach(function (key) {
                prevSettings[key] = msg.settings[key]
            })
            db.user.update({"_id": msg._id}, {$set: {settings: prevSettings}}, {returnUpdatedDocs: true}, (err: Error | null, num: any, data: any) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, data);
                }
            });
        }
    });
}

export function queryUser(username: string, callback: (arg0: Error | null, arg1: any) => void) {
    db.user.find(username ? {username: username} : {}, (err: Error | null, data: any) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}

export function getNumberOfUser(callback: (arg0: Error | null, arg1: any) => void) {
    db.user.count({}, (err: Error | null, data: any) => {
        if (err) {
            callback(err, null);
        } else {
            console.log("count: " + data)
            callback(null, data);
        }
    });
}

export function getUserInfo(_id: string, callback: (arg0: Error | null, arg1: any) => void) {
    db.user.find({_id: _id}, (err: Error | null, data: any) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}
