import * as THREE from "three";

import Experience from "../Experience.js"


export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
            

        this.setFloor();
        this.setCircle();
    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100,100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = -Math.PI * 0.5;
        this.plane.position.y = -0.3;
        this.plane.receiveShadow = true;
    }

    setCircle() {
        const geometry = new THREE.CircleGeometry(5, 32);

        const material1 = new THREE.MeshStandardMaterial({ color: 0xe5a1aa});
        const material2 = new THREE.MeshStandardMaterial({ color: 0x8395CD });
        const material3 = new THREE.MeshStandardMaterial({ color: 0x7AD0AC });

        this.firstCircle = new THREE.Mesh(geometry, material1);
        this.secondCircle = new THREE.Mesh(geometry, material2);
        this.thirdCircle = new THREE.Mesh(geometry, material3);

        this.firstCircle.position.y = -0.29;
        this.secondCircle.position.y = -0.28;
        this.thirdCircle.position.y = -0.27;

        this.firstCircle.scale.set(0,0,0);
        this.secondCircle.scale.set(0,0,0);
        this.thirdCircle.scale.set(0,0,0);

        this.firstCircle.rotation.x = -Math.PI * 0.5;
        this.secondCircle.rotation.x = -Math.PI * 0.5;
        this.thirdCircle.rotation.x = -Math.PI * 0.5;

        this.firstCircle.receiveShadow = true;
        this.secondCircle.receiveShadow = true;
        this.thirdCircle.receiveShadow = true;

        this.scene.add(this.firstCircle);
        this.scene.add(this.secondCircle);
        this.scene.add(this.thirdCircle);
    }

    resize() {

    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.0009);
    }
}