open StateDataType;

let _getInitJobHandles = () => [
  ("preget_glslData", PregetGLSLDataJob.getJob),
  ("init_basic_material", InitBasicMaterialJob.getJob)
];

let _getRenderJobHandles = () => [
  ("get_render_array", GetRenderArrayJob.getJob),
  ("get_camera_data", GetCameraDataJob.getJob),
  ("clear_color", ClearColorJob.getJob),
  ("clear_buffer", ClearBufferJob.getJob),
  ("render_basic", RenderBasicJob.getJob)
];

let createInitJobHandleMap = () => JobHandleSystem.createJobHandleMap(_getInitJobHandles());

let createRenderJobHandleMap = () => JobHandleSystem.createJobHandleMap(_getRenderJobHandles());