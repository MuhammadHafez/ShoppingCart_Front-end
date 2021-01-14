export function sendToken(value){
    return {
        headers: {
            'Authorization': value
        }
    }
}