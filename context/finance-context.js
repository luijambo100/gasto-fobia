"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const DEFAULT_CATEGORIES = [
  { id: 1, name: "Compras", type: "expense", icon: "ShoppingCart" },
  { id: 2, name: "Comida", type: "expense", icon: "Utensils" },
  { id: 3, name: "Transporte", type: "expense", icon: "Car" },
  { id: 4, name: "Hogar", type: "expense", icon: "Home" },
  { id: 5, name: "Salario", type: "income", icon: "CircleDollarSign" },
  { id: 6, name: "Freelance", type: "income", icon: "Briefcase" },
  { id: 7, name: "Inversiones", type: "income", icon: "Landmark" },
];

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [presupuestos, setPresupuestos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // ─── CARGAR DATOS AL MONTAR ───────────────────────────────────────────────
  const cargarDatos = useCallback(async () => {
    try {
      const [resTrans, resPres, resCats] = await Promise.all([
        fetch("/api/transacciones"),
        fetch("/api/presupuestos"),
        fetch("/api/categorias"),
      ]);

      if (resTrans.ok) {
        const data = await resTrans.json();
        setTransactions(
          data.map((t) => ({
            id: t.id,
            description: t.descripcion,
            amount: Math.abs(Number(t.monto)),
            type: t.tipo,
            category: t.categoria,
            date: t.fecha,
          })),
        );
      }

      if (resPres.ok) {
        const data = await resPres.json();
        setPresupuestos(
          data.map((p) => ({
            id: p.id,
            category: p.categoria,
            amount: Number(p.monto),
          })),
        );
      }

      if (resCats.ok) {
        const data = await resCats.json();
        // Si el usuario ya tiene categorias guardadas, usarlas;
        // si no, mantener las DEFAULT
        if (data.length > 0) {
          setCategories(
            data.map((c) => ({
              id: c.id,
              name: c.nombre,
              type: c.tipo ?? "expense",
              icon: c.icono,
            })),
          );
        }
      }
    } catch (err) {
      console.error("Error cargando datos:", err);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    let activo = true;

    async function cargar() {
      try {
        const [resTrans, resPres, resCats] = await Promise.all([
          fetch("/api/transacciones"),
          fetch("/api/presupuestos"),
          fetch("/api/categorias"),
        ]);

        if (!activo) return;

        if (resTrans.ok) {
          const data = await resTrans.json();
          setTransactions(
            data.map((t) => ({
              id: t.id,
              description: t.descripcion,
              amount: Math.abs(Number(t.monto)),
              type: t.tipo,
              category: t.categoria,
              date: t.fecha,
            })),
          );
        }

        if (resPres.ok) {
          const data = await resPres.json();
          setPresupuestos(
            data.map((p) => ({
              id: p.id,
              category: p.categoria,
              amount: Number(p.monto),
            })),
          );
        }

        if (resCats.ok) {
          const data = await resCats.json();
          if (data.length > 0) {
            setCategories(
              data.map((c) => ({
                id: c.id,
                name: c.nombre,
                type: c.tipo ?? "expense",
                icon: c.icono,
              })),
            );
          }
        }
      } catch (err) {
        console.error("Error cargando datos:", err);
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargar();

    return () => {
      activo = false;
    };
  }, []);

  // ─── CATEGORIAS ───────────────────────────────────────────────────────────
  async function agregarCategoria(categoria) {
    const res = await fetch("/api/categorias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: categoria.name,
        icono: categoria.icon,
        color: categoria.color ?? "#6366f1",
      }),
    });

    if (!res.ok) return;
    const nueva = await res.json();

    setCategories((prev) => [
      ...prev,
      {
        id: nueva.id,
        name: nueva.nombre,
        type: categoria.type,
        icon: nueva.icono,
      },
    ]);

    if (categoria.type === "expense") {
      await actualizarPresupuestoCategoria(nueva.nombre, 0);
    }
  }

  async function eliminarCategoria(id) {
    const categoria = categories.find((c) => c.id === id);

    const res = await fetch(`/api/categorias/${id}`, { method: "DELETE" });
    if (!res.ok) return;

    setCategories((prev) => prev.filter((c) => c.id !== id));

    if (categoria) {
      setPresupuestos((prev) =>
        prev.filter((p) => p.category !== categoria.name),
      );
    }
  }

  // ─── TRANSACCIONES ────────────────────────────────────────────────────────
  async function agregarTransaccion(data) {
    const res = await fetch("/api/transacciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        descripcion: data.description,
        monto: Number(data.amount),
        tipo: data.type,
        categoria: data.category,
        fecha: data.date ?? new Date().toISOString(),
      }),
    });

    if (!res.ok) return;
    const nueva = await res.json();

    setTransactions((prev) => [
      ...prev,
      {
        id: nueva.id,
        description: nueva.descripcion,
        amount: Math.abs(Number(nueva.monto)),
        type: nueva.tipo,
        category: nueva.categoria,
        date: nueva.fecha,
      },
    ]);
  }

  async function eliminarTransaccion(id) {
    const res = await fetch(`/api/transacciones/${id}`, { method: "DELETE" });
    if (!res.ok) return;

    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  // ─── PRESUPUESTOS ─────────────────────────────────────────────────────────
  async function actualizarPresupuestoCategoria(category, amount) {
    const valor = Number(amount) || 0;
    const existe = presupuestos.find((p) => p.category === category);

    if (existe) {
      const res = await fetch(`/api/presupuestos/${existe.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ monto: valor }),
      });
      if (!res.ok) return;

      setPresupuestos((prev) =>
        prev.map((p) =>
          p.category === category ? { ...p, amount: valor } : p,
        ),
      );
    } else {
      const res = await fetch("/api/presupuestos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoria: category, monto: valor }),
      });
      if (!res.ok) return;
      const nuevo = await res.json();

      setPresupuestos((prev) => [
        ...prev,
        {
          id: nuevo.id,
          category: nuevo.categoria,
          amount: Number(nuevo.monto),
        },
      ]);
    }
  }

  function obtenerPresupuestoCategoria(category) {
    return presupuestos.find((p) => p.category === category)?.amount || 0;
  }

  // ─── CÁLCULOS (igual que antes) ───────────────────────────────────────────
  const ingresos = transactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + (Number(t.amount) || 0), 0);

  const totalGastado = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, t) => a + Math.abs(Number(t.amount) || 0), 0);

  const gastadoPorCategoria = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      const cat = t.category;
      acc[cat] = (acc[cat] || 0) + Math.abs(Number(t.amount) || 0);
      return acc;
    }, {});

  const balance = ingresos - totalGastado;

  const presupuestoTotal = presupuestos.reduce(
    (a, p) => a + (Number(p.amount) || 0),
    0,
  );

  const porcentaje =
    presupuestoTotal > 0
      ? Math.min((totalGastado / presupuestoTotal) * 100, 100)
      : 0;

  const excedido = totalGastado > presupuestoTotal && presupuestoTotal > 0;

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        categories,
        presupuestos,
        cargando,

        agregarCategoria,
        eliminarCategoria,

        agregarTransaccion,
        eliminarTransaccion,

        actualizarPresupuestoCategoria,
        obtenerPresupuestoCategoria,
        gastadoPorCategoria,

        ingresos,
        totalGastado,
        balance,

        presupuestoTotal,
        porcentaje,
        excedido,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  return useContext(FinanceContext);
}
