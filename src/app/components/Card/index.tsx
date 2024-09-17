import { Card } from "@mui/material";

type AppCardProps = {
    children: React.ReactNode;
    className?: string;
}

export default function AppCard (props: AppCardProps) {
    return(
        <Card sx={{ width: "16rem", borderRadius: "0.5rem" }} className={props.className}>
            {props.children}
        </Card>

    )
}