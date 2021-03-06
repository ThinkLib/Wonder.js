

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as IOIMGUIAPI$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/IOIMGUIAPI.js";
import * as AssetIMGUIService$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/record/io/AssetIMGUIService.js";
import * as RecordIMGUIMainService$Wonderjs from "../../../../../src/service/state/main/imgui/RecordIMGUIMainService.js";

function loadIMGUIAsset(fntFilePath, bitmapFilePath, customTextureSourceDataArr, param, state) {
  return AssetIMGUIService$WonderImgui.load(customTextureSourceDataArr, /* tuple */[
                param[0],
                param[1]
              ], IOIMGUIAPI$WonderImgui.addFont(fntFilePath, bitmapFilePath, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state))).then((function (imguiRecord) {
                var newrecord = Caml_array.caml_array_dup(state);
                var init = state[/* imguiRecord */41];
                newrecord[/* imguiRecord */41] = /* record */[
                  /* ioData */init[/* ioData */0],
                  /* isSetIMGUIFuncInRenderWorkerForWorker */init[/* isSetIMGUIFuncInRenderWorkerForWorker */1],
                  /* wonderImguiIMGUIRecord */imguiRecord
                ];
                return Promise.resolve(newrecord);
              }));
}

export {
  loadIMGUIAsset ,
  
}
/* IOIMGUIAPI-WonderImgui Not a pure module */
