import { useState } from "react";
import { supabase } from "../../../config/supabase";

/**
 * Hook personalizado para gestionar la edición de perfil
 * Maneja estado local, validación y actualización de campos individuales
 */
export const useProfileEditor = (initialProfile) => {
  const [profile, setProfile] = useState(initialProfile || {});
  const [editingField, setEditingField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  /**
   * Actualiza un campo localmente
   */
  const updateField = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Valida username único en tiempo real
   */
  const validateUsername = async (username) => {
    if (!username || username === initialProfile?.username) return true;

    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username)
      .single();

    return !data; // True si no existe (disponible)
  };

  /**
   * Guarda un campo específico en la base de datos
   */
  const saveField = async (field, value) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Validación especial para username
      if (field === "username") {
        const isAvailable = await validateUsername(value);
        if (!isAvailable) {
          throw new Error("Este nombre de usuario ya está en uso.");
        }
      }

      // Actualizar en Supabase
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ [field]: value, updated_at: new Date().toISOString() })
        .eq("id", initialProfile.id);

      if (updateError) throw updateError;

      setSuccess(`${field} actualizado correctamente.`);
      setEditingField(null);

      // Limpiar mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccess(null), 3000);

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cancela la edición y restaura el valor original
   */
  const cancelEdit = (field) => {
    setProfile((prev) => ({ ...prev, [field]: initialProfile[field] }));
    setEditingField(null);
    setError(null);
  };

  /**
   * Inicia la edición de un campo
   */
  const startEdit = (field) => {
    setEditingField(field);
    setError(null);
    setSuccess(null);
  };

  return {
    profile,
    editingField,
    loading,
    error,
    success,
    updateField,
    saveField,
    cancelEdit,
    startEdit,
    validateUsername,
  };
};
