import * as THREE from "three";

import Experience from "../Experience.js"
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";


export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach(child => {
            if (child.type === "RectAreaLight") {
                this.rectLight = child;
            }
        });
        this.sizes = this.experience.sizes;
        this.circleFirst = this.experience.world.floor.firstCircle;
        this.circleSecond = this.experience.world.floor.secondCircle;
        this.circleThird = this.experience.world.floor.thirdCircle;
        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible"; 

        this.setSmoothScroll();
        this.setScrollTiger();

    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.1,
            disableRaf: true,
        });

        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }

    setSmoothScroll() {
        this.asscroll = this.setupASScroll();
    }

    setScrollTiger() {
        let mm = GSAP.matchMedia();
    
        //Desktop
        mm.add("(min-width: 969px)", () => {

            this.rectLight.width = 0.5;
            this.rectLight.height = 0.7;
            this.room.scale.set(0.11, 0.11, 0.11);

            /* First section move ----------------------------------------------------*/
            this.firstMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".first-move",
                    start: "top top",
                    markers: false,
                    end: "bottom bottom",
                    scrub: 0.6,    
                    invalidateOnRefresh: true,
                }
            
            });
            this.firstMoveTimeline.to(this.room.position, {
                x: () => {
                    return this.sizes.width * 0.0014;
                }
            });
            /* Second section move ----------------------------------------------------*/
            this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".second-move",
                    start: "top top",
                    markers: false,
                    end: "bottom bottom",
                    scrub: 0.6,    
                    invalidateOnRefresh: true,
                }
            
            });
            this.secondMoveTimeline.to(this.room.position, {
                x: () => {
                    return 1 
                },
                z: () => {
                    return this.sizes.height * 0.0032;
                }
            }, "same");
            this.secondMoveTimeline.to(this.room.scale, {
                x: 0.4,
                y: 0.4,
                z: 0.4,
            }, "same");
            this.secondMoveTimeline.to(this.rectLight, {
                width: 0.5*4,
                height: 0.7*4,
            }, "same");
            /* Third section move ----------------------------------------------------*/
            this.thirdMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".third-move",
                    start: "top top",
                    markers: false,
                    end: "bottom bottom",
                    scrub: 0.6,    
                    invalidateOnRefresh: true,
                }
            
            }).to(this.camera.orthographicCamera.position, {
                y: 1.5,
                x: -4.1,
            });
        })
        //mobile
        mm.add("(max-width: 968px)", () => {
            //reset size
            this.room.scale.set(0.07, 0.07, 0.07);
            this.rectLight.width = 0.3;
            this.rectLight.height = 0.4;
            this.room.position.set(0, 0, 0);
            /* First section move ----------------------------------------------------*/
            this.firstCircle = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".first-move",
                    start: "top top",
                    markers: false,
                    end: "bottom bottom",
                    scrub: 0.6,    
                    invalidateOnRefresh: true,
                }
            }).to(this.room.scale, {
                x: 0.1,
                y: 0.1,
                z: 0.1,
            });
            /* Second section move ----------------------------------------------------*/
            this.secondCircle = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".second-move",
                    start: "top top",
                    markers: false,
                    end: "bottom bottom",
                    scrub: 0.6,    
                    invalidateOnRefresh: true,
                }
            
            }).to(this.room.scale, {
                x: 0.25,
                y: 0.25,
                z: 0.25,
                }, "same").to(this.rectLight, {
                width: 0.3*3.4,
                height: 0.4*3.4,
            }, "same").to(this.room.position, {
                x: 1.5,
            }, "same");
            /* Third section move ----------------------------------------------------*/
            this.thirdCircle= new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".third-move",
                    start: "top top",
                    markers: false,
                    end: "bottom bottom",
                    scrub: 0.6,    
                    invalidateOnRefresh: true,
                }
            }).to(this.room.position, {
                z: -4.5
            });
            
        })
        //All devices
        mm.add("(min-width: 0px)", () => {
            this.section = document.querySelectorAll(".section");
            this.section.forEach(section => {
                this.progressWrapper = 
                    section.querySelector(".progress-wrapper");
                this.progressBar = 
                    section.querySelector(".progress-bar");

                if(section.classList.contains("right")){
                    GSAP.to(section, {
                        borderTopLeftRadius: 10,
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "top top",
                            scrub: 0.6,
                        },
                    })
                    GSAP.to(section, {
                        borderBottomLeftRadius: 700,
                        scrollTrigger: {
                            trigger: section,
                            start: "bottom bottom",
                            end: "bottom top",
                            scrub: 0.6,
                        },
                    })
                }
                    
                if(section.classList.contains("left")){
                    GSAP.to(section, {
                        borderTopRightRadius: 10,
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "top top",
                            scrub: 0.6,
                        },
                    })
                    GSAP.to(section, {
                        borderBottomRightRadius: 700,
                        scrollTrigger: {
                            trigger: section,
                            start: "bottom bottom",
                            end: "bottom top",
                            scrub: 0.6,
                        },
                    })
                }
                GSAP.from(this.progressBar, {
                    scaleY: 0,
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.4,
                        pin: this.progressWrapper,
                        pinSpacing: false,
                    },
                })
            })

            /*Circle animation*/

            /* First section move ----------------------------------------------------*/
            this.firstMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".first-move",
                    start: "top top",
                    markers: false,
                    end: "bottom bottom",
                    scrub: 0.6,    
                    invalidateOnRefresh: true,
                }
            }).to(this.circleFirst.scale, {
                x: 3,
                y: 3,
                z: 3,
            });
            /* Second section move ----------------------------------------------------*/
            this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".second-move",
                    start: "top top",
                    markers: false,
                    end: "bottom bottom",
                    scrub: 0.6,    
                    invalidateOnRefresh: true,
                }
            
            }).to(this.circleSecond.scale, {
                x: 3,
                y: 3,
                z: 3,
            },"same").to(this.circleSecond.position, {
                x: () => {
                    return this.room.position.x;
                },
                z: () => {
                    return this.room.position.z;
                },}, "same").to(this.room.position, {
                    y: 0.7,
                }, "same")
            /* Third section move ----------------------------------------------------*/
            this.thirdMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".third-move",
                    start: "top top",
                    markers: false,
                    end: "bottom bottom",
                    scrub: 0.6,    
                    invalidateOnRefresh: true,
                }
            
            }).to(this.circleThird.scale, {
                x: 3,
                y: 3,
                z: 3,
            },"same").to(this.circleSecond.position, {
                x: () => {
                    return this.room.position.x;
                },
                z: () => {
                    return this.room.position.z;
                },}, "same");


            /* Floor animation ----------------------------------------------------*/


            this.secondPartTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".third-move",
                    start: "center center",
                }
            });

            this.room.children.forEach(child => {
                if (child.name === "Mini_Floor") {
                    this.first = GSAP.to(child.position, {
                        x: -5.44055, 
                        z: 13.6135,
                        duration: 0.3,
                        ease: "back.out(2)",
                    })
                }
                if (child.name === "Mailbox") {
                    this.second = GSAP.to(child.scale, {
                        x: 1,
                        z: 1,
                        y: 1,
                        duration: 0.3,
                        ease: "back.out(2)",
                    })
                }
                if (child.name === "Lamp") {
                    this.third = GSAP.to(child.scale, {
                        x: 1,
                        z: 1,
                        y: 1,
                        duration: 0.3,
                        ease: "back.out(2)",
                    })
                }
                if (child.name === "FloorFirst") {
                    this.fourth = GSAP.to(child.scale, {
                        x: 1,
                        z: 1,
                        y: 1,
                        duration: 0.3,
                        ease: "back.out(2)",
                    })
                }
                if (child.name === "FloorSecond") {
                    this.fifth = GSAP.to(child.scale, {
                        x: 1,
                        z: 1,
                        y: 1,
                        duration: 0.3,
                        ease: "back.out(2)",
                    })
                }
                if (child.name === "FloorThird") {
                    this.sixth = GSAP.to(child.scale, {
                        x: 1,
                        z: 1,
                        y: 1,
                        duration: 0.3,
                        ease: "back.out(2)",
                    })
                }
                if (child.name === "Dirt") {
                    this.seventh = GSAP.to(child.scale, {
                        x: 1,
                        z: 1,
                        y: 1,
                        duration: 0.3,
                        ease: "back.out(2)",
                    })
                }
                if (child.name === "Flower1") {
                    this.eighth = GSAP.to(child.scale, {
                        x: 1,
                        z: 1,
                        y: 1,
                        duration: 0.3,
                        ease: "back.out(2)",
                    })
                }
                if (child.name === "Flower2") {
                    this.ninth = GSAP.to(child.scale, {
                        x: 1,
                        z: 1,
                        y: 1,
                        duration: 0.3,
                        ease: "back.out(2)",
                    })
                }
            });
            this.secondPartTimeline.add(this.first);
            this.secondPartTimeline.add(this.second);
            this.secondPartTimeline.add(this.third);
            this.secondPartTimeline.add(this.fourth, "-=0.2");
            this.secondPartTimeline.add(this.fifth, "-=0.2");
            this.secondPartTimeline.add(this.sixth, "-=0.2");
            this.secondPartTimeline.add(this.seventh, "-=0.2");
            this.secondPartTimeline.add(this.eighth);
            this.secondPartTimeline.add(this.ninth, "-=0.1");
        })
    }

    resize() {

    }

    update() {
        
    }
}