import type { TranslationCatalog } from './types.ts'

export const es = {
  navigation: {
    label: 'Navegación principal',
    home: 'Inicio',
    policies: 'Políticas',
    contact: 'Contacto',
  },
  languageSwitcher: {
    label: 'Cambiar idioma',
  },
  pages: {
    home: {
      heading: 'Villa Peñas',
      placeholder: 'La experiencia de Villa Peñas está en preparación.',
    },
    policies: {
      heading: 'Políticas',
      placeholder: 'Las políticas de Villa Peñas se publicarán aquí.',
    },
    contact: {
      heading: 'Contacto',
      placeholder: 'La información de contacto de Villa Peñas estará disponible aquí.',
    },
  },
  metadata: {
    home: {
      title: 'Villa Peñas | Espacio para eventos en Santa Cruz, Guanacaste',
      description:
        'Villa Peñas es un espacio privado para celebraciones y eventos en Santa Cruz, Guanacaste, con piscina, rancho, cocina equipada, área BBQ y más.',
      openGraph: {
        title: 'Villa Peñas | Espacio para eventos en Santa Cruz, Guanacaste',
        description:
          'Villa Peñas es un espacio privado para celebraciones y eventos en Santa Cruz, Guanacaste.',
      },
    },
    policies: {
      title: 'Villa Peñas | Políticas',
      description:
        'Consulta las políticas de adelanto, cancelación y cambios de fecha de Villa Peñas.',
      openGraph: {
        title: 'Villa Peñas | Políticas',
        description: 'Consulta las políticas de Villa Peñas.',
      },
    },
    contact: {
      title: 'Villa Peñas | Contacto',
      description:
        'Encuentra la información de contacto de Villa Peñas en Santa Cruz, Guanacaste.',
      openGraph: {
        title: 'Villa Peñas | Contacto',
        description: 'Encuentra la información de contacto de Villa Peñas.',
      },
    },
  },
} satisfies TranslationCatalog
