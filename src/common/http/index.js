import axios from 'axios';
import { getCurrentLocale, translate } from '@/locales';
import logger from '@/common/logger';
import DEFAULTS from '@/constants/app';

export const ResponseType = {
    SUCCESS: Symbol(0),
    NETWORK_ERROR: Symbol(1),
    CLIENT_ERROR: Symbol(1),
    UNAUTHORIZED: Symbol(2),
    ACCESS_DENIED: Symbol(2),
    NOT_FOUND: Symbol(2),
    BAD_REQUEST: Symbol(2),
    UNDEFINED: Symbol(2)
};

export class ResponseData {
    #status;
    #payload;

    constructor(status, payload) {
        this.#status = status;
        this.#payload = payload;
    }

    get status() {
        return this.#status;
    }

    get payload() {
        return this.#payload;
    }
}

function createInstance(headers = {}) {
    const instance = axios.create();
    instance.defaults.baseURL = import.meta.env.VITE_API_REQUEST_URL;
    instance.defaults.timeout = import.meta.env.VITE_API_REQUEST_TIMEOUT;
    instance.defaults.headers.common['Accept-Language'] = getCurrentLocale();
    Object.entries(headers).forEach(([key, value]) => {
        instance.defaults.headers.common[`${key}`] = `${value}`;
    });
    instance.interceptors.response.use(
        function (response) {
            return Promise.resolve(new ResponseData(ResponseType.SUCCESS, response.data.payload));
        },
        function (error) {
            logger.error(error);
            if (error.response) {
                return onResponseError(error.response);
            } else if (error.request) {
                return onRequestError(error);
            } else {
                return Promise.resolve(new ResponseData(ResponseType.UNDEFINED));
            }
        }
    );
    return instance;
}

/**
 * JSON response:
 * - Success: {
 *     status: 200,
 *     payload: object
 * }
 * - Error: {
 *     status: 4xx || 5xx,
 *     payload: string message
 * }
 * @param res
 * @returns {Promise<Awaited<ResponseData>>}
 */
async function onResponseError(res) {
    res.data.payload;
    switch (res.status) {
        case 400:
            return Promise.resolve(new ResponseData(ResponseType.BAD_REQUEST, res.data.payload ?? translate('service.default-message.response-status-400')));
        case 401:
            return Promise.resolve(new ResponseData(ResponseType.UNAUTHORIZED, res.data.payload ?? translate('service.default-message.response-status-401')));
        case 403:
            return Promise.resolve(new ResponseData(ResponseType.ACCESS_DENIED, res.data.payload ?? translate('service.default-message.response-status-403')));
        case 404:
            return Promise.resolve(new ResponseData(ResponseType.NOT_FOUND, res.data.payload ?? translate('service.default-message.response-status-403')));
        default:
            return Promise.resolve(new ResponseData(ResponseType.UNDEFINED, translate('service.default-message.unknown-error')));
    }
}

async function onRequestError(error) {
    if (error.message === 'Network Error') {
        return Promise.resolve(new ResponseData(ResponseType.NETWORK_ERROR, translate('service.default-message.api-error-network')));
    } else {
        return Promise.resolve(new ResponseData(ResponseType.NETWORK_ERROR, translate('service.default-message.api-error-client')));
    }
}

const http = createInstance();
const httpSecure = createInstance({
    Authorization: `Bearer ${localStorage.getItem(DEFAULTS.ACCESS.TOKEN)}`
});
export { http, httpSecure };
