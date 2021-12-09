import * as moduleModel from '../models/module'

export function getModule(id: string, callback: (arg0: Error | null, arg1: any) => any) {
    moduleModel.getModule(id, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}

export function createModule(type: string, name: string, content: any, callback: (arg0: Error | null, arg1: any) => any) {
    moduleModel.createModule(type, name, content, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}

export function updateModule(id: string, name: string, content: any, callback: (arg0: Error | null, num: any, data: any) => any) {
    moduleModel.updateModule(id, name, content, (err, num, data) => {
        if (err) {
            callback(err, null, null);
        } else {
            callback(null, num, data);
        }
    });
}
