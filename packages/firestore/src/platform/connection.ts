/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { isNode, isReactNative } from '@firebase/util';
import {
  newConnectivityMonitor as nodeNewConnectivityMonitor,
  newConnection as nodeNewConnection
} from './node/connection';
import {
  newConnectivityMonitor as rnNewConnectivityMonitor,
  newConnection as rnNewConnection
} from './rn/connection';
import {
  newConnectivityMonitor as browserNewConnectivityMonitor,
  newConnection as browserNewConnection
} from './browser/connection';
import { ConnectivityMonitor } from '../remote/connectivity_monitor';
import { DatabaseInfo } from '../core/database_info';
import { Connection } from '../remote/connection';

export function newConnectivityMonitor(): ConnectivityMonitor {
  if (isNode()) {
    return nodeNewConnectivityMonitor();
  } else if (isReactNative()) {
    return rnNewConnectivityMonitor();
  } else {
    return browserNewConnectivityMonitor();
  }
}

export function newConnection(databaseInfo: DatabaseInfo): Promise<Connection> {
  if (isNode()) {
    return nodeNewConnection(databaseInfo);
  } else if (isReactNative()) {
    return rnNewConnection(databaseInfo);
  } else {
    return browserNewConnection(databaseInfo);
  }
}
