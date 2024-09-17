import Link from "next/link";
import Card from "./components/Card";

const kpi = [
  {
    count: 10,
    type: "Times"
  },
  {
    count: 300,
    type: "Jogadores"
  },
  {
    count: 25,
    type: "Idade média dos jogadores"
  }
]

const playersMock = [
  {
    name: "jogador1",
    age: 18,
    profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTujWukC4Ehhk_UAykaoQ9qDoFOb-tea7MJA&s",
    teamPic: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg"
  },
  {
    name: "jogador2",
    age: 18,
    profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTujWukC4Ehhk_UAykaoQ9qDoFOb-tea7MJA&s",
    teamPic: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg"
  },
  {
    name: "jogador3",
    age: 18,
    profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTujWukC4Ehhk_UAykaoQ9qDoFOb-tea7MJA&s",
    teamPic: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg"
  },
  {
    name: "jogador4",
    age: 18,
    profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTujWukC4Ehhk_UAykaoQ9qDoFOb-tea7MJA&s",
    teamPic: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg"
  },
  {
    name: "jogador5",
    age: 18,
    profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTujWukC4Ehhk_UAykaoQ9qDoFOb-tea7MJA&s",
    teamPic: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg"
  }
]

const teamsMock = [
  {
    name: "time1",
    players: 10,
    teamPic: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg"
  },
  {
    name: "time2",
    players: 10,
    teamPic: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg"
  },
  {
    name: "time3",
    players: 10,
    teamPic: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg"
  },
  {
    name: "time4",
    players: 10,
    teamPic: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg"
  },
  {
    name: "time5",
    players: 10,
    teamPic: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg"
  },
]

type TitleProps = {
  title: string;
  href: string;
}

function Title(props: TitleProps) {
  return (
    <div className="flex items-center mb-4 justify-between">
      <h1 className=" text-sm">{props.title}</h1>
      <button className="text-sm"><Link href={props.href}>Ver todos</Link></button>
    </div>
  )
}

export default function Home() {
  return (
    <div className="p-10">
      <section>
        <ul className="flex gap-4">
        {kpi.map((k) => (
          <Card key={k.type} className="p-6">
            <h1 className="text-6xl pb-2">{k.count}</h1>
            <p className="text-zinc-400 text-sm">{k.type}</p>
          </Card>
        ))}
        </ul>
      </section>
      <section className="my-8">
        <Title title="Jogadores" href="/jogadores"/>
        <ul className="flex gap-5">
        {
          playersMock.map((player) => (
            <Card key={player.name} className="flex items-center gap-2 p-4">
              <img src={player.profilePic} className="w-16 h-16 rounded-full object-cover" alt="foto de perfil do jogador"/>
              <div className=" flex flex-col gap-1">
                <h2>{player.name}</h2>
                <p className="text-xs text-zinc-400">Idade: {player.age}</p>
                <img src={player.teamPic} className="w-5 h-5 rounded-full object-cover" alt="foto de capa do time"/>
              </div>
            </Card>
          ))
        }
        </ul>  
      </section>
      <section className="my-8">
        <Title title="Times" href="/times" />
        <ul className="flex gap-5">
        {
          teamsMock.map((team) => (
            <Card key={team.name} className="flex items-center gap-2 p-4">
              <img src={team.teamPic} className="w-16 h-16 rounded-full object-cover" alt="foto de capa do time"/>
              <div className=" flex flex-col gap-1">
                <h2>{team.name}</h2>
                <p className="text-xs text-zinc-400">{team.players} jogadores</p>
              </div>
            </Card>
          ))
        }
        </ul>   
      </section>
      <section>
      <h1 className=" text-sm">Jogadores por time</h1>
      </section>
    </div>
  )
}
