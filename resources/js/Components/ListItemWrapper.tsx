import { Stack, SxProps } from "@mui/material";
import { ReactNode } from "react";

interface ListItemWrapperInterface {
    sx?: SxProps;
    children: ReactNode;
}

export default function ListItemWrapper({
    sx,
    children,
}: ListItemWrapperInterface) {
    return (
        <Stack
            sx={[
                { border: `1px solid #eee` },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            {children}
        </Stack>
    );
}
