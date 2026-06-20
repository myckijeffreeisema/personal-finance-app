export const USER_RESPONSE_CODE = {
    ERROR: {
        CONFLICT: "email_in_use",
        NOT_FOUND: "user_not_found"
    },
    SUCCESS: {
        CREATED: "user_created",
        FOUND: "user_found",
        UPDATE: "user_info_updated",
        DELETED: "user_deleted"
    }
}