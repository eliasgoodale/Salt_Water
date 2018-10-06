
const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/v1/users' : 'production-url'

const users = [];


async function getUsers () {
	let res = await fetch(API_URL)
	let data = await res.json()
	return data
}

getUsers()
	.then(data => users = data)
	.catch(reason => console.log(reason.message))

export {
	users
}

