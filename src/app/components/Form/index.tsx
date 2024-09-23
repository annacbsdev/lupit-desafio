import { Button, Card, MenuItem, Select, TextField } from "@mui/material";
import Link from "next/link";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AddIcon from "@mui/icons-material/Add";

type FormProps = {
  variant: "time" | "jogador";
};

export default function Form({ variant }: FormProps) {
  return (
    <section className="w-full flex flex-col items-center pt-10">
      <div className="w-1/2">
        <Link href="/times" className="text-zinc-600">
          {"< voltar"}
        </Link>
        <h1 className="pt-8 font-bold pb-4 text-lg">
          Adicionar {variant === "time" ? "time" : "jogador"}
        </h1>
        <Card className="w-full p-4">
          <div className="bg-zinc-300 rounded-full w-48 h-48 flex items-center justify-center mx-auto relative">
            <PhotoCameraIcon sx={{ fontSize: "96px" }} />
            <button className="bg-primaryBlue rounded-full p-2 absolute bottom-0 right-4">
              <label htmlFor="upload-button" className="cursor-pointer">
                <AddIcon sx={{ color: "white" }} />
              </label>
            </button>
          </div>
          <input
            id="upload-button"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
          />

          <p className="text-zinc-500 text-sm text-center my-6 ">
            Permitido: *.jpeg, *.jpg, *.png, *.gif
            <br />
            Tamanho máximo de 3.1MB
          </p>

          {variant === "time" ? (
            <TextField
              id="outlined-basic"
              label="Nome"
              variant="outlined"
              fullWidth
            />
          ) : (
            <>
              <div className="flex items-center gap-4">
                <TextField
                  id="outlined-basic"
                  label="Nome"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  id="outlined-basic"
                  label="Idade"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Time"
                fullWidth
                sx={{ marginTop: "16px"}}
              >
                <MenuItem>Time 1</MenuItem>
                <MenuItem>Time 2</MenuItem>
                <MenuItem>Time 3</MenuItem>
              </Select>
            </>
          )}

          <div className="flex justify-end mt-4">
            <Button sx={{ textAlign: "end" }} variant="contained">
              SALVAR
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
