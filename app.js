const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const WebWhatsappProvider = require('@bot-whatsapp/provider/web-whatsapp')
const MockAdapter = require('@bot-whatsapp/database/mock')

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */


const flowImpresion = addKeyword(['1']).addAnswer(
    [
        'Impresión BN- 400',
        'Impresión Color - 600',
        '',
        'Copia BN - 300',
        'Copia Color - 500',
        '',
        'Escaneos 800',
    ],
)

const flowRedaccion = addKeyword(['2']).addAnswer(
    [
        'Para nosotros es un placer ayudarte en tus tareas y trabajos; el valor de este servicio varía según lo que necesite.',
        '',
        'Dejanos un mensaje con la información, pronto estaremos contigo ✍️'
    ],
)

const flowCartas = addKeyword(['3']).addAnswer(
    [
        'Para nosotros es un placer ayudarte con la documentación que requieras',
        '',
        'El valor es 1500 por cada documento.',
        '',
        'Dejanos un mensaje con la información, pronto estaremos contigo ✍️'
    ],
)

const flowMusica = addKeyword(['4']).addAnswer(
    [
        'Para nosotros es un placer ayudarte a obtener las canciones y videos que quieras en tu memoria USB.',
        '',
        'Costo:',
        '15 🎵x 1000 música o audio',
        '10 🎥x 1500 vídeos',
        '',
        'Dejanos la información correspondiente, pronto estaremos contigo ✍️'
    ],
)

const flowServicios = addKeyword(['1']).addAnswer(
    [
        'En proyecmari, te podemos ayudar con los siguientes servicios de calidad y sin perjudicar tu bolsillo😀',
        '',
        '1. Impresión - Copias - Escaneos.🖨️',
        '2. Redacción de tareas - Trabajos -Diapositivas.💻',
        '3. Cartas (solicitudes, quejas, reclamos).📨',
        '4. Descarga de música o vídeo (USB).🎵',
        '',
        'No tienes tiempo? ⏰comunícate al 3146631552 para atenderte rápidamente.',
        '',
        'Elija el número del servicio que necesite'
    ],
    null,
    null,
    [flowImpresion, flowRedaccion, flowCartas, flowMusica]
)

const flowPrincipal = addKeyword(['h', 'H', 'Hola', 'hola', 'Hola Como Estas', 'buenos dias', 'buenas tardes', 'buenas noches', 'L', 'nena', '.', 'i'])
    .addAnswer('Muchas gracias por comunicarte con Proyecmari🤗')
    .addAnswer(
        [
            'Te ofrecemos los siguientes servicios: Copias, Impresión, Trabajos de investigación.',
            'Para conocer más servicios marque 1.',
        ],
        null,
        null,
        [flowServicios]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(WebWhatsappProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    QRPortalWeb()
}

main()
