import Link from 'next/link';
import AppCard from './components/Card';
import { fetchPlayers, fetchTeams } from './services/api';
import { Card } from '@mui/material';


type TitleProps = {
  title: string;
  href: string;
};

const Title = (props: TitleProps) => 
   (
    <div className="flex items-center mb-4 justify-between">
      <h1 className="text-sm">{props.title}</h1>
      <button className="text-sm">
        <Link href={props.href}>Ver todos</Link>
      </button>
    </div>
  )

type StatsCardProps = {
  value: number | string;
  label: string;
};

const StatsCard = ({ value, label }: StatsCardProps) => (
  <Card className="p-6">
    <h1 className="text-6xl pb-2">{value}</h1>
    <p className="text-zinc-400 text-sm">{label}</p>
  </Card>
);


export default async function Home() {
  const players = await fetchPlayers(); 
  const teams = await fetchTeams();


  const firstSixPlayers = players.slice(0, 6);
  const firstSixTeams = teams.slice(0, 6);

  const totalAge = players.reduce((sum: number, player: Player) => sum + player.age, 0);
  const averageAge = players.length > 0 ? totalAge / players.length : 0;
  
  const stats = [
    { value: teams.length, label: "Times" },
    { value: players.length, label: "Jogadores" },
    { value: averageAge.toFixed(2), label: "Idade média dos jogadores" },
  ];

  return (
    <div className="p-10">
      <section>
      <ul className="flex gap-4">
        {stats.map((stat, index) => (
          <li key={index} className='w-64'>
            <StatsCard value={stat.value} label={stat.label} />
          </li>
        ))}
      </ul>
      </section>

      <section className="my-8">
        <Title title="Jogadores" href="/jogadores" />
        <ul className="flex gap-5">
          {firstSixPlayers.map((player: Player) => (
            <li key={player.id}>
              <AppCard variant='player' player={player} />
            </li>
          ))}
        </ul>
      </section>

      <section className="my-8">
        <Title title="Times" href="/times" />
        <ul className="flex gap-5">
          {firstSixTeams.map((team: Team) => (
            <Link href={`/times/${team.id}`} key={team.id}>
              <AppCard variant="team" team={team} />
            </Link>
          ))}
        </ul>
      </section>
    </div>
  );
}
