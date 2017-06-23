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
  const geometry = new THREE.CubeGeometry(30, 30, 30);
  const material = new THREE.MeshPhongMaterial({color: 0xff0000});
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  // レンダリング
  render();
  function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  }