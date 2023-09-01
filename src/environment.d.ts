declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            TS_JEST?: any;
            
            // Application
            PORT: string;

            // 3rd-Party Services
            DOPPLER_CLIENT_PD?: string;
            MAILCHIMP_API_KEY?: string;
            MAILCHIMP_SERVER?: string;

            // OAuth Services
            GITHUB_CLIENT_ID?: string;
            GITHUB_CLIENT_SECRET?: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }
