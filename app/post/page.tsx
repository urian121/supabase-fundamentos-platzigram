"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { supabase } from "../utils/client";
import Hearder from "../components/Hearder";
import PostSkeleton from "../components/skeletons/PostSkeleton";
import { showToast } from "nextjs-toast-notify";

export default function CreatePage() {
  const [mounted, setMounted] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadAndCreatePost = async (file: File) => {
    const userId = "11111111-1111-1111-1111-111111111111";

    // 1️⃣ Preparar nombre del archivo
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    // 2️⃣ Subir al bucket "images"
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("❌ Error al subir imagen:", uploadError);
      throw uploadError;
    }

    // 3️⃣ Obtener URL pública
    const { data: urlData } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;

    console.log("📸 Imagen subida:", publicUrl);

    // 4️⃣ Crear el post en la tabla posts_new
    const { data: postData, error: postError } = await supabase
      .from("posts_new")
      .insert({
        user_id: userId,
        image_url: publicUrl,
        caption: caption,
        likes: 0,
      })
      .select("*");

    if (postError) {
      console.error("❌ Error creando el post:", postError);
      throw postError;
    }

    console.log("🆕 Post creado:", postData);

    return {
      uploadedImageUrl: publicUrl,
      newPost: postData,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      showToast.error("Por favor selecciona una imagen");
      return;
    }

    setIsLoading(true);

    try {
      await uploadAndCreatePost(imageFile);

      // Éxito
      showToast.success("¡Post creado exitosamente!", {
        duration: 5000,
        progress: true,
        position: "top-right",
        transition: "swingInverted",
        sound: true,
      });

      setImageFile(null);
      setImagePreview(null);
      setCaption("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      showToast.error(`Error al crear el post: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Hearder title="Crear Post" />

      {/* Formulario */}
      <main className="max-w-lg mx-auto px-4 py-8">
        {!mounted ? (
          <PostSkeleton />
        ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Área de carga de imagen */}
          <div className="flex flex-col gap-2">
            {imagePreview ? (
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-card-bg border border-border">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Eliminar imagen"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center gap-3 aspect-square w-full rounded-xl border-2 border-dashed border-border bg-card-bg cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                    />
                  </svg>
                </div>
                <span className="text-foreground/60 text-sm">
                  Haz clic para seleccionar una imagen
                </span>
              </label>
            )}
            
            <input
              ref={fileInputRef}
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Caption */}
          <div className="flex flex-col gap-2">
            <textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Escribe algo sobre tu foto..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-card-bg border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          {/* Botón de enviar */}
          <button
            type="submit"
            disabled={isLoading || !imageFile}
            className="w-full py-3 px-4 rounded-xl bg-linear-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Publicando...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12zm0 0h7.5"
                  />
                </svg>
                Publicar
              </>
            )}
          </button>
        </form>
        )}
      </main>
    </div>
  );
}
