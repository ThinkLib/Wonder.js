// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as UidUtils$Wonderjs              from "../../utils/UidUtils.js";
import * as GameObjectStateCommon$Wonderjs from "./GameObjectStateCommon.js";

function create(state) {
  var data = GameObjectStateCommon$Wonderjs.getGameObjectData(state);
  var uid = data[/* uid */0];
  var aliveUidArray = data[/* aliveUidArray */3];
  data[/* uid */0] = UidUtils$Wonderjs.increase(uid);
  aliveUidArray.push(uid);
  return /* tuple */[
          state,
          uid
        ];
}

export {
  create ,
  
}
/* GameObjectStateCommon-Wonderjs Not a pure module */