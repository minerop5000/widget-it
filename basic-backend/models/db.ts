import Datastore from 'nedb';
export const echo = new Datastore({ filename: './databases/echo.db', autoload: true });
export const user = new Datastore({ filename: './databases/user.db', autoload: true });
