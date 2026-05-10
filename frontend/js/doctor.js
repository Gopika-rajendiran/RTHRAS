const BASE_URL = 'http://localhost:5000/api';

async function fetchDoctors() {
    const container = document.getElementById('doctors-container');
    if (!container) return;

    try {
        const response = await fetch(`${BASE_URL}/doctors`);
        const json = await response.json();
        
        if (json.success && json.data.length > 0) {
            container.innerHTML = '';
            json.data.forEach(doctor => {
                const statusColor = getStatusColor(doctor.status);
                // Make name and department safe for quotes
                const safeName = doctor.name.replace(/'/g, "&#39;");
                const safeDept = doctor.department.replace(/'/g, "&#39;");
                
                const card = `
                    <div class="border border-slate-200 p-4 rounded-lg flex flex-col bg-slate-50 hover:shadow-md transition">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <h4 class="font-bold text-slate-800 text-lg">${doctor.name}</h4>
                                <p class="text-sm text-slate-500">${doctor.department}</p>
                            </div>
                            <span class="px-2 py-1 text-xs font-semibold rounded-full ${statusColor.bg} ${statusColor.text}">${doctor.status}</span>
                        </div>
                        <div class="mt-auto pt-3 border-t border-slate-200 flex justify-between items-center">
                            <span class="text-sm font-medium text-slate-600">Queue:</span>
                            <span class="text-lg font-bold text-slate-800 mr-auto ml-2">${doctor.queue_count}</span>
                            <button onclick="editDoctor(${doctor.id}, '${safeName}', '${safeDept}', '${doctor.status}', ${doctor.queue_count})" class="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 py-1 px-2 rounded">Edit</button>
                        </div>
                    </div>
                `;
                container.innerHTML += card;
            });
        } else {
            container.innerHTML = '<div class="text-slate-500">No doctors found.</div>';
        }
    } catch (error) {
        console.error('Error fetching doctors:', error);
        container.innerHTML = '<div class="text-red-500">Failed to load doctor data.</div>';
    }
}

function getStatusColor(status) {
    switch (status.toLowerCase()) {
        case 'available':
            return { bg: 'bg-green-100', text: 'text-green-700' };
        case 'busy':
            return { bg: 'bg-yellow-100', text: 'text-yellow-700' };
        case 'emergency':
            return { bg: 'bg-red-100', text: 'text-red-700' };
        case 'offline':
        default:
            return { bg: 'bg-slate-200', text: 'text-slate-700' };
    }
}

// Global function to edit doctor
window.editDoctor = (id, name, department, status, queue) => {
    document.getElementById('doctor-id').value = id;
    document.getElementById('doctor-name').value = name;
    document.getElementById('doctor-dept').value = department;
    document.getElementById('doctor-status').value = status;
    document.getElementById('doctor-queue').value = queue;
};

// Form submission logic
const doctorForm = document.getElementById('doctor-form');
if (doctorForm) {
    doctorForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const id = document.getElementById('doctor-id').value;
        const name = document.getElementById('doctor-name').value;
        const department = document.getElementById('doctor-dept').value;
        const status = document.getElementById('doctor-status').value;
        const queue_count = parseInt(document.getElementById('doctor-queue').value, 10);

        const payload = { name, department, status, queue_count };
        const method = id ? 'PUT' : 'POST';
        const endpoint = id ? `/doctors/update/${id}` : '/doctors/add';

        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            
            if (result.success) {
                alert(result.message);
                doctorForm.reset();
                document.getElementById('doctor-id').value = '';
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error saving doctor:', error);
            alert('Failed to save doctor.');
        }
    });
}
