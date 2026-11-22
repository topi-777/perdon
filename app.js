// 1. Configuración de Supabase
const SUPABASE_URL = 'https://wdrxxlvvzckqzcasvgzi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_FaKA8fB1CPD7PDRVjfJp8w_idjPZJqI';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Referencias al DOM
const sobreWrapper = document.getElementById('sobre-wrapper');
const cartaContenido = document.getElementById('carta-contenido');
const btnAbrir = document.getElementById('btn-abrir');

const btnPerdonar = document.getElementById('btn-perdonar');
const btnTiempo = document.getElementById('btn-tiempo');
const inputMensaje = document.getElementById('mensaje-extra');
const estadoEnvio = document.getElementById('estado-envio');

// 3. Animación para abrir la carta
btnAbrir.addEventListener('click', () => {
    sobreWrapper.classList.add('oculto');
    cartaContenido.classList.remove('oculto');
});

// 4. Función para guardar la respuesta en Supabase
async function enviarRespuesta(decision) {
    // Deshabilitar botones para evitar envíos duplicados
    btnPerdonar.disabled = true;
    btnTiempo.disabled = true;
    estadoEnvio.style.color = '#555';
    estadoEnvio.textContent = 'Enviando tu respuesta...';

    const mensajeTexto = inputMensaje.value.trim();

    const { error } = await supabaseClient
        .from('respuestas_perdon')
        .insert([
            {
                estado: decision,
                mensaje_respuesta: mensajeTexto || null
            }
        ]);

    if (error) {
        console.error('Error al guardar en Supabase:', error);
        estadoEnvio.style.color = '#c0392b';
        estadoEnvio.textContent = 'Hubo un problema al enviar. Intenta de nuevo.';
        btnPerdonar.disabled = false;
        btnTiempo.disabled = false;
    } else {
        estadoEnvio.style.color = '#27ae60';
        estadoEnvio.textContent = 'Gracias por responder. Tu mensaje ya fue guardado ❤️';
        inputMensaje.disabled = true;
    }
}

// 5. Eventos de los botones
btnPerdonar.addEventListener('click', () => enviarRespuesta('Te perdono'));
btnTiempo.addEventListener('click', () => enviarRespuesta('Necesito hablarlo / tiempo'));