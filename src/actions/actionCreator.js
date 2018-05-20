
// export const UPDATE_AUTH = "UPDATE_AUTH";
export const UPDATE_USER = "UPDATE_USER";

// export function updateAuth(boolean){
//     return {
//         type: UPDATE_AUTH,
//         payload: boolean
//     }
// }

export function updateUser(user){
    return {
        type: UPDATE_USER,
        payload: user
    }
}
