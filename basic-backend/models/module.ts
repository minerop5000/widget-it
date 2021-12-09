import * as db from "./db";


export function getModule(id: string, callback: (arg0: Error | null, arg1: any | null) => any) {
    db.modules.find({_id: id}, (err: Error | null, res: any) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}

export function createModule(type: string, name: string, content: any, callback: (arg0: Error | null, arg1: any | null) => any) {
    db.modules.insert({type: type, name: name, content: content}, (err: Error | null, res: any) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}

export function updateModule(id: string, name: string, content: any, callback: (arg0: Error | null, arg1: any | null, res: any) => any) {
    db.modules.update({_id: id}, {
        $set: {
            name: name,
            content: content
        }
    }, {returnUpdatedDocs: true}, (err: Error | null, num: any, res: any) => {
        if (err) {
            callback(err, null, null);
        } else {
            callback(null, num, res);
        }
    });
}
