import type { EvidenceExample, Opening } from './types'

export const opening: Opening = {
  id: 'PP-OPS-014-SIM',
  title: 'Auxiliar de operaciones',
  location: 'Ciudad de México · híbrido',
  schedule: 'Tiempo completo · horario publicado',
  openings: 2,
  commitment: {
    id: 'COMP-PP-014-SIM',
    issuedBy: 'Empresa Horizonte (inventada)',
    acceptedOn: '2026-10-08',
    replaces: '1 año de experiencia formal previa',
    language: 'Evaluaremos la evidencia declarada bajo los mismos cuatro criterios y no descartaremos a una persona por carecer de experiencia formal previa.',
    simulated: true,
  },
  criteria: [
    { id: 'cliente', label: 'Atención al cliente', description: 'Resuelve dudas o cambios y da seguimiento claro.', requiredTags: ['cliente', 'seguimiento'] },
    { id: 'organizacion', label: 'Organización de tareas', description: 'Prioriza, registra y cumple entregas.', requiredTags: ['organizacion', 'entregas'] },
    { id: 'mejora', label: 'Iniciativa y mejora', description: 'Propone y comprueba una mejora concreta.', requiredTags: ['mejora', 'resultado'] },
    { id: 'herramientas', label: 'Herramientas digitales', description: 'Usa una herramienta para registrar o coordinar trabajo.', requiredTags: ['digital', 'registro'] },
  ],
}

export const evidenceExamples: EvidenceExample[] = [
  {
    exampleId: 'ev-daniela-01',
    label: 'Pedidos de repostería',
    shortDescription: 'Daniela coordinó pedidos, cambios y entregas desde casa.',
    workerAlias: 'Daniela R. (inventada)',
    context: 'Venta familiar de postres por encargo',
    task: 'Coordinar pedidos semanales recibidos por mensajes y confirmar horarios de entrega.',
    action: 'Organicé un registro por fecha, confirmé cada cambio con el cliente y agrupé entregas por zona.',
    result: 'Reduje pedidos duplicados y el equipo pudo preparar las entregas en el orden acordado.',
    evidenceType: 'Registro de pedidos inventado + capturas simuladas',
    tags: ['cliente', 'seguimiento', 'organizacion', 'entregas', 'digital', 'registro', 'mejora', 'resultado'],
  },
  {
    exampleId: 'ev-luis-02',
    label: 'Inventario de taller',
    shortDescription: 'Luis ordenó materiales y avisos de reposición en un taller familiar.',
    workerAlias: 'Luis M. (inventado)',
    context: 'Taller familiar de reparación de bicicletas',
    task: 'Registrar piezas disponibles y detectar cuáles debían reponerse antes del fin de semana.',
    action: 'Conté existencias, actualicé una hoja de cálculo y marqué piezas por debajo del mínimo.',
    result: 'El registro permitió preparar una compra de reposición con las cantidades faltantes.',
    evidenceType: 'Hoja de cálculo inventada + testimonio simulado',
    tags: ['organizacion', 'digital', 'registro', 'mejora', 'resultado'],
  },
  {
    exampleId: 'ev-marisol-03',
    label: 'Colecta vecinal',
    shortDescription: 'Marisol coordinó confirmaciones y rutas para una entrega comunitaria.',
    workerAlias: 'Marisol G. (inventada)',
    context: 'Colecta vecinal de útiles escolares',
    task: 'Confirmar solicitudes y ordenar paquetes para su entrega en dos colonias.',
    action: 'Llamé a cada familia, corregí cantidades y preparé una lista por ruta.',
    result: 'Los paquetes quedaron separados por destino antes de la jornada de entrega.',
    evidenceType: 'Lista inventada + fotografías simuladas',
    tags: ['cliente', 'seguimiento', 'organizacion', 'entregas'],
  },
]
