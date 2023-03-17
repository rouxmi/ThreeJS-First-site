import {EventEmitter} from 'events'
import GSAP from "gsap";

import Experience from "./Experience.js"

import convert from "./Utils/convertDivsToSpans.js";

export default class Preloader extends EventEmitter{
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.sizes = this.experience.sizes;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        })

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });
        
    }

    setAssets() {
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".first-sub"));
        convert(document.querySelector(".second-sub"));
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        
    }

    firstIntro() {
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline();

            this.timeline.set(".animatedis",{y:0, yPercent:500})

            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 1,
                onComplete: () => {
                    document.querySelector(".preloader").classList.add("hidden");
                }
            });

            if (this.device === "desktop") {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    x: -1,
                    ease: "power1.out",
                    duration: 0.7,
                })
            }else {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    z: -1,
                    ease: "power1.out",
                    duration: 0.7,
                })
            }
            this.timeline.to(".intro-text .animatedis", {
                yPercent: 0,
                stagger: 0.05,
                ease: "back.out(1.7)",
            }).to(".arrow-svg-wrapper", {
                opacity: 1,
            },"fondu").to(".toggle-bar", {
                opacity: 1,
                onComplete: resolve,
            },"fondu");
        })
        
        
    }

    secondIntro() {
        return new Promise((resolve) => {
            this.secondtimeline = new GSAP.timeline();


            this.secondtimeline.to(".intro-text .animatedis", {
                yPercent: 500,
                stagger: 0.05,
                ease: "back.in(1.7)",
            },"fadeout").to(".arrow-svg-wrapper", {
                opacity: 0,
            },"fadeout").to(this.room.position, {
                x: 0,
                y: 0,
                z: 0,
                ease: "power1.out",
            },"same").to(this.roomChildren.cube.rotation, {
                y: 2 * Math.PI + Math.PI / 4
            },"same").to(this.roomChildren.cube.scale, {
                x: 10,
                y: 10,
                z: 10,
            },"same").to(this.camera.orthographicCamera.position, {
                y: 6.5
            },"same").to(this.roomChildren.cube.position,{
                x: 0.638711,
                y: 8.5618,
                z: 1.3243,  
            },"same").to(this.roomChildren.body.scale, {
                x:1,
                y:1,
                z:1,
            }).to(this.roomChildren.cube.scale, {
                x: 0,
                y: 0,
                z: 0,
            }).to(".hero-main-title .animatedis", {
                yPercent: 0,
                stagger: 0.05,
                ease: "back.out(1.7)",
            },"text").to(".hero-main-description .animatedis", {
                yPercent: 0,
                stagger: 0.05,
                ease: "back.out(1.7)",
            },"text").to(".first-sub .animatedis", {
                yPercent: 0,
                stagger: 0.05,
                ease: "back.out(1.7)",
            },"text").to(".second-sub .animatedis", {
                yPercent: 0,
                stagger: 0.05,
                ease: "back.out(1.7)",
            },"text").set(this.roomChildren.mini_floor.scale, {
                x: 1,
                y: 1,
                z: 1,
            }).to(this.roomChildren.aquarium.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-1.05").to(this.roomChildren.table_stuff.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-0.93").to(this.roomChildren.shelves.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-1.25").to(this.roomChildren.clock.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-1.05").to(this.roomChildren.floor_items.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-1.05").to(this.roomChildren.computer.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-1.1").to(this.roomChildren.desks.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-0.8").to(this.roomChildren.chair.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"chair",">-0.8").to(this.roomChildren.chair.rotation, {
                y: 4*Math.PI + Math.PI / 4,
                ease: "power2.out",
                duration: 1,
            },"chair",">-0.8").to(".arrow-svg-wrapper", {
                opacity: 1,
                onComplete: resolve,
            });
        })
        
    }

    
    onScroll(e) {
        if (e.deltaY > 0){
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e) {
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let diff = this.initialY - currentY;
        if (diff > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        };
        this.initialY = null;
    }

    removeEventListeners(){
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro() {
        await this.firstIntro();
        this.moveFlag = true;

        this.scrollOnceEvent = this.onScroll.bind(this)
        this.touchStart = this.onTouch.bind(this)
        this.touchMove = this.onTouchMove.bind(this)
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);

    }

    async playSecondIntro() {
        this.moveFlag = false;
        this.scaleFlag = true;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("enablecontrols");
    }

    move(){
        if (this.device === "desktop"){
            this.room.position.set(-1,0,0);
        }
        else {
            this.room.position.set(0,0,-1);
        }
    }

    scale(){
        this.roomChildren.rectLight.width =0;
        this.roomChildren.rectLight.height =0;
        if (this.device === "desktop"){
            this.room.scale.set(0.11,0.11,0.11);
        }
        else {
            this.room.scale.set(0.07,0.07,0.07);
        }
    }

    update() {
        if (this.moveFlag){
            this.move();
        }   

        if (this.scaleFlag){
            this.scale();
        }
    }
    
}