var camera;
var scene;
var renderer;
var cubeMesh;
var clock;
var deltaTime;
var rotationCamera = 0;
var particleSystem;
var lx, ly, lx;
var controls;
var ParticleSSun, particleSSun1, particleSSun2, particleSMercury, particleSVenus, particleSEarth, particleSMars, particleSJupiter, particleSSaturn, particleSUranus, particleSNeptune;
var pivot, pivotMecury, pivotVenus, pivotEarth, pivotMars, pivotJupiter, pivotSaturn, pivotUranus, pivotNeptune;
var pivotOuterRingSaturn, pivotInnerRingSaturn;
var innerRingSaturn, outerRingSaturn;
var parameters;
var na
var pathMercury, pathVenus, pathEarth, pathMars, pathJupiter, pathSaturn, pathUranus, pathNeptune;
var textSun, textMercury, textVenus, textEarth, textMars, textJupiter, textSaturn, textUranus, textNeptune;

var pivotAsteroid;

var asteroid, asteroid2, myVar;

//Point lights
var pointLight;

//Speeds of the planets
var mecurySpeed = 0.00011364;
var venusSpeed = 0.00004444;
var earthSpeed = 0.0000274;
var marsSpeed = 0.000014556;
var jupiterSpeed = 0.000002308;
var saturnSpeed = 0.000000929;
var innerRingSpeed = saturnSpeed;
var outterRingSpeed = saturnSpeed;
var uranusSpeed = 0.000000326;
var neptuneSpeed = 0.000000166;

init();
animate();

function init() {


    clock = new THREE.Clock(true);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 6000);
    camera.position.x = 1200;
    camera.position.y = 800;
    camera.position.z = 1000;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxDistance = 2000;
    controls.minDistance = 600;




    var skybox = createParticleSystem(0xFFFFFF, 100000, "particle.png", 0, 0, 0, true, 1, 1, 1500); //sun
    scene.add(skybox);
    addSunAndPlanets();
    addMoons();
    addContinents();



    addPivots();


    createPlanetNameText();
    parameters = new function () {
      this.rotatoP = 1;
      this.ShowPath = false;
      this.showMercury = false;
      this.showVenus = false;
      this.showEarth = false;
      this.showMars = false;
      this.showJupiter = false;
      this.showSaturn = false;
      this.showUranus = false;
      this.showNeptune = false;
      this.explode = false;
      this.notAPlanet = false;
      // this.showText = false;
      //this.reset = function () { reset() };
    };

    addParameters(parameters);




    render();
}


function animate() {

  render();
  requestAnimationFrame( animate );

  animateParticles(particleSSun1);
  rotatePlanets();
  rotateAroundSun();
  rotateMoons();


}

function render() {
    renderer.render( scene, camera );
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}


//Canada
function createAsteroid() {

   asteroid = new THREE.Shape();
   asteroid.moveTo( 0, 0 );

   asteroid.bezierCurveTo( -20, -1, -40, -2, -60, -3);
   asteroid.bezierCurveTo( -60, -3, -80 , -2, -100, -1);
   asteroid.bezierCurveTo( -100, -1, -105 , 25, -106, 45);
   asteroid.bezierCurveTo( -106, 45,  -104, 44, -101, 45);
   asteroid.bezierCurveTo( -101, 45, -100 , 55, -102, 70);
   asteroid.bezierCurveTo( -102, 70, -106 , 72, -109, 67);
   asteroid.bezierCurveTo( -109, 67, -110, 85, -113, 105);
   asteroid.bezierCurveTo( -113, 105, -90 , 104, -75, 105);
   asteroid.bezierCurveTo( -75, 105, -45 , 104, -20, 105);
   asteroid.bezierCurveTo( -20, 105, 0 , 104, 10, 105);
   asteroid.bezierCurveTo( 10, 105, -10, 70, 30, 60);
   asteroid.bezierCurveTo( 30, 60, 40, 57, 50, 58);
   asteroid.bezierCurveTo( 50, 58, 54, 65, 58, 76);
   asteroid.bezierCurveTo( 58, 76, 60, 80, 65, 85);
   asteroid.bezierCurveTo( 65, 85, 74, 86, 80, 78);
   asteroid.bezierCurveTo( 80, 78, 87, 70, 93, 60);
   asteroid.bezierCurveTo( 93, 60, 94, 61, 79, 45);
   asteroid.bezierCurveTo( 79, 45, 78, 43, 65, 30);
   asteroid.bezierCurveTo( 65, 30, 65, 27, 50, -10);
   asteroid.bezierCurveTo( 50, -10, 40, -15, 30, -20);
   asteroid.bezierCurveTo( 30, -20, 15, -10, 0, 0);

   var geometry = new THREE.ShapeGeometry( asteroid, 200 );

 	var discTexture = new THREE.PointCloudMaterial({color: 0xff0000});
 	var particleCube = new THREE.PointCloud( geometry, discTexture );
 	particleCube.position.set(350, 0, 0);

   return particleCube;
}

function createTriangle3() {
  var x = 0, y = 0;

  var shape = new THREE.Shape();

shape.moveTo( 0, 0 );

shape.bezierCurveTo( -6/4, 0, -6/4, -7/4, -6/4, -5/4);
shape.bezierCurveTo( -5/4, -8/4, -4/4, -8/4, -3/4, -8/4 );
shape.bezierCurveTo( -3/4, -8/4, -1/4, -4/4, 1/4, -8/4);
shape.bezierCurveTo( 1/4, -8/4, 4/4, -10/4, 7/4, -6/4);
shape.bezierCurveTo( 7/4, -6/4, 6/4, -10/4, 3/4, -11/4);
shape.bezierCurveTo( 3/4, -11/4, -9/4, -16/4, -11/4, -1/4);
shape.bezierCurveTo( -11/4, -1/4, -14/4, 0, -11/4, -10/4);
shape.bezierCurveTo( -11/4, -10/4, -13/4, -13/4, -16/4, 1/4);
shape.bezierCurveTo( -16/4, 1/4, -18/4, 4/4, -15/4, 10/4);
shape.bezierCurveTo( -15/4, 10/4, -11/4, 18/4, -24/4, 15/4);
shape.bezierCurveTo( -24/4, 15/4, -15/4, 25/4, -12/4, 19/4);
shape.bezierCurveTo( -12/4, 19/4, -8/4, 15/4, -6/4, 18/4);
shape.bezierCurveTo( -6/4, 18/4, 2/4, 18/4, -4/4, 11/4);
shape.bezierCurveTo( -4/4, 11/4, 6/4, 8/4, 2/4, 16/4);
shape.bezierCurveTo( 2/4, 16/4, 16/4, 16/4, 7/4, 10/4);
shape.bezierCurveTo( 7/4, 10/4, 15/4, 10/4, 7/4, 0);
shape.bezierCurveTo( 7/4, 0, 12/4, -5/4, 9/4, -5/4);
shape.bezierCurveTo( 9/4, -5/4, 7/4 ,0);
  var geometry = new THREE.ShapeGeometry( shape, 100 );

	var discTexture = new THREE.PointCloudMaterial({color: 0x256818});
	var particleCube = new THREE.PointCloud( geometry, discTexture );
	particleCube.position.set(0, 0, 7);

  return particleCube;
}



function addParameters(param) {
  var gui = new dat.GUI();
  gui.add(param, 'rotatoP', 0, 10000).name('Rotation Modifier');
  var pathCont = gui.add(param, 'ShowPath').name('Path');
  pathCont.onChange(function(value) {
    if(value == true) {
      addPaths();
    }
    else {
      scene.remove(pathMercury);
      scene.remove(pathVenus);
      scene.remove(pathEarth);
      scene.remove(pathMars);
      scene.remove(pathJupiter);
      scene.remove(pathSaturn);
      scene.remove(pathUranus);
      scene.remove(pathNeptune);
    }
}
);
    var f1 = gui.addFolder('Planets');

    var mercuryCont = f1.add(param, 'showMercury').name('Show Mercury');
    mercuryCont.onChange(function(value) {
      if (value == true) {
        pivotMercury.add(camera);

        camera.lookAt(particleSMercury.position);
        camera.position.set(300, 200, 300);
      }
      else {
        pivotMercury.remove(camera);
        camera.position.x = 1200;
        camera.position.y = 800;
        camera.position.z = 1000;
        camera.lookAt( scene.position );

      }
    }
  );
  var venusCont = f1.add(param, 'showVenus').name('Show Venus');
  venusCont.onChange(function(value) {
    if (value == true) {
      pivotVenus.add(camera);

      camera.lookAt(particleSVenus.position);
      camera.position.set(300, 200, 300);
    }
    else {
      pivotVenus.remove(camera);
      camera.position.x = 1200;
      camera.position.y = 800;
      camera.position.z = 1000;
      camera.lookAt( scene.position );

    }
  }
);

    var earthCont = f1.add(param, 'showEarth').name('Show Earth');
    earthCont.onChange(function(value) {
      if (value == true) {
        pivotEarth.add(camera);

        camera.lookAt(particleSEarth.position);
        camera.position.set(300, 200, 350);
      }
      else {
        pivotEarth.remove(camera);
        camera.position.x = 1200;
        camera.position.y = 800;
        camera.position.z = 1000;
        camera.lookAt( scene.position );

      }
    }
  );

  var marsCont = f1.add(param, 'showMars').name('Show Mars');
  marsCont.onChange(function(value) {
    if (value == true) {
      pivotMars.add(camera);

      camera.lookAt(particleSMars.position);
      camera.position.set(400, 200, 400);
    }
    else {
      pivotMars.remove(camera);
      camera.position.x = 1200;
      camera.position.y = 800;
      camera.position.z = 1000;
      camera.lookAt( scene.position );

    }
  }
);

var jupiterCont = f1.add(param, 'showJupiter').name('Show Jupiter');
jupiterCont.onChange(function(value) {
  if (value == true) {
    pivotJupiter.add(camera);

    camera.lookAt(particleSJupiter.position);
    camera.position.set(500, 200, 500);
  }
  else {
    pivotJupiter.remove(camera);
    camera.position.x = 1200;
    camera.position.y = 800;
    camera.position.z = 1000;
    camera.lookAt( scene.position );

  }
}
);

var saturnCont = f1.add(param, 'showSaturn').name('Show Saturn');
saturnCont.onChange(function(value) {
  if (value == true) {
    pivotSaturn.add(camera);

    camera.lookAt(particleSSaturn.position);
    camera.position.set(450, 200, 600);
  }
  else {
    pivotSaturn.remove(camera);
    camera.position.x = 1200;
    camera.position.y = 800;
    camera.position.z = 1000;
    camera.lookAt( scene.position );

  }
}
);

var uranusCont = f1.add(param, 'showUranus').name('Show Uranus');
uranusCont.onChange(function(value) {
  if (value == true) {
    pivotUranus.add(camera);

    camera.lookAt(particleSUranus.position);
    camera.position.set(450, 200, 700);
  }
  else {
    pivotUranus.remove(camera);
    camera.position.x = 1200;
    camera.position.y = 800;
    camera.position.z = 1000;
    camera.lookAt( scene.position );

  }
}
);

var neptuneCont = f1.add(param, 'showNeptune').name('Show Neptune');
neptuneCont.onChange(function(value) {
  if (value == true) {
    pivotNeptune.add(camera);

    camera.lookAt(particleSNeptune.position);
    camera.position.set(450, 200, 700);
  }
  else {
    pivotNeptune.remove(camera);
    camera.position.x = 1200;
    camera.position.y = 800;
    camera.position.z = 1000;
    camera.lookAt( scene.position );

  }
}
);
var explodeCont = gui.add(param, 'explode').name('Explosion');
explodeCont.onChange(function(value) {
  if (value == true) {
    createText("CANADA", 0x0ff0000, 30, 250, 25, 0, scene, pivotAsteroid);
    addCanada();
    pivotAsteroid.add(asteroid2);
    myVar = setInterval(myTimer, 4600);
  }
  else {
    clearInterval(myVar);
    scene.remove(particleSSun);
    particleSSun2 = createParticleSystem(0xEA7D17, 700000, "disc.png", 0, 0, 0, true, 1, 10, 80); //sun
    scene.add(particleSSun1);
    scene.add(particleSSun2);
    scene.add(particleSMercury);
    scene.add(particleSVenus);
    scene.add(particleSEarth);
    scene.add(particleSMars);
    scene.add(particleSJupiter);
    scene.add(particleSSaturn);
    scene.add(particleSUranus);
    scene.add(particleSNeptune);
    scene.add(innerRingSaturn);
    scene.add(outerRingSaturn);
    scene.add(ringJupiter);
    scene.add(eyeOfTheTiget);

    scene.add(earthMoon);
    addPivots();
    scene.remove(pivotAsteroid);
    scene.remove(asteroid2);
    createPlanetNameText();

  }
}
);

var sun = f1.add(param, 'notAPlanet').name('Not A Planet');
sun.onChange(function(value) {
  if (value == true) {
    scene.remove(particleSSun);
    scene.remove(particleSSun1);
  }
  else {
    scene.add(particleSSun);
    scene.add(particleSSun);

  }
}
);



  //f1.open();
  gui.open();
}

function myTimer() {
  explode();

}

function explode() {
      blowUpSun(particleSSun);

      scene.remove(particleSSun1);
      scene.remove(particleSMercury);
      scene.remove(particleSVenus);
      scene.remove(particleSEarth);
      scene.remove(particleSMars);
      scene.remove(particleSJupiter);
      scene.remove(particleSSaturn);
      scene.remove(particleSUranus);
      scene.remove(particleSNeptune);
      scene.remove(innerRingSaturn);
      scene.remove(outerRingSaturn);
      scene.remove(ringJupiter);
      scene.remove(eyeOfTheTiget);
      scene.remove(asteroid2);

      scene.remove(earthMoon);

      scene.remove( pivotMercury );
      scene.remove( pivotVenus );
      scene.remove( pivotEarth );
      scene.remove( pivotMars );
      scene.remove( pivotJupiter );
      scene.remove( pivotSaturn );
      scene.remove( pivotUranus );
      scene.remove( pivotNeptune );
      scene.remove( pivotAsteroid );
}

function createParticleSystem(color, particleCount, image, startX, startY, startZ, isTransparent, size, oRadius, iRadius) {

    // The number of particles in a particle system is not easily changed.
    // var particleCount = 10000;

    // Particles are just individual vertices in a geometry
    // Create the geometry that will hold all of the vertices
    var particles = new THREE.Geometry();
    var px = 0.0;
    var py = 0.0;
    var pz = 0.0;

    // Create the vertices and add them to the particles geometry
    for (var p = 0; p < particleCount; p++) {

      var distance = THREE.Math.randFloatSpread(oRadius) - iRadius;
      var theta = THREE.Math.randFloatSpread(360);
      var phi = THREE.Math.randFloatSpread(360);

      px = distance * Math.sin(theta) * Math.cos(phi);
      py = distance * Math.sin(theta) * Math.sin(phi);
      pz = distance * Math.cos(theta);
      var particle = new THREE.Vector3(px, py, pz);

        // Add the vertex to the geometry
        particles.vertices.push(particle);
    }

    // Create the material that will be used to render each vertex of the geometry
    var particleMaterial = new THREE.PointsMaterial(
            {color: color,
             size: size,
             map: THREE.ImageUtils.loadTexture(image),
             blending: THREE.AdditiveBlending,
             transparent: isTransparent,
            });

    // Create the particle system
    particleSystem = new THREE.Points(particles, particleMaterial);

    particleSystem.position.set (startX, startY, startZ);
    return particleSystem;
}

function createParticleSystemRing(color, particleCount, image, startX, startY, startZ, isTransparent, size, oRadius, iRadius ,j ,k) {

    var particles = new THREE.Geometry();
    var px = 0.0;
    var py = 0.0;
    var pz = 0.0;


    for (var p = 0; p < particleCount; p++) {

      var distance = THREE.Math.randFloatSpread(oRadius) - iRadius;
      var theta = THREE.Math.randFloatSpread(j);
      var phi = THREE.Math.randFloatSpread(k);

      px = distance * Math.sin(theta) * Math.cos(phi);
      py = distance * Math.sin(theta) * Math.sin(phi);
      pz = distance * Math.cos(theta);
      var particle = new THREE.Vector3(px, py, pz);

        particles.vertices.push(particle);
    }

    // Create the material that will be used to render each vertex of the geometry
    var particleMaterial = new THREE.PointsMaterial(
            {color: color,
             size: size,
             map: THREE.ImageUtils.loadTexture(image),
             blending: THREE.AdditiveBlending,
             transparent: isTransparent,
            });

    // Create the particle system
    particleSystem = new THREE.Points(particles, particleMaterial);

    particleSystem.position.set (startX, startY, startZ);
    return particleSystem;
}

function addContinents() {
  na = createTriangle3();

  scene.add( na );
}

function addCanada() {
  asteroid2 = createAsteroid();

  scene.add( asteroid2 );
}

function addPaths() {
  pathMercury = createParticleSystemRing(0xFFFFFF, 5000, "disc.png", 0, 0, 0, true, 1, 1, 110, 360, 0);
  pathVenus = createParticleSystemRing(0xFFFFFF, 5000, "disc.png", 0, 0, 0, true, 1, 1, 140, 360, 0);
  pathEarth = createParticleSystemRing(0xFFFFFF, 5000, "disc.png", 0, 0, 0, true, 1, 1, 180, 360, 0);
  pathMars = createParticleSystemRing(0xFFFFFF, 5000, "disc.png", 0, 0, 0, true, 1, 1, 215, 360, 0);
  pathJupiter = createParticleSystemRing(0xFFFFFF, 5000, "disc.png", 0, 0, 0, true, 1, 1, 280, 360, 0);
  pathSaturn = createParticleSystemRing(0xFFFFFF, 8000, "disc.png", 0, 0, 0, true, 1, 1, 390, 360, 0);
  pathUranus = createParticleSystemRing(0xFFFFFF, 10000, "disc.png", 0, 0, 0, true, 1, 1, 470, 360, 0);
  pathNeptune = createParticleSystemRing(0xFFFFFF, 10000, "disc.png", 0, 0, 0, true, 1, 1, 520, 360, 0);

  scene.add(pathMercury);
  scene.add(pathVenus);
  scene.add(pathEarth);
  scene.add(pathMars);
  scene.add(pathJupiter);
  scene.add(pathSaturn);
  scene.add(pathUranus);
  scene.add(pathNeptune);
}


function addSunAndPlanets() {
  particleSSun = createParticleSystem(0xEA7D17, 700000, "disc.png", 0, 0, 0, true, 1, 10, 80); //sun
  particleSSun1 = createParticleSystem(0xEEF21F, 100000, "disc.png", 0, 0, 0, true, 4, 80, 40); //sun
  particleSMercury = createParticleSystem(0x86989D, 10000, "disc.png", 0, 0, 110, true, 2, 1, 3); //mercury
  particleSVenus = createParticleSystem(0xDD9939, 30000, "disc.png", 0, 0, 140, true, 2, 1, 8); //venus
  particleSEarth = createParticleSystem(0x1E35BC, 30000, "particle.png", 0, 0, 180, true, 2, 1, 7); //earth
  particleSMars = createParticleSystem(0xDB5525 ,20000, "disc.png", 0, 0, 215, true, 2, 1, 4); //mars
  particleSJupiter = createParticleSystem(0xC1Ac8F, 60000, "particle.png", 0, 0, 280, true, 2, 3, 30); //jupiter
  particleSSaturn = createParticleSystem(0xC1B95B, 60000, "particle.png", 0, 0, 390, true, 3, 1, 27); //saturn
  particleSUranus = createParticleSystem(0x408BB7, 30000, "disc.png", 0, 0, 470, true, 2, 1, 17); //uranus
  particleSNeptune = createParticleSystem(0x408BB7, 40000, "particle.png", 0, 0, 520, true, 2, 1, 17); //neptune
  innerRingSaturn = createParticleSystemRing(0xEFBE5B, 10000, "disc.png", 0, 0, 390, true, 3, 12, 40, 360, 0);
  outerRingSaturn = createParticleSystemRing(0xEFBE5B, 10000, "particle.png", 0, 0, 390, true, 3, 6, 51, 360, 0);
  ringJupiter = createParticleSystemRing(0xEFBE5B, 1000, "particle.png", 0, 0, 280, true, 3, 12, 35, 360, 0);
  eyeOfTheTiget = createParticleSystemRing(0xc6910b, 10000, "particle.png", 0, 0, -24.5, true, 2, 0, 6, 1, 360);



  scene.add(particleSSun);
  scene.add(particleSSun1);
  scene.add(particleSMercury);
  scene.add(particleSVenus);
  scene.add(particleSEarth);
  scene.add(particleSMars);
  scene.add(particleSJupiter);
  scene.add(particleSSaturn);
  scene.add(particleSUranus);
  scene.add(particleSNeptune);
  scene.add(innerRingSaturn);
  scene.add(outerRingSaturn);
  scene.add(ringJupiter);
  scene.add(eyeOfTheTiget);
}

function addMoons() {
  earthMoon = createParticleSystem(0x87939B, 10000, "particle.png", 0, 0, 12, true, 2, 1, 1);

  scene.add(earthMoon);
}

function rotateAroundSun() {

  pivotMercury.rotation.y += (parameters.rotatoP * mecurySpeed);
  pivotVenus.rotation.y += (parameters.rotatoP * venusSpeed);
  pivotEarth.rotation.y += (parameters.rotatoP * earthSpeed);
  pivotMars.rotation.y += (parameters.rotatoP * marsSpeed);
  pivotJupiter.rotation.y += (parameters.rotatoP * jupiterSpeed);
  pivotSaturn.rotation.y += (parameters.rotatoP * saturnSpeed);
  pivotUranus.rotation.y += (parameters.rotatoP * uranusSpeed);
  pivotNeptune.rotation.y += (parameters.rotatoP * neptuneSpeed);
  pivotAsteroid.rotation.y += (parameters.explode * 0.01);



}

function rotateMoons () {

    pivotEarthMoon.rotation.y += (parameters.rotatoP * 0.000366);
}

function rotatePlanets() {
  particleSMercury.rotation.y += (parameters.rotatoP * 0.00017);
  particleSVenus.rotation.y += (parameters.rotatoP * 0.000086);
  particleSEarth.rotation.y += (parameters.rotatoP * 0.01);
  particleSMars.rotation.y += (parameters.rotatoP * 0.01);
  particleSJupiter.rotation.y += (parameters.rotatoP * 0.0266);
  particleSSaturn.rotation.y += (parameters.rotatoP * 0.024);
  particleSUranus.rotation.y += (parameters.rotatoP * 0.0141);
  particleSNeptune.rotation.y += (parameters.rotatoP * 0.015);
  outerRingSaturn.rotation.y += (parameters.rotatoP * 0.015);
  innerRingSaturn.rotation.y += (parameters.rotatoP * 0.02);
  pivotEye.rotation.y += (parameters.rotatoP * 0.0266);
  pivotContinents.rotation.y += (parameters.rotatoP * 0.01);
  ringJupiter.rotation.y += (parameters.rotatoP * 0.0255);
}

function addPivots() {
  //Mecury
  pivotMercury = new THREE.Group();
  pivotMercury.add( particleSMercury );
  pivotMercury.add( textMercury );
  //Venus
  pivotVenus = new THREE.Group();
  pivotVenus.add( particleSVenus );
  //Earth
  pivotEarthMoon = new THREE.Group();
  pivotEarthMoon.position.set(0, 0, 180);
  pivotEarthMoon.add( earthMoon );

  pivotContinents = new THREE.Group();
  pivotContinents.position.set(0, 0, 180);
  pivotContinents.add( na );

  pivotEarth = new THREE.Group();
  pivotEarth.add( particleSEarth );
  pivotEarth.add( pivotEarthMoon );
  pivotEarth.add( pivotContinents );
  //Mars
  pivotMars = new THREE.Group();
  pivotMars.add( particleSMars );
  //Jupiter
  pivotEye = new THREE.Group();
  pivotEye.position.set(0, -10, 280);
  pivotEye.add ( eyeOfTheTiget );

  pivotJupiter = new THREE.Group();

  pivotJupiter.add( particleSJupiter );
  pivotJupiter.add( ringJupiter );
  pivotJupiter.add( pivotEye );
  //Saturn
  pivotSaturn = new THREE.Group();
  pivotSaturn.add( particleSSaturn );
  pivotSaturn.add( innerRingSaturn );
  pivotSaturn.add( outerRingSaturn );
  //Uranus
  pivotUranus = new THREE.Group();
  pivotUranus.add( particleSUranus );
  //Neptune
  pivotNeptune = new THREE.Group();
  pivotNeptune.add( particleSNeptune );

  pivotAsteroid = new THREE.Group();
  pivotAsteroid.position.set(0, 0, 350);
  pivotAsteroid.add( asteroid2 );






  scene.add( pivotAsteroid );
  scene.add( pivotMercury );
  scene.add( pivotVenus );
  scene.add( pivotEarth );
  scene.add( pivotMars );
  scene.add( pivotJupiter );
  scene.add( pivotSaturn );
  scene.add( pivotUranus );
  scene.add( pivotNeptune );


}

function loadSkyBox() {

        // Load the skybox images and create list of materials
        var materials = [
            createMaterial( 'galaxy-wallpaper-02.jpg' ), // right
            createMaterial( 'galaxy-wallpaper-02.jpg' ), // left
            createMaterial( 'galaxy-wallpaper-02.jpg' ), // top
            createMaterial( 'galaxy-wallpaper-02.jpg' ), // bottom
            createMaterial( 'galaxy-wallpaper-02.jpg' ), // back
            createMaterial( 'galaxy-wallpaper-02.jpg' )  // front
        ];

        // Create a large cube
        var mesh = new THREE.Mesh( new THREE.BoxGeometry( 1000, 1000, 1000 ), new THREE.MeshFaceMaterial( materials ) );
      //   var mesh = new THREE.Mesh( new THREE.SphereGeometry( 100, 100, 800, 1, 1, 1 ), new THREE.MeshFaceMaterial( materials ) );

        // Set the x scale to be -1, this will turn the cube inside out
        mesh.scale.set(-4,4,4);
        scene.add( mesh );
}


function createMaterial( path ) {
    var texture = THREE.ImageUtils.loadTexture(path);
    var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5});

    return material;
}

function animateParticles(particleSystems) {
  var verts = particleSystems.geometry.vertices;
  for(var i = 0; i < verts.length; i++) {
    var vert = verts[i];

    var curDist = Math.sqrt(Math.pow(vert.y,2)+Math.pow(vert.x,2)+Math.pow(vert.z,2));
    if (curDist < -10 || curDist > 10) {
      var distance = THREE.Math.randFloatSpread(80)- 40;
      var theta = THREE.Math.randFloatSpread(360);
      var phi = THREE.Math.randFloatSpread(360);


      vert.x = distance * Math.sin(theta) * Math.cos(phi);
      vert.y = distance * Math.sin(theta) * Math.sin(phi);
      vert.z = distance * Math.cos(theta);
    }

    var theta = THREE.Math.randFloatSpread(360);
    var phi = THREE.Math.randFloatSpread(360);
    vert.x = vert.x + Math.sin(theta) * Math.cos(phi) *2;
    vert.y = vert.y + Math.sin(theta) * Math.sin(phi) *2;
    vert.z = vert.z + Math.cos(theta) *2;
  }
  particleSystems.geometry.verticesNeedUpdate = true;
}

function blowUpSun(particleSystems) {
  var verts = particleSystems.geometry.vertices;
  for(var i = 0; i < verts.length; i++) {
    var vert = verts[i];


    var theta = THREE.Math.randFloatSpread(360);
    var phi = THREE.Math.randFloatSpread(360);
    vert.x = vert.x + Math.sin(theta) * Math.cos(phi) * 1000;
    vert.y = vert.y + Math.sin(theta) * Math.sin(phi) * 1000;
    vert.z = vert.z + Math.cos(theta) * 1000;
  }
  particleSystems.geometry.verticesNeedUpdate = true;
}

function createText(theText, theColor, theSize, x, y, z, scene, pivot) {
   var fontLoader = new THREE.FontLoader();
   fontLoader.load("optimer_bold.typeface.json", function(theFont) {
     var textGeometry = new THREE.TextGeometry(theText, {
     size: theSize,
     height: 1,
     curveSegments: 5,
     font: theFont
    });
    var textMaterial = new THREE.MeshBasicMaterial({color: theColor});
    var mesh = new THREE.Mesh(textGeometry, textMaterial);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    pivot.add(mesh);
 });

}

function createPlanetNameText() {
    createText("Sun", 0xffff00, 30, -30, 100, 0, scene, pivotNeptune);
    createText("Mercury", 0x86989D, 20, -50, 45, 100, scene, pivotMercury);
    createText("Venus", 0xDD9939, 20, -40, 45, 130, scene, pivotVenus);
    createText("Earth", 0x1E35BC, 20, -35, 45, 170, scene, pivotEarth);
    createText("Mars", 0xDB5525, 20, -35, 45, 205, scene, pivotMars);
    createText("Jupiter", 0xC1Ac8F, 20, -40, 45, 270, scene, pivotJupiter);
    createText("Saturn", 0xC1B95B, 20, -40, 45, 380, scene, pivotSaturn);
    createText("Uranus", 0x408BB7, 20, -40, 45,470, scene, pivotUranus);
    createText("Neptune", 0x408BB7, 20, -50, 45, 520, scene, pivotNeptune);
}
