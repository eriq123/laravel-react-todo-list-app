import { Todo } from "@/Pages/Home";
import { IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import ListItemWrapper from "./ListItemWrapper";
import Form from "./Form";

interface ListItemInterface {
    todo: Todo;
    destroyTodo: (id: number) => void;
    updateTodo: (id: number, description: string, status: boolean) => void;
}

export default function ListItem({
    todo,
    destroyTodo,
    updateTodo,
}: ListItemInterface) {
    const [isEditing, setIsEditing] = useState(false);

    const saveChanges = async (description: string) => {
        await updateTodo(todo.id, description, todo.status);
        setIsEditing(false);
    };

    return (
        <>
            {isEditing ? (
                <Form
                    todo={todo}
                    show={isEditing}
                    save={saveChanges}
                    close={() => setIsEditing(false)}
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
        </>
    );
}
