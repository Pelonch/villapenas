import type { TranslationCatalog } from './types.ts'
import { amenityImageSources } from '../config/amenities.ts'

export const es = {
  loader: {
    tagline: 'Tu momento comienza aquí',
  },
  navigation: {
    label: 'Navegación principal',
    home: 'Inicio',
    policies: 'Políticas',
    contact: 'Contacto',
    location: 'Ubicación',
    amenities: 'Amenidades',
    packages: 'Paquetes',
    quote: 'Cotizar',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },
  languageSwitcher: {
    label: 'Cambiar idioma',
  },
  footer: {
    navigationLabel: 'Información de Villa Peñas',
    copyright: (year) => `© ${year} Villa Peñas. Todos los derechos reservados.`,
  },
  pages: {
    home: {
      hero: {
        heading: 'Villa Peñas',
        aerialPreviewLabel: 'Vista aérea',
        openAerialDialog: 'Abrir vista aérea ampliada',
        aerialDialogTitle: 'Vista aérea de Villa Peñas',
        closeAerialDialog: 'Cerrar vista aérea',
      },
      location: {
        eyebrow: 'Ubicación',
        heading: 'Cerca de todo,\nlejos de la rutina.',
        description:
          'Villa Peñas se encuentra en Chirco, Santa Cruz, Guanacaste, Costa Rica, en una ubicación de fácil acceso desde Santa Cruz y varios de los principales destinos de la zona.',
        address:
          '1 km sur de la entrada a Moya,\nChirco, Santa Cruz, Guanacaste, Costa Rica.',
        openMaps: 'Abrir en Google Maps',
        openMapsNewTab:
          'Abrir la ubicación de Villa Peñas en Google Maps en una pestaña nueva',
        travelTimesLabel: 'Tiempos aproximados en vehículo',
        travelTimeLabels: {
          santaCruz: 'Santa Cruz',
          tamarindo: 'Tamarindo',
          haciendaPinilla: 'Hacienda Pinilla',
          avellanasBeach: 'Playa Avellanas',
          guanacasteAirport: 'Aeropuerto de Guanacaste (LIR)',
        },
        formatTravelTime: (minutes) => `${minutes} min`,
        illustratedMapAlt:
          'Mapa ilustrado de la ubicación de Villa Peñas en Chirco, Santa Cruz, mostrando su cercanía con Santa Cruz, Tamarindo, Hacienda Pinilla, Playa Avellanas y el Aeropuerto de Guanacaste.',
      },
      amenities: {
        eyebrow: 'Amenidades',
        heading: 'Espacios para disfrutar juntos.',
        description:
          'Cada espacio de Villa Peñas está pensado para que tu evento se disfrute a tu manera.',
        groups: [
          {
            id: 'rancho',
            category: 'Rancho y cocina equipada',
            title: 'Todo listo para compartir.',
            description:
              'Un espacio amplio y acogedor para reunirse, cocinar y disfrutar juntos, con una cocina equipada para que tengas todo a mano durante tu evento.',
            images: [
              {
                src: amenityImageSources.rancho[0],
                alt: 'Vista general del rancho de Villa Peñas',
              },
              {
                src: amenityImageSources.rancho[1],
                alt: 'Cocina equipada de Villa Peñas',
              },
              {
                src: amenityImageSources.rancho[2],
                alt: 'Área de comedor y reuniones de Villa Peñas',
              },
            ],
          },
          {
            id: 'pool',
            category: 'Piscina y playground',
            title: 'Diversión para todos.',
            description:
              'Piscina, áreas al aire libre y playground para que grandes y pequeños encuentren su espacio para disfrutar.',
            images: [
              {
                src: amenityImageSources.pool[0],
                alt: 'Área de piscina de Villa Peñas',
              },
              {
                src: amenityImageSources.pool[1],
                alt: 'Playground de Villa Peñas',
              },
              {
                src: amenityImageSources.pool[2],
                alt: 'Terraza y área exterior junto a la piscina de Villa Peñas',
              },
            ],
          },
          {
            id: 'bbq',
            category: 'BBQ y entretenimiento',
            title: 'Que empiece la celebración.',
            description:
              'Rancho BBQ, parrilla, karaoke, parlante y pantalla de 75 pulgadas para acompañar desde una tarde tranquila hasta una celebración con música.',
            images: [
              {
                src: amenityImageSources.bbq[0],
                alt: 'Rancho BBQ y parrilla de Villa Peñas',
              },
              {
                src: amenityImageSources.bbq[1],
                alt: 'Área de karaoke y parlante de Villa Peñas',
              },
              {
                src: amenityImageSources.bbq[2],
                alt: 'Pantalla de 75 pulgadas y área de entretenimiento de Villa Peñas',
              },
            ],
          },
        ],
      },
      packages: {
        eyebrow: 'Paquetes',
        heading: 'Tu celebración, a tu manera',
        placeholder:
          'Los paquetes dinámicos y su información del backend se integrarán en esta sección.',
        status: 'Sección en desarrollo',
      },
      instagram: {
        eyebrow: 'Instagram',
        heading: 'Momentos en Villa Peñas',
        placeholder:
          'La selección visual de Instagram se incorporará en esta sección.',
        status: 'Sección en desarrollo',
      },
      quote: {
        eyebrow: 'Cotización',
        heading: 'Cotiza tu evento',
        placeholder:
          'El cotizador informativo se desarrollará aquí sin crear reservas ni confirmar disponibilidad.',
        status: 'Sección en desarrollo',
      },
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
