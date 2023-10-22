import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Card, Container, Typography, Divider, Stack } from "@mui/material";
import { useEffect, useState } from "react";
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
                        <Card
                            key={`${todo}-${index}`}
                            variant="outlined"
                            sx={{ px: 1, py: 3 }}
                        >
                            <Typography variant="body1">
                                {todo.description}
                            </Typography>
                        </Card>
                    ))}
                </Stack>
            </Container>
            <style>{``}</style>
        </>
    );
}
