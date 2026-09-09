document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    const pageTitle = document.getElementById('pageTitle');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;

            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(section).classList.add('active');

            pageTitle.textContent = item.querySelector('span:last-child').textContent;
        });
    });

    // DateTime
    function updateDateTime() {
        const now = new Date();
        document.getElementById('datetime').textContent = now.toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Sample data
    const activities = [
        { user: 'Ravi Varman', status: 'granted', time: '2 min ago', icon: '👤' },
        { user: 'Unknown', status: 'denied', time: '15 min ago', icon: '❌' },
        { user: 'Family Member', status: 'granted', time: '1 hour ago', icon: '👤' },
        { user: 'Guest', status: 'granted', time: '2 hours ago', icon: '👤' },
        { user: 'Unknown', status: 'denied', time: '3 hours ago', icon: '❌' }
    ];

    const accessLogs = [
        { time: '10:32:15 AM', user: 'Ravi Varman', status: 'granted', method: 'Face ID', confidence: '98.5%' },
        { time: '10:15:42 AM', user: 'Unknown', status: 'denied', method: 'Face ID', confidence: '45.2%' },
        { time: '09:45:00 AM', user: 'Family Member', status: 'granted', method: 'Face ID', confidence: '96.8%' },
        { time: '09:30:22 AM', user: 'Guest', status: 'granted', method: 'Manual', confidence: 'N/A' },
        { time: '08:15:10 AM', user: 'Ravi Varman', status: 'granted', method: 'Face ID', confidence: '99.1%' }
    ];

    const users = [
        { name: 'Ravi Varman', role: 'Owner', status: 'active', avatar: '👨' },
        { name: 'Family Member', role: 'Family', status: 'active', avatar: '👩' },
        { name: 'Guest User', role: 'Guest', status: 'active', avatar: '👤' },
        { name: 'Staff Member', role: 'Staff', status: 'inactive', avatar: '🔧' }
    ];

    // Render activities
    const activityList = document.getElementById('activityList');
    activityList.innerHTML = activities.map(a => `
        <div class="activity-item">
            <div class="activity-icon ${a.status}">${a.icon}</div>
            <div class="activity-info">
                <h4>${a.user}</h4>
                <p>Access ${a.status}</p>
            </div>
            <span class="activity-time">${a.time}</span>
        </div>
    `).join('');

    // Render access logs
    const accessTableBody = document.getElementById('accessTableBody');
    accessTableBody.innerHTML = accessLogs.map(log => `
        <tr>
            <td>${log.time}</td>
            <td>${log.user}</td>
            <td><span class="status-badge ${log.status}">${log.status === 'granted' ? 'Granted' : 'Denied'}</span></td>
            <td>${log.method}</td>
            <td>${log.confidence}</td>
        </tr>
    `).join('');

    // Render users
    const usersGrid = document.getElementById('usersGrid');
    usersGrid.innerHTML = users.map(u => `
        <div class="user-card">
            <div class="user-avatar">${u.avatar}</div>
            <h3>${u.name}</h3>
            <p class="user-role">${u.role}</p>
            <span class="user-status ${u.status}">${u.status === 'active' ? '● Active' : '○ Inactive'}</span>
        </div>
    `).join('');

    // Door controls
    let isLocked = true;
    const doorStatus = document.getElementById('doorStatus');
    const unlockBtn = document.getElementById('unlockBtn');
    const lockBtn = document.getElementById('lockBtn');

    unlockBtn.addEventListener('click', () => {
        isLocked = false;
        doorStatus.textContent = 'Unlocked';
        doorStatus.style.color = '#10b981';
        document.querySelector('.card-indicator').className = 'card-indicator active';
        addActivity('Door Unlocked', 'granted');
    });

    lockBtn.addEventListener('click', () => {
        isLocked = true;
        doorStatus.textContent = 'Locked';
        doorStatus.style.color = '#ef4444';
        document.querySelector('.card-indicator').className = 'card-indicator locked';
        addActivity('Door Locked', 'granted');
    });

    function addActivity(action, status) {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-icon ${status}">🔐</div>
            <div class="activity-info">
                <h4>${action}</h4>
                <p>Manual control</p>
            </div>
            <span class="activity-time">Just now</span>
        `;
        activityList.insertBefore(item, activityList.firstChild);
    }

    // Modal
    const modal = document.getElementById('addUserModal');
    const addUserBtn = document.getElementById('addUserBtn');
    const closeModal = document.getElementById('closeModal');

    addUserBtn.addEventListener('click', () => modal.classList.add('active'));
    closeModal.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // Face capture simulation
    const captureBtn = document.getElementById('captureBtn');
    const capturePreview = document.getElementById('capturePreview');

    captureBtn.addEventListener('click', () => {
        capturePreview.innerHTML = '<span>✅</span><p>Face captured!</p>';
        capturePreview.style.borderColor = '#10b981';
    });

    // Form submit
    const addUserForm = document.getElementById('addUserForm');
    addUserForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('User added successfully! Face data will be processed.');
        modal.classList.remove('active');
        addUserForm.reset();
        capturePreview.innerHTML = '<span>📷</span><p>Click to capture face</p>';
        capturePreview.style.borderColor = '#334155';
    });

    // Settings
    const faceThreshold = document.getElementById('faceThreshold');
    const thresholdValue = document.getElementById('thresholdValue');
    faceThreshold.addEventListener('input', () => {
        thresholdValue.textContent = faceThreshold.value + '%';
    });

    // Access filter
    const accessFilter = document.getElementById('accessFilter');
    accessFilter.addEventListener('change', () => {
        const filter = accessFilter.value;
        const rows = accessTableBody.querySelectorAll('tr');
        rows.forEach(row => {
            const status = row.querySelector('.status-badge').textContent.toLowerCase();
            if (filter === 'all' || status === filter) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});
