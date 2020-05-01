/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { inlineMemoize, base64encode, request, noop } from 'belter/src';

import { AUTH_API_URL } from '../config';
import { getLogger } from '../lib';
import { HEADERS } from '../constants';

import { callGraphQL } from './api';

type GenerateAccessTokenOptions = {|
    targetSubject? : string
|};

export function createAccessToken(clientID : ?string, { targetSubject } : GenerateAccessTokenOptions = {}) : ZalgoPromise<string> {
    return inlineMemoize(createAccessToken, () => {

        getLogger().info(`rest_api_create_access_token`);

        const basicAuth = base64encode(`${ clientID || '' }:`);
        const data : Object = {
            grant_type: `client_credentials`
        };

        if (targetSubject) {
            data.target_subject = targetSubject;
        }

        return request({

            method:  `post`,
            url:     AUTH_API_URL,
            headers: {
                Authorization: `Basic ${ basicAuth }`
            },
            data

        }).then(({ body }) => {

            if (body && body.error === 'invalid_client') {
                throw new Error(`Auth Api invalid client id: ${ clientID || '' }:\n\n${ JSON.stringify(body, null, 4) }`);
            }

            if (!body || !body.access_token) {
                throw new Error(`Auth Api response error:\n\n${ JSON.stringify(body, null, 4) }`);
            }

            return body.access_token;
        });
    }, [ clientID, targetSubject ]);
}

export function getFirebaseSessionToken(sessionUID : string) : ZalgoPromise<string> {
    return callGraphQL({
        query: `
            query GetFireBaseSessionToken($sessionUID: String!) {
                firebase {
                    auth(sessionUID: $sessionUID) {
                        sessionToken
                    }
                }
            }
        `,
        variables: { sessionUID }
    }).then(res => {
        return res.firebase.auth.sessionToken;
    });
}

export function upgradeFacilitatorAccessToken(facilitatorAccessToken : string, { buyerAccessToken, orderID } : {| buyerAccessToken : string, orderID : string |}) : ZalgoPromise<void> {
    return callGraphQL({
        headers: {
            [ HEADERS.ACCESS_TOKEN ]:   buyerAccessToken,
            [ HEADERS.CLIENT_CONTEXT ]: orderID
        },
        query: `
            mutation UpgradeFacilitatorAccessToken(
                $orderID: String!
                $buyerAccessToken: String!
                $facilitatorAccessToken: String!
            ) {
                upgradeLowScopeAccessToken(
                    token: $orderID
                    buyerAccessToken: $buyerAccessToken
                    merchantLSAT: $facilitatorAccessToken
                )
            }
        `,
        variables: { facilitatorAccessToken, buyerAccessToken, orderID }
    }).then(noop);
}

export function exchangeAccessTokenForAuthCode(buyerAccessToken : string) : ZalgoPromise<string> {
    return callGraphQL({
        query: `
            query ExchangeAuthCode(
                $buyerAccessToken: String!
            ) {
                auth(
                    accessToken: $buyerAccessToken
                ) {
                    authCode
                }
            }
        `,
        variables: { buyerAccessToken }
    }).then(({ auth }) => {
        return auth.authCode;
    });
}
