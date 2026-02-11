import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { X, Upload, Loader2, Image, Video, Shield, Lock } from "lucide-react";

export default function EvidenceModal({
  isOpen,
  onClose,
  onSubmit,
  challengeTitle,
  requireEvidence = true,
  currentLevel = 1,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validar tipo
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      setError("Solo se permiten imágenes o videos.");
      return;
    }

    // Validar tamaño
    const maxSize = isImage ? 5 : 50; // MB
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      setError(`El archivo es demasiado grande. Máximo ${maxSize}MB.`);
      return;
    }

    setSelectedFile(file);

    // Crear preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (requireEvidence && !selectedFile) {
      setError("Por favor selecciona un archivo.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      await onSubmit(selectedFile); // Puede ser null
      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  const isImage = selectedFile?.type.startsWith("image/");
  const isVideo = selectedFile?.type.startsWith("video/");

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-white/10 rounded-[2rem] max-w-2xl w-full p-8 space-y-6 animate-in fade-in duration-300 max-h-[85vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-6">
          <div>
            <h3 className="text-2xl font-serif">Subir Evidencia</h3>
            <p className="text-sm text-gray-500 mt-1">{challengeTitle}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Honor System Section - Visible for everyone but locked if level < 25 */}
        <div className="space-y-4">
          {!selectedFile && (
            <div
              className={`border rounded-xl p-6 text-center space-y-2 transition-colors ${
                currentLevel >= 25
                  ? "bg-amber-900/10 border-amber-500/20"
                  : "bg-zinc-900/50 border-white/5 opacity-70 grayscale"
              }`}
            >
              <div className="flex justify-center mb-2">
                {currentLevel >= 25 ? (
                  <Shield className="w-8 h-8 text-amber-500" />
                ) : (
                  <div className="relative">
                    <Shield className="w-8 h-8 text-gray-600" />
                    <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5 border border-gray-600">
                      <Lock className="w-3 h-3 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>

              <h4
                className={`font-bold ${currentLevel >= 25 ? "text-amber-200" : "text-gray-500"}`}
              >
                {currentLevel >= 25
                  ? "Sistema de Honor Activo"
                  : "Sistema de Honor Bloqueado"}
              </h4>

              <p className="text-sm text-gray-400">
                {currentLevel >= 25 ? (
                  <>
                    Tu palabra es tu vínculo. No se requiere evidencia para este
                    nivel.
                    <br />
                    <span className="text-xs text-gray-500">
                      (Puedes subir una opcionalmente si lo deseas)
                    </span>
                  </>
                ) : (
                  <>
                    El sistema de honor está reservado para guerreros veteranos.
                    <br />
                    <span className="text-xs text-amber-500/70 font-bold mt-1 inline-block">
                      Se desbloquea en Nivel 25
                    </span>
                  </>
                )}
              </p>
            </div>
          )}

          {/* Upload Area */}
          {!selectedFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed ${
                requireEvidence ? "border-white/10" : "border-amber-500/30"
              } rounded-xl p-8 text-center cursor-pointer hover:border-amber-300/30 hover:bg-white/5 transition-all`}
            >
              <Upload className="w-8 h-8 text-gray-500 mx-auto mb-4" />
              <p className="text-white font-medium mb-2">
                Haz clic para subir evidencia
              </p>
              <p className="text-sm text-gray-500">
                Imágenes (JPG, PNG, WEBP) hasta 5MB
                <br />
                Videos (MP4, WEBM) hasta 50MB y 1 minuto
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Preview */}
              <div className="bg-black rounded-xl overflow-hidden border border-white/10">
                {isImage && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-auto max-h-96 object-contain"
                  />
                )}
                {isVideo && (
                  <video
                    src={preview}
                    controls
                    className="w-full h-auto max-h-96"
                  />
                )}
              </div>

              {/* File Info */}
              <div className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  {isImage ? (
                    <Image className="w-5 h-5 text-amber-300" />
                  ) : (
                    <Video className="w-5 h-5 text-amber-300" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreview(null);
                  }}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={handleClose}
            disabled={uploading}
            className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={requireEvidence && !selectedFile} // Solo bloquea si requiere evidencia
            className="flex-1 px-6 py-3 bg-amber-300 text-black rounded-xl hover:bg-amber-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-bold"
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Subiendo...
              </>
            ) : requireEvidence && !selectedFile ? (
              <span className="opacity-50">Adjuntar Evidencia Requerida</span>
            ) : (
              "Confirmar Check-in"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

EvidenceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  challengeTitle: PropTypes.string.isRequired,
  currentLevel: PropTypes.number,
};
