/* @flow */

export const SMART_BUTTONS = 'smart_buttons';
export const SMART_PAYMENT_BUTTONS = 'smart-payment-buttons';

export const ACCESS_TOKEN_HEADER = 'x-paypal-internal-euat';

export const HEADERS = {
    AUTHORIZATION: 'authorization',

    CSRF_TOKEN:         'x-csrf-jwt',
    SOURCE:             'x-source',
    REQUESTED_BY:       'x-requested-by',

    ACCESS_TOKEN:           'x-paypal-internal-euat',
    PARTNER_ATTRIBUTION_ID: 'paypal-partner-attribution-id',
    CLIENT_METADATA_ID:     'paypal-client-metadata-id'
};

export const DATA_ATTRIBUTES = {
    FUNDING_SOURCE:    'data-funding-source',
    CARD:              'data-card',
    PAYMENT_METHOD_ID: 'data-payment-method-id'
};

export const CLASS = {
    LOADING: 'paypal-button-loading'
};

export const ORDER_API_ERROR = {
    INSTRUMENT_DECLINED:   'INSTRUMENT_DECLINED',
    PAYER_ACTION_REQUIRED: 'PAYER_ACTION_REQUIRED'
};

export const CONTEXT = {
    IFRAME: 'iframe',
    POPUP:  'popup'
};

export const TARGET_ELEMENT = {
    BODY: 'body'
};

export const ERROR_URL = 'https://www.paypal.com/checkoutnow/error';

export const ORDER_ID_PATTERN = /^(EC-)?[A-Z0-9]+$/;

export const INTEGRATION_ARTIFACT = {
    PAYPAL_JS_SDK: 'PAYPAL_JS_SDK'
};

export const USER_EXPERIENCE_FLOW = {
    INCONTEXT: 'INCONTEXT',
    INLINE:    'INLINE'
};

export const PRODUCT_FLOW = {
    SMART_PAYMENT_BUTTONS: 'SMART_PAYMENT_BUTTONS'
};

export const FPTI_CONTEXT_TYPE = {
    BUTTON_SESSION_ID: ('button_session_id' : 'button_session_id'),
    ORDER_ID:          ('EC-Token' : 'EC-Token'),
    SUBSCRIPTION_ID:          ('subscription_id' : 'subscription_id'),
};

export const FPTI_STATE = {
    BUTTON:   ('smart_button' : 'smart_button')
};

export const FPTI_TRANSITION = {
    BUTTON_LOAD:  ('process_button_load' : 'process_button_load'),
    CREATE_ORDER: ('process_create_order' : 'process_create_order'),
    CREATE_SUBSCRIPTION: ('process_create_subscription' : 'process_create_subscription'),
    REVISE_SUBSCRIPTION: ('process_revise_subscription' : 'process_revise_subscription')
};
