import { Stack } from "@mui/material";
import { ReactNode } from "react";

interface ListItemWrapperInterface {
    children: ReactNode;
}

export default function ListItemWrapper({
    children,
}: ListItemWrapperInterface) {
    return (
        <Stack
            sx={{ border: `1px solid #eee` }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            {children}
        </Stack>
    );
}
