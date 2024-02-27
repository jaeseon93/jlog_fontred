export function isEmpty(value) {
    if (value == null || typeof value === "undefined") {
        return true;
    }
    if (typeof value === "string" && value.trim().length === 0) {
        return true;
    }
    return false;
}