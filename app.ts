import server from './server'
import { Logger } from './src/utils/loaders/Logger'

(async () => {
    const app = await server()
    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
        Logger.instance.info(`Server listening on ${PORT}`)
    })

})()