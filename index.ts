import { usersArray, User } from './users';
import { usersInfoArray, UserInfo } from './userInfo';

interface UserPosition {
    name: string;
    position: string;
    age: number;
    gender: string;
}

function getUsersJobPositions(users: User[]): UserPosition[] {
    return users.map(user => {
        const userInfo = usersInfoArray.find(info => info.userid === user.userid);
        if (userInfo) {
            return {
                name: user.name,
                position: userInfo.organization.position,
                age: userInfo.age,
                gender: user.gender,
            };
        }
        throw new Error(`Не найдено никакой дополнительной информации для пользователя с id  ${user.userid}`);
    });
}

const usersPositions = getUsersJobPositions(usersArray);
console.log('userPositions', usersPositions);