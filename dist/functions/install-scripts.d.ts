export type InstallScriptsInput = {
    orgId: string;
    sessionId?: string;
};
export declare function installScripts({ orgId, sessionId }: InstallScriptsInput): string;
