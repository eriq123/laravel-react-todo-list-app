import { Todo } from "@/Pages/Home";
import { Box, IconButton, Typography } from "@mui/material";
import { blue, cyan, red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import ListItemWrapper from "./ListItemWrapper";
import Form from "./Form";

interface ListItemInterface {
    index: number;
    todo: Todo;
    destroyTodo: (id: number) => void;
    updateTodo: (id: number, description: string, status: boolean) => void;
    handleDragEnter: (e: SyntheticEvent, index: number) => void;
    draggedItem: Todo | null;
    setDraggedItem: Dispatch<SetStateAction<Todo | null>>;
}

export default function ListItem({
    index,
    todo,
    destroyTodo,
    updateTodo,
    handleDragEnter,
    draggedItem,
    setDraggedItem,
}: ListItemInterface) {
    const [isEditing, setIsEditing] = useState(false);

    const saveChanges = async (description: string) => {
        await updateTodo(todo.id, description, todo.status);
        setIsEditing(false);
    };

    return (
        <Box
            draggable
            onDragStart={() => {
                setIsEditing(false);
                setDraggedItem(todo);
            }}
            onDragEnd={() => setDraggedItem(null)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            sx={[
                {
                    transition: "background-color 0.3s",
                    cursor: "pointer",
                    transform: "none",
                },
                draggedItem === todo
                    ? {
                          backgroundColor: cyan["300"],
                          color: "#fff",
                          cursor: "grab",
                          transform: "scale(1.01)",
                      }
                    : {},
            ]}
        >
            {isEditing ? (
                <Form
                    todo={todo}
                    show={isEditing}
                    save={saveChanges}
                    close={() => setIsEditing(false)}
                    sx={{ background: blue["50"] }}
                />
            ) : (
                <ListItemWrapper>
                    <Typography
                        variant="body1"
                        component="div"
                        flexGrow={1}
                        sx={{
                            ml: 2.5,
                            mr: 1,
                            my: 3,
                        }}
                        onClick={() => setIsEditing(true)}
                    >
                        {todo.description}
                    </Typography>

                    <IconButton
                        onClick={() => destroyTodo(todo.id)}
                        sx={{
                            mr: 1.5,
                            color: red["800"],
                            "&:hover": {
                                color: red["600"],
                            },
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </ListItemWrapper>
            )}
        </Box>
    );
}
