// シーン
const scene = new THREE.Scene();
// カメラ
const width = 600;
const height = 400;
const fov = 60;
const aspect = width / height;
const near = 1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 50);
// OrbitControls
const controls = new THREE.OrbitControls(camera);
// レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0xefefef);
document.body.appendChild(renderer.domElement);
// ライト
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 0.7, 0.7);
scene.add(directionalLight);
// 環境光
const ambient = new THREE.AmbientLight(0x666666);
scene.add(ambient);
// 直線
/*
//- X軸
const lineXGeometry = new THREE.Geometry();
lineXGeometry.vertices.push(new THREE.Vector3(-100, 0, 0));
lineXGeometry.vertices.push(new THREE.Vector3(100, 0, 0));
const lineXMaterial = new THREE.LineBasicMaterial({color: 0x000000});
const lineX = new THREE.Line(lineXGeometry, lineXMaterial);
scene.add(lineX);
//- Y軸
const lineYGeometry = new THREE.Geometry();
lineYGeometry.vertices.push(new THREE.Vector3(0, -100, 0));
lineYGeometry.vertices.push(new THREE.Vector3(0, 100, 0));
const lineYMaterial = new THREE.LineBasicMaterial({color: 0x000000});
const lineY = new THREE.Line(lineYGeometry, lineYMaterial);
scene.add(lineY);
//- Z軸
const lineZGeometry = new THREE.Geometry();
lineZGeometry.vertices.push(new THREE.Vector3(0, 0, -100));
lineZGeometry.vertices.push(new THREE.Vector3(0, 0, 100));
const lineZMaterial = new THREE.LineBasicMaterial({color: 0x000000});
const lineZ = new THREE.Line(lineZGeometry, lineZMaterial);
scene.add(lineZ);
*/

// グラフ
//- y = ax^3 + bx^2 + cx + d
const a = 0;
const b = 1;
const c = 0;
const d = 0;
const maxX = 2;
const maxY = Math.abs(a * Math.pow(maxX, 3) + b * Math.pow(maxX, 2) + c * maxX + d);
const maxZ = maxX;
let y = 0;
// const sphereGeometry = new THREE.SphereGeometry(0.1, 30, 30);
// const sphereMaterial = new THREE.MeshPhongMaterial({color: 0x000000, wireframe: false, transparent: false, opacity: 0.3});
// for ( let i = -maxX; i <= maxX; i += 0.1 ) {
//   const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
//   y = a * Math.pow(i, 3) + b * Math.pow(i, 2) + c * i + d;
//   sphere.position.set(i, y, 0);
//   scene.add(sphere);
// }

const lineGeometry = new THREE.Geometry();
const lineMaterial = new THREE.LineBasicMaterial({color: 0x000000});
for ( let i = -maxX; i <= maxX; i += 0.05 ) {
  y = a * Math.pow(i, 3) + b * Math.pow(i, 2) + c * i + d;
  lineGeometry.vertices.push(new THREE.Vector3(i, y, 0));
  const line = new THREE.Line(lineGeometry, lineMaterial);
  scene.add(line);
}

// 矢印(座標軸)
//- X軸
let axisXLength = maxX * 2;                     // 矢印の長さ
const axisXHeadLength = axisXLength * 0.05;     // 矢印の頭の長さ
const axisXHeadWidth = axisXHeadLength * 0.5;   // 矢印の頭の太さ
const directionX = new THREE.Vector3(1, 0, 0);  // 矢印の向き(X方向)
const startX = new THREE.Vector3(-maxX, 0, 0);  // 矢印の始点
const colorX = 0xff0000;
const axisX = new THREE.ArrowHelper(directionX, startX, axisXLength + axisXHeadLength * 2, colorX, axisXHeadLength, axisXHeadWidth);
scene.add(axisX);
//- Y軸
let axisYLength = maxY * 2;                     // 矢印の長さ
const axisYHeadLength = axisXHeadLength;        // 矢印の頭の長さ
const axisYHeadWidth = axisXHeadWidth;          // 矢印の頭の太さ
const directionY = new THREE.Vector3(0, 1, 0);  // 矢印の向き(Y方向)
const startY = new THREE.Vector3(0, -maxY, 0);  // 矢印の始点
const colorY = 0x00ff00;
const axisY = new THREE.ArrowHelper(directionY, startY, axisYLength + axisYHeadLength * 2, colorY, axisYHeadLength, axisYHeadWidth);
scene.add(axisY);
//- Z軸
let axisZLength = maxZ * 2;                     // 矢印の長さ
const axisZHeadLength = axisXHeadLength;        // 矢印の頭の長さ
const axisZHeadWidth = axisXHeadWidth;          // 矢印の頭の太さ
const directionZ = new THREE.Vector3(0, 0, 1);  // 矢印の向き(X方向)
const startZ = new THREE.Vector3(0, 0, -maxZ);  // 矢印の始点
const colorZ = 0x0000ff;
const axisZ = new THREE.ArrowHelper(directionZ, startZ, axisZLength + axisZHeadLength * 2, colorZ, axisZHeadLength, axisZHeadWidth);
scene.add(axisZ);

function deleteMesh(mesh, geometry, material) {
  scene.remove(mesh);
  if ( geometry != null ) {
    geometry.dispose();
  }
  if ( material != null ) {
    material.dispose();
  }
}

// 文字
const fontLoader = new THREE.FontLoader();
fontLoader.load('fonts/helvetiker_bold.typeface.json', function(font) {
  // X
  const textXGeometry = new THREE.TextGeometry('X', {
    font: font,
    size: axisXLength / 20,
    height: 0,
    curveSegments: 0,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelSegments: 0
  });
  const textXMaterial = new THREE.MeshPhongMaterial({color: colorX});
  const textX = new THREE.Mesh(textXGeometry, textXMaterial);
  textX.position.set(maxX + axisXHeadLength * 2, 0, 0);
  scene.add(textX);
  // Y
  const textYGeometry = new THREE.TextGeometry('Y', {
    font: font,
    size: axisXLength / 20,
    height: 0,
    curveSegments: 0,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelSegments: 0
  });
  const textYMaterial = new THREE.MeshPhongMaterial({color: colorY});
  const textY = new THREE.Mesh(textYGeometry, textYMaterial);
  textY.position.set(0, maxY + axisYHeadLength * 2, 0);
  textY.rotation.set(0, 0, Math.PI / 2);
  scene.add(textY);
  // Z
  const textZGeometry = new THREE.TextGeometry('Z', {
    font: font,
    size: axisXLength / 20,
    height: 0,
    curveSegments: 0,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelSegments: 0
  });
  const textZMaterial = new THREE.MeshPhongMaterial({color: colorZ});
  const textZ = new THREE.Mesh(textZGeometry, textZMaterial);
  textZ.position.set(0, 0, maxZ + axisZHeadLength * 2);
  textZ.rotation.set(0, -Math.PI / 2, 0);
  scene.add(textZ);
});

// レンダリング
render();
function render() {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
}
