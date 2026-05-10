async function fetchEmergencyStatus() {
    const container = document.getElementById('emergency-container');
    if (!container) return;

    try {
        const response = await fetch(`${BASE_URL}/emergency`);
        const json = await response.json();
        
        if (json.success && json.data) {
            const data = json.data;
            const formattedDate = new Date(data.updated_at).toLocaleString();
            
            // Populate form if it exists
            const icuSelect = document.getElementById('icu-status');
            const traumaSelect = document.getElementById('trauma-status');
            if (icuSelect) icuSelect.value = data.icu_status;
            if (traumaSelect) traumaSelect.value = data.trauma_status;

            container.innerHTML = `
                <div class="bg-white p-4 rounded-lg shadow-sm border border-red-100 flex items-center justify-between hover:shadow-md transition">
                    <div class="flex items-center">
                        <div class="w-2 h-10 bg-red-500 rounded-full mr-4"></div>
                        <div>
                            <p class="text-sm text-slate-500 font-medium">ICU Status</p>
                            <p class="text-xl font-bold text-slate-800">${data.icu_status}</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm border border-red-100 flex items-center justify-between hover:shadow-md transition">
                    <div class="flex items-center">
                        <div class="w-2 h-10 bg-orange-500 rounded-full mr-4"></div>
                        <div>
                            <p class="text-sm text-slate-500 font-medium">Trauma Center</p>
                            <p class="text-xl font-bold text-slate-800">${data.trauma_status}</p>
                        </div>
                    </div>
                </div>
                <div class="col-span-1 md:col-span-2 text-xs text-red-500 text-right mt-2 font-medium">
                    Last Updated: ${formattedDate}
                </div>
            `;
        } else {
            container.innerHTML = '<div class="text-slate-500">No emergency data found.</div>';
        }
    } catch (error) {
        console.error('Error fetching emergency status:', error);
        container.innerHTML = '<div class="text-red-500">Failed to load emergency data.</div>';
    }
}

// Form submission logic
const emergencyForm = document.getElementById('emergency-form');
if (emergencyForm) {
    emergencyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const icu_status = document.getElementById('icu-status').value;
        const trauma_status = document.getElementById('trauma-status').value;

        try {
            const response = await fetch(`${BASE_URL}/emergency/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ icu_status, trauma_status })
            });
            const result = await response.json();
            
            if (result.success) {
                alert(result.message);
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error updating emergency status:', error);
            alert('Failed to update emergency status.');
        }
    });
}
