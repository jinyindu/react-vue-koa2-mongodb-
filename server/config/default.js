module.exports = {
	port: 3000,
	secretKey: "maizi",
	session: {
		secret: 'blog',
		key: 'blog',
		maxAge: '2592000000'
	},
	mongodb: 'mongodb://127.0.0.1:27017/blog',
	cors: "http://localhost:8000",
}