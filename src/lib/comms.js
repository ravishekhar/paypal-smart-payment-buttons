/* @flow */

import { getAllFramesInWindow, isSameDomain } from 'cross-domain-utils/src';

import type { SmartFields } from '../types';
import { FRAME_NAME } from '../constants';

export function findFrame<T>(name : string) : ?T {
    try {
        for (const win of getAllFramesInWindow(window)) {
            // $FlowFixMe
            if (isSameDomain(win) && win.exports && win.exports.name === name) {
                return win.exports;
            }
        }
    } catch (err) {
        // pass
    }
}

export function getSmartFields() : ?SmartFields {
    return findFrame(FRAME_NAME.SMART_FIELDS);
}
