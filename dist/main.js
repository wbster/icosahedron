/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkicosahedron"] = self["webpackChunkicosahedron"] || []).push([["main"],{

/***/ "T4Xt":
/*!***********************!*\
  !*** ./src/Shader.js ***!
  \***********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"vDqi\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var regl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regl */ \"fbvF\");\n/* harmony import */ var regl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regl__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _objLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./objLoader */ \"nJoR\");\n/* harmony import */ var _shaderSource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shaderSource */ \"rTiP\");\n\n\n\n\n\nfunction loadObject() {\n\treturn axios__WEBPACK_IMPORTED_MODULE_0___default().get(`/obj`).then(({ data }) => data)\n}\n\nloadObject()\n\t.then(source => (0,_objLoader__WEBPACK_IMPORTED_MODULE_2__.decode)(source))\n\t.then(scene => {\n\t\tconst canvas = document.querySelector('canvas')\n\t\tconsole.log('canvas', canvas)\n\t\tcanvas.width = innerWidth\n\t\tcanvas.height = innerHeight\n\t\tconst regl = regl__WEBPACK_IMPORTED_MODULE_1___default()({ canvas })\n\t\tconst sphere = scene.Icosphere\n\t\tconst center = getCenter(sphere)\n\t\tconst floatValue = createFloatValue(center)\n\t\tconst mesh = createMesh(regl, sphere, center, floatValue)\n\t\tregl.frame(render(regl, mesh))\n\t})\n\nfunction render(regl, mesh, animationTime = 45) {\n\treturn ({ time }) => {\n\t\tregl.clear({\n\t\t\tcolor: [0, 0, 0, 0],\n\t\t\tdepth: 1\n\t\t})\n\t\tconst loopTime = Math.abs((time % animationTime) / animationTime)\n\t\tconst { devicePixelRatio = 1 } = window\n\t\tmesh({\n\t\t\ttime: loopTime,\n\t\t\tscreenSize: [innerWidth * devicePixelRatio, innerHeight * devicePixelRatio]\n\t\t})\n\t}\n}\n\nfunction createMesh(regl, sphere, center, floatValue) {\n\treturn regl({\n\t\tfrag: _shaderSource__WEBPACK_IMPORTED_MODULE_3__.fragmentShader,\n\t\tvert: _shaderSource__WEBPACK_IMPORTED_MODULE_3__.vertexShader,\n\t\tattributes: {\n\t\t\tposition: regl.buffer(sphere.position),\n\t\t\tuv: regl.buffer(sphere.uv),\n\t\t\tcenter: regl.buffer(center),\n\t\t\tfloatValue: regl.buffer(floatValue),\n\t\t\tnormal: regl.buffer(sphere.normal),\n\t\t},\n\t\tuniforms: {\n\t\t\tscreenSize: regl.prop('screenSize'),\n\t\t\ttime: regl.prop('time'),\n\t\t},\n\t\tcount: sphere.position.length\n\t})\n}\n\nfunction createFloatValue(center) {\n\tconst buffer = []\n\tnew Array(center.length / 3).fill(0).forEach(() => {\n\t\tconst value = Math.random()\n\t\tbuffer.push(value, value, value)\n\t})\n\treturn buffer\n}\n\nfunction getCenter(sphere) {\n\tconst buffer = []\n\tsphere.faces.forEach(face => {\n\t\tconst center = face.points.map(index => sphere.points[index - 1]).reduce((acc, array) => {\n\t\t\treturn [acc[0] + array[0], acc[1] + array[1], acc[2] + array[2]]\n\t\t}, [0, 0, 0]).map(n => n / face.points.length)\n\t\tbuffer.push(Array.from(center), Array.from(center), Array.from(center))\n\t})\n\treturn buffer\n}\n\n\n//# sourceURL=webpack://icosahedron/./src/Shader.js?");

/***/ }),

/***/ "tjUo":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Shader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shader */ \"T4Xt\");\n\n\nwindow.onload = _Shader__WEBPACK_IMPORTED_MODULE_0__.init\n\n\n//# sourceURL=webpack://icosahedron/./src/index.js?");

/***/ }),

/***/ "nJoR":
/*!**************************!*\
  !*** ./src/objLoader.js ***!
  \**************************/
/*! namespace exports */
/*! export decode [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"decode\": () => /* binding */ decode\n/* harmony export */ });\n/**\n * @typedef Object3d\n * @property {Array<Array<Number>>} points\n * @property {Array<Array<Number>>} vt\n * @property {Array<Array<Number>>} normal\n * @property {Array<Number>} position\n * @property {Array<Number>} uv\n * @property {Array<{points: Array<Number>, vt:Array<Number>, normal:Array<Number>}>} faces\n */\n\n/**\n * @param {String} objContent\n * @returns {Object.<string, Object3d>}\n*/\nfunction decode(objContent) {\n\tconst lines = objContent.split('\\n')\n\tconst objects = {}\n\tconst data = {}\n\tconsole.time('t')\n\tlines.forEach(line => {\n\t\tif (line[0] === '#') return\n\t\tconst words = line.split(' ')\n\t\tconst firstChar = words[0]\n\t\tswitch (firstChar) {\n\t\t\tcase 'o':\n\t\t\t\tdata.currentObject = words[1]\n\t\t\t\tobjects[data.currentObject] = objects[data.currentObject] || { points: [], faces: [], vt: [], normal: [] }\n\t\t\t\tbreak\n\t\t\tcase 'v':\n\t\t\t\tobjects[data.currentObject].points.push([...words.slice(1).map(s => Number(s))])\n\t\t\t\tbreak\n\t\t\tcase 'vt':\n\t\t\t\tobjects[data.currentObject].vt.push([...words.slice(1).map(s => Number(s))])\n\t\t\t\tbreak\n\t\t\tcase 'vn':\n\t\t\t\tobjects[data.currentObject].normal.push([...words.slice(1).map(s => Number(s))])\n\t\t\t\tbreak\n\t\t\tcase 'f':\n\t\t\t\tobjects[data.currentObject].faces.push(createFace(words.slice(1)))\n\t\t\t\tbreak\n\t\t\tdefault:\n\t\t\t\tbreak\n\t\t}\n\t})\n\tfor (let name in objects) {\n\t\tobjects[name].position = getPositiob(objects[name])\n\t\tobjects[name].uv = getUV(objects[name])\n\t\tobjects[name].normal = getNormal(objects[name])\n\t}\n\tconsole.timeEnd('t')\n\treturn objects\n}\n\nfunction getNormal(object) {\n\tconst buffer = []\n\tobject.faces.forEach(face => buffer.push(...face.normal.map(index => object.normal[index - 1])))\n\treturn buffer\n}\n\nfunction getPositiob(object) {\n\tconst buffer = []\n\tobject.faces.forEach(face => {\n\t\tbuffer.push(...face.points.map(index => object.points[index - 1]))\n\t})\n\treturn buffer\n}\n\nfunction getUV(object) {\n\tconst buffer = []\n\tobject.faces.forEach(face => buffer.push(...face.vt.map(index => object.vt[index - 1])))\n\treturn buffer\n}\n\n\nfunction createFace(words = []) {\n\tconst face = { points: [], vt: [], normal: [] }\n\twords.forEach(word => {\n\t\tconst [point, vt, normal] = word.split('/')\n\t\tif (point !== undefined) face.points.push(Number(point))\n\t\tif (vt !== undefined) face.vt.push(Number(vt))\n\t\tif (normal !== undefined) face.normal.push(Number(normal))\n\t})\n\treturn face\n}\n\n\n//# sourceURL=webpack://icosahedron/./src/objLoader.js?");

/***/ }),

/***/ "rTiP":
/*!*****************************!*\
  !*** ./src/shaderSource.js ***!
  \*****************************/
/*! namespace exports */
/*! export fragmentShader [provided] [no usage info] [missing usage info prevents renaming] */
/*! export vertexShader [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fragmentShader\": () => /* binding */ fragmentShader,\n/* harmony export */   \"vertexShader\": () => /* binding */ vertexShader\n/* harmony export */ });\nconst fragmentShader = `\nprecision mediump float;\nvarying vec3 v_position;\nvarying vec3 v_normal;\nvarying vec2 vUv;\n\nvec3 sun = vec3(0.0, 1.0, 0.0);\nvec3 cameraPosition = vec3(0.0, 0.0, -1.0);\nvoid main() {\n\tfloat sumc = vUv.x + vUv.y;\n\tvec4 color = vec4(mix(vec3(0.0), vec3(1.0), step(0.1, sumc) * step(0.90, sumc)), 1.0);\n\tif (sumc >= 0.90 || vUv.x < 0.1 || vUv.y < 0.1) {\n\t\tvec3 color = vec3(0.6);\n\t\tvec3 ref = reflect(sun, v_normal);\n\n\t\tgl_FragColor = vec4(mix(vec3(0.9), mix(color, vec3(0.7), 1.0 - dot(ref, cameraPosition)), 1.0 - v_position.z), 1.0);\n\t} else {\n\t\tdiscard;\n\t\t// gl_FragColor = vec4(1.0);\n\t}\n}`\n\nconst vertexShader = `\nprecision highp float;\nconst float PI = 3.141527;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec3 center;\nattribute vec2 uv;\nattribute float floatValue;\nuniform float time;\nuniform vec2 screenSize;\nuniform vec3 u_position;\nvarying vec3 v_position;\nvarying vec3 v_normal;\nvarying vec2 vUv;\n\nvec3 rotateZ(vec3 point, float angle) {\n\tpoint.xy = vec2(point.x * cos(angle) + point.y * sin(angle), point.x * -sin(angle) + point.y * cos(angle)); // rotate\n\treturn point;\n}\n\nvec3 rotateY(vec3 point, float angle) {\n\tpoint.xz = vec2(point.x * cos(angle) + point.z * sin(angle), point.x * -sin(angle) + point.z * cos(angle)); // rotate\n\treturn point;\n}\n\nvec3 rotateX(vec3 point, float angle) {\n\tpoint.yz = vec2(point.y * cos(angle) + point.z * sin(angle), point.y * -sin(angle) + point.z * cos(angle)); // rotate\n\treturn point;\n}\n\nfloat cropTime(float time, float cropt) {\n\treturn mod(time, cropt) / cropt;\n}\n\nvoid main() {\n\tfloat circle = PI * 2.0;\n\tfloat angle = time * circle; // angle rotate\n\n\tvUv = uv;\n\tv_normal = rotateZ(rotateY(normal, cropTime(time, 0.20) * circle), circle * time);\n\n\tvec3 point = vec3(cos(cropTime(time, 0.25) * circle), 0.0, sin(cropTime(time, 0.25) * circle)) * 0.30;\n\tfloat dis = distance(point, center);\n\tvec3 pos = mix(position, position + (normalize(center - point)), (1.0 - min(dis, 1.0)) / 2.0 * step(floatValue, 0.35));\n\n\t// rotate\n\tpos = rotateY(pos, cropTime(time, 0.20) * circle);\n\tpos = rotateZ(pos, circle * time);\n\tpos.xz += rotateY(vec3(0.2, 0.0, 0.2), cropTime(time, 0.20) * circle).xz;\n\tv_position = pos;\n\t// size\n\tpos.xy = (pos.xy / screenSize) * 800.0;\n\n\t// perspective\n\tpos.xy = (pos.xy / (1.0 + pos.z * 0.2));\n\tpos.z /= 10.0;\n\tgl_Position = vec4(pos, 1.0);\n}`\n\n\n//# sourceURL=webpack://icosahedron/./src/shaderSource.js?");

/***/ })

},
0,[["tjUo","runtime","vendors"]]]);