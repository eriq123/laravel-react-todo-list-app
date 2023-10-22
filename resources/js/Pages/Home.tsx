import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Card, Container, Typography } from "@mui/material";

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <Container>
                <Typography variant="h1" sx={{ textAlign: "center" }}>
                    Todo list{" "}
                </Typography>
                <Card variant="outlined"></Card>
            </Container>
            <style>{``}</style>
        </>
    );
}
