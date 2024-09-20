import { Button } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import PlayersTable from "../components/PlayersTable";

export default function Jogadores() {
  return(
    <div className="p-10 w-full">
      <Link href="/" className="text-zinc-600">{"< voltar"}</Link>
      <div className="flex items-center justify-between">
        <h1 className="my-5 font-bold">Jogadores</h1>
        <Button variant="contained" className="flex items-center gap-2"><IconPlus />ADICIONAR JOGADOR</Button>
      </div>
      <PlayersTable />
    </div>
  )
}