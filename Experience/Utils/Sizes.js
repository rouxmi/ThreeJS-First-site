import {EventEmitter} from 'events'

export default class Sizes extends EventEmitter{
    constructor() {
        super();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width / this.height;
        this.frustum = 5;
        this.devicePixelRatio = Math.min(window.devicePixelRatio,2);
        if(this.width < 968) {
            this.device = "mobile";
        } else {
            this.device = "desktop";
        }

        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.aspect = this.width / this.height;
            this.devicePixelRatio = Math.min(window.devicePixelRatio,2);
            this.emit('resize');

            if(this.width < 968 && this.device === "desktop") {
                this.device = "mobile";
                this.emit("switchdevice", this.device)
            }
            else  if (this.width >= 968 && this.device === "mobile"){  
                this.device = "desktop";
                this.emit("switchdevice", this.device)
            }
            
        })
    }

}