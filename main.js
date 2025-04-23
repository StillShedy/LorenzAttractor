import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(0.1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth rotation
controls.dampingFactor = 0.05;
controls.enablePan = false;    // Disable panning (optional)
controls.enableZoom = true;    // Enable zooming (scroll)

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Required for damping to work
    renderer.render(scene, camera);
}
animate();

const equation = (X, Y, Z) => {
    return {
        x: -σ * X + σ * Y,
        y: -X * Z + λ * X - Y,
        z: X * Y - b * Z
    }
}

const k23 = (X, Y, Z, k) => equation(X + (h * k.x / 2), Y + (h * k.y / 2), Z + (h * k.z / 2));
const k4F = (X, Y, Z, k) => equation(X + (h * k.x), Y + (h * k.y), Z + (h * k.z));


//scene.add(cube);

camera.position.z = 70;
camera.position.y = 5;
camera.position.x = -50;

let pointsObj = [];

const axesHelper = new THREE.AxesHelper(1000); // 10 units long
scene.add(axesHelper);
renderer.render(scene, camera);

let σ = parseFloat(document.getElementById('ro').value);
let λ = parseFloat(document.getElementById('lamda').value);
let b = parseFloat(document.getElementById('b').value);
let h = parseFloat(document.getElementById('h').value);

let X = parseFloat(document.getElementById('x').value);
let Y = parseFloat(document.getElementById('y').value);
let Z = parseFloat(document.getElementById('z').value);
let points = parseInt(document.getElementById('i').value)

function reload() {
    σ = parseFloat(document.getElementById('ro').value);
    λ = parseFloat(document.getElementById('lamda').value);
    b = parseFloat(document.getElementById('b').value);
    h = parseFloat(document.getElementById('h').value);

    X = parseFloat(document.getElementById('x').value);
    Y = parseFloat(document.getElementById('y').value);
    Z = parseFloat(document.getElementById('z').value);
    points = parseInt(document.getElementById('i').value)

    pointsObj.forEach(element => {
        scene.remove(element);
    });

    calculateAttractor();
}

document.getElementById('reload').addEventListener('click', reload)

const calculateAttractor = () => {
    for (var i = 0; i < points; i++) {
        setTimeout(() => {
            let step = rk4Step(X, Y, Z);
            renderPoint(X, Y, Z);
            X = step.x;
            Y = step.y;
            Z = step.z;
        }, 1000);
    }
}


calculateAttractor();

function renderPoint(x, y, z) {
    const geometry = new THREE.SphereGeometry(0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const point = new THREE.Mesh(geometry, material);
    point.position.x = x;
    point.position.y = y;
    point.position.z = z;
    pointsObj.push(point);
    scene.add(point);
}


function rk4Step(X, Y, Z) {
    let k1 = equation(X, Y, Z);

    let k2 = k23(X, Y, Z, k1);
    let k3 = k23(X, Y, Z, k2);

    let k4 = k4F(X, Y, Z, k3);

    return {
        x: X + (h / 6) * (k1.x + 2 * k2.x + 2 * k3.x + k4.x),
        y: Y + (h / 6) * (k1.y + 2 * k2.y + 2 * k3.y + k4.y),
        z: Z + (h / 6) * (k1.z + 2 * k2.z + 2 * k3.z + k4.z)
    }
}