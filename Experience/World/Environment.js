import * as THREE from "three";
import Experience from "../Experience.js"
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // this.gui = new GUI({container: document.querySelector(".hero-main")});
        this.obj={
            colorObj:{r:0,g:0,b:0},
            intensity: 3,
        }


        this.setSunLight();
        //sthis.setGui();
       
    }

    setGui() {
        this.gui.addColor(this.obj, "colorObj").onChange(() => {
            this.sunlight.color.copy(this.obj.colorObj);
            this.ambientLight.color.copy(this.obj.colorObj);
            console.log(this.obj.colorObj);
        });
        this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
            this.sunlight.intensity = this.obj.intensity;
        });

    }

    switchTheme(theme) {
        if (theme === "dark") {
            GSAP.to(this.sunlight.color, {
                r: 0.17254901960784313,
                g: 0.23137254901960785,
                b: 0.6862745098039216,
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.17254901960784313,
                g: 0.23137254901960785,
                b: 0.6862745098039216,
            });
            GSAP.to(this.sunlight, {
                intensity: 0.78,
            });
            GSAP.to(this.ambientLight, {
                intensity: 0.78,
            });
        } else {
            GSAP.to(this.sunlight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.ambientLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.sunlight, {
                intensity: 3,
            });
            GSAP.to(this.ambientLight, {
                intensity: 1,
            });
        }
    }

    setSunLight() {
        this.sunlight= new THREE.DirectionalLight(0xffffff, 3);
        this.sunlight.castShadow = true;
        this.sunlight.shadow.camera.far = 20;
        this.sunlight.shadow.mapSize.set(2048,2048);
        this.sunlight.shadow.normalBias = 0.05;
        this.sunlight.position.set(-1.5, 7, 3);
        this.scene.add(this.sunlight);

        this.ambientLight = new THREE.AmbientLight('#ffffff',1);
        this.scene.add(this.ambientLight);

    }

    resize() {

    }

    update() {
    }

}