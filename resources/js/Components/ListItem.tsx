import { Todo } from "@/Pages/Home";
import { IconButton, Input, Stack, TextField, Typography } from "@mui/material";
import { red, grey, green } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { ChangeEvent, useEffect, useState, useRef } from "react";

interface ListItemInterface {
    todo: Todo;
    destroyTodo: (id: number) => void;
}

export default function ListItem({ todo, destroyTodo }: ListItemInterface) {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState("");

    const descriptionRef = useRef<HTMLDivElement>();
    const [textFieldHeight, setTextFieldHeight] = useState<number | "auto">(0);

    useEffect(() => {
        setDescription(todo.description);
    }, [isEditing]);

    useEffect(() => {
        setTextFieldHeight(descriptionRef?.current?.clientHeight ?? "auto");
    }, []);

    return (
        <Stack
            sx={{ border: `1px solid #eee`, boxSizing: "border-box" }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            {isEditing ? (
                <>
                    <Input
                        fullWidth
                        autoFocus
                        multiline
                        value={description}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setDescription(e.target.value)
                        }
                        sx={{ ml: 2.5, mr: 1, my: 3, height: textFieldHeight }}
                    />
                    <IconButton
                        onClick={() => setIsEditing(false)}
                        sx={{
                            color: green["800"],
                            "&:hover": {
                                color: green["600"],
                            },
                        }}
                    >
                        <CheckIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => setIsEditing(false)}
                        sx={{
                            mr: 1.5,
                            color: grey["800"],
                            "&:hover": {
                                color: grey["600"],
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </>
            ) : (
                <>
                    <Typography
                        ref={descriptionRef}
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
                </>
            )}
        </Stack>
    );
}
