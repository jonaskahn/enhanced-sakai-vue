import NotificationService from '@/service/NotificationService';
import { ResponseType } from '@/common/http';

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

    async request(
        spec = {
            path: '',
            method: 'GET',
            data: null
        },
        options = {
            secure: true,
            showToast: false,
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
            showToast: false,
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
            showToast: false,
            redirectOnError: false
        }
    ) {}
}
