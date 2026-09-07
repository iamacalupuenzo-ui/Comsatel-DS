// GENERADO automáticamente desde all-tokens.ts + translations/tokens.ts (ES)
// del sistema de diseño React — no editar a mano. Incluye título, intro,
// label, descripción, versión y uso de cada token, todo en español (el
// nombre del token en sí se deja en inglés, es el identificador técnico).

export interface TokenRow {
  name: string;
  light: string;
  dark: string;
  usage: string;
  lightRef: string | null;
  darkRef: string | null;
}

export interface TokenGroup {
  id: string;
  label: string;
  description: string | null;
  version: string | null;
  rows: TokenRow[];
}

export interface TokenSection {
  id: string;
  title: string;
  intro: string | null;
  groups: TokenGroup[];
}

export const ALL_TOKENS: TokenSection[] = [
  {
    "id": "color",
    "title": "Color",
    "intro": "Tokens de color semánticos agrupados por rol, fondos, texto, bordes, iconos, acentos, estados e overlays de interacción.",
    "groups": [
      {
        "id": "background-base",
        "label": "Base y especiales",
        "description": "La superficie base de la página más rellenos de propósito especial, ítems seleccionados, controles deshabilitados, skeleton loading y overlays de modal.",
        "version": "v1.0.0",
        "rows": [
          {
            "name": "--color-background-base",
            "light": "#ffffff",
            "dark": "#0c0e16",
            "usage": "Fondo de página raíz",
            "lightRef": "base-white",
            "darkRef": "surface-base"
          },
          {
            "name": "--color-background-selected",
            "light": "#eef4ff",
            "dark": "#1e2340",
            "usage": "Relleno de ítem activo / seleccionado",
            "lightRef": "surface-selected-light",
            "darkRef": "surface-selected"
          },
          {
            "name": "--color-background-disabled",
            "light": "#f2f4f7",
            "dark": "#1a1d2e",
            "usage": "Fondo de control deshabilitado",
            "lightRef": "gray-100",
            "darkRef": "surface-disabled"
          },
          {
            "name": "--color-background-skeleton-base",
            "light": "#eaecf0",
            "dark": "#1d2939",
            "usage": "Relleno de skeleton loading",
            "lightRef": "gray-200",
            "darkRef": "gray-800"
          },
          {
            "name": "--color-background-skeleton-shimmer",
            "light": "#f9fafb",
            "dark": "#344054",
            "usage": "Capa de animación shimmer del skeleton",
            "lightRef": "gray-050",
            "darkRef": "gray-700"
          },
          {
            "name": "--color-background-blanket-default",
            "light": "rgba(0,0,0,0.5)",
            "dark": "rgba(0,0,0,0.7)",
            "usage": "Overlay de modal / drawer",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--color-background-blanket-danger",
            "light": "rgba(230,45,85,0.2)",
            "dark": "rgba(230,45,85,0.3)",
            "usage": "Overlay de confirmación destructiva",
            "lightRef": null,
            "darkRef": null
          }
        ]
      },
      {
        "id": "background-neutral",
        "label": "Neutral",
        "description": "Rellenos neutrales desde el más tenue (subtlest) hasta el más intenso (strongest). Usá subtlest para filas zebra y strongest para superficies casi negras.",
        "version": "v1.0.0",
        "rows": [
          {
            "name": "--color-background-neutral-subtlest",
            "light": "#f9fafb",
            "dark": "#111827",
            "usage": "Relleno neutral más tenue, filas zebra",
            "lightRef": "gray-050",
            "darkRef": "surface-raised"
          },
          {
            "name": "--color-background-neutral-subtlest-hover",
            "light": "#f2f4f7",
            "dark": "#1d2939",
            "usage": "Estado hover de subtlest",
            "lightRef": "gray-100",
            "darkRef": "gray-800"
          },
          {
            "name": "--color-background-neutral-subtlest-pressed",
            "light": "#eaecf0",
            "dark": "#344054",
            "usage": "Estado pressed de subtlest",
            "lightRef": "gray-200",
            "darkRef": "gray-700"
          },
          {
            "name": "--color-background-neutral-subtle",
            "light": "#f2f4f7",
            "dark": "#1d2939",
            "usage": "Contenedores sutiles y superficies secundarias",
            "lightRef": "gray-100",
            "darkRef": "gray-800"
          },
          {
            "name": "--color-background-neutral-subtle-hover",
            "light": "#eaecf0",
            "dark": "#344054",
            "usage": "Estado hover de subtle",
            "lightRef": "gray-200",
            "darkRef": "gray-700"
          },
          {
            "name": "--color-background-neutral-subtle-pressed",
            "light": "#d0d5dd",
            "dark": "#475467",
            "usage": "Estado pressed de subtle",
            "lightRef": "gray-300",
            "darkRef": "gray-600"
          },
          {
            "name": "--color-background-neutral-default",
            "light": "#eaecf0",
            "dark": "#344054",
            "usage": "Fondo neutral por defecto",
            "lightRef": "gray-200",
            "darkRef": "gray-700"
          },
          {
            "name": "--color-background-neutral-default-hover",
            "light": "#d0d5dd",
            "dark": "#475467",
            "usage": "Estado hover de default",
            "lightRef": "gray-300",
            "darkRef": "gray-600"
          },
          {
            "name": "--color-background-neutral-default-pressed",
            "light": "#98a2b3",
            "dark": "#667085",
            "usage": "Estado pressed de default",
            "lightRef": "gray-400",
            "darkRef": "gray-500"
          },
          {
            "name": "--color-background-neutral-bolder",
            "light": "#d0d5dd",
            "dark": "#475467",
            "usage": "Neutral más fuerte, divisores, chips rellenos",
            "lightRef": "gray-300",
            "darkRef": "gray-600"
          },
          {
            "name": "--color-background-neutral-bolder-hover",
            "light": "#98a2b3",
            "dark": "#667085",
            "usage": "Estado hover de bolder",
            "lightRef": "gray-400",
            "darkRef": "gray-500"
          },
          {
            "name": "--color-background-neutral-bolder-pressed",
            "light": "#667085",
            "dark": "#98a2b3",
            "usage": "Estado pressed de bolder",
            "lightRef": "gray-500",
            "darkRef": "gray-400"
          },
          {
            "name": "--color-background-neutral-boldest",
            "light": "#98a2b3",
            "dark": "#667085",
            "usage": "Relleno neutral más intenso",
            "lightRef": "gray-400",
            "darkRef": "gray-500"
          },
          {
            "name": "--color-background-neutral-boldest-hover",
            "light": "#667085",
            "dark": "#98a2b3",
            "usage": "Estado hover de boldest",
            "lightRef": "gray-500",
            "darkRef": "gray-400"
          },
          {
            "name": "--color-background-neutral-boldest-pressed",
            "light": "#475467",
            "dark": "#d0d5dd",
            "usage": "Estado pressed de boldest",
            "lightRef": "gray-600",
            "darkRef": "gray-300"
          },
          {
            "name": "--color-background-neutral-strongest",
            "light": "#344054",
            "dark": "#98a2b3",
            "usage": "Neutral casi negro, rellenos de alto contraste",
            "lightRef": "gray-700",
            "darkRef": "gray-400"
          },
          {
            "name": "--color-background-neutral-strongest-hover",
            "light": "#475467",
            "dark": "#d0d5dd",
            "usage": "Estado hover de strongest",
            "lightRef": "gray-600",
            "darkRef": "gray-300"
          },
          {
            "name": "--color-background-neutral-strongest-pressed",
            "light": "#667085",
            "dark": "#eaecf0",
            "usage": "Estado pressed de strongest",
            "lightRef": "gray-500",
            "darkRef": "gray-200"
          }
        ]
      },
      {
        "id": "background-brand",
        "label": "Brand",
        "description": "Rellenos con tinte de marca para superficies seleccionadas y primarias. Default es el fondo de acción primaria, botones y CTAs.",
        "version": "v1.2.0",
        "rows": [
          {
            "name": "--color-background-brand-subtlest",
            "light": "#f0f4ff",
            "dark": "#1e2340",
            "usage": "Superficie con tinte de marca, ítems seleccionados",
            "lightRef": "brand-050",
            "darkRef": "surface-selected"
          },
          {
            "name": "--color-background-brand-subtlest-hover",
            "light": "#e0eaff",
            "dark": "#2d3282",
            "usage": "Estado hover de subtlest",
            "lightRef": "brand-100",
            "darkRef": "brand-900"
          },
          {
            "name": "--color-background-brand-subtlest-pressed",
            "light": "#c7d7fd",
            "dark": "#3538cd",
            "usage": "Estado pressed de subtlest",
            "lightRef": "brand-200",
            "darkRef": "brand-700"
          },
          {
            "name": "--color-background-brand-subtle",
            "light": "#e0eaff",
            "dark": "#2d3282",
            "usage": "Contenedor suave de marca",
            "lightRef": "brand-100",
            "darkRef": "brand-900"
          },
          {
            "name": "--color-background-brand-subtle-hover",
            "light": "#c7d7fd",
            "dark": "#3538cd",
            "usage": "Estado hover de subtle",
            "lightRef": "brand-200",
            "darkRef": "brand-700"
          },
          {
            "name": "--color-background-brand-subtle-pressed",
            "light": "#a4bcfb",
            "dark": "#444ce7",
            "usage": "Estado pressed de subtle",
            "lightRef": "brand-300",
            "darkRef": "brand-600"
          },
          {
            "name": "--color-background-brand-default",
            "light": "#6172f3",
            "dark": "#3538cd",
            "usage": "Fondo de acción primaria, botones, CTAs",
            "lightRef": "brand-500",
            "darkRef": "brand-700"
          },
          {
            "name": "--color-background-brand-default-hover",
            "light": "#444ce7",
            "dark": "#444ce7",
            "usage": "Estado hover de default",
            "lightRef": "brand-600",
            "darkRef": "brand-600"
          },
          {
            "name": "--color-background-brand-default-pressed",
            "light": "#3538cd",
            "dark": "#6172f3",
            "usage": "Estado pressed de default",
            "lightRef": "brand-700",
            "darkRef": "brand-500"
          },
          {
            "name": "--color-background-brand-bolder",
            "light": "#444ce7",
            "dark": "#444ce7",
            "usage": "Relleno de marca de alto énfasis",
            "lightRef": "brand-600",
            "darkRef": "brand-600"
          },
          {
            "name": "--color-background-brand-bolder-hover",
            "light": "#3538cd",
            "dark": "#6172f3",
            "usage": "Estado hover de bolder",
            "lightRef": "brand-700",
            "darkRef": "brand-500"
          },
          {
            "name": "--color-background-brand-bolder-pressed",
            "light": "#2d31a6",
            "dark": "#8098f9",
            "usage": "Estado pressed de bolder",
            "lightRef": "brand-800",
            "darkRef": "brand-400"
          },
          {
            "name": "--color-background-brand-boldest",
            "light": "#3538cd",
            "dark": "#6172f3",
            "usage": "Énfasis máximo de marca",
            "lightRef": "brand-700",
            "darkRef": "brand-500"
          },
          {
            "name": "--color-background-brand-boldest-hover",
            "light": "#444ce7",
            "dark": "#8098f9",
            "usage": "Estado hover de boldest",
            "lightRef": "brand-600",
            "darkRef": "brand-400"
          },
          {
            "name": "--color-background-brand-boldest-pressed",
            "light": "#6172f3",
            "dark": "#a4bcfb",
            "usage": "Estado pressed de boldest",
            "lightRef": "brand-500",
            "darkRef": "brand-300"
          },
          {
            "name": "--color-background-brand-strongest",
            "light": "#2d31a6",
            "dark": "#8098f9",
            "usage": "Relleno de marca más profundo",
            "lightRef": "brand-800",
            "darkRef": "brand-400"
          },
          {
            "name": "--color-background-brand-strongest-hover",
            "light": "#3538cd",
            "dark": "#a4bcfb",
            "usage": "Estado hover de strongest",
            "lightRef": "brand-700",
            "darkRef": "brand-300"
          },
          {
            "name": "--color-background-brand-strongest-pressed",
            "light": "#444ce7",
            "dark": "#c7d7fd",
            "usage": "Estado pressed de strongest",
            "lightRef": "brand-600",
            "darkRef": "brand-200"
          }
        ]
      },
      {
        "id": "background-danger",
        "label": "Danger",
        "description": "Rellenos con tinte de error para acciones destructivas y superficies de validación.",
        "version": "v1.0.0",
        "rows": [
          {
            "name": "--color-background-danger-subtlest",
            "light": "#fff1f3",
            "dark": "#1f0a12",
            "usage": "Superficie con tinte de error, filas de error",
            "lightRef": "danger-050",
            "darkRef": "surface-danger-subtlest"
          },
          {
            "name": "--color-background-danger-subtlest-hover",
            "light": "#ffe4e8",
            "dark": "#3b0f20",
            "usage": "Estado hover de subtlest",
            "lightRef": "danger-100",
            "darkRef": "surface-danger-subtle"
          },
          {
            "name": "--color-background-danger-subtlest-pressed",
            "light": "#fecdd6",
            "dark": "#c01048",
            "usage": "Estado pressed de subtlest",
            "lightRef": "danger-200",
            "darkRef": "danger-700"
          },
          {
            "name": "--color-background-danger-subtle",
            "light": "#ffe4e8",
            "dark": "#3b0f20",
            "usage": "Contenedor suave de error",
            "lightRef": "danger-100",
            "darkRef": "surface-danger-subtle"
          },
          {
            "name": "--color-background-danger-subtle-hover",
            "light": "#fecdd6",
            "dark": "#c01048",
            "usage": "Estado hover de subtle",
            "lightRef": "danger-200",
            "darkRef": "danger-700"
          },
          {
            "name": "--color-background-danger-subtle-pressed",
            "light": "#fea3b4",
            "dark": "#e31b54",
            "usage": "Estado pressed de subtle",
            "lightRef": "danger-300",
            "darkRef": "danger-600"
          },
          {
            "name": "--color-background-danger-default",
            "light": "#f63d68",
            "dark": "#c01048",
            "usage": "Fondo de acción destructiva",
            "lightRef": "danger-500",
            "darkRef": "danger-700"
          },
          {
            "name": "--color-background-danger-default-hover",
            "light": "#e31b54",
            "dark": "#e31b54",
            "usage": "Estado hover de default",
            "lightRef": "danger-600",
            "darkRef": "danger-600"
          },
          {
            "name": "--color-background-danger-default-pressed",
            "light": "#c01048",
            "dark": "#f63d68",
            "usage": "Estado pressed de default",
            "lightRef": "danger-700",
            "darkRef": "danger-500"
          },
          {
            "name": "--color-background-danger-bolder",
            "light": "#e31b54",
            "dark": "#e31b54",
            "usage": "Relleno de error de alto énfasis",
            "lightRef": "danger-600",
            "darkRef": "danger-600"
          },
          {
            "name": "--color-background-danger-bolder-hover",
            "light": "#c01048",
            "dark": "#f63d68",
            "usage": "Estado hover de bolder",
            "lightRef": "danger-700",
            "darkRef": "danger-500"
          },
          {
            "name": "--color-background-danger-bolder-pressed",
            "light": "#a11043",
            "dark": "#fd6f8e",
            "usage": "Estado pressed de bolder",
            "lightRef": "danger-800",
            "darkRef": "danger-400"
          },
          {
            "name": "--color-background-danger-boldest",
            "light": "#c01048",
            "dark": "#f63d68",
            "usage": "Énfasis máximo de error",
            "lightRef": "danger-700",
            "darkRef": "danger-500"
          },
          {
            "name": "--color-background-danger-boldest-hover",
            "light": "#e31b54",
            "dark": "#fd6f8e",
            "usage": "Estado hover de boldest",
            "lightRef": "danger-600",
            "darkRef": "danger-400"
          },
          {
            "name": "--color-background-danger-boldest-pressed",
            "light": "#f63d68",
            "dark": "#fea3b4",
            "usage": "Estado pressed de boldest",
            "lightRef": "danger-500",
            "darkRef": "danger-300"
          },
          {
            "name": "--color-background-danger-strongest",
            "light": "#a11043",
            "dark": "#fd6f8e",
            "usage": "Relleno de error más profundo",
            "lightRef": "danger-800",
            "darkRef": "danger-400"
          },
          {
            "name": "--color-background-danger-strongest-hover",
            "light": "#c01048",
            "dark": "#fea3b4",
            "usage": "Estado hover de strongest",
            "lightRef": "danger-700",
            "darkRef": "danger-300"
          },
          {
            "name": "--color-background-danger-strongest-pressed",
            "light": "#e31b54",
            "dark": "#fecdd6",
            "usage": "Estado pressed de strongest",
            "lightRef": "danger-600",
            "darkRef": "danger-200"
          }
        ]
      },
      {
        "id": "background-warning",
        "label": "Warning",
        "description": "Rellenos con tinte de warning para superficies de precaución y avisos.",
        "version": "v1.0.0",
        "rows": [
          {
            "name": "--color-background-warning-subtlest",
            "light": "#fffaeb",
            "dark": "#1f1500",
            "usage": "Superficie con tinte de warning",
            "lightRef": "warning-050",
            "darkRef": "surface-warning-subtlest"
          },
          {
            "name": "--color-background-warning-subtlest-hover",
            "light": "#fef0c7",
            "dark": "#3b2700",
            "usage": "Estado hover de subtlest",
            "lightRef": "warning-100",
            "darkRef": "surface-warning-subtle"
          },
          {
            "name": "--color-background-warning-subtlest-pressed",
            "light": "#fedf89",
            "dark": "#b54708",
            "usage": "Estado pressed de subtlest",
            "lightRef": "warning-200",
            "darkRef": "warning-700"
          },
          {
            "name": "--color-background-warning-subtle",
            "light": "#fef0c7",
            "dark": "#3b2700",
            "usage": "Contenedor suave de warning",
            "lightRef": "warning-100",
            "darkRef": "surface-warning-subtle"
          },
          {
            "name": "--color-background-warning-subtle-hover",
            "light": "#fedf89",
            "dark": "#b54708",
            "usage": "Estado hover de subtle",
            "lightRef": "warning-200",
            "darkRef": "warning-700"
          },
          {
            "name": "--color-background-warning-subtle-pressed",
            "light": "#fec84b",
            "dark": "#dc6803",
            "usage": "Estado pressed de subtle",
            "lightRef": "warning-300",
            "darkRef": "warning-600"
          },
          {
            "name": "--color-background-warning-default",
            "light": "#f79009",
            "dark": "#b54708",
            "usage": "Fondo de acción de warning",
            "lightRef": "warning-500",
            "darkRef": "warning-700"
          },
          {
            "name": "--color-background-warning-default-hover",
            "light": "#dc6803",
            "dark": "#dc6803",
            "usage": "Estado hover de default",
            "lightRef": "warning-600",
            "darkRef": "warning-600"
          },
          {
            "name": "--color-background-warning-default-pressed",
            "light": "#b54708",
            "dark": "#f79009",
            "usage": "Estado pressed de default",
            "lightRef": "warning-700",
            "darkRef": "warning-500"
          },
          {
            "name": "--color-background-warning-bolder",
            "light": "#dc6803",
            "dark": "#dc6803",
            "usage": "Relleno de warning de alto énfasis",
            "lightRef": "warning-600",
            "darkRef": "warning-600"
          },
          {
            "name": "--color-background-warning-bolder-hover",
            "light": "#b54708",
            "dark": "#f79009",
            "usage": "Estado hover de bolder",
            "lightRef": "warning-700",
            "darkRef": "warning-500"
          },
          {
            "name": "--color-background-warning-bolder-pressed",
            "light": "#93370d",
            "dark": "#fdb022",
            "usage": "Estado pressed de bolder",
            "lightRef": "warning-800",
            "darkRef": "warning-400"
          },
          {
            "name": "--color-background-warning-boldest",
            "light": "#b54708",
            "dark": "#f79009",
            "usage": "Énfasis máximo de warning",
            "lightRef": "warning-700",
            "darkRef": "warning-500"
          },
          {
            "name": "--color-background-warning-boldest-hover",
            "light": "#dc6803",
            "dark": "#fdb022",
            "usage": "Estado hover de boldest",
            "lightRef": "warning-600",
            "darkRef": "warning-400"
          },
          {
            "name": "--color-background-warning-boldest-pressed",
            "light": "#f79009",
            "dark": "#fec84b",
            "usage": "Estado pressed de boldest",
            "lightRef": "warning-500",
            "darkRef": "warning-300"
          },
          {
            "name": "--color-background-warning-strongest",
            "light": "#93370d",
            "dark": "#fdb022",
            "usage": "Relleno de warning más profundo",
            "lightRef": "warning-800",
            "darkRef": "warning-400"
          },
          {
            "name": "--color-background-warning-strongest-hover",
            "light": "#b54708",
            "dark": "#fec84b",
            "usage": "Estado hover de strongest",
            "lightRef": "warning-700",
            "darkRef": "warning-300"
          },
          {
            "name": "--color-background-warning-strongest-pressed",
            "light": "#dc6803",
            "dark": "#fedf89",
            "usage": "Estado pressed de strongest",
            "lightRef": "warning-600",
            "darkRef": "warning-200"
          }
        ]
      },
      {
        "id": "background-success",
        "label": "Success",
        "description": "Rellenos con tinte de éxito para confirmaciones y estados positivos.",
        "version": "v1.0.0",
        "rows": [
          {
            "name": "--color-background-success-subtlest",
            "light": "#ecfdf3",
            "dark": "#032116",
            "usage": "Superficie con tinte de éxito, filas de confirmación",
            "lightRef": "success-050",
            "darkRef": "surface-success-subtlest"
          },
          {
            "name": "--color-background-success-subtlest-hover",
            "light": "#d1fadf",
            "dark": "#054f31",
            "usage": "Estado hover de subtlest",
            "lightRef": "success-100",
            "darkRef": "success-900"
          },
          {
            "name": "--color-background-success-subtlest-pressed",
            "light": "#a6f4c5",
            "dark": "#027a48",
            "usage": "Estado pressed de subtlest",
            "lightRef": "success-200",
            "darkRef": "success-700"
          },
          {
            "name": "--color-background-success-subtle",
            "light": "#d1fadf",
            "dark": "#054f31",
            "usage": "Contenedor suave de éxito",
            "lightRef": "success-100",
            "darkRef": "success-900"
          },
          {
            "name": "--color-background-success-subtle-hover",
            "light": "#a6f4c5",
            "dark": "#027a48",
            "usage": "Estado hover de subtle",
            "lightRef": "success-200",
            "darkRef": "success-700"
          },
          {
            "name": "--color-background-success-subtle-pressed",
            "light": "#6ce9a6",
            "dark": "#039855",
            "usage": "Estado pressed de subtle",
            "lightRef": "success-300",
            "darkRef": "success-600"
          },
          {
            "name": "--color-background-success-default",
            "light": "#12b76a",
            "dark": "#027a48",
            "usage": "Fondo de acción positiva",
            "lightRef": "success-500",
            "darkRef": "success-700"
          },
          {
            "name": "--color-background-success-default-hover",
            "light": "#039855",
            "dark": "#039855",
            "usage": "Estado hover de default",
            "lightRef": "success-600",
            "darkRef": "success-600"
          },
          {
            "name": "--color-background-success-default-pressed",
            "light": "#027a48",
            "dark": "#12b76a",
            "usage": "Estado pressed de default",
            "lightRef": "success-700",
            "darkRef": "success-500"
          },
          {
            "name": "--color-background-success-bolder",
            "light": "#039855",
            "dark": "#039855",
            "usage": "Relleno de éxito de alto énfasis",
            "lightRef": "success-600",
            "darkRef": "success-600"
          },
          {
            "name": "--color-background-success-bolder-hover",
            "light": "#027a48",
            "dark": "#12b76a",
            "usage": "Estado hover de bolder",
            "lightRef": "success-700",
            "darkRef": "success-500"
          },
          {
            "name": "--color-background-success-bolder-pressed",
            "light": "#05603a",
            "dark": "#32d583",
            "usage": "Estado pressed de bolder",
            "lightRef": "success-800",
            "darkRef": "success-400"
          },
          {
            "name": "--color-background-success-boldest",
            "light": "#027a48",
            "dark": "#12b76a",
            "usage": "Énfasis máximo de éxito",
            "lightRef": "success-700",
            "darkRef": "success-500"
          },
          {
            "name": "--color-background-success-boldest-hover",
            "light": "#039855",
            "dark": "#32d583",
            "usage": "Estado hover de boldest",
            "lightRef": "success-600",
            "darkRef": "success-400"
          },
          {
            "name": "--color-background-success-boldest-pressed",
            "light": "#12b76a",
            "dark": "#6ce9a6",
            "usage": "Estado pressed de boldest",
            "lightRef": "success-500",
            "darkRef": "success-300"
          },
          {
            "name": "--color-background-success-strongest",
            "light": "#05603a",
            "dark": "#32d583",
            "usage": "Relleno de éxito más profundo",
            "lightRef": "success-800",
            "darkRef": "success-400"
          },
          {
            "name": "--color-background-success-strongest-hover",
            "light": "#027a48",
            "dark": "#6ce9a6",
            "usage": "Estado hover de strongest",
            "lightRef": "success-700",
            "darkRef": "success-300"
          },
          {
            "name": "--color-background-success-strongest-pressed",
            "light": "#039855",
            "dark": "#a6f4c5",
            "usage": "Estado pressed de strongest",
            "lightRef": "success-600",
            "darkRef": "success-200"
          }
        ]
      },
      {
        "id": "text-base",
        "label": "Jerarquía base",
        "description": "Texto neutral desde metadata de menor prioridad (subtlest) hasta títulos de página de máximo contraste (boldest).",
        "version": "v1.0.0",
        "rows": [
          {
            "name": "--color-text-base-subtlest",
            "light": "#98a2b3",
            "dark": "#475467",
            "usage": "Metadata de menor prioridad",
            "lightRef": "gray-400",
            "darkRef": "gray-600"
          },
          {
            "name": "--color-text-base-subtle",
            "light": "#667085",
            "dark": "#667085",
            "usage": "Contenido secundario, captions, labels",
            "lightRef": "gray-500",
            "darkRef": "gray-500"
          },
          {
            "name": "--color-text-base-default",
            "light": "#344054",
            "dark": "#d0d5dd",
            "usage": "Texto de cuerpo estándar",
            "lightRef": "gray-700",
            "darkRef": "gray-300"
          },
          {
            "name": "--color-text-base-bolder",
            "light": "#1d2939",
            "dark": "#eaecf0",
            "usage": "Contenido enfatizado, subtítulos",
            "lightRef": "gray-800",
            "darkRef": "gray-200"
          },
          {
            "name": "--color-text-base-boldest",
            "light": "#101828",
            "dark": "#f9fafb",
            "usage": "Contraste máximo, títulos de página",
            "lightRef": "gray-900",
            "darkRef": "gray-050"
          }
        ]
      },
      {
        "id": "text-special",
        "label": "Especiales",
        "description": null,
        "version": null,
        "rows": [
          {
            "name": "--color-text-inverse",
            "light": "#ffffff",
            "dark": "#101828",
            "usage": "Texto sobre fondos oscuros o de marca",
            "lightRef": "base-white",
            "darkRef": "gray-900"
          },
          {
            "name": "--color-text-selected",
            "light": "#444ce7",
            "dark": "#8098f9",
            "usage": "Texto de ítems seleccionados",
            "lightRef": "brand-600",
            "darkRef": "brand-400"
          },
          {
            "name": "--color-text-disabled",
            "light": "#98a2b3",
            "dark": "#475467",
            "usage": "Texto deshabilitado",
            "lightRef": "gray-400",
            "darkRef": "gray-600"
          }
        ]
      },
      {
        "id": "text-semantic",
        "label": "Semánticos",
        "description": "Color de texto con significado, links de marca, mensajes de error y éxito, y avisos de warning.",
        "version": "v1.0.0",
        "rows": [
          {
            "name": "--color-text-brand-default",
            "light": "#444ce7",
            "dark": "#6172f3",
            "usage": "Labels y links de color de marca",
            "lightRef": "brand-600",
            "darkRef": "brand-500"
          },
          {
            "name": "--color-text-brand-bolder",
            "light": "#3538cd",
            "dark": "#8098f9",
            "usage": "Énfasis de texto de marca",
            "lightRef": "brand-700",
            "darkRef": "brand-400"
          },
          {
            "name": "--color-text-danger-default",
            "light": "#e31b54",
            "dark": "#f63d68",
            "usage": "Texto de mensaje de error",
            "lightRef": "danger-600",
            "darkRef": "danger-500"
          },
          {
            "name": "--color-text-danger-bolder",
            "light": "#c01048",
            "dark": "#fd6f8e",
            "usage": "Énfasis fuerte de error",
            "lightRef": "danger-700",
            "darkRef": "danger-400"
          },
          {
            "name": "--color-text-warning-default",
            "light": "#dc6803",
            "dark": "#f79009",
            "usage": "Texto de mensaje de warning",
            "lightRef": "warning-600",
            "darkRef": "warning-500"
          },
          {
            "name": "--color-text-warning-bolder",
            "light": "#b54708",
            "dark": "#fdb022",
            "usage": "Énfasis fuerte de warning",
            "lightRef": "warning-700",
            "darkRef": "warning-400"
          },
          {
            "name": "--color-text-success-default",
            "light": "#039855",
            "dark": "#12b76a",
            "usage": "Texto de confirmación positiva",
            "lightRef": "success-600",
            "darkRef": "success-500"
          },
          {
            "name": "--color-text-success-bolder",
            "light": "#027a48",
            "dark": "#32d583",
            "usage": "Énfasis fuerte de éxito",
            "lightRef": "success-700",
            "darkRef": "success-400"
          },
          {
            "name": "--color-text-link-default",
            "light": "#444ce7",
            "dark": "#6172f3",
            "usage": "Estado default del hyperlink",
            "lightRef": "brand-600",
            "darkRef": "brand-500"
          },
          {
            "name": "--color-text-link-hover",
            "light": "#3538cd",
            "dark": "#8098f9",
            "usage": "Estado hover del hyperlink",
            "lightRef": "brand-700",
            "darkRef": "brand-400"
          },
          {
            "name": "--color-text-link-pressed",
            "light": "#2d31a6",
            "dark": "#a4bcfb",
            "usage": "Estado pressed del hyperlink",
            "lightRef": "brand-800",
            "darkRef": "brand-300"
          },
          {
            "name": "--color-text-link-visited",
            "light": "#6172f3",
            "dark": "#444ce7",
            "usage": "Estado visited del hyperlink",
            "lightRef": "brand-500",
            "darkRef": "brand-600"
          }
        ]
      },
      {
        "id": "border-base",
        "label": "Base",
        "description": "Bordes estándar para inputs, cards, divisores y anillos de focus.",
        "version": "v1.0.0",
        "rows": [
          {
            "name": "--color-border-default",
            "light": "#d0d5dd",
            "dark": "#344054",
            "usage": "Borde estándar para inputs y cards",
            "lightRef": "gray-300",
            "darkRef": "gray-700"
          },
          {
            "name": "--color-border-selected",
            "light": "#444ce7",
            "dark": "#6172f3",
            "usage": "Indicador de opción seleccionada",
            "lightRef": "brand-600",
            "darkRef": "brand-500"
          },
          {
            "name": "--color-border-disabled",
            "light": "#eaecf0",
            "dark": "#1d2939",
            "usage": "Borde deshabilitado",
            "lightRef": "gray-200",
            "darkRef": "gray-800"
          },
          {
            "name": "--color-border-focused",
            "light": "#6172f3",
            "dark": "#8098f9",
            "usage": "Anillo de focus de teclado",
            "lightRef": "brand-500",
            "darkRef": "brand-400"
          },
          {
            "name": "--color-border-divider",
            "light": "#eaecf0",
            "dark": "#1d2939",
            "usage": "Divisores de sección",
            "lightRef": "gray-200",
            "darkRef": "gray-800"
          }
        ]
      },
      {
        "id": "border-neutral",
        "label": "Neutral",
        "description": null,
        "version": null,
        "rows": [
          {
            "name": "--color-border-neutral-subtlest",
            "light": "#f2f4f7",
            "dark": "#1d2939",
            "usage": "Borde de contenedor más tenue",
            "lightRef": "gray-100",
            "darkRef": "gray-800"
          },
          {
            "name": "--color-border-neutral-subtle",
            "light": "#eaecf0",
            "dark": "#344054",
            "usage": "Borde de contenedor sutil",
            "lightRef": "gray-200",
            "darkRef": "gray-700"
          },
          {
            "name": "--color-border-neutral-default",
            "light": "#d0d5dd",
            "dark": "#475467",
            "usage": "Bordes de inputs y cards",
            "lightRef": "gray-300",
            "darkRef": "gray-600"
          },
          {
            "name": "--color-border-neutral-bolder",
            "light": "#98a2b3",
            "dark": "#667085",
            "usage": "Borde más fuerte, énfasis",
            "lightRef": "gray-400",
            "darkRef": "gray-500"
          },
          {
            "name": "--color-border-neutral-boldest",
            "light": "#667085",
            "dark": "#98a2b3",
            "usage": "Borde neutral más fuerte",
            "lightRef": "gray-500",
            "darkRef": "gray-400"
          }
        ]
      },
      {
        "id": "border-brand",
        "label": "Brand",
        "description": null,
        "version": null,
        "rows": [
          {
            "name": "--color-border-brand-subtlest",
            "light": "#c7d7fd",
            "dark": "#2d3282",
            "usage": "Borde de marca más tenue",
            "lightRef": "brand-200",
            "darkRef": "brand-900"
          },
          {
            "name": "--color-border-brand-subtle",
            "light": "#a4bcfb",
            "dark": "#3538cd",
            "usage": "Borde de marca sutil",
            "lightRef": "brand-300",
            "darkRef": "brand-700"
          },
          {
            "name": "--color-border-brand-default",
            "light": "#6172f3",
            "dark": "#6172f3",
            "usage": "Borde de componente de color de marca",
            "lightRef": "brand-500",
            "darkRef": "brand-500"
          },
          {
            "name": "--color-border-brand-bolder",
            "light": "#444ce7",
            "dark": "#8098f9",
            "usage": "Borde de marca fuerte",
            "lightRef": "brand-600",
            "darkRef": "brand-400"
          },
          {
            "name": "--color-border-brand-boldest",
            "light": "#3538cd",
            "dark": "#a4bcfb",
            "usage": "Borde de marca más fuerte",
            "lightRef": "brand-700",
            "darkRef": "brand-300"
          }
        ]
      },
      {
        "id": "border-semantic",
        "label": "Danger · Warning · Success",
        "description": null,
        "version": null,
        "rows": [
          {
            "name": "--color-border-danger-subtlest",
            "light": "#fecdd6",
            "dark": "#fecdd6",
            "usage": "Borde de error tenue",
            "lightRef": "danger-200",
            "darkRef": "danger-200"
          },
          {
            "name": "--color-border-danger-subtle",
            "light": "#fea3b4",
            "dark": "#fea3b4",
            "usage": "Borde de error sutil",
            "lightRef": "danger-300",
            "darkRef": "danger-300"
          },
          {
            "name": "--color-border-danger-default",
            "light": "#f63d68",
            "dark": "#f63d68",
            "usage": "Borde de error de validación",
            "lightRef": "danger-500",
            "darkRef": "danger-500"
          },
          {
            "name": "--color-border-danger-bolder",
            "light": "#e31b54",
            "dark": "#e31b54",
            "usage": "Borde de error fuerte",
            "lightRef": "danger-600",
            "darkRef": "danger-600"
          },
          {
            "name": "--color-border-danger-boldest",
            "light": "#c01048",
            "dark": "#c01048",
            "usage": "Borde de error más fuerte",
            "lightRef": "danger-700",
            "darkRef": "danger-700"
          },
          {
            "name": "--color-border-warning-subtlest",
            "light": "#fedf89",
            "dark": "#fedf89",
            "usage": "Borde de warning tenue",
            "lightRef": "warning-200",
            "darkRef": "warning-200"
          },
          {
            "name": "--color-border-warning-subtle",
            "light": "#fec84b",
            "dark": "#fec84b",
            "usage": "Borde de warning sutil",
            "lightRef": "warning-300",
            "darkRef": "warning-300"
          },
          {
            "name": "--color-border-warning-default",
            "light": "#f79009",
            "dark": "#f79009",
            "usage": "Borde de warning",
            "lightRef": "warning-500",
            "darkRef": "warning-500"
          },
          {
            "name": "--color-border-warning-bolder",
            "light": "#dc6803",
            "dark": "#dc6803",
            "usage": "Borde de warning fuerte",
            "lightRef": "warning-600",
            "darkRef": "warning-600"
          },
          {
            "name": "--color-border-warning-boldest",
            "light": "#b54708",
            "dark": "#b54708",
            "usage": "Borde de warning más fuerte",
            "lightRef": "warning-700",
            "darkRef": "warning-700"
          },
          {
            "name": "--color-border-success-subtlest",
            "light": "#a6f4c5",
            "dark": "#a6f4c5",
            "usage": "Borde de éxito tenue",
            "lightRef": "success-200",
            "darkRef": "success-200"
          },
          {
            "name": "--color-border-success-subtle",
            "light": "#6ce9a6",
            "dark": "#6ce9a6",
            "usage": "Borde de éxito sutil",
            "lightRef": "success-300",
            "darkRef": "success-300"
          },
          {
            "name": "--color-border-success-default",
            "light": "#12b76a",
            "dark": "#12b76a",
            "usage": "Borde de éxito",
            "lightRef": "success-500",
            "darkRef": "success-500"
          },
          {
            "name": "--color-border-success-bolder",
            "light": "#039855",
            "dark": "#039855",
            "usage": "Borde de éxito fuerte",
            "lightRef": "success-600",
            "darkRef": "success-600"
          },
          {
            "name": "--color-border-success-boldest",
            "light": "#027a48",
            "dark": "#027a48",
            "usage": "Borde de éxito más fuerte",
            "lightRef": "success-700",
            "darkRef": "success-700"
          }
        ]
      },
      {
        "id": "icon",
        "label": "Iconos",
        "description": "Fills de iconos por énfasis, desde la menor prioridad (subtlest) hasta la mayor (bolder), más variantes selected, disabled e inverse.",
        "version": "v1.0.0",
        "rows": [
          {
            "name": "--color-icon-selected",
            "light": "#444ce7",
            "dark": "#6172f3",
            "usage": "Icono de nav activo o toggle-on",
            "lightRef": "brand-600",
            "darkRef": "brand-500"
          },
          {
            "name": "--color-icon-disabled",
            "light": "#98a2b3",
            "dark": "#475467",
            "usage": "Icono no interactivo",
            "lightRef": "gray-400",
            "darkRef": "gray-600"
          },
          {
            "name": "--color-icon-inverse",
            "light": "#ffffff",
            "dark": "#101828",
            "usage": "Icono sobre relleno oscuro o de marca",
            "lightRef": "base-white",
            "darkRef": "gray-900"
          },
          {
            "name": "--color-icon-neutral-subtlest",
            "light": "#98a2b3",
            "dark": "#475467",
            "usage": "Icono de menor prioridad",
            "lightRef": "gray-400",
            "darkRef": "gray-600"
          },
          {
            "name": "--color-icon-neutral-subtle",
            "light": "#667085",
            "dark": "#667085",
            "usage": "Icono secundario / decorativo",
            "lightRef": "gray-500",
            "darkRef": "gray-500"
          },
          {
            "name": "--color-icon-neutral-default",
            "light": "#344054",
            "dark": "#d0d5dd",
            "usage": "Icono estándar",
            "lightRef": "gray-700",
            "darkRef": "gray-300"
          },
          {
            "name": "--color-icon-neutral-bolder",
            "light": "#101828",
            "dark": "#f9fafb",
            "usage": "Icono de mayor prioridad",
            "lightRef": "gray-900",
            "darkRef": "gray-050"
          }
        ]
      },
      {
        "id": "accent",
        "label": "Acentos",
        "description": null,
        "version": null,
        "rows": [
          {
            "name": "--color-accent-teal",
            "light": "#15b79e",
            "dark": "#2ed3b7",
            "usage": "Acento frío calmado, indicadores de datos",
            "lightRef": "teal-500",
            "darkRef": "teal-400"
          },
          {
            "name": "--color-accent-lime",
            "light": "#669f2a",
            "dark": "#86cb3c",
            "usage": "Acento de crecimiento y naturaleza",
            "lightRef": "lime-500",
            "darkRef": "lime-400"
          },
          {
            "name": "--color-accent-blue",
            "light": "#3b82f6",
            "dark": "#60a5fa",
            "usage": "Acento informativo",
            "lightRef": "blue-500",
            "darkRef": "blue-400"
          },
          {
            "name": "--color-accent-purple",
            "light": "#8b5cf6",
            "dark": "#a78bfa",
            "usage": "Acento premium / creativo",
            "lightRef": "purple-500",
            "darkRef": "purple-400"
          },
          {
            "name": "--color-accent-pink",
            "light": "#ec4899",
            "dark": "#f472b6",
            "usage": "Acento de notificaciones y expresión",
            "lightRef": "pink-500",
            "darkRef": "pink-400"
          },
          {
            "name": "--color-accent-yellow",
            "light": "#eab308",
            "dark": "#facc15",
            "usage": "Acento de highlight cálido",
            "lightRef": "yellow-500",
            "darkRef": "yellow-400"
          },
          {
            "name": "--color-accent-orange",
            "light": "#dc6803",
            "dark": "#fdb022",
            "usage": "Acento de atención cálido",
            "lightRef": "warning-600",
            "darkRef": "warning-400"
          }
        ]
      },
      {
        "id": "status",
        "label": "Indicadores de estado",
        "description": null,
        "version": null,
        "rows": [
          {
            "name": "--color-status-online",
            "light": "var(--color-background-success-default)",
            "dark": "var(--color-background-success-default)",
            "usage": "Indicador de presencia online",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--color-status-busy",
            "light": "var(--color-background-danger-default)",
            "dark": "var(--color-background-danger-default)",
            "usage": "Indicador de presencia ocupada",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--color-status-offline",
            "light": "#667085",
            "dark": "#98a2b3",
            "usage": "Indicador de presencia offline",
            "lightRef": "gray-500",
            "darkRef": "gray-400"
          }
        ]
      },
      {
        "id": "interaction",
        "label": "Overlays de interacción",
        "description": null,
        "version": null,
        "rows": [
          {
            "name": "--color-interaction-hovered",
            "light": "rgba(0,0,0,0.04)",
            "dark": "rgba(255,255,255,0.06)",
            "usage": "Overlay de hover aplicado sobre cualquier superficie",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--color-interaction-pressed",
            "light": "rgba(0,0,0,0.08)",
            "dark": "rgba(255,255,255,0.1)",
            "usage": "Overlay de pressed aplicado sobre cualquier superficie",
            "lightRef": null,
            "darkRef": null
          }
        ]
      }
    ]
  },
  {
    "id": "elevation",
    "title": "Elevación",
    "intro": "Superficies y z-index que comunican profundidad y jerarquía de capas.",
    "groups": [
      {
        "id": "surface",
        "label": "Superficies",
        "description": "Superficies de página desde sunken (bloques de código hundidos) hasta overlay (modales y drawers flotantes). Combiná una superficie con el paso de sombra de la misma elevación.",
        "version": "v1.3.0",
        "rows": [
          {
            "name": "--elevation-surface-default",
            "light": "#ffffff",
            "dark": "#111827",
            "usage": "Superficie base de página, cards en reposo",
            "lightRef": "base-white",
            "darkRef": "surface-raised"
          },
          {
            "name": "--elevation-surface-raised",
            "light": "#ffffff",
            "dark": "#1d2939",
            "usage": "Elementos elevados sobre la página",
            "lightRef": "base-white",
            "darkRef": "gray-800"
          },
          {
            "name": "--elevation-surface-overlay",
            "light": "#ffffff",
            "dark": "#344054",
            "usage": "Superficies flotantes, modals, drawers",
            "lightRef": "base-white",
            "darkRef": "gray-700"
          },
          {
            "name": "--elevation-surface-sunken",
            "light": "#f9fafb",
            "dark": "#0c0e16",
            "usage": "Superficies hundidas, bloques de código, wells",
            "lightRef": "gray-050",
            "darkRef": "surface-base"
          }
        ]
      },
      {
        "id": "z-index",
        "label": "Z-index",
        "description": null,
        "version": null,
        "rows": [
          {
            "name": "--elevation-z-index-base",
            "light": "0",
            "dark": "0",
            "usage": "Elementos en flujo",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--elevation-z-index-raised",
            "light": "1",
            "dark": "1",
            "usage": "Cards elevadas en hover/focus",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--elevation-z-index-dropdown",
            "light": "100",
            "dark": "100",
            "usage": "Menús, autocompletes, selects",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--elevation-z-index-sticky",
            "light": "200",
            "dark": "200",
            "usage": "Headers sticky, barras flotantes",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--elevation-z-index-modal",
            "light": "300",
            "dark": "300",
            "usage": "Modals y drawers",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--elevation-z-index-overlay",
            "light": "400",
            "dark": "400",
            "usage": "Scrim de backdrop debajo de modals",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--elevation-z-index-toast",
            "light": "500",
            "dark": "500",
            "usage": "Notificaciones toast",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--elevation-z-index-tooltip",
            "light": "600",
            "dark": "600",
            "usage": "Tooltips, capa más alta",
            "lightRef": null,
            "darkRef": null
          }
        ]
      }
    ]
  },
  {
    "id": "layout",
    "title": "Layout",
    "intro": "Espaciados, gaps y tamaños usados en componentes y layouts.",
    "groups": [
      {
        "id": "padding",
        "label": "Padding",
        "description": null,
        "version": null,
        "rows": [
          {
            "name": "--layout-padding-none",
            "light": "0px",
            "dark": "0px",
            "usage": "Sin padding",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-padding-2xs",
            "light": "2px",
            "dark": "2px",
            "usage": "Padding micro",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-padding-xs",
            "light": "4px",
            "dark": "4px",
            "usage": "Padding ajustado",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-padding-sm",
            "light": "6px",
            "dark": "6px",
            "usage": "Padding compacto",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-padding-md",
            "light": "8px",
            "dark": "8px",
            "usage": "Padding default de control pequeño",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-padding-lg",
            "light": "12px",
            "dark": "12px",
            "usage": "Padding cómodo de control",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-padding-xl",
            "light": "16px",
            "dark": "16px",
            "usage": "Padding estándar de contenedor",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-padding-2xl",
            "light": "20px",
            "dark": "20px",
            "usage": "Padding amplio de contenedor",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-padding-3xl",
            "light": "24px",
            "dark": "24px",
            "usage": "Padding de panel",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-padding-4xl",
            "light": "32px",
            "dark": "32px",
            "usage": "Padding de panel grande",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-padding-5xl",
            "light": "40px",
            "dark": "40px",
            "usage": "Padding de sección de página",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-padding-6xl",
            "light": "48px",
            "dark": "48px",
            "usage": "Padding máximo",
            "lightRef": null,
            "darkRef": null
          }
        ]
      },
      {
        "id": "gap",
        "label": "Gap",
        "description": null,
        "version": null,
        "rows": [
          {
            "name": "--layout-gap-none",
            "light": "0px",
            "dark": "0px",
            "usage": "Sin gap",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-gap-2xs",
            "light": "2px",
            "dark": "2px",
            "usage": "Gap micro",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-gap-xs",
            "light": "4px",
            "dark": "4px",
            "usage": "Gap ajustado",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-gap-sm",
            "light": "6px",
            "dark": "6px",
            "usage": "Gap compacto",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-gap-md",
            "light": "8px",
            "dark": "8px",
            "usage": "Gap default entre controles",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-gap-lg",
            "light": "12px",
            "dark": "12px",
            "usage": "Gap cómodo",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-gap-xl",
            "light": "16px",
            "dark": "16px",
            "usage": "Gap estándar de sección",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-gap-2xl",
            "light": "20px",
            "dark": "20px",
            "usage": "Gap amplio",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-gap-3xl",
            "light": "24px",
            "dark": "24px",
            "usage": "Gap de panel",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-gap-4xl",
            "light": "32px",
            "dark": "32px",
            "usage": "Gap grande de sección",
            "lightRef": null,
            "darkRef": null
          }
        ]
      },
      {
        "id": "size",
        "label": "Tamaños",
        "description": null,
        "version": null,
        "rows": [
          {
            "name": "--layout-size-2xs",
            "light": "16px",
            "dark": "16px",
            "usage": "Slot de control / icono más pequeño",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-size-xs",
            "light": "20px",
            "dark": "20px",
            "usage": "Control pequeño",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-size-sm",
            "light": "24px",
            "dark": "24px",
            "usage": "Altura de control tamaño xs",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-size-base",
            "light": "32px",
            "dark": "32px",
            "usage": "Altura de control tamaño md",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-size-md",
            "light": "40px",
            "dark": "40px",
            "usage": "Altura de control tamaño lg",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-size-lg",
            "light": "48px",
            "dark": "48px",
            "usage": "Control grande / avatar",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-size-xl",
            "light": "56px",
            "dark": "56px",
            "usage": "Control XLarge",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-size-2xl",
            "light": "64px",
            "dark": "64px",
            "usage": "Superficie grande",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--layout-size-3xl",
            "light": "80px",
            "dark": "80px",
            "usage": "Superficie hero",
            "lightRef": null,
            "darkRef": null
          }
        ]
      }
    ]
  },
  {
    "id": "typography",
    "title": "Tipografía",
    "intro": "Familias, pesos, tamaños, alturas de línea y letter spacing.",
    "groups": [
      {
        "id": "font-family",
        "label": "Familia",
        "description": null,
        "version": null,
        "rows": [
          {
            "name": "--font-family-heading",
            "light": "\"Manrope\", sans-serif",
            "dark": "\"Manrope\", sans-serif",
            "usage": "Headings y títulos",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-family-content",
            "light": "\"Inter\", sans-serif",
            "dark": "\"Inter\", sans-serif",
            "usage": "Contenido de body y UI",
            "lightRef": null,
            "darkRef": null
          }
        ]
      },
      {
        "id": "font-weight",
        "label": "Pesos",
        "description": null,
        "version": null,
        "rows": [
          {
            "name": "--font-weight-regular",
            "light": "400",
            "dark": "400",
            "usage": "Peso de texto default",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-weight-accent",
            "light": "500",
            "dark": "500",
            "usage": "Peso accent / medium",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-weight-emphasis",
            "light": "600",
            "dark": "600",
            "usage": "Énfasis / semibold",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-weight-bold",
            "light": "700",
            "dark": "700",
            "usage": "Énfasis fuerte",
            "lightRef": null,
            "darkRef": null
          }
        ]
      },
      {
        "id": "font-size-heading",
        "label": "Tamaño, Heading",
        "description": null,
        "version": null,
        "rows": [
          {
            "name": "--font-size-heading-display",
            "light": "3rem",
            "dark": "3rem",
            "usage": "Texto display de hero",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-size-heading-large",
            "light": "2.25rem",
            "dark": "2.25rem",
            "usage": "Títulos a nivel de página",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-size-heading-medium",
            "light": "1.75rem",
            "dark": "1.75rem",
            "usage": "Headers de modal",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-size-heading-small",
            "light": "1.5rem",
            "dark": "1.5rem",
            "usage": "Headers de sección",
            "lightRef": null,
            "darkRef": null
          }
        ]
      },
      {
        "id": "font-size-content",
        "label": "Tamaño, Content",
        "description": null,
        "version": null,
        "rows": [
          {
            "name": "--font-size-content-feature",
            "light": "1.25rem",
            "dark": "1.25rem",
            "usage": "Feature callouts",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-size-content-highlight",
            "light": "1.125rem",
            "dark": "1.125rem",
            "usage": "Contenido destacado",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-size-content-body",
            "light": "1rem",
            "dark": "1rem",
            "usage": "Texto de lectura default",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-size-content-caption",
            "light": "0.875rem",
            "dark": "0.875rem",
            "usage": "Captions, tamaño de componente lg",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-size-content-ui",
            "light": "0.8125rem",
            "dark": "0.8125rem",
            "usage": "UI densa, tamaño de componente md",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-size-content-note",
            "light": "0.75rem",
            "dark": "0.75rem",
            "usage": "Labels y notas, tamaño de componente sm",
            "lightRef": null,
            "darkRef": null
          }
        ]
      },
      {
        "id": "font-line-height",
        "label": "Altura de línea",
        "description": null,
        "version": null,
        "rows": [
          {
            "name": "--font-line-height-heading-display",
            "light": "3.75rem",
            "dark": "3.75rem",
            "usage": "Altura de línea de heading display",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-line-height-heading-large",
            "light": "2.75rem",
            "dark": "2.75rem",
            "usage": "Altura de línea de heading large",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-line-height-heading-medium",
            "light": "2.25rem",
            "dark": "2.25rem",
            "usage": "Altura de línea de heading medium",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-line-height-heading-small",
            "light": "2rem",
            "dark": "2rem",
            "usage": "Altura de línea de heading small",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-line-height-content-feature",
            "light": "1.875rem",
            "dark": "1.875rem",
            "usage": "Altura de línea de texto feature",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-line-height-content-highlight",
            "light": "1.6875rem",
            "dark": "1.6875rem",
            "usage": "Altura de línea de texto highlight",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-line-height-content-body",
            "light": "1.5rem",
            "dark": "1.5rem",
            "usage": "Altura de línea de texto de body",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-line-height-content-caption",
            "light": "1.3125rem",
            "dark": "1.3125rem",
            "usage": "Altura de línea de texto de caption",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-line-height-content-ui",
            "light": "1.21875rem",
            "dark": "1.21875rem",
            "usage": "Altura de línea de texto de UI",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-line-height-content-note",
            "light": "1.125rem",
            "dark": "1.125rem",
            "usage": "Altura de línea de texto de note",
            "lightRef": null,
            "darkRef": null
          }
        ]
      },
      {
        "id": "font-letter-spacing",
        "label": "Letter spacing",
        "description": null,
        "version": null,
        "rows": [
          {
            "name": "--font-letter-spacing-heading",
            "light": "-0.02em",
            "dark": "-0.02em",
            "usage": "Tracking ajustado para headings",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--font-letter-spacing-content",
            "light": "0em",
            "dark": "0em",
            "usage": "Tracking default para content",
            "lightRef": null,
            "darkRef": null
          }
        ]
      }
    ]
  },
  {
    "id": "radius",
    "title": "Radio",
    "intro": "Radios de esquina para controles, superficies y pills.",
    "groups": [
      {
        "id": "radius",
        "label": "Radio",
        "description": "Radios de esquina desde divisores y badges afilados hasta pills completas para avatars y toggles.",
        "version": "v1.0.0",
        "rows": [
          {
            "name": "--radius-none",
            "light": "0px",
            "dark": "0px",
            "usage": "Divisores, imágenes full-bleed",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--radius-xs",
            "light": "2px",
            "dark": "2px",
            "usage": "Badges inline, snippets de código",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--radius-sm",
            "light": "4px",
            "dark": "4px",
            "usage": "Botones, inputs, tags, controles interactivos",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--radius-md",
            "light": "6px",
            "dark": "6px",
            "usage": "Dropdowns, tooltips",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--radius-lg",
            "light": "8px",
            "dark": "8px",
            "usage": "Cards, paneles, doc cards",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--radius-xl",
            "light": "10px",
            "dark": "10px",
            "usage": "Modals, dialogs",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--radius-2xl",
            "light": "12px",
            "dark": "12px",
            "usage": "Feature cards, imágenes grandes",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--radius-full",
            "light": "9999px",
            "dark": "9999px",
            "usage": "Avatars, pills, toggles",
            "lightRef": null,
            "darkRef": null
          }
        ]
      }
    ]
  },
  {
    "id": "effects",
    "title": "Efectos",
    "intro": "Escala de elevación de sombras, elegí el paso que coincida con la elevación de la superficie.",
    "groups": [
      {
        "id": "shadow",
        "label": "Sombras",
        "description": "Los pasos de sombra se mapean a la escala de elevación, usá xs para inputs, sm–md para cards y popovers, xl para modals y drawers.",
        "version": "v1.1.0",
        "rows": [
          {
            "name": "--shadow-xs",
            "light": "0 1px 2px 0 rgba(28,28,28,0.05)",
            "dark": "0 1px 2px 0 rgba(28,28,28,0.05)",
            "usage": "Elevación sutil, inputs, checkboxes",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--shadow-sm",
            "light": "0 1px 3px 0 rgba(28,28,28,0.08), 0 1px 2px -1px rgba(28,28,28,0.06)",
            "dark": "0 1px 3px 0 rgba(28,28,28,0.08), 0 1px 2px -1px rgba(28,28,28,0.06)",
            "usage": "Cards y list items",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--shadow-md",
            "light": "0 2px 4px 0 rgba(28,28,28,0.05), 0 4px 6px 0 rgba(28,28,28,0.08)",
            "dark": "0 2px 4px 0 rgba(28,28,28,0.05), 0 4px 6px 0 rgba(28,28,28,0.08)",
            "usage": "Dropdowns, popovers pequeños",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--shadow-lg",
            "light": "0 4px 6px -2px rgba(28,28,28,0.05), 0 12px 16px -4px rgba(28,28,28,0.10)",
            "dark": "0 4px 6px -2px rgba(28,28,28,0.05), 0 12px 16px -4px rgba(28,28,28,0.10)",
            "usage": "Paneles laterales, sidebars sticky",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--shadow-xl",
            "light": "0 8px 8px -4px rgba(28,28,28,0.04), 0 20px 24px -4px rgba(28,28,28,0.12)",
            "dark": "0 8px 8px -4px rgba(28,28,28,0.04), 0 20px 24px -4px rgba(28,28,28,0.12)",
            "usage": "Modals, dialogs, drawers",
            "lightRef": null,
            "darkRef": null
          }
        ]
      }
    ]
  },
  {
    "id": "motion",
    "title": "Movimiento",
    "intro": "Duraciones y curvas de easing para transiciones y animaciones.",
    "groups": [
      {
        "id": "duration",
        "label": "Duración",
        "description": null,
        "version": null,
        "rows": [
          {
            "name": "--motion-duration-fast",
            "light": "100ms",
            "dark": "100ms",
            "usage": "Micro-interacciones, cambios de color",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--motion-duration-leaving",
            "light": "150ms",
            "dark": "150ms",
            "usage": "Animaciones de salida / remoción",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--motion-duration-medium",
            "light": "200ms",
            "dark": "200ms",
            "usage": "Transiciones estándar",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--motion-duration-entering",
            "light": "250ms",
            "dark": "250ms",
            "usage": "Animaciones de entrada / aparición",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--motion-duration-slow",
            "light": "350ms",
            "dark": "350ms",
            "usage": "Movimiento de superficies grandes",
            "lightRef": null,
            "darkRef": null
          }
        ]
      },
      {
        "id": "easing",
        "label": "Easing",
        "description": null,
        "version": null,
        "rows": [
          {
            "name": "--motion-easing-default",
            "light": "cubic-bezier(0.2, 0, 0, 1)",
            "dark": "cubic-bezier(0.2, 0, 0, 1)",
            "usage": "Easing estándar default",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--motion-easing-enter",
            "light": "cubic-bezier(0, 0, 0.2, 1)",
            "dark": "cubic-bezier(0, 0, 0.2, 1)",
            "usage": "Easing de entrada, decelera",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--motion-easing-exit",
            "light": "cubic-bezier(0.2, 0, 1, 0.9)",
            "dark": "cubic-bezier(0.2, 0, 1, 0.9)",
            "usage": "Easing de salida, acelera",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--motion-easing-spring",
            "light": "cubic-bezier(0.15, 1.15, 0.6, 1)",
            "dark": "cubic-bezier(0.15, 1.15, 0.6, 1)",
            "usage": "Movimiento de énfasis con spring",
            "lightRef": null,
            "darkRef": null
          }
        ]
      }
    ]
  },
  {
    "id": "opacity",
    "title": "Opacidad",
    "intro": "Niveles de atenuación de contenido para estados.",
    "groups": [
      {
        "id": "opacity",
        "label": "Opacidad",
        "description": null,
        "version": null,
        "rows": [
          {
            "name": "--opacity-disabled",
            "light": "0.5",
            "dark": "0.5",
            "usage": "Atenuación de contenido deshabilitado",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--opacity-loading",
            "light": "0.7",
            "dark": "0.7",
            "usage": "Contenido en estado de loading",
            "lightRef": null,
            "darkRef": null
          },
          {
            "name": "--opacity-ghost",
            "light": "0.3",
            "dark": "0.3",
            "usage": "Contenido ghost / placeholder",
            "lightRef": null,
            "darkRef": null
          }
        ]
      }
    ]
  }
];
