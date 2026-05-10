document.addEventListener('DOMContentLoaded', () => {
    // Clock setup
    function updateClock() {
        const now = new Date();
        document.getElementById('clock').textContent = now.toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Data fetching setup
    async function loadReceptionData() {
        if (typeof fetchDoctorsReception === 'function') await fetchDoctorsReception();
        if (typeof fetchBloodStockReception === 'function') await fetchBloodStockReception();
        if (typeof fetchEmergencyStatusReception === 'function') await fetchEmergencyStatusReception();
    }

    // Initial load
    loadReceptionData();

    // Socket listeners for real-time updates are handled in socketClient.js
    if (window.socket) {
        window.socket.on("doctorsUpdated", () => {
            if (typeof fetchDoctorsReception === 'function') fetchDoctorsReception();
        });
        window.socket.on("bloodUpdated", () => {
            if (typeof fetchBloodStockReception === 'function') fetchBloodStockReception();
        });
        window.socket.on("emergencyUpdated", () => {
            if (typeof fetchEmergencyStatusReception === 'function') fetchEmergencyStatusReception();
        });
    }
});

// Custom renderers for reception display to fit dark theme
async function fetchDoctorsReception() {
    const container = document.getElementById('doctors-container');
    if (!container) return;

    try {
        const response = await fetch(`${BASE_URL}/doctors`);
        const json = await response.json();
        
        if (json.success && json.data.length > 0) {
            container.innerHTML = '';
            json.data.forEach(doctor => {
                const isAvailable = doctor.status.toLowerCase() === 'available';
                const statusColor = isAvailable ? 'text-green-400 bg-green-900/30 border-green-500/50' : 'text-yellow-400 bg-yellow-900/30 border-yellow-500/50';
                
                container.innerHTML += `
                    <div class="bg-slate-700/50 border border-slate-600 p-5 rounded-xl flex justify-between items-center">
                        <div>
                            <h3 class="text-2xl font-bold text-white">${doctor.name}</h3>
                            <p class="text-lg text-slate-400">${doctor.department}</p>
                        </div>
                        <div class="text-right flex items-center space-x-6">
                            <div class="text-center">
                                <p class="text-sm text-slate-400 uppercase tracking-wide">Queue</p>
                                <p class="text-3xl font-bold text-white">${doctor.queue_count}</p>
                            </div>
                            <div class="px-4 py-2 border rounded-lg ${statusColor}">
                                <span class="font-bold text-lg">${doctor.status}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
    } catch (error) {
        console.error(error);
    }
}

async function fetchBloodStockReception() {
    const container = document.getElementById('blood-container');
    if (!container) return;

    try {
        const response = await fetch(`${BASE_URL}/blood`);
        const json = await response.json();
        
        if (json.success && json.data.length > 0) {
            container.innerHTML = '';
            json.data.forEach(blood => {
                const isLow = blood.status === 'Low' || blood.status === 'Critical';
                const colorClass = isLow ? 'bg-red-900/40 border-red-500/50 text-red-300' : 'bg-slate-700/50 border-slate-600 text-white';
                
                container.innerHTML += `
                    <div class="border p-4 rounded-xl flex flex-col items-center justify-center text-center ${colorClass}">
                        <h4 class="text-3xl font-bold mb-2">${blood.blood_group}</h4>
                        <p class="text-2xl font-mono">${blood.units} <span class="text-sm font-sans text-slate-400">units</span></p>
                    </div>
                `;
            });
        }
    } catch (error) {
        console.error(error);
    }
}

async function fetchEmergencyStatusReception() {
    const container = document.getElementById('emergency-container');
    if (!container) return;

    try {
        const response = await fetch(`${BASE_URL}/emergency`);
        const json = await response.json();
        
        if (json.success && json.data) {
            container.innerHTML = `
                <p class="text-xl text-white font-medium bg-black/30 px-4 py-2 rounded-lg">ICU: <span class="text-red-300 ml-2 font-bold">${json.data.icu_status}</span></p>
                <p class="text-xl text-white font-medium bg-black/30 px-4 py-2 rounded-lg">Trauma: <span class="text-red-300 ml-2 font-bold">${json.data.trauma_status}</span></p>
            `;
        }
    } catch (error) {
        console.error(error);
    }
}
