import Datastore from 'nedb';
export const user = new Datastore({filename: './databases/user.db', autoload: true});
export const modules = new Datastore({filename: './databases/modules.db', autoload: true});
user.ensureIndex({unique: true, fieldName: "username"})
