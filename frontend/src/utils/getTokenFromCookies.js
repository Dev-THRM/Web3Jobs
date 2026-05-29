// utils/getTokenFromCookies.js
export const getTokenFromCookies = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    return token ? token.split('=')[1] : null;
};
