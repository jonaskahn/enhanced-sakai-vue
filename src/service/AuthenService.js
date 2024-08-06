import BaseService from '@/service/BaseService';
import DEFAULTS from '@/constants/app';
import useAuthStore from '@/store/authStore';

const authStore = useAuthStore();

export default class AuthService extends BaseService {
    static INSTANCE = new AuthService();

    async fakeLogin() {
        localStorage.setItem(
            DEFAULTS.ACCESS.ACCESS,
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTcyMjY4NTk3NiwiZXhwIjoxODIyNjg5NTc2fQ.Pv0TZ18vJbi9qNcDZR5A8RV0FtrJGMbQFHdHjEEGhD4'
        );
        localStorage.setItem(DEFAULTS.ACCESS.EXPIRATION, '1822689576');
        authStore.updateExpiration();
        authStore.updatePermission();
        return true;
    }

    async login(params) {
        const res = await this.request(
            {
                path: '/login',
                method: 'POST',
                data: params
            },
            {
                secure: false,
                notifyOnSuccess: true,
                notifyOnError: true
            }
        );
        if (res.success) {
            this.#updateAccessTokenInfo(res.payload);
        }
        return res.success;
    }

    #updateAccessTokenInfo(data) {
        localStorage.setItem(DEFAULTS.ACCESS.TOKEN, data);

        const token = JSON.parse(atob(data.split(".")[1]));
        localStorage.setItem(DEFAULTS.ACCESS.EXPIRATION, token['exp']);
        authStore.updateExpiration();
        authStore.updatePermission();
    }
}
