import AppConfig from '@/locales/en/appSetting';

export default {
    'service.default-message.unknown-error': 'There is something wrong, please comeback and try later.',
    'service.default-message.response-status-400': 'Submitted data could not be processed.',
    'service.default-message.response-status-401': 'Please sign in before access this resource.',
    'service.default-message.response-status-403': 'Permission denied for this resource.',
    'service.default-message.response-status-404': 'This resource does not exist.',
    'service.default-message.api-error-network': 'Internet connection is in trouble.',
    'service.default-message.api-error-client': 'Browser could not make request.',
    ...AppConfig
};
