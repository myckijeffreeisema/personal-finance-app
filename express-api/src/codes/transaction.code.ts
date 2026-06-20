export const TRANSACTION_RESPONSE_CODE = {
    SUCCESS: {
        CREATED: "transaction_created",
        UPDATED: "transaction_info_updated",
        LIST: "transaction_list",
        FOUND: "transaction_found",
        BALANCE_INFO: "balance_info"
    },
    ERROR: {
        NOT_FOUND: "transaction_not_found",
        ID_REQUIRED: "transaction_id_required",
        INVALID_PARAMS_TYPE: "transaction_param_type_invalid",
        INVALID_PARAMS_ORDER: "transaction_param_order_invalid"
    }
}