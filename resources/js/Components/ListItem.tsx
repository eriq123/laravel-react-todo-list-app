import { Stack } from "@mui/material";
import { ReactNode } from "react";

interface ListItemInterface {
    children: ReactNode;
}

export default function ListItem({ children }: ListItemInterface) {
    return (
        <Stack
            sx={{ px: 1, py: 3, border: `1px solid #eee` }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            {children}
        </Stack>
    );
}
