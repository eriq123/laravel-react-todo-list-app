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

interface Todo {
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

    return (
        <>
            <Head title="Welcome" />
            <Container>
                <Typography variant="h1" sx={{ textAlign: "center" }}>
                    Todo list{" "}
                </Typography>
                <Divider />
                <Stack sx={{ py: 2 }} gap={1.5}>
                    {todoList.map((todo, index) => (
                        <Stack
                            key={`${todo}-${index}`}
                            sx={{ px: 1, py: 3, border: `1px solid #eee` }}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="body1">
                                {todo.description}
                            </Typography>
                            <IconButton
                                sx={{
                                    color: red["800"],
                                    "&:hover": {
                                        color: red["600"],
                                    },
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                    ))}
                </Stack>
            </Container>
            <style>{``}</style>
        </>
    );
}
