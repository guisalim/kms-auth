import DopplerSDK from '@dopplerhq/node-sdk'
import { AppLogger } from '@/configuration/logger';

export class AppVault {
    private vault: undefined | { [key: string]: any } = undefined
    constructor() {
        AppLogger.info('Initializing AppVault');
        this.initialize();
    }

    private async initialize(): Promise<void> {
        const doppler = new DopplerSDK()
        doppler.setBearerToken(process.env.DOPPLER_CLIENT_PD ?? '')
        try {
            const res = await doppler.secrets.list('example-project', 'dev', {
                accepts: 'application/json',
                includeDynamicSecrets: true,
                dynamicSecretsTtlSec: 25613716,
                includeManagedSecrets: true,
            });

            if (!res.secrets) {
                throw new Error("No secret found on vault");
            }

            this.vault = Object
                .entries(res.secrets)
                .reduce<{ [key: string]: any }>((acc, [key, item]) => {
                    const secret = (item ?? {}) as { computed?: string };
                    const computed = transformSecret(secret.computed, key);
                    if (computed !== undefined) {
                        acc[key] = computed;
                    }
                    return acc;
                }, {});
        } catch (e: any) {
            AppLogger.error('Failed to initialize vault due to:' + JSON.stringify(e));
        }
    }

    public get(key: string): undefined | string | number | object {
        return this.vault?.[key] ?? undefined;
    }
}

function transformSecret(secret: string | undefined, key?: string): undefined | string | number | object {
    const isJSON = (str: string) => {
        try {
            JSON.stringify(JSON.parse(str));
            return true;
        } catch (e) {
            return false;
        }
    }

    try {
        if (!secret) {
            return undefined;
        }

        if (!isNaN(parseFloat(secret))) {
            return parseFloat(secret);
        }

        if (isJSON(secret)) {
            return JSON.parse(secret);
        }

        return secret;
    } catch (e) {
        AppLogger.error(`Unknow format on Vault for: ${key ?? '{{Unknow key}}'}. ${JSON.stringify(e)}`);
    }
    return undefined;
}