async function fetchBloodStock() {
    const container = document.getElementById('blood-container');
    if (!container) return;

    try {
        const response = await fetch(`${BASE_URL}/blood`);
        const json = await response.json();
        
        if (json.success && json.data.length > 0) {
            container.innerHTML = '';
            json.data.forEach(blood => {
                const isLow = blood.status === 'Low' || blood.status === 'Critical';
                const statusClass = isLow ? 'text-red-600 font-semibold' : 'text-green-600';
                const bgClass = isLow ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200';
                const safeGroup = blood.blood_group.replace(/'/g, "&#39;");
                
                const card = `
                    <div class="border ${bgClass} p-4 rounded-lg flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-xl shadow-inner">
                                ${blood.blood_group}
                            </div>
                            <div>
                                <p class="text-sm text-slate-500">Units Available</p>
                                <p class="text-xl font-bold text-slate-800">${blood.units}</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-3">
                            <div class="text-sm px-3 py-1 rounded-full bg-white border border-slate-100 ${statusClass}">${blood.status}</div>
                            <button onclick="editBloodStock(${blood.id}, '${safeGroup}', '${blood.status}', ${blood.units})" class="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 py-1 px-2 rounded">Edit</button>
                        </div>
                    </div>
                `;
                container.innerHTML += card;
            });
        } else {
            container.innerHTML = '<div class="text-slate-500">No blood stock found.</div>';
        }
    } catch (error) {
        console.error('Error fetching blood stock:', error);
        container.innerHTML = '<div class="text-red-500">Failed to load blood stock data.</div>';
    }
}

// Global function to edit blood stock
window.editBloodStock = (id, group, status, units) => {
    document.getElementById('blood-id').value = id;
    document.getElementById('blood-group').value = group;
    document.getElementById('blood-status').value = status;
    document.getElementById('blood-units').value = units;
};

// Form submission logic
const bloodForm = document.getElementById('blood-form');
if (bloodForm) {
    bloodForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const id = document.getElementById('blood-id').value;
        const blood_group = document.getElementById('blood-group').value;
        const status = document.getElementById('blood-status').value;
        const units = parseInt(document.getElementById('blood-units').value, 10);

        const payload = { blood_group, status, units };
        const method = id ? 'PUT' : 'POST';
        const endpoint = id ? `/blood/update/${id}` : '/blood/add';

        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            
            if (result.success) {
                alert(result.message);
                bloodForm.reset();
                document.getElementById('blood-id').value = '';
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error saving blood stock:', error);
            alert('Failed to save blood stock.');
        }
    });
}
