import { createConsola } from 'consola';

const logger = createConsola({
    level: import.meta.env.NODE_ENV === 'production' ? 0 : 4,
    fancy: true,
    formatOptions: {
        columns: 120,
        colors: true,
        compact: import.meta.env.NODE_ENV === 'production',
        date: false
    }
});

export default logger;
