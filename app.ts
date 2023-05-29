import server from './server'

(async () => {
    const app = await server()
    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })

})()