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
        heading: 'Elige cómo quieres disfrutar Villa Peñas.',
        description:
          'Cada paquete reúne una forma distinta de vivir tu evento. Explora qué incluye cada uno y encuentra el que mejor se adapta a tu celebración.',
        priceLabel: 'Precio',
        includedServices: 'Incluye',
        showAllServices: 'Ver todo lo que incluye',
        showLessServices: 'Ver menos',
        selectPackage: 'Seleccionar paquete',
        loading: 'Cargando paquetes',
        empty: 'Nuestros paquetes estarán disponibles próximamente.',
        error: 'No pudimos cargar los paquetes en este momento.',
        retry: 'Intentar de nuevo',
        packageImageAlt: (packageName) =>
          `Vista provisional del paquete ${packageName}`,
        formatPrice: (priceColones) =>
          new Intl.NumberFormat('es-CR', {
            currency: 'CRC',
            currencyDisplay: 'narrowSymbol',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
            style: 'currency',
          }).format(priceColones),
      },
      instagram: {
        eyebrow: 'Momentos',
        heading: 'Villa Peñas, como se vive.',
        description:
          'Un vistazo a celebraciones, detalles y momentos compartidos en Villa Peñas.',
        viewOnInstagram: 'Ver en Instagram',
        openPost: (caption) =>
          `Abrir ${caption} en Instagram en una pestaña nueva`,
        profileCta: 'Seguir en Instagram',
        profileCtaNewTab:
          'Abrir el perfil de Instagram de Villa Peñas en una pestaña nueva',
        items: {
          'outdoor-celebration': {
            alt: 'Imagen temporal para una celebración al aire libre en Villa Peñas',
            caption: 'Celebraciones al aire libre',
          },
          'shared-table': {
            alt: 'Imagen temporal para una mesa compartida en Villa Peñas',
            caption: 'Momentos para compartir',
          },
          'celebration-detail': {
            alt: 'Imagen temporal para un detalle de celebración en Villa Peñas',
            caption: 'Pequeños detalles',
          },
          'afternoon-gathering': {
            alt: 'Imagen temporal para una reunión de tarde en Villa Peñas',
            caption: 'Tardes que se quedan',
          },
          'special-moment': {
            alt: 'Imagen temporal para un momento especial en Villa Peñas',
            caption: 'Cada momento cuenta',
          },
          'villa-details': {
            alt: 'Imagen temporal para detalles de Villa Peñas',
            caption: 'Detalles de Villa Peñas',
          },
        },
      },
      quote: {
        eyebrow: 'Cotización',
        heading: 'Cotiza tu evento.',
        description:
          'Arma una cotización estimada para tu evento. La disponibilidad y los detalles finales se confirman directamente con Villa Peñas.',
        eventLegend: '1. Fecha y horario',
        eventDateLabel: 'Fecha del evento',
        guestCountLabel: 'Cantidad de personas',
        decreaseGuestCount: 'Reducir cantidad de personas',
        increaseGuestCount: 'Aumentar cantidad de personas',
        formatGuestCount: (guestCount) =>
          `${guestCount} ${guestCount === 1 ? 'persona' : 'personas'}`,
        guestCountUnit: (guestCount) =>
          guestCount === 1 ? 'persona' : 'personas',
        guestCountRequiresCapacityExtra:
          'Para eventos de más de 30 personas debes agregar el adicional de personas.',
        guestCountMaximumReached: (maximumGuests) =>
          `Para eventos de más de ${maximumGuests} personas, consulta directamente con Villa Peñas.`,
        addCapacityExtra: 'Agregar adicional',
        startTimeLabel: 'Hora de entrada',
        endTimeLabel: 'Hora de salida',
        endTimePlaceholder: 'Selecciona la hora de entrada',
        includedDuration: (durationHours) => `Incluye ${durationHours} horas`,
        eventDetailsRequired:
          'Completa la fecha, la cantidad de personas y el horario de tu evento para continuar.',
        pastDateValidation: 'Elige una fecha de hoy en adelante.',
        packageLegend: '2. Elige un paquete',
        packagePriceLabel: 'Precio del paquete',
        packagesLoading: 'Cargando paquetes',
        packagesEmpty: 'Los paquetes estarán disponibles próximamente.',
        packagesError: 'No pudimos cargar los paquetes en este momento.',
        retry: 'Intentar de nuevo',
        extrasLegend: '3. Agrega extras opcionales',
        extrasLoading: 'Cargando adicionales',
        extrasUnavailable:
          'Los adicionales no están disponibles en este momento. Aún puedes consultar por un paquete.',
        chooseOption: (productName) => `Elige una opción para ${productName}`,
        optionRequired: (productName) => `Elige una opción para ${productName}.`,
        pendingOption: 'Falta elegir una opción',
        selectedOptionSummary: (optionName, price) => `${optionName} · ${price}`,
        viewDetails: 'Ver detalles',
        hideDetails: 'Ocultar detalles',
        formatPeopleQuantity: (quantity) => `${quantity} personas`,
        formatIncludedQuantity: (quantity, unitOfMeasure) =>
          unitOfMeasure ? `${quantity} ${unitOfMeasure}` : `Incluye ${quantity}`,
        toggleProductDetails: (productName, isExpanded) =>
          `${isExpanded ? 'Ocultar' : 'Ver'} detalles de ${productName}`,
        toggleOptionDetails: (optionName, isExpanded) =>
          `${isExpanded ? 'Ocultar' : 'Ver'} detalles de ${optionName}`,
        toggleOptions: (productName, isExpanded) =>
          `${isExpanded ? 'Ocultar' : 'Mostrar'} opciones de ${productName}`,
        selectPackageFirst: 'Elige un paquete para agregar adicionales.',
        summaryEyebrow: 'Resumen',
        summaryEmpty:
          'Elige un paquete para ver el total estimado de tu evento.',
        summaryEventLabel: 'Fecha y horario',
        summaryEventStartTimeLabel: 'Entrada',
        summaryEventEndTimeLabel: 'Salida',
        summaryEventDurationLabel: 'Duración',
        summaryGuestCountLabel: 'Personas',
        summaryPackageLabel: 'Paquete',
        summaryExtrasLabel: 'Adicionales',
        summarySubtotalLabel: 'Subtotal',
        estimatedTotalLabel: 'Total estimado',
        estimateDisclaimer:
          'Precio estimado. Sujeto a disponibilidad y confirmación.',
        completeExtrasBeforeSending:
          'Completa las opciones de tus adicionales para continuar.',
        selectPackageBeforeSending:
          'Elige un paquete antes de consultar por WhatsApp.',
        whatsappCta: 'Consultar por WhatsApp',
        formatDuration: (durationHours) => `${durationHours} horas`,
        formatEndDayOffset: (dayOffset) =>
          dayOffset === 1 ? 'día siguiente' : `${dayOffset} días después`,
        formatPrice: (priceColones) =>
          new Intl.NumberFormat('es-CR', {
            currency: 'CRC',
            currencyDisplay: 'narrowSymbol',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
            style: 'currency',
          }).format(priceColones),
        whatsappMessage: {
          durationLabel: 'Duración',
          eventDateLabel: 'Fecha',
          formatDuration: (durationHours) => `${durationHours} horas`,
          formatEndDayOffset: (dayOffset) =>
            dayOffset === 1 ? 'día siguiente' : `${dayOffset} días después`,
          greeting: 'Hola, quisiera consultar disponibilidad para Villa Peñas.',
          guestCountLabel: 'Personas',
          packageLabel: 'Paquete',
          scheduleLabel: 'Horario',
          extrasLabel: 'Adicionales:',
          estimatedTotalLabel: 'Total estimado',
        },
      },
    },
    policies: {
      heroEyebrow: 'Políticas',
      heading: 'Políticas de reserva\ny reembolso.',
      description:
        'Queremos que cada reserva sea clara desde el inicio. Aquí encontrarás las condiciones aplicables a la reserva, cancelación y reprogramación de tu evento en Villa Peñas.',
      policies: [
        {
          title: 'Reserva',
          paragraphs: [],
          highlightedParagraph: {
            before: 'La fecha se confirma únicamente con un adelanto de ',
            emphasis: '₡20.000',
            after: '.',
          },
        },
        {
          title: 'Cancelaciones',
          paragraphs: [
            'Si la cancelación se realiza con 7 días o más de anticipación, se reembolsa el 100% del adelanto.',
            'Si la cancelación se realiza con menos de 7 días de anticipación, el adelanto no es reembolsable.',
          ],
        },
        {
          title: 'Cambio de fecha',
          paragraphs: [
            'Se permite un único cambio de fecha, siempre sujeto a disponibilidad y notificando con al menos 7 días de anticipación.',
          ],
        },
        {
          title: 'Inasistencia',
          paragraphs: [
            'Si el cliente no se presenta el día de la reserva, esta se dará por cancelada automáticamente y no habrá devolución del adelanto.',
          ],
        },
        {
          title: 'Pago restante',
          paragraphs: ['El monto pendiente deberá cancelarse un día antes del evento.'],
        },
        {
          title: 'Daños a las instalaciones',
          paragraphs: [
            'El cliente será responsable por cualquier daño ocasionado a las instalaciones, mobiliario o equipos durante el evento y deberá asumir el costo de su reparación o reposición.',
          ],
        },
        {
          title: 'Situaciones de fuerza mayor',
          paragraphs: [
            'En caso de que Villa Peñas deba cancelar la reservación por una situación imprevista o de fuerza mayor, el cliente podrá elegir entre el reembolso completo del adelanto o reprogramar la fecha sin costo adicional.',
          ],
        },
      ],
      acknowledgementHeading: 'Una reserva clara desde el inicio.',
      acknowledgementDescription:
        'Al confirmar una reserva en Villa Peñas, el cliente reconoce las políticas de reserva y reembolso indicadas en esta página.',
      contactHeading: '¿Tienes alguna duda?',
      contactDescription: 'Estamos para ayudarte antes de confirmar tu reserva.',
      contactCta: 'Consultar por WhatsApp',
      contactWhatsAppMessage:
        'Hola, tengo una consulta sobre las políticas de reserva de Villa Peñas.',
      contactWhatsAppNewTab:
        'Abrir conversación de WhatsApp sobre las políticas de Villa Peñas en una pestaña nueva',
    },
    contact: {
      heroEyebrow: 'Contacto',
      heading: 'Hablemos de tu próximo evento.',
      description:
        '¿Tienes una fecha en mente o quieres conocer más sobre Villa Peñas? Escríbenos y con gusto te ayudamos a planear tu evento.',
      contactInformationEyebrow: 'Información de contacto',
      whatsappLabel: 'WhatsApp / Teléfono',
      whatsappCta: 'Escribir por WhatsApp',
      whatsappNewTab: 'Abrir conversación de WhatsApp con Villa Peñas en una pestaña nueva',
      whatsappMessage: 'Hola, quisiera solicitar información sobre Villa Peñas.',
      locationEyebrow: 'Ubicación',
      locationHeading: 'Cerca de tu próxima celebración.',
      locationDescription:
        'Villa Peñas está en Chirco, Santa Cruz, Guanacaste, en un entorno pensado para compartir y celebrar.',
      address: 'Chirco, Santa Cruz,\nGuanacaste, Costa Rica',
      openMaps: 'Abrir en Google Maps',
      openMapsNewTab:
        'Abrir la ubicación de Villa Peñas en Google Maps en una pestaña nueva',
      quoteEyebrow: 'Cotización',
      quoteHeading: '¿Ya tienes una idea para tu evento?',
      quoteDescription:
        'Arma una cotización estimada con nuestros paquetes y adicionales.',
      quoteCta: 'Cotizar mi evento',
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
      title: 'Políticas de reserva y reembolso | Villa Peñas',
      description:
        'Consulta las políticas de reserva, cancelación, reprogramación y reembolso de Villa Peñas.',
      openGraph: {
        title: 'Políticas de reserva y reembolso | Villa Peñas',
        description: 'Consulta las políticas de reserva y reembolso de Villa Peñas.',
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
