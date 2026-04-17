export let failureReason: string | null = null;

export function setFailureReason(reason?: string) {
    failureReason = reason ?? null;
}

export function clearFailureReason() {
    failureReason = null;
}