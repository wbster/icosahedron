export const fragmentShader = `
precision mediump float;
varying vec3 v_position;
varying vec3 v_normal;
varying vec2 vUv;

vec3 sun = vec3(0.0, 1.0, 0.0);
vec3 cameraPosition = vec3(0.0, 0.0, -1.0);
void main() {
	float sumc = vUv.x + vUv.y;
	vec4 color = vec4(mix(vec3(0.0), vec3(1.0), step(0.1, sumc) * step(0.90, sumc)), 1.0);
	if (sumc >= 0.90 || vUv.x < 0.1 || vUv.y < 0.1) {
		vec3 color = vec3(0.6);
		vec3 ref = reflect(sun, v_normal);

		gl_FragColor = vec4(mix(vec3(0.9), mix(color, vec3(0.7), 1.0 - dot(ref, cameraPosition)), 1.0 - v_position.z), 1.0);
	} else {
		discard;
		// gl_FragColor = vec4(1.0);
	}
}`

export const vertexShader = `
precision highp float;
const float PI = 3.141527;
attribute vec3 position;
attribute vec3 normal;
attribute vec3 center;
attribute vec2 uv;
attribute float floatValue;
uniform float time;
uniform vec2 screenSize;
uniform vec3 u_position;
varying vec3 v_position;
varying vec3 v_normal;
varying vec2 vUv;

vec3 rotateZ(vec3 point, float angle) {
	point.xy = vec2(point.x * cos(angle) + point.y * sin(angle), point.x * -sin(angle) + point.y * cos(angle)); // rotate
	return point;
}

vec3 rotateY(vec3 point, float angle) {
	point.xz = vec2(point.x * cos(angle) + point.z * sin(angle), point.x * -sin(angle) + point.z * cos(angle)); // rotate
	return point;
}

vec3 rotateX(vec3 point, float angle) {
	point.yz = vec2(point.y * cos(angle) + point.z * sin(angle), point.y * -sin(angle) + point.z * cos(angle)); // rotate
	return point;
}

float cropTime(float time, float cropt) {
	return mod(time, cropt) / cropt;
}

void main() {
	float circle = PI * 2.0;
	float angle = time * circle; // angle rotate

	vUv = uv;
	v_normal = rotateZ(rotateY(normal, cropTime(time, 0.20) * circle), circle * time);

	vec3 point = vec3(cos(cropTime(time, 0.25) * circle), 0.0, sin(cropTime(time, 0.25) * circle)) * 0.30;
	float dis = distance(point, center);
	vec3 pos = mix(position, position + (normalize(center - point)), (1.0 - min(dis, 1.0)) / 2.0 * step(floatValue, 0.35));

	// rotate
	pos = rotateY(pos, cropTime(time, 0.20) * circle);
	pos = rotateZ(pos, circle * time);
	pos.xz += rotateY(vec3(0.2, 0.0, 0.2), cropTime(time, 0.20) * circle).xz;
	v_position = pos;
	// size
	pos.xy = (pos.xy / screenSize) * 800.0;

	// perspective
	pos.xy = (pos.xy / (1.0 + pos.z * 0.2));
	pos.z /= 10.0;
	gl_Position = vec4(pos, 1.0);
}`
