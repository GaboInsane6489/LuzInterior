import { supabase } from "../../../config/supabase";

/**
 * Servicio para gestión de uploads multimedia con validación
 */
export const storageService = {
  /**
   * Valida el tipo de archivo
   */
  validateFileType(file, allowedTypes) {
    return allowedTypes.includes(file.type);
  },

  /**
   * Valida el tamaño del archivo en MB
   */
  validateFileSize(file, maxSizeMB) {
    const fileSizeMB = file.size / (1024 * 1024);
    return fileSizeMB <= maxSizeMB;
  },

  /**
   * Valida la duración de un video (en segundos)
   */
  async validateVideoDuration(file, maxDurationSeconds = 60) {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = function () {
        window.URL.revokeObjectURL(video.src);
        resolve(video.duration <= maxDurationSeconds);
      };

      video.onerror = function () {
        resolve(false);
      };

      video.src = URL.createObjectURL(file);
    });
  },

  /**
   * Sube un avatar personalizado
   */
  async uploadAvatar(file, userId) {
    // Validaciones
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!this.validateFileType(file, allowedTypes)) {
      throw new Error("Tipo de archivo no permitido. Usa JPG, PNG o WEBP.");
    }

    if (!this.validateFileSize(file, 5)) {
      throw new Error("El archivo es demasiado grande. Máximo 5MB.");
    }

    // Generar nombre único
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}/avatar-${Date.now()}.${fileExt}`;

    // Subir a Supabase Storage
    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) throw error;

    // Obtener URL pública
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(fileName);

    return publicUrl;
  },

  /**
   * Sube una imagen de portada (cover photo)
   */
  async uploadCoverPhoto(file, userId) {
    // Validaciones
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!this.validateFileType(file, allowedTypes)) {
      throw new Error("Tipo de archivo no permitido. Usa JPG, PNG o WEBP.");
    }

    if (!this.validateFileSize(file, 10)) {
      throw new Error("El archivo es demasiado grande. Máximo 10MB.");
    }

    // Generar nombre único
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}/cover-${Date.now()}.${fileExt}`;

    // Subir a Supabase Storage
    const { error } = await supabase.storage
      .from("covers")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) throw error;

    // Obtener URL pública
    const {
      data: { publicUrl },
    } = supabase.storage.from("covers").getPublicUrl(fileName);

    return publicUrl;
  },

  /**
   * Sube evidencia multimedia (imagen o video)
   */
  async uploadEvidence(file, userId, challengeId) {
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      throw new Error("Solo se permiten imágenes o videos.");
    }

    // Validaciones específicas
    if (isImage) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!this.validateFileType(file, allowedTypes)) {
        throw new Error("Tipo de imagen no permitido. Usa JPG, PNG o WEBP.");
      }
      if (!this.validateFileSize(file, 5)) {
        throw new Error("La imagen es demasiado grande. Máximo 5MB.");
      }
    }

    if (isVideo) {
      const allowedTypes = ["video/mp4", "video/webm"];
      if (!this.validateFileType(file, allowedTypes)) {
        throw new Error("Tipo de video no permitido. Usa MP4 o WEBM.");
      }
      if (!this.validateFileSize(file, 50)) {
        throw new Error("El video es demasiado grande. Máximo 50MB.");
      }

      // Validar duración
      const isValidDuration = await this.validateVideoDuration(file, 60);
      if (!isValidDuration) {
        throw new Error("El video es demasiado largo. Máximo 1 minuto.");
      }
    }

    // Generar nombre único
    const fileExt = file.name.split(".").pop();
    const mediaType = isImage ? "image" : "video";
    const fileName = `${userId}/${challengeId}-${Date.now()}.${fileExt}`;

    // Subir a Supabase Storage
    const { error } = await supabase.storage
      .from("evidence")
      .upload(fileName, file, {
        cacheControl: "3600",
      });

    if (error) throw error;

    // Obtener URL pública
    const {
      data: { publicUrl },
    } = supabase.storage.from("evidence").getPublicUrl(fileName);

    return {
      url: publicUrl,
      type: mediaType,
      sizeMB: (file.size / (1024 * 1024)).toFixed(2),
    };
  },

  /**
   * Elimina un archivo de storage
   */
  async deleteMedia(bucket, filePath) {
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) throw error;
    return true;
  },
};
