/// <reference path="Program.ts"/>
/// <reference path="Matrix.ts"/>
/// <reference path="Buffer.ts"/>
/// <reference path="Rotate.ts"/>
/// <reference path="Translate.ts"/>
/// <reference path="FrameBuffer.ts"/>

//todo type/mode直接改为gl.xxx
//todo 重构texture和textureArr属性
module Engine3D{
    declare var gl:any;

    export class Sprite{
        constructor(drawMode){
            this._drawMode = drawMode;

            //this._action = {};
            this._actionContainer = [];

            this._matrix = Math3D.Matrix.create();
        }

        private _drawMode = null;
        //private _vertices = null;
        //private _normals = null;
        //private _texCoords = null;
        //private _indices = null;
        private _drawFunc = null;
        //private _action:{} = null;
        private _actionContainer = null;
        private _enableCULLFACE:boolean = null;
        private _face = null;

        _lastMatrix  = null;

        //position in world coordinate
        private _position:{x:number; y:number; z:number} = null;
        get position(){
            return this._position;
        }
        set position(position:{x:number; y:number; z:number}){
            this._position = position;
        }

        private _z:number = null;
        get z(){
            return this._z;
        }
        set z(z:number){
            this._z = z;
        }





        private _matrix:Math3D.Matrix = null;
        get matrix() { return this._matrix; }
        set matrix(matrix:Math3D.Matrix) {
            this._matrix = matrix;
        }


        private _program:Program = null;
        get program() { return this._program; }
        set program(program:Program) {
            this._program = program;
        }

        private _buffers:{
            vertexBuffer:ArrayBuffer
            texCoordBuffer?: ArrayBuffer
            normalBuffer?:ArrayBuffer
            indexBuffer?: ElementBuffer
        }= null;
        get buffers() { return this._buffers; }
        set buffers(buffers:any) {
            this._buffers = buffers;
        }

        private _textureArr:any = null;
        get textureArr(){
            return this._textureArr;
        }
        set textureArr(textureArr:any){
            if(textureArr.length > 8){
                //todo query the supported max num
                console.log("纹理数超过了8个");
            }

            this._textureArr = textureArr;
        }





        draw(program){
            var self = this;



            //fbo.bind();
            //
            //gl.clearColor(0.2, 0.2, 0.4, 1.0); // Set clear color (the color is slightly changed)
            //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  // Clear FBO
            //
            //drawTexCube(cube, viewProjMatrixFBO);   // Draw the cube
            //
            //fbo.unBind();
            //
            //gl.clearColor(0.0, 0.0, 0.0, 1.0);
            //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the color buffer





            if(this._enableCULLFACE){
                gl.enable(gl.CULL_FACE);
                gl.frontFace(this._face);
            }


            if(this._textureArr){
                this._textureArr.forEach(function(data, index){
                    //self._program.setUniformData(uniformDataForTextureArr.name, uniformDataForTextureArr.type,index);
                    data.material.texture.bindToUnit(index);

                    if(data.uniformData){
                        ////todo optimize data structure
                        var i = null;
                        var val = null;
                        for(i in data.uniformData){
                            if(data.uniformData.hasOwnProperty(i)){
                                val = data.uniformData[i];
                                program.setUniformData(i, DataType[val[0]],data.material[val[1]]);
                            }
                        }
                    }





                    var totalComponents = data.indexCount || self._buffers.indexBuffer.num;
                    var startOffset = data.indexOffset || 0;

                    self._drawFunc(totalComponents, startOffset);
                });
            }
            else{
                var totalComponents = this._buffers.indexBuffer.num;
                var startOffset = 0;

                this._drawFunc(totalComponents, startOffset);
            }



            //todo 单个纹理，material如何处理



            if(this._enableCULLFACE){
                gl.disable(gl.CULL_FACE);
                gl.frontFace(gl.CCW);
            }


        }

        setCULLFACE(face){
            this._enableCULLFACE = true;
            this._face = face || gl.CCW;
        }

        init(){
            var self = this;

            if (this._buffers.indexBuffer) {
                //this.baseBuffer = this.buffers.indices;
                this._drawFunc = function(totalComponents, startOffset) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, self._buffers.vertexBuffer.buffer);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self._buffers.indexBuffer.buffer);
                    gl.drawElements(gl[self._drawMode], totalComponents, self._buffers.indexBuffer.type, self.buffers.indexBuffer.typeSize * startOffset);
                }
            } else {
                //for (var key in this.buffers) {
                //    this.baseBuffer = this.buffers[key];
                //    break;
                //}

                //todo 待验证
                this._drawFunc = function(totalComponents, startOffset) {
                    gl.drawArrays(gl[self._drawMode], startOffset, totalComponents);
                }
            }

            //o.actionData = {
            //    "rotate": {
            //        action: "rotate",
            //        axis: [0, 1, 0],
            //        speed:10
            //    }
            //};

            //this._initAction();

            this.initData();
        }

        //
        //addActions(actionData){
        //    this._action = actionData;
        //}

        //private _initAction(){
        //    if(!this._actionData){
        //        return;
        //    }
        //
        //    var i = null;
        //
        //    for(i in this._actionData){
        //        if(this._actionData.hasOwnProperty(i)){
        //            this._action[i] =
        //        }
        //    }
        //    this._angle = 0;
        //    //switch (this._actionData.action){
        //    //    case "rotate":
        //    //        this._matrix.rotate(this.
        //    //}
        //}

        runAction(action){
            //todo 判断是否已有重复的
            this._actionContainer.push(action);
        }
        runOnlyOneAction(action){
            this._actionContainer = [action];
        }

        update(){
            //todo only update action
            this._actionContainer.forEach(x => x.update());
            this._actionContainer.forEach(x => x.run());

            //update position
            var pos = Math3D.MatrixTool.multiplyVector4(this._matrix.values, [this._position.x, this._position.y, this._position.z, 1.0]);

            this._position = {
                x:pos[0],
                y:pos[1],
                z:pos[2]
            };
        }


        getRotateAction(){
            return Engine3D.Action.Rotate.create(
                this._matrix, {axis: [0, 1, 0], speed:1}
            );
        }

        getTranslateAction(){
            //todo refactor to be common
            return Engine3D.Action.Translate.create(
                this._matrix, {rangeZ:[0.08, -0.08], speed:0.002}
            );
        }

        //
        //initFrameBuffer(OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT){
        //    //this._frameBuffer = frameBuffer;
        //    //
        //    //this._scenesInFrameBuffer = data;
        //
        //
        //
        //
        //    var arr = [],
        //        i = 0,
        //        len = 6,
        //        centerData = [
        //            [1,0,0],
        //            [-1,0,0],
        //            [0,1,0],
        //            [0,-1,0],
        //            [0,0,1],
        //            [0,0,-1]
        //        ];
        //
        //    //todo how to decide eye?eye should be dynamic
        //    //eye is in center point of sphere, center(target) is towards -z axis
        //    var eyeX = 0,
        //        eyeY = 0,
        //        eyeZ = 0.85;
        //
        //
        //    for(i = 0; i < len; i++){
        //        var vpMatrix = Math3D.Matrix.create();
        //        var center = centerData[i];
        //
        //
        //
        //
        //        vpMatrix.lookAt(
        //            eyeX, eyeY, eyeZ,
        //            center[0], center[1], center[2],
        //            0, 1, 0
        //        );
        //        //todo vpMatrix should be dynamic,not fixed!
        //        vpMatrix.perspective(60, OFFSCREEN_WIDTH / OFFSCREEN_HEIGHT,
        //            0.1, 10);
        //
        //
        //
        //    }
        //    ////todo refactor, should be dynamic,not get here
        //    this._vpMatrixArr = arr;
        //}
        //
        //
        //private _vpMatrixArr = null;






        initWhenCreate(){
            this._enableCULLFACE = false;
            this._position = {x:0,y:0,z:0};
            this._lastMatrix = this._matrix.copy();
        }

        public static create(drawMode):Sprite {
            var obj = new this(drawMode);

            obj.initWhenCreate();

            return obj;
        }


        onStartLoop(){
            this._matrix.push();
        }

        onEndLoop(){
            //todo
            this._lastMatrix = this._matrix.copy();
            this._matrix.pop();

        }
        //*钩子

        initData(){}

    }
}