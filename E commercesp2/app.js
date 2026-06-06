// Mock Enterprise Inventory Dataset
let inventoryData = [
    { id: 101, name: "Industrial Steel Valve Connectors", sku: "SKU-VALV-009", stock: 1420, price: 42.50 },
    { id: 102, name: "Optic Fiber Transceiver Hub", sku: "SKU-OPTI-883", stock: 24, price: 189.99 },
    { id: 103, name: "Heavy Duty Hydraulic Pump System", sku: "SKU-HYDR-411", stock: 0, price: 1250.00 },
    { id: 104, name: "Thermal Isolation Terminal Board", sku: "SKU-THER-722", stock: 610, price: 15.75 },
    { id: 105, name: "Pneumatic Pressure Sensor Module", sku: "SKU-PNEU-105", stock: 8, price: 95.00 }
];

// Tracks IDs of currently selected row targets
let selectedItems = new Set();
let inventoryChartInstance = null;

// Document Nodes Registry
const tableBody = document.getElementById('inventory-table-body');
const searchInput = document.getElementById('table-search');
const statusFilter = document.getElementById('status-filter');
const masterCheckbox = document.getElementById('master-checkbox');
const bulkBar = document.getElementById('bulk-actions-bar');
const bulkCountLabel = document.getElementById('bulk-select-count');

// Computes Stock Levels based on B2B operational business definitions
function calculateStockStatus(quantity) {
    if (quantity === 0) return { label: 'Out of Stock', class: 'badge-danger' };
    if (quantity < 50) return { label: 'Low Stock', class: 'badge-warning' };
    return { label: 'In Stock', class: 'badge-success' };
}

// Master Dashboard Data Calculation Pipeline
function renderDashboardMetrics() {
    let totalUnits = 0;
    let crossValuation = 0;

    inventoryData.forEach(item => {
        totalUnits += item.stock;
        crossValuation += (item.stock * item.price);
    });

    document.getElementById('stat-total-stock').innerText = `${totalUnits.toLocaleString()} units`;
    document.getElementById('stat-total-value').innerText = `$${crossValuation.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

// Renders the tabular rows based on text searches and category filter conditions
function renderTableGrid() {
    const searchTerms = searchInput.value.toLowerCase().trim();
    const activeFilter = statusFilter.value;

    tableBody.innerHTML = '';

    const processedRows = inventoryData.filter(item => {
        const statusMeta = calculateStockStatus(item.stock);
        
        const matchesSearch = item.name.toLowerCase().includes(searchTerms) || item.sku.toLowerCase().includes(searchTerms);
        const matchesFilter = activeFilter === 'ALL' || statusMeta.label === activeFilter;

        return matchesSearch && matchesFilter;
    });

    if (processedRows.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--slate-400); padding:2rem;">No matching catalog items found matching parameters.</td></tr>`;
        return;
    }

    processedRows.forEach(item => {
        const status = calculateStockStatus(item.stock);
        const isChecked = selectedItems.has(item.id) ? 'checked' : '';
        const totalValue = (item.stock * item.price).toFixed(2);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="row-checkbox" data-id="${item.id}" ${isChecked}></td>
            <td style="font-weight:600;">${item.name}</td>
            <td style="font-family:monospace; color:var(--slate-400);">${item.sku}</td>
            <td>${item.stock}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td style="font-weight:600;">$${parseFloat(totalValue).toLocaleString()}</td>
            <td><span class="badge ${status.class}">${status.label}</span></td>
        `;
        tableBody.appendChild(row);
    });

    syncCheckboxEventBindings();
}

// Controls visibility for the bulk options menu bar
function toggleBulkActionsInterface() {
    if (selectedItems.size > 0) {
        bulkBar.classList.remove('hidden');
        bulkCountLabel.innerText = `${selectedItems.size} corporate SKU assets selected`;
    } else {
        bulkBar.classList.add('hidden');
        masterCheckbox.checked = false;
    }
}

// Binds dynamic click handlers to target checkboxes on render cycles
function syncCheckboxEventBindings() {
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    
    rowCheckboxes.forEach(box => {
        box.addEventListener('change', (e) => {
            const rowId = parseInt(e.target.getAttribute('data-id'));
            if (e.target.checked) {
                selectedItems.add(rowId);
            } else {
                selectedItems.delete(rowId);
            }
            toggleBulkActionsInterface();
        });
    });
}

// Global master selector controller toggle switch logic block
masterCheckbox.addEventListener('change', (e) => {
    const visibleCheckboxes = document.querySelectorAll('.row-checkbox');
    selectedItems.clear();

    visibleCheckboxes.forEach(box => {
        box.checked = e.target.checked;
        if (e.target.checked) {
            const rowId = parseInt(box.getAttribute('data-id'));
            selectedItems.add(rowId);
        }
    });
    toggleBulkActionsInterface();
});

// Bulk Processing Event Listeners
document.getElementById('btn-bulk-restock').addEventListener('click', () => {
    inventoryData = inventoryData.map(item => {
        if (selectedItems.has(item.id)) {
            return { ...item, stock: item.stock + 50 };
        }
        return item;
    });
    clearSelections();
    updateAppPipeline();
});

document.getElementById('btn-bulk-delete').addEventListener('click', () => {
    if(confirm("Confirm removal of select manufacturing asset SKUs from active catalog ledger?")) {
        inventoryData = inventoryData.filter(item => !selectedItems.has(item.id));
        clearSelections();
        updateAppPipeline();
    }
});

function clearSelections() {
    selectedItems.clear();
    masterCheckbox.checked = false;
    toggleBulkActionsInterface();
}

// Initializes Chart.js visualization layout structures
function initAnalyticsChart() {
    const ctx = document.getElementById('inventoryChart').getContext('2d');
    
    const productNames = inventoryData.map(item => item.name.substring(0, 20) + "...");
    const stockQuantities = inventoryData.map(item => item.stock);

    inventoryChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: productNames,
            datasets: [{
                label: 'Stock Quantity Metrics',
                data: stockQuantities,
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                borderWidth: 3,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: '#1e293b' }, ticks: { color: '#94a3b8' } },
                x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
            }
        }
    });
}

// Synchronizes updated array mutations into the canvas chart display engine
function updateChartVisualization() {
    if (inventoryChartInstance) {
        inventoryChartInstance.data.labels = inventoryData.map(item => item.name.substring(0, 18) + "...");
        inventoryChartInstance.data.datasets[0].data = inventoryData.map(item => item.stock);
        inventoryChartInstance.update();
    }
}

// Search and Filter Input Triggers
searchInput.addEventListener('input', renderTableGrid);
statusFilter.addEventListener('change', renderTableGrid);

// App Execution Pipeline Synchronization
function updateAppPipeline() {
    renderDashboardMetrics();
    renderTableGrid();
    updateChartVisualization();
}

// Bootstrapping Core Run Phase Configuration on Window Load
window.addEventListener('DOMContentLoaded', () => {
    renderDashboardMetrics();
    renderTableGrid();
    initAnalyticsChart();
});
