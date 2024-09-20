"use client";
import { Card } from "@mui/material";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

async function getTeamById(id: number) {
    const url = `http://localhost:3001/teams/${id}`; 

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar o time:', error);
        return null;
    }
}

interface TeamProfileProps {
    params: {
        id: string; 
    };
}

const TeamProfile = ({ params }: TeamProfileProps) => {
    const router = useRouter();
    const [team, setTeam] = useState<Team>();

    useEffect(() => {
        const fetchData = async () => {
            if (params.id) {
                const teamData = await getTeamById(Number(params.id));
                setTeam(teamData);
            }
        };

        fetchData();
    }, [params.id]);

    const handleBackClick = () => {
        router.back();
    };

    if (!team) {
        return <div>Loading...</div>;
    }

    return (
        <section className="p-10 w-full">
            <button onClick={handleBackClick} className="text-zinc-600">{"< voltar"}</button>
            <Card className="w-full flex p-6 items-center gap-6 mt-6">
                <img src={team.image} className="rounded-full w-32 h-32 object-cover" alt={`Logo do time ${team.name}`} />
                <h1 className="text-2xl text-black">{team.name}</h1> 
            </Card>
            <div className="mt-8">
                <h1 className="mb-4">Jogadores</h1>
                <ul className="grid grid-cols-4 gap-4">
                    {team.players.map((player: Player) => (
                        <li key={player.id}>
                            <Card className="flex p-4 items-center gap-4">
                                <img src={player.profilepic} className="rounded-full w-16 h-16 object-cover" alt={`Foto do jogador ${player.name}`} />
                                <div>
                                    <h1 className=" text-black">{player.name}</h1>
                                    <h2 className="text-sm">{player.age} anos</h2> 
                                </div>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default TeamProfile;
