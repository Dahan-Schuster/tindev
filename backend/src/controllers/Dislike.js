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

        // Retorna as informações inalteradas caso já exista um registro de dislike do dev indicado
        if (loggedDev.dislikes.includes(devId))
            return response.json(loggedDev)
        
        // Remove, se houver, o registro de like de um dev antes de registrar um dislike
        if (loggedDev.likes.includes(devId)) {
            var index = loggedDev.likes.indexOf(devId);
            loggedDev.likes.splice(index, 1);
        }

        // Adiciona o id do dev indicado ao array de dislikes do dev logado
        loggedDev.dislikes.push(targetDev._id)

        // Salva as alterações
        await loggedDev.save();

        // Retorna as informações atualizadas
        return response.json(loggedDev)
    }    
}