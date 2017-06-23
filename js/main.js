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
  // 立方体
  const cubeGeometry = new THREE.CubeGeometry(10, 10, 10);
  const cubeMaterial = new THREE.MeshPhongMaterial({color: 0xff0000, wireframe: false, transparent: true, opacity: 0.3});
  const mesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
  scene.add(mesh);
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
  // 矢印(座標軸)
  const arrowLength = 100;   // 矢印の長さ
  const arrowHeadLength = 5; // 矢印の頭の長さ
  //- X軸
  const directionX = new THREE.Vector3(1, 0, 0);             // 矢印の向き(X方向)
  const startX = new THREE.Vector3(-arrowLength / 2, 0, 0);  // 矢印の始点
  const colorX = 0xff0000;
  const axisX = new THREE.ArrowHelper(directionX, startX, arrowLength, colorX, arrowHeadLength);
  scene.add(axisX);
  //- Y軸
  const directionY = new THREE.Vector3(0, 1, 0);             // 矢印の向き(Y方向)
  const startY = new THREE.Vector3(0, -arrowLength / 2, 0);  // 矢印の始点
  const colorY = 0x00ff00;
  const axisY = new THREE.ArrowHelper(directionY, startY, arrowLength, colorY, arrowHeadLength);
  scene.add(axisY);
  //- Z軸
  const directionZ = new THREE.Vector3(0, 0, 1);             // 矢印の向き(Z方向)
  const startZ = new THREE.Vector3(0, 0, -arrowLength / 2);  // 矢印の始点
  const colorZ = 0x0000ff;
  const axisZ = new THREE.ArrowHelper(directionZ, startZ, arrowLength, colorZ, arrowHeadLength);
  scene.add(axisZ);
  // レンダリング
  render();
  function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  }