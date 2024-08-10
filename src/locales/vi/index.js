import AppConfig from '@/locales/vi/global/setting';
import Menu from '@/locales/vi/global/menu';

export default {
    'service.default-message.unknown-error': 'Đã có sự cố xảy ra. Vui lòng thử lại sau.',
    'service.default-message.response-status-400': 'Dữ hiệu không hợp lệ, không thể xử lý.',
    'service.default-message.response-status-401': 'Đăng nhập để truy cập tài nguyên này.',
    'service.default-message.response-status-403': 'Không đủ quyền để truy cập tài nguyên này.',
    'service.default-message.response-status-404': 'Tài nguyên này không tồn tại.',
    'service.default-message.api-error-network': 'Kết nối mạng có vấn đề.',
    'service.default-message.api-error-client': 'Trình duyệt không thể tạo kết nối.',
    'global.notification.default-title.error': 'Không thành công',
    'global.notification.default-title.warn': 'Cảnh báo',
    'global.notification.default-title.info': 'Thông tin',
    'global.notification.default-title.success': 'Thành công',
    ...AppConfig,
    ...Menu
};
