import { Button } from "@mui/material";
import TeamsTable from "../components/TeamsTable";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

export default function Times() {
  return(
    <div className="p-10 w-full">
      <Link href="/" className="text-zinc-600">{"< voltar"}</Link>
      <div className="flex items-center justify-between">
        <h1 className="my-5 font-bold">Times</h1>
        <Button variant="contained" className="flex items-center gap-2"><IconPlus />ADICIONAR TIME</Button>
      </div>
      <TeamsTable />
    </div>
  )
}