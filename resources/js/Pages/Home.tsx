import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    Card,
    Container,
    Typography,
    Divider,
    Stack,
    Button,
    Alert,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";
import axios from "axios";
import ListItem from "@/Components/ListItem";
import AddIcon from "@mui/icons-material/Add";
export interface Todo {
    id: number;
    description: string;
    status: boolean;
}

export default function Welcome() {
    const [todoList, setTodoList] = useState<Todo[]>([]);

    useEffect(() => {
        axios.get("/api/todo").then((response) => {
            setTodoList(response.data.todos);
        });
    }, []);

    const destroyTodo = (id: number) => {
        axios.post("/api/todo/destroy", { id }).then(() => {
            setTodoList(todoList.filter((todo) => todo.id !== id));
        });
    };

    const updateTodo = async (
        id: number,
        description: string,
        status: boolean
    ) => {
        return await axios
            .post("/api/todo/update", { id, description, status })
            .then((response) => {
                const updatedTodoList = todoList.map((todo) => {
                    if (todo.id === response.data.todo.id) {
                        todo.description = response.data.todo.description;
                        todo.status = response.data.todo.status;
                    }
                    return todo;
                });
                setTodoList(updatedTodoList);
            });
    };

    return (
        <>
            <Head title="Welcome" />
            <Container>
                <Stack alignItems="center">
                    <Typography variant="h1">Todo list</Typography>
                    <Button
                        variant="outlined"
                        color="success"
                        startIcon={<AddIcon />}
                    >
                        <Typography>Add todo</Typography>
                    </Button>
                </Stack>
                <Divider sx={{ py: 1 }} />

                <Stack sx={{ py: 2 }} gap={1.5}>
                    {todoList.length === 0 ? (
                        <Alert severity="info">
                            You don't have anything todo for today.
                        </Alert>
                    ) : (
                        todoList.map((todo, index) => (
                            <ListItem
                                key={`${todo}-${index}`}
                                todo={todo}
                                destroyTodo={destroyTodo}
                                updateTodo={updateTodo}
                            />
                        ))
                    )}
                </Stack>
            </Container>
            <style>{``}</style>
        </>
    );
}
