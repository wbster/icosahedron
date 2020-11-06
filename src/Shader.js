import Axios from 'axios'
import REGL from 'regl'
import { decode } from './objLoader'
import { fragmentShader, vertexShader } from './shaderSource'

function loadObject() {
	return Axios.get(`/obj`).then(({ data }) => data)
}

loadObject()
	.then(source => decode(source))
	.then(scene => {
		const canvas = document.querySelector('canvas')
		console.log('canvas', canvas)
		canvas.width = innerWidth
		canvas.height = innerHeight
		const regl = REGL({ canvas })
		const sphere = scene.Icosphere
		const center = getCenter(sphere)
		const floatValue = createFloatValue(center)
		const mesh = createMesh(regl, sphere, center, floatValue)
		regl.frame(render(regl, mesh))
	})

function render(regl, mesh, animationTime = 45) {
	return ({ time }) => {
		regl.clear({
			color: [0, 0, 0, 0],
			depth: 1
		})
		const loopTime = Math.abs((time % animationTime) / animationTime)
		const { devicePixelRatio = 1 } = window
		mesh({
			time: loopTime,
			screenSize: [innerWidth * devicePixelRatio, innerHeight * devicePixelRatio]
		})
	}
}

function createMesh(regl, sphere, center, floatValue) {
	return regl({
		frag: fragmentShader,
		vert: vertexShader,
		attributes: {
			position: regl.buffer(sphere.position),
			uv: regl.buffer(sphere.uv),
			center: regl.buffer(center),
			floatValue: regl.buffer(floatValue),
			normal: regl.buffer(sphere.normal),
		},
		uniforms: {
			screenSize: regl.prop('screenSize'),
			time: regl.prop('time'),
		},
		count: sphere.position.length
	})
}

function createFloatValue(center) {
	const buffer = []
	new Array(center.length / 3).fill(0).forEach(() => {
		const value = Math.random()
		buffer.push(value, value, value)
	})
	return buffer
}

function getCenter(sphere) {
	const buffer = []
	sphere.faces.forEach(face => {
		const center = face.points.map(index => sphere.points[index - 1]).reduce((acc, array) => {
			return [acc[0] + array[0], acc[1] + array[1], acc[2] + array[2]]
		}, [0, 0, 0]).map(n => n / face.points.length)
		buffer.push(Array.from(center), Array.from(center), Array.from(center))
	})
	return buffer
}
