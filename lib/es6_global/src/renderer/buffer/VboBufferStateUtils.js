// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as VboBufferPoolCommon$Wonderjs from "./VboBufferPoolCommon.js";

function deepCopyStateForRestore(state) {
  var newrecord = state.slice();
  newrecord[/* vboBufferData */24] = /* record */[
    /* vertexBufferMap : array */[],
    /* elementArrayBufferMap : array */[],
    /* modelMatrixInstanceBufferMap : array */[],
    /* vertexArrayBufferPool : array */[],
    /* elementArrayBufferPool : array */[],
    /* modelMatrixInstanceBufferPool : array */[]
  ];
  return newrecord;
}

function restore(currentState, targetState) {
  var match = VboBufferPoolCommon$Wonderjs.addAllBufferToPool(currentState);
  var newrecord = targetState.slice();
  newrecord[/* vboBufferData */24] = /* record */[
    /* vertexBufferMap : array */[],
    /* elementArrayBufferMap : array */[],
    /* modelMatrixInstanceBufferMap : array */[],
    /* vertexArrayBufferPool */match[0],
    /* elementArrayBufferPool */match[1],
    /* modelMatrixInstanceBufferPool */match[2]
  ];
  return newrecord;
}

export {
  deepCopyStateForRestore ,
  restore                 ,
  
}
/* VboBufferPoolCommon-Wonderjs Not a pure module */