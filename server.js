import express from 'express'; // Importando o express
import cors from 'cors'; // Importando o cors
import { PrismaClient } from '@prisma/client'; // Importando o PrismaClient

const prisma = new PrismaClient(); // guardo dentro de uma variável para facilitar o uso

const app = express(); // guardo dentro de uma variável para facilitar o uso

app.use(express.json()); // Para o express entender o formato JSON
app.use(cors()); // Para o express entender o cors

app.get('/users', async (req, res) => { // Rota para listar os usuários

    const users = await prisma.user.findMany() // Busca todos os usuários

    res.status(200).json(users);


});

app.post('/users', async (req, res) => { // Rota para criar um usuário

    const user = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })

    res.status(201).json(user);

});

app.put('/users/:id', async (req, res) => { // Rota para atualizar um usuário

    const user = await prisma.user.update({
        where: { // Busca o usuário pelo id
            id: req.params.id
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })

    res.status(200).json(user);

});

app.delete('/users/:id', async (req, res) => { //rota para deletar um usuário

    await prisma.user.delete({
        where: { // Busca o usuário pelo id
            id: req.params.id
        }
    })

    res.status(200).json({ message: 'Usuário deletado com sucesso!' });

});

app.listen(3000, () => { // Iniciando o servidor
    console.log('Servidor rodando na porta 3000');
});



// username: brunodev92  senha: hqrA7X8hRHsTwn1B