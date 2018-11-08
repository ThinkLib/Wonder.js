open StateDataMainType;

let getShaderRecord = state => state.shaderRecord;

let getShaderIndex = (material, state) => {
  let renderState = CreateRenderStateMainService.createRenderState(state);

  ShaderIndexRenderService.getShaderIndex(
    material,
    ShaderIndexLightMaterialRenderService.getShaderIndex,
    renderState,
  );
};

let getAllShaderIndexArray = state =>
  StateRenderType.(
    ShaderIndexRenderShaderService.getAllShaderIndexArray(
      CreateRenderStateMainService.createRenderState(state).shaderRecord,
    )
  );