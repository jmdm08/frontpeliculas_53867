export const URL_API_PELICULA = "http://localhost:3200/api";

export function getToken(){
    const auth = JSON.parse(localStorage.getItem('auth'));
    return auth.token;
}