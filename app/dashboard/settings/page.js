"use client";

import {
  User,
  Bell,
  Shield,
  Moon,
  Database,
  Download,
  Trash2,
  ChevronRight,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-bold">Ajustes</h1>

        <p className="text-slate-400 mt-2">
          Configura tu cuenta y personaliza tu experiencia
        </p>
      </div>

      {/* PERFIL */}

      <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
        <h2 className="text-xl font-semibold mb-6">Perfil</h2>

        <div className="flex items-center gap-5">
          <div className="w-18 h-18 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold">
            L
          </div>

          <div>
            <h3 className="text-lg font-semibold">Luis</h3>

            <p className="text-slate-400">Usuario Premium</p>
          </div>
        </div>
      </section>

      {/* OPCIONES */}

      <div className="grid md:grid-cols-2 gap-6">
        <Card
          icon={<Moon />}
          title="Apariencia"
          description="Tema oscuro y preferencias visuales"
        />

        <Card
          icon={<Bell />}
          title="Notificaciones"
          description="Controla recordatorios y alertas"
        />

        <Card
          icon={<Shield />}
          title="Privacidad"
          description="Protege tu información"
        />

        <Card
          icon={<Database />}
          title="Datos"
          description="Gestiona respaldo y almacenamiento"
        />
      </div>

      {/* MONEDA */}

      <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
        <h2 className="text-xl font-semibold mb-5">Configuración financiera</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-slate-400">Moneda</label>

            <select
              className="
              w-full
              bg-slate-800
              p-3
              rounded-xl
              "
            >
              <option>Soles (S/)</option>

              <option>Dólares ($)</option>

              <option>Euros (€)</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-slate-400">Inicio de mes</label>

            <input
              type="number"
              defaultValue="1"
              className="
              w-full
              bg-slate-800
              p-3
              rounded-xl
              "
            />
          </div>
        </div>
      </section>

      {/* ACCIONES */}

      <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
        <h2 className="text-xl font-semibold mb-6">Acciones</h2>

        <div className="space-y-3">
          <button
            className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            rounded-xl
            py-4
            flex
            justify-center
            gap-3
            "
          >
            <Download />
            Exportar datos
          </button>

          <button
            className="
            w-full
            bg-red-600
            hover:bg-red-700
            rounded-xl
            py-4
            flex
            justify-center
            gap-3
            "
          >
            <Trash2 />
            Borrar todo
          </button>
        </div>
      </section>
    </div>
  );
}

function Card({ icon, title, description }) {
  return (
    <button
      className="
      bg-slate-900
      rounded-3xl
      border
      border-slate-800
      p-6
      flex
      justify-between
      items-center
      hover:border-blue-600
      transition
      "
    >
      <div className="flex gap-4">
        <div className="text-blue-500">{icon}</div>

        <div>
          <h3 className="font-semibold">{title}</h3>

          <p className="text-slate-400 text-sm">{description}</p>
        </div>
      </div>

      <ChevronRight />
    </button>
  );
}
