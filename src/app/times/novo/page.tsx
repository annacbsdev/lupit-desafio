"use client";
import { useState } from "react";
import { Button, Card, TextField } from "@mui/material";
import Link from "next/link";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AddIcon from "@mui/icons-material/Add";
import { createTeam } from "../../services/api";


export default function NovoTime() {
  const [teamName, setTeamName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveTeam = async () => {
    if (!teamName || !selectedImage) {
      alert("Nome e imagem são obrigatórios");
      return;
    }

    const id = Date.now();
    const currentDate = new Date();

    const teamData: Team = {
      id,
      name: teamName,
      image: selectedImage.toString(),
      createdAt: currentDate.toISOString(),
      updatedAt: currentDate.toISOString(),
      players: [],
    };

    try {
      await createTeam(teamData);
      alert("Time criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar time:", error);
      alert("Erro ao criar time.");
    }
  };

  return (
    <section className="w-full flex flex-col items-center pt-10">
      <div className="w-1/2">
        <Link href="/times" className="text-zinc-600">
          {"< voltar"}
        </Link>
        <h1 className="pt-8 font-bold pb-4 text-lg">Adicionar time</h1>
        <Card className="w-full p-4">
          <div className="bg-zinc-300 rounded-full w-48 h-48 flex items-center justify-center mx-auto relative">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <PhotoCameraIcon sx={{ fontSize: "96px" }} />
            )}
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
            onChange={handleImageChange}
          />

          <p className="text-zinc-500 text-sm text-center my-6 ">
            Permitido: *.jpeg, *.jpg, *.png, *.gif
            <br />
            Tamanho máximo de 3.1MB
          </p>

          <TextField
            id="outlined-basic"
            label="Nome"
            variant="outlined"
            fullWidth
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />

          <div className="flex justify-end mt-4">
            <Button
              sx={{ textAlign: "end" }}
              variant="contained"
              onClick={handleSaveTeam}
            >
              SALVAR
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
