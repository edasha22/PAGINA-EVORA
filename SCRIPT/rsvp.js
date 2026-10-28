const formRSVP = document.getElementById("formRSVP");
        const asistenciaRSVP = document.getElementById("asistencia");
        const acompanantesRSVP = document.getElementById("acompanantes");
        const mensajeRSVP = document.getElementById("mensajeRSVP");
        const resumenAsistencia = document.getElementById("resumen-asistencia");
        const resumenAcompanantes = document.getElementById("resumen-acompanantes");

        asistenciaRSVP.addEventListener("change", () => {
            const puedeAsistir = asistenciaRSVP.value === "Sí asistiré";
            acompanantesRSVP.disabled = !puedeAsistir;

            if (!puedeAsistir) {
                acompanantesRSVP.value = "0";
            }
        });

        formRSVP.addEventListener("submit", (event) => {
            event.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const evento = document.getElementById("evento").value.trim();
            const asistencia = asistenciaRSVP.value;
            const acompanantes = acompanantesRSVP.disabled ? 0 : Number(acompanantesRSVP.value);
            resumenAsistencia.textContent = asistencia;
            resumenAcompanantes.textContent = asistencia === "Sí asistiré"
                ? `${acompanantes} ${acompanantes === 1 ? "acompañante" : "acompañantes"}`
                : "No aplica";
            const respuesta = asistencia === "Sí asistiré"
                ? `Gracias, ${nombre}. Tu respuesta para ${evento} es: ${asistencia}. Acompañantes: ${acompanantes}. La asignación de mesa está por confirmar.`
                : `Gracias por avisarnos, ${nombre}. Anotamos en esta pantalla que no podrás asistir a ${evento}.`;

            mensajeRSVP.textContent = `${respuesta}\n\nEsta demostración no envía ni guarda la respuesta en un sistema; contacta a los anfitriones para confirmar el registro.`;
            mensajeRSVP.hidden = false;
            mensajeRSVP.focus();
        });
