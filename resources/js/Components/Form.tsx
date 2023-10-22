import { Todo } from "@/Pages/Home";
import { IconButton, Input, SxProps } from "@mui/material";
import { grey, green } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { ChangeEvent, useEffect, useState } from "react";
import ListItemWrapper from "./ListItemWrapper";

interface FormInterface {
    todo?: Todo;
    show: boolean;
    save: (description: string) => void;
    close: () => void;
    sx?: SxProps;
}

export default function Form({ todo, save, close, show, sx }: FormInterface) {
    const [description, setDescription] = useState("");

    useEffect(() => {
        setDescription(todo ? todo.description : "");
    }, [show]);

    return (
        show && (
            <ListItemWrapper sx={sx}>
                <Input
                    fullWidth
                    autoFocus
                    multiline
                    sx={{ ml: 2.5, mr: 1, my: 3 }}
                    value={description}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setDescription(e.target.value)
                    }
                />
                <IconButton
                    onClick={() => save(description)}
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
                    onClick={close}
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
            </ListItemWrapper>
        )
    );
}
