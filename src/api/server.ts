import express, { Express, Request, Response } from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import { TodoItem } from './model/todoItemSchema';

const app: Express = express();
const PORT = 3001;

app.use(express.json());
app.use(cors({
	origin: 'http://localhost:3000',
	methods: ['GET', 'POST', 'PATCH', 'DELETE']
}))

mongoose.connect('mongodb://127.0.0.1:27017/todo_app')
  .then(() => console.log('Connected!'))
  .catch((error) => console.log(error));

app.get('/api/todos', async(req: Request, res: Response) => {
    try {
        const items = await TodoItem.find({});

        res.send(items);
    } catch (error) {
		if (error instanceof Error) {
            res.json(error.message)
		}
    };
});

app.get('/api/todos/:id', async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const targetedItem = await TodoItem.findById(id);

        res.send(targetedItem);
    } catch (error) {
        if (error instanceof Error) {
            res.json(error.message)
		}
    };
});

app.post('/api/todos', async(req: Request, res: Response) => {
    try {
        await TodoItem.create(req.body);

        res.send(req.body);
    } catch (error) {
        if (error instanceof Error) {
            res.json(error.message)
		}
    };
});

app.patch('/api/todos/:id', async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const itemToUpdate = await TodoItem.findByIdAndUpdate(id, req.body, {new: true});
        const text = req.body.text;
        const isDone = req.body.isDone;

        if (itemToUpdate) {
            itemToUpdate.text = text;
		    itemToUpdate.isDone = isDone;
        };

        res.send(itemToUpdate);
    }  catch (error) {
        if (error instanceof Error) {
            res.json(error.message)
		}
    };
});

app.delete('/api/todos/:id', async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const itemToDelete = await TodoItem.findByIdAndDelete(id);

        res.send(itemToDelete);
    } catch (error) {
        if (error instanceof Error) {
            res.json(error.message)
		}
    };
});

app.delete('/api/todos', async(req: Request, res: Response) => {
    try {
        const items = await TodoItem.deleteMany({});

        res.send(items);
    } catch (error) {
		if (error instanceof Error) {
            res.json(error.message)
		}
    };
});

app.listen(PORT, () => {
	console.log("Server is successfully running")
});

