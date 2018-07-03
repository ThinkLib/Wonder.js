// Generated by BUCKLESCRIPT VERSION 3.1.4, PLEASE EDIT WITH CARE


function getAmbientLightColor(param) {
  return param[/* ambientLight */1][/* color */0];
}

function setAmbientLightColor(color, record) {
  return /* record */[
          /* currentCameraGameObject */record[/* currentCameraGameObject */0],
          /* ambientLight : record */[/* color */color]
        ];
}

export {
  getAmbientLightColor ,
  setAmbientLightColor ,
  
}
/* No side effect */