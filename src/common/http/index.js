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
    #message;
    #payload;

    constructor(data = { status: String, message: String, payload: String }) {
        this.#status = data.status;
        this.#message = data.message;
        this.#payload = data.payload;
    }

    get status() {
        return this.#status;
    }

    get message() {
        return this.#message;
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
            return Promise.resolve(
                new ResponseData({
                    status: ResponseType.SUCCESS,
                    message: response.data.message,
                    payload: response.data.payload
                })
            );
        },
        function (error) {
            logger.error(error);
            if (error.response) {
                return onResponseError(error.response);
            } else if (error.request) {
                return onRequestError(error);
            } else {
                return Promise.resolve(
                    new ResponseData({
                        status: ResponseType.UNDEFINED
                    })
                );
            }
        }
    );
    return instance;
}

/**
 * JSON response:
 * - Success: {
 *     status: 200,
 *     message: string
 *     payload: object
 * }
 * - Error: {
 *     status: 4xx || 5xx,
 *     message: string message,
 *     payload: object || null
 * }
 * @param res
 * @returns {Promise<Awaited<ResponseData>>}
 */
async function onResponseError(res) {
    const message = res.data.message;
    const payload = res.data.payload;
    switch (res.status) {
        case 400:
            return Promise.resolve(
                new ResponseData({
                    status: ResponseType.BAD_REQUEST,
                    message: message ?? translate('service.default-message.response-status-400'),
                    payload: payload
                })
            );
        case 401:
            return Promise.resolve(
                new ResponseData({
                    status: ResponseType.UNAUTHORIZED,
                    message: message ?? translate('service.default-message.response-status-401'),
                    payload: payload
                })
            );
        case 403:
            return Promise.resolve(
                new ResponseData({
                    status: ResponseType.ACCESS_DENIED,
                    message: message ?? translate('service.default-message.response-status-403'),
                    payload: payload
                })
            );
        case 404:
            return Promise.resolve(
                new ResponseData({
                    status: ResponseType.NOT_FOUND,
                    message: message ?? translate('service.default-message.response-status-404'),
                    payload: payload
                })
            );
        default:
            return Promise.resolve(
                new ResponseData({
                    status: ResponseType.CLIENT_ERROR,
                    message: message ?? translate('service.default-message.unknown-error'),
                    payload: payload
                })
            );
    }
}

async function onRequestError(error) {
    if (error.message === 'Network Error') {
        return Promise.resolve(
            new ResponseData({
                status: ResponseType.NETWORK_ERROR,
                message: translate('service.default-message.api-error-network')
            })
        );
    } else {
        return Promise.resolve(
            new ResponseData({
                status: ResponseType.UNDEFINED,
                message: translate('service.default-message.api-error-client')
            })
        );
    }
}

const http = createInstance();
const httpSecure = createInstance({
    Authorization: `Bearer ${localStorage.getItem(DEFAULTS.ACCESS.TOKEN)}`
});
export { http, httpSecure };
