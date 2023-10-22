import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    Card,
    Container,
    Typography,
    Divider,
    Stack,
    IconButton,
    Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import ListItem from "@/Components/ListItem";

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

    return (
        <>
            <Head title="Welcome" />
            <Container>
                <Typography variant="h1" sx={{ textAlign: "center" }}>
                    Todo list{" "}
                </Typography>
                <Divider />
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
                            />
                        ))
                    )}
                </Stack>
            </Container>
            <style>{``}</style>
        </>
    );
}
