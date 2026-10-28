document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.guest-tab');
    const panels = document.querySelectorAll('[data-panel-content]');
    const totalGuests = 120;
    const confirmedGuests = 86;
    let arrivedGuests = 0;
    let arrivals = [];

    function openPanel(panelId) {
        tabs.forEach((tab) => {
            const active = tab.dataset.panel === panelId;
            tab.classList.toggle('active', active);
            tab.setAttribute('aria-selected', String(active));
        });
        panels.forEach((panel) => panel.classList.toggle('active', panel.id === panelId));
    }

    tabs.forEach((tab) => tab.addEventListener('click', () => openPanel(tab.dataset.panel)));
    document.querySelectorAll('[data-open-panel]').forEach((button) => {
        button.addEventListener('click', () => openPanel(button.dataset.openPanel));
    });

    function updateDashboard() {
        const pendingGuests = totalGuests - confirmedGuests;
        const confirmedPercent = Math.round((confirmedGuests / totalGuests) * 100);
        const arrivedPercent = Math.round((arrivedGuests / totalGuests) * 100);
        const pendingPercent = 100 - confirmedPercent;

        document.getElementById('arrivedGuests').textContent = arrivedGuests;
        document.getElementById('pendingGuests').textContent = pendingGuests;
        document.getElementById('confirmedPercent').textContent = confirmedPercent + '%';
        document.getElementById('arrivedPercent').textContent = arrivedPercent + '%';
        document.getElementById('pendingPercent').textContent = pendingPercent + '%';
        document.getElementById('attendanceConfirmed').style.width = confirmedPercent + '%';
        document.getElementById('attendanceArrived').style.width = arrivedPercent + '%';
        document.getElementById('confirmedBarValue').textContent = confirmedGuests;
        document.getElementById('arrivedBarValue').textContent = arrivedGuests;
        document.getElementById('pendingBarValue').textContent = pendingGuests;
        document.getElementById('confirmedProgress').style.width = confirmedPercent + '%';
        document.getElementById('arrivedProgress').style.width = arrivedPercent + '%';
        document.getElementById('pendingProgress').style.width = pendingPercent + '%';
        document.getElementById('confirmationDonut').style.background = `conic-gradient(#D4B483 0 ${confirmedPercent}%, #EEF0F3 ${confirmedPercent}% 100%)`;
        document.getElementById('confirmationRate').textContent = confirmedPercent + '%';
    }

    const checkinForm = document.getElementById('checkinForm');
    checkinForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nameInput = document.getElementById('guestName');
        const countSelect = document.getElementById('guestCount');
        const name = nameInput.value.trim();
        if (!name) return;

        const count = Number(countSelect.value);
        arrivals.push({ name, count, time: new Date() });
        arrivedGuests += count;

        const list = document.getElementById('checkinList');
        list.querySelector('.empty-list')?.remove();
        const item = document.createElement('li');
        const now = arrivals[arrivals.length - 1].time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        item.innerHTML = `<strong>${escapeHtml(name)} · ${count} ${count === 1 ? 'persona' : 'personas'}</strong><span>${now}</span>`;
        list.prepend(item);

        document.getElementById('listCount').textContent = arrivals.length;
        const message = document.getElementById('checkinMessage');
        message.textContent = `Ingreso registrado correctamente: ${name}`;
        nameInput.value = '';
        countSelect.value = '1';
        updateDashboard();
        addActivity(name, count);
    });

    function addActivity(name, count) {
        const activityList = document.getElementById('activityList');
        const item = document.createElement('li');
        item.innerHTML = `<span class="activity-icon"><i class="bi bi-person-check"></i></span><div><strong>${escapeHtml(name)} realizó check-in</strong><small>${count} ${count === 1 ? 'persona' : 'personas'} · recién ahora</small></div>`;
        activityList.prepend(item);
        while (activityList.children.length > 4) activityList.lastElementChild.remove();
    }

    function escapeHtml(value) {
        const element = document.createElement('span');
        element.textContent = value;
        return element.innerHTML;
    }

    document.getElementById('printReport').addEventListener('click', () => window.print());

    document.querySelectorAll('[data-download]').forEach((button) => {
        button.addEventListener('click', () => downloadReport(button.dataset.download));
    });

    function downloadReport(type) {
        let rows = [];
        let name = '';
        if (type === 'invitados') {
            name = 'lista-invitados.csv';
            rows = [['Invitados totales', totalGuests], ['Confirmados', confirmedGuests], ['Pendientes', totalGuests - confirmedGuests], ['Ingresaron', arrivedGuests]];
        } else if (type === 'asistencia') {
            name = 'registro-asistencia.csv';
            rows = [['Invitado', 'Personas', 'Hora'], ...arrivals.map((arrival) => [arrival.name, arrival.count, arrival.time.toLocaleTimeString()])];
        } else {
            name = 'resumen-evento.csv';
            rows = [['Concepto', 'Cantidad', 'Porcentaje'], ['Invitados', totalGuests, '100%'], ['Confirmados', confirmedGuests, Math.round(confirmedGuests / totalGuests * 100) + '%'], ['Ingresaron', arrivedGuests, Math.round(arrivedGuests / totalGuests * 100) + '%']];
        }
        const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        link.click();
        URL.revokeObjectURL(url);
    }

    updateDashboard();
});