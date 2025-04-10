import { User } from './UserModel.js';

function getUserById(userId: string): void {
    User.find((err: any, user: any) => {
        if (err) {
            console.error(err);
            // return callback(err, null);
        } else {
            console.log(user);
            // return callback(null, user);
        }
    });
}

export { getUserById };
