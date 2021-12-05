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

export function setSettings(msg: any, callback: (arg0: Error | null, arg1: { username: any, settings: any } | null) => any) {
    const query: {
        username: any
    } = {
        username: msg.username
    };
    const update: {
        username: any, settings: any
    } = {
        username: msg.username,
        settings: msg.settings
    };
    const keys = Object.keys(msg["settings"]);

    db.user.find(query, (err: Error | null, data: any) => {
        if (err) {
            callback(err, null);
        } else {
            console.log("moinsen")
            const prevSettings = data[0].settings
            console.log(prevSettings)
            keys.forEach(function (key) {
                console.log(key)
                prevSettings[key] = msg.settings[key]
                // settingsToSet += "'settings." + key + "':" + msg.settings[key]
                // settingsToSet["settings." + key] = msg.settings[key]


            })
            console.log(prevSettings)
            db.user.update({"username": msg.username}, {$set: {settings: prevSettings}}, {}, (err: Error | null, res: any) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, res);
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
