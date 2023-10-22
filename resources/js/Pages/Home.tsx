import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    Container,
    Typography,
    Divider,
    Stack,
    Button,
    Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import ListItem from "@/Components/ListItem";
import AddIcon from "@mui/icons-material/Add";
import Form from "@/Components/Form";
import { green } from "@mui/material/colors";
export interface Todo extends TodoContent {
    id: number;
}

interface TodoContent {
    description: string;
    status: boolean;
    order: number;
}

export default function Welcome() {
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [isAdding, setIsAdding] = useState(false);

    const [draggedItem, setDraggedItem] = useState<Todo | null>(null);

    const handleDragEnter = (_: any, index: number) => {
        if (!draggedItem) return;

        const updatedTodoList = [...todoList];
        const draggedIndex = todoList.indexOf(draggedItem);
        updatedTodoList.splice(draggedIndex, 1);
        updatedTodoList.splice(index, 0, draggedItem);
        setTodoList(updatedTodoList);
    };

    const handleDragEnd = () => {
        if (draggedItem) {
            const draggedIndex = todoList.indexOf(draggedItem);
            if (draggedIndex !== 0) {
                const todoIds = todoList.map((todo) => todo.id).reverse();
                axios.post("/api/todo/save-order", { todoIds }).then(() => {
                    setDraggedItem(null);
                });
            } else {
                setDraggedItem(null);
            }
        }
    };

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
        status: boolean,
        order: number
    ) => {
        return await axios
            .post("/api/todo/update", { id, description, status, order })
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

    const saveTodo = (description: string) => {
        axios
            .post("/api/todo/create", { description, status: false })
            .then((response) => {
                setTodoList((previousTodoList) => [
                    response.data.todo,
                    ...previousTodoList,
                ]);
                setIsAdding(false);
            });
    };

    return (
        <>
            <Head title="Home" />
            <Container>
                <Stack alignItems="center">
                    <Typography variant="h1">Todo list</Typography>
                    <Button
                        variant="outlined"
                        color="success"
                        startIcon={<AddIcon />}
                    >
                        <Typography onClick={() => setIsAdding(true)}>
                            Add todo
                        </Typography>
                    </Button>
                </Stack>

                <Divider sx={{ my: 1 }} />

                <Form
                    save={saveTodo}
                    close={() => setIsAdding(false)}
                    show={isAdding}
                    sx={{ background: green["50"] }}
                />

                <Stack sx={{ py: 2 }} gap={1.5}>
                    {todoList.length === 0 ? (
                        <Alert severity="info">
                            You don't have anything todo for today.
                        </Alert>
                    ) : (
                        todoList.map((todo, index) => (
                            <ListItem
                                key={`${todo}-${index}`}
                                index={index}
                                todo={todo}
                                destroyTodo={destroyTodo}
                                updateTodo={updateTodo}
                                draggedItem={draggedItem}
                                setDraggedItem={setDraggedItem}
                                handleDragEnter={handleDragEnter}
                                handleDragEnd={handleDragEnd}
                            />
                        ))
                    )}
                </Stack>
            </Container>
            <style>{``}</style>
        </>
    );
}
