// export const BASE_PROTOCOL = 'https';
export const BASE_PROTOCOL = 'http';
// export const BASE_URL = 'mist-dev.power.froso.de';
export const BASE_URL = 'mist-qa.froso.de:8080';
export const BASE_PORT = '';
export const AUTH_URL = '/api/Session';

export function getFullUrlForSubPath(subPath, actionPath) {
    // Create url from protocol + base url
    let url = BASE_PROTOCOL + '://' + BASE_URL;

    // Add port if it exists
    if (BASE_PORT !== '') url += ':' + BASE_PORT;

    // Add the subPath provided
    url += subPath;

    // Add an actionPath if provided
    if (actionPath !== '') url += actionPath;

    return url;
}