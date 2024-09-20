import { Card } from "@mui/material";

type AppCardProps = {
  children?: React.ReactNode;
  className?: string;
  variant: "player" | "team" | "default";
  player?: Player;
  team?: Team;
};

export default function AppCard({ children, className, variant, player, team }: AppCardProps) {
  
  const renderImage = (src: string, alt: string) => (
    <img src={src} className="w-16 h-16 rounded-full object-cover" alt={alt} />
  );

  const renderContent = (title: string, subtitle: string) => (
    <div className="flex flex-col gap-1">
      <h2>{title}</h2>
      <p className="text-xs text-zinc-400">{subtitle}</p>
    </div>
  );

  if (variant === "player" && player) {
    return (
      <Card className="flex items-center gap-2 p-4 w-64">
        {renderImage(player.profilepic, "foto de perfil do jogador")}
        {renderContent(player.name, `Idade: ${player.age}`)}
      </Card>
    );
  }

  if (variant === "team" && team) {
    return (
      <Card className="flex items-center gap-2 p-4 w-64">
        {renderImage(team.image, "logo do time")}
        {renderContent(team.name, `${team.players.length} jogadores`)}
      </Card>
    );
  }

  return (
    <Card sx={{ width: "16rem", borderRadius: "0.5rem" }} className={className}>
      {children}
    </Card>
  );
}
