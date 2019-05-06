/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
import { memoize } from 'belter/src';

import type { XProps } from './types';

export type XCreateSubscriptionDataType = {|

|};

export type XCreateSubscriptionActionsType = {|
    subscriptions : {
        create : (Object) => ZalgoPromise<string>,
        get : (Object) => ZalgoPromise<string>,
        activate : (Object) => ZalgoPromise<string>,
        revise : (Object) => ZalgoPromise<string>
    }
|};

export type XCreateSubscription = (?XCreateSubscriptionDataType, ?XCreateSubscriptionActionsType) => ZalgoPromise<string>;

export function buildXCreateSubscriptionData() : XCreateSubscriptionDataType {
    // $FlowFixMe
    return {};
}

export function buildXCreateSubscriptionActions() : XCreateSubscriptionActionsType {
    // $FlowFixMe
    return {};
}

export type CreateSubscription = XCreateSubscription;

export function getCreateSubscription(xprops : XProps) : ?CreateSubscription {
    const { createSubscription } = xprops;

    if (createSubscription) {
        return memoize(() => {
            return createSubscription(buildXCreateSubscriptionData(), buildXCreateSubscriptionActions());
        });
    }
}
