// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as MemoryUtils$Wonderjs                      from "../../memory/MemoryUtils.js";
import * as CpuMemorySystem$Wonderjs                  from "../../memory/CpuMemorySystem.js";
import * as ECSDisposeUtils$Wonderjs                  from "../utils/ECSDisposeUtils.js";
import * as GameObjectStateCommon$Wonderjs            from "./GameObjectStateCommon.js";
import * as SparseMapSystem$WonderCommonlib           from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapSystem.js";
import * as GameObjectDisposeComponentCommon$Wonderjs from "./GameObjectDisposeComponentCommon.js";

function _handleByDisposeCount(data, state) {
  if (MemoryUtils$Wonderjs.isDisposeTooMany(data[/* disposeCount */1], state)) {
    data[/* disposeCount */1] = 0;
    return CpuMemorySystem$Wonderjs.reAllocateGameObject(state);
  } else {
    return state;
  }
}

function batchDispose(uidArray, state) {
  var data = GameObjectStateCommon$Wonderjs.getGameObjectData(state);
  var disposeCount = data[/* disposeCount */1];
  var disposedUidMap = data[/* disposedUidMap */2];
  data[/* disposeCount */1] = disposeCount + uidArray.length | 0;
  return _handleByDisposeCount(data, GameObjectDisposeComponentCommon$Wonderjs.batchDisposeCommonComponent(uidArray, ECSDisposeUtils$Wonderjs.buildMapFromArray(uidArray, disposedUidMap), batchDispose, state));
}

function dispose(uid, state) {
  var data = GameObjectStateCommon$Wonderjs.getGameObjectData(state);
  var disposeCount = data[/* disposeCount */1];
  var disposedUidMap = data[/* disposedUidMap */2];
  data[/* disposeCount */1] = disposeCount + 1 | 0;
  SparseMapSystem$WonderCommonlib.set(uid, /* true */1, disposedUidMap);
  return _handleByDisposeCount(data, GameObjectDisposeComponentCommon$Wonderjs.disposeComponent(uid, batchDispose, state));
}

export {
  _handleByDisposeCount ,
  batchDispose          ,
  dispose               ,
  
}
/* CpuMemorySystem-Wonderjs Not a pure module */