const axios = require('axios');
const Dev = require('../models/Dev');


module.exports = {
    async index(request, response) {
        const {user: userId} = request.headers;

        const loggedDev = await Dev.findById(userId);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: userId } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } },
            ],
        })

        return response.json(users);
    },

    async store(request, response) {
        const { username } = request.body;

        const userExists = await Dev.findOne({user : username})

        if (userExists)
            return response.json(userExists)


        const AxiosResponse = await axios.get(`https://api.github.com/users/${username}`);
        
        const {name, bio, avatar_url: avatar} = AxiosResponse.data;

        const dev = await Dev.create({
            name,
            user : username,
            bio,
            avatar,
        })

        return response.json(dev)
    }
};