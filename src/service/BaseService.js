import NotificationService from '@/service/NotificationService';
import { httpSecure, ResponseType } from '@/common/http';
import router from '@/router';

export default class BaseService {
    static #showMessage(res, notifySuccess, notifyError) {
        let message = res.state === ResponseType.UNDEFINED ? 'service.default-message.unknown-error' : res.message;
        if (notifySuccess && res.state === ResponseType.SUCCESS) {
            this.showSuccessMessage(message);
            return;
        }
        if (notifyError && res.state !== ResponseType.SUCCESS) {
            this.showErrorMessage(message);
        }
    }

    static showErrorMessage(message) {
        NotificationService.INSTANCE.sendErrorMessage({
            body: message
        }).then();
    }

    static showSuccessMessage(message) {
        NotificationService.INSTANCE.sendSuccessMessage({
            body: message
        }).then();
    }

    static #handleResponse(res, option) {
        BaseService.#showMessage(res, option.notifyOnSuccess, option.notifyOnError);
        if (res.state === ResponseType.UNAUTHORIZED) {
            return router.push({
                name: Page.AUTH.LOGIN.name
            });
        }
        if (res.state === ResponseType.ACCESS_DENIED) {
            return router.push({
                name: Page.ACCESS.DENIED.name
            });
        }
        if ((option.redirectOnerror ?? false) && res.state !== ResponseType.SUCCESS) {
            return router.push({
                name: Page.ACCESS.ERROR.name
            });
        }
        switch (res.state) {
            case ResponseType.SUCCESS:
                return Promise.resolve({
                    state: true,
                    payload: res.payload
                });
            default:
                return Promise.resolve({
                    state: false,
                    payload: res.message
                });
        }
    }

    async request(
        spec = {
            path: '',
            method: 'GET',
            data: null
        },
        options = {
            secure: true,
            notifyOnSuccess: false,
            notifyOnError: true,
            redirectOnError: false
        }
    ) {
        if (options.secure) {
            return this.#requestAuth(spec, options);
        } else {
            return this.#requestNoAuth(spec, options);
        }
    }

    async #requestNoAuth(
        spec = {
            path: '',
            method: 'GET',
            data: null
        },
        options = {
            notifyOnSuccess: false,
            notifyOnError: true,
            redirectOnError: false
        }
    ) {}

    async #requestAuth(
        spec = {
            path: '',
            method: 'GET',
            data: null
        },
        options = {
            notifyOnSuccess: false,
            notifyOnError: true,
            redirectOnError: false
        }
    ) {
        const res = await httpSecure()({
            path: spec.path,
            method: spec.method,
            data: spec.data
        });

        return BaseService.#handleResponse(res, options);
    }
}
