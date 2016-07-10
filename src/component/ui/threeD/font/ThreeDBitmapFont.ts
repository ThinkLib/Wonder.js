module wd {
    export class ThreeDBitmapFont extends ThreeDFont{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _text:string = "";
        @cloneAttributeAsBasicType()
        get text(){
            return this._text;
        }
        set text(text:string){
            if(this._text !== text){
                this._text = text;

                //this.dirty = true;
                this.needFormat = true;
            }
        }

        private _xAlignment:EFontXAlignment = EFontXAlignment.LEFT;
        @cloneAttributeAsBasicType()
        get xAlignment(){
            return this._xAlignment;
        }
        set xAlignment(xAlignment:EFontXAlignment){
            if(this._xAlignment !== xAlignment){
                this._xAlignment = xAlignment;

                //this.dirty = true;
                this.needFormat = true;
            }
        }

        @cloneAttributeAsBasicType()
        public fntId:string = null;

        @cloneAttributeAsBasicType()
        public width:number = null;

        public layoutDataList:wdCb.Collection<LayoutCharData> = null;

        private _layout:BitmapFontLayout = BitmapFontLayout.create();

        public init(){
            super.init();

            this.layoutDataList = this._layout.getLayoutData(this.text, this.fntId, {
                width:this.width,
                align: this.xAlignment
            });
        }

        protected reFormat(){
            this.layoutDataList = this._layout.getLayoutData(this.text, this.fntId, {
                width:this.width,
                align: this.xAlignment
            });

            this.entityObject.getComponent<BitmapFontGeometry>(BitmapFontGeometry).updateBuffers();
        }
    }
}

