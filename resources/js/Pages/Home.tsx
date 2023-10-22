import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    Card,
    Container,
    Typography,
    Divider,
    Stack,
    IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import axios from "axios";
import ListItem from "@/Components/ListItem";

interface Todo {
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
                        <ListItem>
                            <Typography>
                                You don't have anything todo for today.
                            </Typography>
                        </ListItem>
                    ) : (
                        todoList.map((todo, index) => (
                            <ListItem key={`${todo}-${index}`}>
                                <Typography variant="body1" sx={{ px: 1.5 }}>
                                    {todo.description}
                                </Typography>
                                <IconButton
                                    onClick={() => destroyTodo(todo.id)}
                                    sx={{
                                        color: red["800"],
                                        "&:hover": {
                                            color: red["600"],
                                        },
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))
                    )}
                </Stack>
            </Container>
            <style>{``}</style>
        </>
    );
}
