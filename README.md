<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>B2B Portal - Enterprise Admin Dashboard</title>
    <link rel="stylesheet" href="style.css">
    <!-- Chart.js CDN for Analytics Graph -->
    <script src="https://jsdelivr.net"></script>
</head>
<body>
    <div class="dashboard-container">
        
        <!-- Sidebar Navigation -->
        <aside class="sidebar">
            <div class="brand">📦 NexusCorp</div>
            <nav class="nav-menu">
                <a href="#" class="nav-item active">
                    <span class="icon">📊</span> Dashboard
                </a>
                <a href="#" class="nav-item">
                    <span class="icon">🛒</span> Inventory
                </a>
                <a href="#" class="nav-item">
                    <span class="icon">👥</span> Accounts
                </a>
            </nav>
        </aside>

        <!-- Main Workspace Area -->
        <main class="main-content">
            
            <!-- Global Top Action Header Bar -->
            <header class="top-header">
                <h2>Inventory Management Console</h2>
                <div class="user-meta">Admin Terminal</div>
            </header>

            <!-- Metrics Statistics Ribbon Layout -->
            <section class="metrics-ribbon">
                <div class="metric-card">
                    <h3>Total Active Inventory</h3>
                    <p id="stat-total-stock">0 units</p>
                </div>
                <div class="metric-card">
                    <h3>Gross Order Valuation</h3>
                    <p id="stat-total-value" class="valuation-text">$0.00</p>
                </div>
            </section>

            <!-- Interactive Analytical Charts Node Layout -->
            <section class="dashboard-card chart-wrapper">
                <h3>Stock Evaluation Analysis</h3>
                <div class="chart-box">
                    <canvas id="inventoryChart"></canvas>
                </div>
            </section>

            <!-- Data Table Control & Operations Panel -->
            <section class="dashboard-card table-section">
                
                <!-- Query Filters & Utility Action Controls row -->
                <div class="table-controls">
                    <div class="search-box">
                        <input type="text" id="table-search" placeholder="Search by SKU or Product name...">
                    </div>
                    <div class="filter-box">
                        <select id="status-filter">
                            <option value="ALL">All Stock Statuses</option>
                            <option value="In Stock">In Stock Only</option>
                            <option value="Low Stock">Low Stock Alert</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                    </div>
                </div>

                <!-- Contextual Bulk Actions Bar -->
                <div id="bulk-actions-bar" class="bulk-bar hidden">
                    <span id="bulk-select-count">0 items selected</span>
                    <div class="bulk-buttons">
                        <button id="btn-bulk-restock" class="btn btn-secondary">Bulk Restock (+50)</button>
                        <button id="btn-bulk-delete" class="btn btn-danger">Bulk Purge SKU</button>
                    </div>
                </div>

                <!-- Main Data Grid Table Engine -->
                <div class="table-scroll-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th width="40"><input type="checkbox" id="master-checkbox"></th>
                                <th>Product Details</th>
                                <th>SKU Identifier</th>
                                <th>Stock Quantity</th>
                                <th>Unit Price</th>
                                <th>Total Value</th>
                                <th>Status Badge</th>
                            </tr>
                        </thead>
                        <tbody id="inventory-table-body">
                            <!-- Dynamic records injected via Javascript engine -->
                        </tbody>
                    </table>
                </div>

            </section>

        </main>
    </div>
    <script src="app.js"></script>
</body>
</html>
:root {
    --slate-900: #0f172a;
    --slate-950: #020617;
    --slate-800: #1e293b;
    --slate-700: #334155;
    --slate-400: #94a3b8;
    --indigo-600: #4f46e5;
    --emerald-500: #10b981;
    --amber-500: #f59e0b;
    --rose-500: #f43f5e;
    --text-light: #f8fafc;
    --border-color: #334155;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

body {
    background-color: var(--slate-900);
    color: var(--text-light);
    height: 100vh;
    overflow: hidden;
}

.dashboard-container {
    display: flex;
    height: 100vh;
    width: 100vw;
}

/* Structural Sidebar Shell Component */
.sidebar {
    width: 260px;
    background-color: var(--slate-950);
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
}

.brand {
    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    color: var(--indigo-600);
    margin-bottom: 2.5rem;
}

.nav-menu {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--slate-400);
    text-decoration: none;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.2s ease;
}

.nav-item:hover, .nav-item.active {
    background-color: var(--slate-800);
    color: var(--text-light);
}

.nav-item.active {
    border-left: 4px solid var(--indigo-600);
}

/* Master Workspace Panel Scaffolding */
.main-content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.top-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 1rem;
}

.user-meta {
    background-color: var(--slate-800);
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 600;
}

/* Metrics Performance Dashboard Layout row */
.metrics-ribbon {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
}

.metric-card {
    background-color: var(--slate-950);
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    padding: 1.5rem;
}

.metric-card h3 {
    font-size: 0.875rem;
    color: var(--slate-400);
    text-transform: uppercase;
    margin-bottom: 0.5rem;
}

.metric-card p {
    font-size: 1.75rem;
    font-weight: 700;
}

.valuation-text { color: var(--emerald-500); }

/* Unified Standard Dash Panel Block */
.dashboard-card {
    background-color: var(--slate-950);
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    padding: 1.5rem;
}

.dashboard-card h3 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
}

/* Visualization Canvas wrapper parameter rules */
.chart-box {
    position: relative;
    height: 220px;
    width: 100%;
}

/* Advanced Grid Table Data Components UI Layout */
.table-controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.search-box { flex: 1; }

input[type="text"], select {
    width: 100%;
    padding: 0.625rem 1rem;
    background-color: var(--slate-900);
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    color: white;
    font-size: 0.9rem;
}

input:focus, select:focus {
    outline: 2px solid var(--indigo-600);
}

/* Bulk Contextual Bar styling options */
.bulk-bar {
    background-color: var(--slate-800);
    border: 1px solid var(--indigo-600);
    padding: 0.75rem 1.25rem;
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    animation: fadeIn 0.2s ease-in-out;
}

.bulk-bar.hidden { display: none; }

.bulk-buttons { display: flex; gap: 0.5rem; }

.btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
    cursor: pointer;
    font-size: 0.85rem;
}

.btn-secondary { background-color: var(--slate-700); color: white; }
.btn-danger { background-color: var(--rose-500); color: white; }

/* Grid Table Rendering Properties */
.table-scroll-container {
    overflow-x: auto;
    width: 100%;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.9rem;
}

.data-table th {
    background-color: var(--slate-900);
    color: var(--slate-400);
    padding: 0.875rem 1rem;
    font-weight: 600;
    border-bottom: 1px solid var(--border-color);
}

.data-table td {
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
}

.data-table tbody tr:hover {
    background-color: #0f172a80;
}

/* Badge Visual Rules engine styling */
.badge {
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 700;
    display: inline-block;
}

.badge-success { background-color: #10b98120; color: var(--emerald-500); }
.badge-warning { background-color: #f59e0b20; color: var(--amber-500); }
.badge-danger { background-color: #f43f5e20; color: var(--rose-500); }

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
}
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
