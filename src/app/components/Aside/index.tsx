import { IconCategory, IconUser, IconUsers } from "@tabler/icons-react";
import Link from "next/link";

export default function Aside(){
    return (
        <aside className="p-5 shadow-md h-screen">
            <nav>
                <ul className="flex flex-col gap-5">
                    <li>
                        <Link href="/" className="text-zinc-700"><IconCategory /></Link>
                    </li>
                    <li>
                        <Link href="/jogadores" className="text-zinc-700"><IconUser /></Link>
                    </li>
                    <li>
                        <Link href="/times" className="text-zinc-700"><IconUsers /></Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}