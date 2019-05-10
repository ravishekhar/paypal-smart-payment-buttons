/* @flow */

import type { ZalgoPromise } from "zalgo-promise/src";
import { request } from "belter/src";
import {
    CREATE_SUBSCRIPTIONS_API_URL,
    REVISE_SUBSCRIPTIONS_API_URL,
    GET_SUBSCRIPTIONS_API_URL,
    ACTIVATE_SUBSCRIPTIONS_API_URL, API_URI
} from '../config';
import { FPTI_STATE, FPTI_TRANSITION, FPTI_CONTEXT_TYPE } from '../constants';
import { FPTI_KEY } from '@paypal/sdk-constants/src';

import { getLogger } from '../lib';
import { callSmartAPI } from "./api";
import type { OrderResponse } from "./order";

export type SubscriptionCreateRequest = {|
    plan_id?: string,
    start_time: string,
    quantity: string,
    shipping_amount: $ReadOnlyArray<{
        currency_code: string,
        value: string
    }>,
    auto_renewal: boolean,
    application_context: $ReadOnlyArray<{
        brand_name: string,
        locale: string,
        shipping_preference: 'SET_PROVIDED_ADDRESS' | 'USE_FROM_FILE' | 'NO_SHIPPING',
        user_action: 'SUBSCRIBE_NOW' | 'CONTINUE',
        payment_method: {
            payer_selected: 'PAYPAL',
            payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED'
        }
    }>
|};

export function createSubscription(accessToken: string, subscriptionPayload: SubscriptionCreateRequest): ZalgoPromise<string> {
    getLogger().info(`rest_api_create_subscription_id`);

    if (!accessToken) {
        throw new Error(`Access token not passed`);
    }

    if (!subscriptionPayload) {
        throw new Error(`Expected subscription payload to be passed`);
    }

    const headers: Object = {
        'Authorization': `Bearer ${accessToken}`,
        'PayPal-Partner-Attribution-Id': window.xprops.partnerAttributionID
    };

    return request({
        method: `post`,
        url: CREATE_SUBSCRIPTIONS_API_URL,
        headers,
        json: subscriptionPayload
    }).then(({ body }): string => {

        if (!body || !body.id) {
            throw new Error(`Create Subscription Api response error:\n\n${JSON.stringify(body, null, 4)}`);
        }

        getLogger().track({
            [FPTI_KEY.STATE]: FPTI_STATE.BUTTON,
            [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.CREATE_SUBSCRIPTION,
            [FPTI_KEY.CONTEXT_TYPE]: FPTI_CONTEXT_TYPE.SUBSCRIPTION_ID,
            [FPTI_KEY.TOKEN]: body.id,
            [FPTI_KEY.CONTEXT_ID]: body.id
        });

        return body.id;
    });
}

export function reviseSubscription(accessToken: string, subscriptionId: string, subscriptionPayload: SubscriptionCreateRequest): ZalgoPromise<string> {
    getLogger().info(`rest_api_create_subscription_id`);

    if (!accessToken) {
        throw new Error(`Access token not passed`);
    }

    if (!subscriptionPayload) {
        throw new Error(`Expected subscription payload to be passed`);
    }

    const headers: Object = {
        'Authorization': `Bearer ${accessToken}`,
        'PayPal-Partner-Attribution-Id': window.xprops.partnerAttributionID
    };

    return request({
        method: `post`,
        url: `${CREATE_SUBSCRIPTIONS_API_URL}/${subscriptionId}/revise`,
        headers,
        json: subscriptionPayload
    }).then(({ body, status }): string => {

        if (status !== 200) {
            throw new Error(`Revise Subscription Api HTTP-${status} response: error:\n\n${JSON.stringify(body, null, 4)}`);
        }

        getLogger().track({
            [FPTI_KEY.STATE]: FPTI_STATE.BUTTON,
            [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.REVISE_SUBSCRIPTION,
            [FPTI_KEY.CONTEXT_TYPE]: FPTI_CONTEXT_TYPE.SUBSCRIPTION_ID,
            [FPTI_KEY.TOKEN]: subscriptionId,
            [FPTI_KEY.CONTEXT_ID]: subscriptionId
        });
        // for revision flow the same subscription id is returned
        return subscriptionId;
    });
}

export function activateSubscription(subscriptionId : string) : ZalgoPromise<OrderResponse> {
    return callSmartAPI({
        method: `post`,
        url: `${ API_URI.SUBSCRIPTION }/${ subscriptionId }/activate`
    });
}


export function getSubscription(subscriptionId : string) : ZalgoPromise<OrderResponse> {
    return callSmartAPI({
        url: `${ API_URI.SUBSCRIPTION }/${ subscriptionId }`
    });
}
