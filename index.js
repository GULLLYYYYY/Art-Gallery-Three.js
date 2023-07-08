console.log('Three Object', THREE);

const scene = new THREE.Scene(); // create a new scene

// Create a camera, which defines where we're looking at.
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // near clipping plane
  1000 // far clipping plane
);
scene.add(camera); // add the camera to the scene
camera.position.z = 5; // move camera back 5 units

// Create a render and set the size and background color
const renderer = new THREE.WebGLRenderer({ antialias: false }); // antialias means smooth edges
renderer.setSize(window.innerWidth, window.innerHeight); // set size of renderer
renderer.setClearColor(0xffffff, 1); //background color
document.body.appendChild(renderer.domElement); // add renderer to html

// Ambient light is a soft light that lights up all the objects in the scene equally
const ambientLight = new THREE.AmbientLight(0xdddddd, 1.0); // color, intensity, distance, decay
ambientLight.position = camera.position; //light follows camera
scene.add(ambientLight);

// Directional light is a light source that acts like the sun, that illuminates all objects in the scene equally from a specific direction.
const sunLight = new THREE.DirectionalLight(0xdddddd, 1.0); // color, intensity, distance, decay
sunLight.position.y = 15;
scene.add(sunLight);

const geometry = new THREE.BoxGeometry(1, 1, 1); // BoxGeometry is the shape of the object
const material = new THREE.MeshBasicMaterial({ color: 'blue' }); // MeshBasicMaterial is the color of the object
const cube = new THREE.Mesh(geometry, material); // create cube with geometry and material
scene.add(cube); // add cube to scene


//Texture of the floor
const floorTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/GULLLYYYYY/Art-Gallery-Three.js/main/Images/Floor%202.jpg')
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(20,20);

//create floor plane.
const planeGeometry = new THREE.PlaneBufferGeometry(50, 50); //box geometery is the shape of the object
const planeMaterial = new THREE.MeshBasicMaterial({
  map: floorTexture,
  side: THREE.DoubleSide, 
});
const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);
floorPlane.rotation.x = Math.PI / 2; //90 degrees
floorPlane.position.y = -Math.PI; //-180 degrees
scene.add(floorPlane);


//create walls
let wallGroup = new THREE.Group();
scene.add(wallGroup);

//frontwall
const frontWall = new THREE.Mesh(
  new THREE.BoxGeometry(50, 20, 0.001),
  new THREE.MeshLambertMaterial({ color: 'green' })
);

frontWall.position.z = -25


//left wall
const leftWall = new THREE.Mesh(
  new THREE.BoxGeometry(50, 20, 0.001),
  new THREE.MeshLambertMaterial({ color: 'red' })
);

leftWall.rotation.y = Math.PI / 2;
leftWall.position.x = -20;


//right wall
const rightWall = new THREE.Mesh(
  new THREE.BoxGeometry(50, 20, 0.001),
  new THREE.MeshLambertMaterial({ color: 'yellow' })
);

rightWall.rotation.y = Math.PI / 2;
rightWall.position.x = 20;

wallGroup.add(frontWall, leftWall, rightWall);

//loop through the walls and create a bounding box to ensure that you cannot move through the walls
for (let i = 0; i < wallGroup.children.length; i++) {
  wallGroup.children[i].BBox = new THREE.Box3();
  wallGroup.children[i].BBox.setFromObject(wallGroup.children[i]);
}

//creating ceiling 
const ceilingGeometry = new THREE.PlaneBufferGeometry(50, 50);
const ceilingMaterial = new THREE.MeshLambertMaterial({ color: 'blue' });
const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);

ceilingPlane.rotation.x = Math.PI / 2;
ceilingPlane.position.y = 10;

scene.add(ceilingPlane);



function createPainting(imageURL, width, height, position) {
  const textureLoader = new THREE.TextureLoader();
  const paintingTexture = textureLoader.load(imageURL);
  const paintingMaterial = new THREE.MeshBasicMaterial({
    map: paintingTexture,
  });
  const paintingGeometry = new THREE.planeGeometry(width, height);
  const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
  painting.position.set(position.x, position.y, position.z);
  return painting; 
}

const painting1 = createPainting(
  'image i guess',
  10,
  5,
  new THREE.Vector3(-10, 5, -18)
);

const painting2 = createPainting(
  'image i guess',
  10,
  5,
  new THREE.Vector3(-10, 5, -20)
);

scene.add(painting1, painting2);


////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
//you ended here, you have to go over to git hub and push the new shit, Especially the paintings you will use, 
//after that you just have to continue working.
//46:46 is the timestamp on the vid!!!!!!!!!!!!!!



// Controls
// Event Listenet for when we press the keys
document.addEventListener('keydown', onKeyDown, false);

// function when a key is pressed, execute this function
function onKeyDown(event) {
  let keycode = event.which;

  // right arrow key
  if (keycode === 39) {
    camera.translateX(-1);
  }
  // left arrow key
  else if (keycode === 37) {
    camera.translateX(1);
  }
  // up arrow key
  else if (keycode === 38) {
    camera.translateZ(-1);
  }
  // down arrow key
  else if (keycode === 40) {
    camera.translateZ(1);
  }
}

let render = function () {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera); //renders the scene

  requestAnimationFrame(render);
};

render();

// console.log('Three Object', THREE);

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// scene.add(camera);
// camera.position.z = 5;

// const renderer = new THREE.WebGLRenderer({ antialias: false });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0xffffff, 1);
// document.body.appendChild(renderer.domElement);

// let ambientLight = new THREE.AmbientLight(0x101010, 1.0);
// ambientLight.position.copy(camera.position);
// scene.add(ambientLight);

// let sunLight = new THREE.DirectionalLight(0xdddddd, 1.0);
// sunLight.position.y = 15;
// scene.add(sunLight);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 'blue' });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// let textureLoader = new THREE.TextureLoader();
// let floorTexture = textureLoader.load('https://raw.githubusercontent.com/GULLLYYYYY/Art-Gallery-Three.js/main/Images/Floor%202.jpg', render);
// let planeGeometry = new THREE.PlaneBufferGeometry(50, 50);
// let planeMaterial = new THREE.MeshBasicMaterial({
//   map: floorTexture,
//   side: THREE.DoubleSide,
// });
// let floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(floorPlane);

// document.addEventListener('keydown', onKeyDown, false);

// function onKeyDown(event) {
//   let keycode = event.which;

//   if (keycode === 39) {
//     camera.translateX(-0.05);
//   } else if (keycode === 37) {
//     camera.translateX(0.05);
//   } else if (keycode === 38) {
//     camera.translateY(-0.05);
//   } else if (keycode === 40) {
//     camera.translateY(0.05);
//   }
// }

// function render() {
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;

//   renderer.render(scene, camera);
// }

// render();
