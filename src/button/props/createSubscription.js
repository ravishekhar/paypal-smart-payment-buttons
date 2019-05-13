/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
import { memoize } from 'belter/src';

import { createAccessToken, createSubscription, reviseSubscription } from '../../api';

import type { XProps } from './types';

export type XCreateSubscriptionDataType = {||};

export type XCreateSubscriptionActionsType = {|
    subscriptions : {
        create : (Object) => ZalgoPromise<string>,
        revise : (Object) => ZalgoPromise<string>
    }
|};

export type XCreateSubscription = (?XCreateSubscriptionDataType, ?XCreateSubscriptionActionsType) => ZalgoPromise<string>;

export function buildXCreateSubscriptionData() : XCreateSubscriptionDataType {
    // $FlowFixMe
    return {};
}

export function buildXCreateSubscriptionActions({ clientID } : { clientID : string }) : XCreateSubscriptionActionsType {
    const create = (data) => {
        return createAccessToken(clientID).then(accessToken => {
            return createSubscription(accessToken, data);
        });
    };

    const revise = (subscriptionId, data) => {
        return createAccessToken(clientID).then(accessToken => {
            return reviseSubscription(accessToken, subscriptionId, data);
        });
    };

    return {
        subscription: { create, revise }
    };
}

export type CreateSubscription = XCreateSubscription;

export function getCreateSubscription(xprops : XProps) : ?CreateSubscription {
    const { createSubscription: createSubscriptionFunc } = xprops;
    const { clientID } = xprops;
    if (createSubscriptionFunc) {
        return memoize(() => {
            return createSubscriptionFunc(buildXCreateSubscriptionData(), buildXCreateSubscriptionActions({ clientID }));
        });
    }
}
