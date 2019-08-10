const Dev = require('../models/Dev');

module.exports = {
    async store(request, response) {

        const { user: userId } = request.headers
        const { devId } = request.params

        const loggedDev = await Dev.findById(userId);
        const targetDev = await Dev.findById(devId);

        // Retorna um erro se o devId não existir
        if (!targetDev)
            return response.status(400).json({error: 'Dev not exists.'})

        // Retorna as informações inalteradas caso já exista um registro de like do dev indicado
        if (loggedDev.likes.includes(devId))
            return response.json(loggedDev)

        // Remove, se houver, o registro de dislike de um dev antes de registrar um like
        if (loggedDev.dislikes.includes(devId)) {
            var index = loggedDev.dislikes.indexOf(devId);
            loggedDev.dislikes.splice(index, 1);
        }

        // Informa quando um match acontece (devs dão like entre si)
        if (targetDev.likes.includes(userId))
            console.log('MATCH! s2')

        // Adiciona o id do dev indicado ao array de likes do dev logado
        loggedDev.likes.push(targetDev._id)

        // Salva as alterações
        await loggedDev.save();

        // Retorna as informações atualizadas
        return response.json(loggedDev)
    }    
}