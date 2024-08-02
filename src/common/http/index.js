import ky from 'ky';
import { getCurrentLocale } from '@/locales';
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

const http = ky.create({
    prefixUrl: import.meta.env.VITE_API_REQUEST_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': getCurrentLocale()
    },
    hooks: {
        beforeRequest: [() => console.log('beforeRequest')],
        afterRequest: [() => console.log('afterRequest')]
    }
});

const httpSecure = ky.create({
    prefixUrl: import.meta.env.VITE_API_REQUEST_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': getCurrentLocale(),
        Authorization: `Bearer ${localStorage.getItem(DEFAULTS.TOKEN.ACCESS_TOKEN)}`
    },
    hooks: {
        beforeRequest: [() => console.log('beforeRequest')],
        afterRequest: [() => console.log('afterRequest')]
    }
});

export { http, httpSecure };
