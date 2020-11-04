/**
 * @typedef Object3d
 * @property {Array<Array<Number>>} points
 * @property {Array<Array<Number>>} vt
 * @property {Array<Array<Number>>} normal
 * @property {Array<Number>} position
 * @property {Array<Number>} uv
 * @property {Array<{points: Array<Number>, vt:Array<Number>, normal:Array<Number>}>} faces
 */

/**
 * @param {String} objContent
 * @returns {Object.<string, Object3d>}
*/
export function decode(objContent) {
	const lines = objContent.split('\n')
	const objects = {}
	const data = {}
	console.time('t')
	lines.forEach(line => {
		if (line[0] === '#') return
		const words = line.split(' ')
		const firstChar = words[0]
		switch (firstChar) {
			case 'o':
				data.currentObject = words[1]
				objects[data.currentObject] = objects[data.currentObject] || { points: [], faces: [], vt: [], normal: [] }
				break
			case 'v':
				objects[data.currentObject].points.push([...words.slice(1).map(s => Number(s))])
				break
			case 'vt':
				objects[data.currentObject].vt.push([...words.slice(1).map(s => Number(s))])
				break
			case 'vn':
				objects[data.currentObject].normal.push([...words.slice(1).map(s => Number(s))])
				break
			case 'f':
				objects[data.currentObject].faces.push(createFace(words.slice(1)))
				break
			default:
				break
		}
	})
	for (let name in objects) {
		objects[name].position = getPositiob(objects[name])
		objects[name].uv = getUV(objects[name])
		objects[name].normal = getNormal(objects[name])
	}
	console.timeEnd('t')
	return objects
}

function getNormal(object) {
	const buffer = []
	object.faces.forEach(face => buffer.push(...face.normal.map(index => object.normal[index - 1])))
	return buffer
}

function getPositiob(object) {
	const buffer = []
	object.faces.forEach(face => {
		buffer.push(...face.points.map(index => object.points[index - 1]))
	})
	return buffer
}

function getUV(object) {
	const buffer = []
	object.faces.forEach(face => buffer.push(...face.vt.map(index => object.vt[index - 1])))
	return buffer
}


function createFace(words = []) {
	const face = { points: [], vt: [], normal: [] }
	words.forEach(word => {
		const [point, vt, normal] = word.split('/')
		if (point !== undefined) face.points.push(Number(point))
		if (vt !== undefined) face.vt.push(Number(vt))
		if (normal !== undefined) face.normal.push(Number(normal))
	})
	return face
}
