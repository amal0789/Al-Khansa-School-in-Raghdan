// School Code of Conduct Portal
// Main application file

import moment from 'moment-hijri';
import { initAdminPanel } from './admin-panel';

// Types
interface Elements {
    adminFab: HTMLElement | null;
    adminModal: HTMLElement | null;
    deleteAllModal: HTMLElement | null;
    editModal: HTMLElement | null;
    uploadBtn: HTMLElement | null;
    pdfFileInput: HTMLInputElement | null;
    passwordModal: HTMLElement | null;
    passwordInput: HTMLInputElement | null;
    submitPassword: HTMLElement | null;
    closeBtn: HTMLElement | null;
    tabButtons: NodeListOf<Element>;
    tabContents: NodeListOf<Element>;
    monthSelects: NodeListOf<HTMLSelectElement>;
    yearSelects: NodeListOf<HTMLSelectElement>;
    fileInputs: NodeListOf<HTMLInputElement>;
    modalContent: HTMLElement | null;
    monthFilter: HTMLSelectElement | null;
    yearFilter: HTMLSelectElement | null;
    footerText: HTMLElement | null;
    honorGrade: HTMLElement | null;
    honorSection: HTMLElement | null;
    honorBoard: HTMLElement | null;
    adminTab: HTMLElement | null;
    rulesTab: HTMLElement | null;
    honorsTab: HTMLElement | null;
    settingsTab: HTMLElement | null;
    adminRulesList: HTMLElement | null;
    adminHonorsList: HTMLElement | null;
    settingsForm: HTMLElement | null;
    settingsLogo: HTMLElement | null;
    settingsPrimaryColor: HTMLElement | null;
    settingsSecondaryColor: HTMLElement | null;
    settingsFooterText: HTMLElement | null;
    settingsHonorsTab: HTMLElement | null;
    addRuleForm: HTMLElement | null;
    addHonorForm: HTMLElement | null;
    distinguishedBehaviorList: HTMLElement | null;
    distinguishedAttendanceList: HTMLElement | null;
    uploadCsvBtn: HTMLElement | null;
    deleteAllHonorsBtn: HTMLElement | null;
}

// Global state
// Initialize global state
let elements: Elements = {
    adminFab: null,
    adminModal: null,
    deleteAllModal: null,
    editModal: null,
    passwordModal: null,
    passwordInput: null,
    submitPassword: null,
    closeBtn: null,
    tabButtons: document.querySelectorAll('.tab'),
    tabContents: document.querySelectorAll('.tab-content'),
    monthSelects: document.querySelectorAll('select[id$="-month"]') as NodeListOf<HTMLSelectElement>,
    yearSelects: document.querySelectorAll('select[id$="-year"]') as NodeListOf<HTMLSelectElement>,
    fileInputs: document.querySelectorAll('input[type="file"]') as NodeListOf<HTMLInputElement>,
    uploadBtn: null,
    pdfFileInput: null,
    modalContent: null,
    monthFilter: null,
    yearFilter: null,
    footerText: null,
    honorGrade: null,
    honorSection: null,
    honorBoard: null,
    adminTab: null,
    rulesTab: null,
    honorsTab: null,
    settingsTab: null,
    adminRulesList: null,
    adminHonorsList: null,
    settingsForm: null,
    settingsLogo: null,
    settingsPrimaryColor: null,
    settingsSecondaryColor: null,
    settingsFooterText: null,
    settingsHonorsTab: null,
    addRuleForm: null,
    addHonorForm: null,
    distinguishedBehaviorList: null,
    distinguishedAttendanceList: null,
    uploadCsvBtn: null,
    deleteAllHonorsBtn: null
};

// Core functionality
class UIManager {
    private static initElements() {
        elements = {
            ...elements,
            // Admin related elements
            adminFab: document.getElementById('admin-fab'),
            adminModal: document.getElementById('admin-modal'),
            deleteAllModal: document.getElementById('delete-all-modal'),
            editModal: document.getElementById('edit-modal'),
            passwordModal: document.getElementById('password-modal'),
            passwordInput: document.getElementById('password-input') as HTMLInputElement,
            submitPassword: document.getElementById('submit-password'),
            closeBtn: document.getElementById('close-modal-btn'),
            // modal content lives inside each modal as a '.modal-content' element
            modalContent: (document.getElementById('admin-modal')?.querySelector('.modal-content')) as HTMLElement | null,
            
            // Tab navigation elements
            tabButtons: document.querySelectorAll('.tab'),
            tabContents: document.querySelectorAll('.tab-content'),
            adminTab: document.getElementById('admin-tab'),
            rulesTab: document.getElementById('rules-tab'),
            honorsTab: document.getElementById('honors-tab'),
            settingsTab: document.getElementById('settings-tab'),
            
            // Date filter elements
            monthFilter: document.getElementById('month-filter') as HTMLSelectElement,
            yearFilter: document.getElementById('year-filter') as HTMLSelectElement,
            monthSelects: document.querySelectorAll('select[id$="-month"]') as NodeListOf<HTMLSelectElement>,
            yearSelects: document.querySelectorAll('select[id$="-year"]') as NodeListOf<HTMLSelectElement>,
            
            // File upload elements
            fileInputs: document.querySelectorAll('input[type="file"]') as NodeListOf<HTMLInputElement>,
            
            // Lists and forms
            adminRulesList: document.getElementById('admin-rules-list'),
            adminHonorsList: document.getElementById('admin-honors-list'),
            addRuleForm: document.getElementById('add-rule-form'),
            addHonorForm: document.getElementById('add-honor-form'),
            distinguishedBehaviorList: document.getElementById('distinguished-behavior-list'),
            distinguishedAttendanceList: document.getElementById('distinguished-attendance-list'),
            
            // Settings elements
            settingsForm: document.getElementById('settings-form'),
            settingsLogo: document.getElementById('settings-logo'),
            settingsPrimaryColor: document.getElementById('settings-primary-color'),
            settingsSecondaryColor: document.getElementById('settings-secondary-color'),
            settingsFooterText: document.getElementById('settings-footer-text'),
            settingsHonorsTab: document.getElementById('settings-honors-tab'),
            footerText: document.getElementById('footer-text'),
            
            // Filter elements
            honorGrade: document.getElementById('honor-grade'),
            honorSection: document.getElementById('honor-section'),
            honorBoard: document.getElementById('honor-board'),
            
            // Action buttons
            uploadCsvBtn: document.getElementById('upload-csv-btn'),
            deleteAllHonorsBtn: document.getElementById('delete-all-honors-btn'),
            
            // File upload elements (match HTML IDs)
            uploadBtn: document.getElementById('upload-pdf-btn'),
            pdfFileInput: document.getElementById('pdf-upload') as HTMLInputElement
        };
        console.log('UIManager.initElements found:', {
            adminFab: !!elements.adminFab,
            passwordModal: !!elements.passwordModal,
            submitPassword: !!elements.submitPassword,
            uploadBtn: !!elements.uploadBtn
        });
    }

    private static initModal() {
        if (!elements.adminModal || !elements.closeBtn) return;

        // Close button handler
        elements.closeBtn.addEventListener('click', () => {
            if (!elements.adminModal) return;

            elements.adminModal.classList.remove('show');
            elements.adminModal.style.display = 'none';
        });

        // Close modal when clicking outside modal content
        window.addEventListener('click', (e) => {
            if (e.target === elements.adminModal && elements.adminModal) {
                elements.adminModal.style.display = 'none';
                elements.adminModal.classList.remove('show');
            }
        });
    }
    
    private static initTabs() {
        if (!elements.tabButtons.length || !elements.tabContents.length) return;

        elements.tabButtons.forEach((tabButton) => {
            if (!(tabButton instanceof HTMLElement)) return;
            
            tabButton.addEventListener('click', (e) => {
                // Hide all tabs
                elements.tabButtons.forEach(button => button.classList.remove('active'));
                elements.tabContents.forEach(content => {
                    if (content instanceof HTMLElement) {
                        content.style.display = 'none';
                    }
                });

                // Show clicked tab
                tabButton.classList.add('active');
                const targetId = tabButton.dataset.target;
                if (targetId) {
                    const targetContent = document.getElementById(targetId);
                    if (targetContent) {
                        targetContent.style.display = 'block';
                    }
                }
            });
        });

        // Show first tab by default
        const firstTab = elements.tabButtons[0];
        if (firstTab instanceof HTMLElement) {
            firstTab.classList.add('active');
            const targetId = firstTab.dataset.target;
            if (targetId) {
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.style.display = 'block';
                }
            }
        }
    }

    private static initFileUpload() {
    // Initialize file upload elements (match HTML)
    elements.uploadBtn = document.getElementById('upload-pdf-btn');
    elements.pdfFileInput = document.getElementById('pdf-upload') as HTMLInputElement;

        if (!elements.uploadBtn || !elements.pdfFileInput) {
            console.error('File upload elements not found');
            return;
        }

        // Clear the file input when initializing
        elements.pdfFileInput.value = '';

        // Setup click handler for upload button
        elements.uploadBtn.addEventListener('click', () => {
            elements.pdfFileInput?.click();
        });

        // Setup change handler for file input
        elements.pdfFileInput.addEventListener('change', (e) => {
            const files = (e.target as HTMLInputElement).files;
            if (!files || files.length === 0) return;

            const file = files[0];
            
            // Check file extension and MIME type more flexibly
            const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
            const isImage = file.type.startsWith('image/') || 
                           ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].some(ext => 
                               file.name.toLowerCase().endsWith(`.${ext}`));
            
            if (isPdf || isImage) {
                console.log('File selected:', file.name);
                
                // Store file in localStorage for later use
                const reader = new FileReader();
                reader.onload = function(event) {
                    if (event.target?.result) {
                        localStorage.setItem('uploadedFile', JSON.stringify({
                            name: file.name,
                            type: file.type,
                            data: event.target.result
                        }));
                        alert('تم اختيار الملف: ' + file.name);
                    }
                };
                reader.readAsDataURL(file);
            } else {
                alert('الرجاء اختيار ملف PDF أو صورة فقط');
            }
            // Don't clear the file input value immediately, let the user select another file if needed
        });

        // Setup generic file input handlers
        elements.fileInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const files = (e.target as HTMLInputElement).files;
                if (!files || files.length === 0) return;

                const file = files[0];
                if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
                    console.log('File selected:', file.name);
                    const formData = new FormData();
                    formData.append('file', file);
                    alert('تم اختيار الملف: ' + file.name);
                } else {
                    alert('الرجاء اختيار ملف PDF أو صورة فقط');
                }
                (e.target as HTMLInputElement).value = '';
            });
        });
    }

    private static initDateFilters() {
        const hijriMonths = [
            'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
            'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
            'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
        ];
        
        // Initialize months
        elements.monthSelects.forEach(select => {
            const firstOption = select.options[0];
            select.innerHTML = '';
            select.appendChild(firstOption);
            
            hijriMonths.forEach((month, index) => {
                const option = document.createElement('option');
                option.value = (index + 1).toString();
                option.textContent = month;
                select.appendChild(option);
            });
        });
        
        // Initialize years
        const currentYear = parseInt(moment().format('iYYYY'));
        const yearRange = 5;
        
        elements.yearSelects.forEach(select => {
            const firstOption = select.options[0];
            select.innerHTML = '';
            select.appendChild(firstOption);
            
            for (let year = currentYear - yearRange; year <= currentYear + yearRange; year++) {
                const option = document.createElement('option');
                option.value = year.toString();
                option.textContent = year.toString();
                select.appendChild(option);
            }
            
            select.value = currentYear.toString();
        });
    }

    static init() {
        // Initialize DOM elements
        UIManager.initElements();
        
        // Initialize UI components
        UIManager.initModal();
        UIManager.initTabs();
        UIManager.initFileUpload();
        UIManager.initDateFilters();
        
        // Initialize application state
        cacheElements();
        initFilters();
        setupEventListeners();
    }
}

// Utility functions and event handlers are defined later in the file
            
// Initialize month and year dropdowns
const initMonthYearSelects = () => {
    const hijriMonths = [
        'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
        'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
        'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
    ];
    
    // Initialize months
    elements.monthSelects.forEach(select => {
        // Keep first option
        const firstOption = select.options[0];
        select.innerHTML = '';
        select.appendChild(firstOption);
        
        // Add months
        hijriMonths.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = (index + 1).toString();
            option.textContent = month;
            select.appendChild(option);
        });
    });
    
    // Initialize years
    const currentYear = parseInt(moment().format('iYYYY'));
    const startYear = currentYear - 5;
    const endYear = currentYear + 5;
    
    elements.yearSelects.forEach(select => {
        // Keep first option
        const firstOption = select.options[0];
        select.innerHTML = '';
        select.appendChild(firstOption);
        
        // Add years
        for (let year = startYear; year <= endYear; year++) {
            const option = document.createElement('option');
            option.value = year.toString();
            option.textContent = year.toString();
            select.appendChild(option);
        }
        
        // Set current year as default
        select.value = currentYear.toString();
    });
};

// File upload handling
const setupFileUploads = () => {
    elements.fileInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
                    console.log('File selected:', file.name);
                    const formData = new FormData();
                    formData.append('file', file);
                    // Here you would typically send the file to a server
                    alert('تم اختيار الملف: ' + file.name);
                } else {
                    alert('الرجاء اختيار ملف PDF أو صورة فقط');
                    input.value = '';
                }
            }
        });
    });
};

// Utility functions
const convertToHijri = (date: Date): string => {
    return moment(date).format('iD iMMMM iYYYY');
};

// Initialize months dropdown with Hijri months
const initMonthsDropdown = () => {
    const monthFilter = document.getElementById('month-filter') as HTMLSelectElement;
    if (monthFilter) {
        // Clear existing options except the first one
        while (monthFilter.options.length > 1) {
            monthFilter.remove(1);
        }
        
        // Add Hijri months
        const hijriMonths = [
            'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
            'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
            'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
        ];
        
        hijriMonths.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = (index + 1).toString();
            option.textContent = month;
            monthFilter.appendChild(option);
        });
    }
};

// Initialize years dropdown
const initYearsDropdown = () => {
    const yearFilter = document.getElementById('year-filter') as HTMLSelectElement;
    if (yearFilter) {
        // Clear existing options
        yearFilter.innerHTML = '';
        
        // Add Hijri years (current year ±5 years)
        const currentYear = parseInt(moment().format('iYYYY'));
        const startYear = currentYear - 5;
        const endYear = currentYear + 5;
        
        for (let year = startYear; year <= endYear; year++) {
            const option = document.createElement('option');
            option.value = year.toString();
            option.textContent = year.toString();
            yearFilter.appendChild(option);
        }

        // Set current year as default
        yearFilter.value = currentYear.toString();
    }
};

// Handle PDF upload
const handlePdfUpload = (file: File) => {
    // Check file extension and MIME type more flexibly
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isImage = file.type.startsWith('image/') || 
                   ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].some(ext => 
                       file.name.toLowerCase().endsWith(`.${ext}`));
    
    if (!isPdf && !isImage) {
        alert('الرجاء اختيار ملف PDF أو صورة فقط');
        return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('حجم الملف كبير جداً. الحد الأقصى هو 10 ميجابايت');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            // Store the file in localStorage (for demo purposes)
            localStorage.setItem('uploadedFile', JSON.stringify({
                name: file.name,
                type: isPdf ? 'application/pdf' : file.type,
                data: e.target?.result
            }));
            console.log('File saved successfully:', file.name);
            alert('تم رفع الملف بنجاح');
        } catch (error) {
            console.error('Error saving PDF:', error);
            alert('حدث خطأ أثناء حفظ الملف');
        }
    };

    reader.onerror = () => {
        console.error('Error reading PDF file');
        alert('حدث خطأ أثناء قراءة الملف');
    };

    reader.readAsDataURL(file);
};

// Note: UIManager.init() should run after helper functions are defined and on DOMContentLoaded.

// Modal management functions
const showPasswordModal = () => {
    const passwordModal = document.getElementById('password-modal');
    const adminModal = document.getElementById('admin-modal');
    
    if (passwordModal) {
        passwordModal.classList.add('visible');
        passwordModal.style.display = 'flex';
        const passwordInput = document.getElementById('password-input') as HTMLInputElement;
        if (passwordInput) {
            passwordInput.value = '';  // Clear previous input
            passwordInput.focus();     // Focus the input field
        }
    }
    if (adminModal) {
        adminModal.style.display = 'none';
    }
};

const showAdminModal = () => {
    const passwordModal = document.getElementById('password-modal');
    const adminModal = document.getElementById('admin-modal');
    
    if (passwordModal) {
        passwordModal.style.display = 'none';
    }
    if (adminModal) {
        adminModal.style.display = 'block';
    }
};

// Handle admin access
const handleAdminAccess = () => {
    const passwordInput = document.getElementById('password-input') as HTMLInputElement;
    
    if (passwordInput?.value === '0789') {
        showAdminModal();
    } else {
        alert('كلمة المرور غير صحيحة');
    }
};

// DOM elements cache
// Function to cache DOM elements
const cacheElements = () => {
    elements = {
        adminFab: document.getElementById('admin-fab'),
        adminModal: document.getElementById('admin-modal'),
        deleteAllModal: document.getElementById('delete-all-modal'),
        editModal: document.getElementById('edit-modal'),
        passwordModal: document.getElementById('password-modal'),
        passwordInput: document.getElementById('password-input') as HTMLInputElement,
        submitPassword: document.getElementById('submit-password'),
    // modal content lives inside admin modal as .modal-content
    modalContent: (document.getElementById('admin-modal')?.querySelector('.modal-content')) as HTMLElement | null,
        closeBtn: document.getElementById('close-modal-btn'),
        monthFilter: document.getElementById('month-filter') as HTMLSelectElement,
        yearFilter: document.getElementById('year-filter') as HTMLSelectElement,
        honorGrade: document.getElementById('honor-grade'),
        honorSection: document.getElementById('honor-section'),
        honorBoard: document.getElementById('honor-board'),
        footerText: document.getElementById('footer-text'),
        adminTab: document.getElementById('admin-tab'),
        tabButtons: document.querySelectorAll('.tab'),
        tabContents: document.querySelectorAll('.tab-content'),
        monthSelects: document.querySelectorAll('select[id$="-month"]'),
        yearSelects: document.querySelectorAll('select[id$="-year"]'),
        fileInputs: document.querySelectorAll('input[type="file"]'),
    // Match IDs used in HTML
    uploadBtn: document.getElementById('upload-pdf-btn'),
    pdfFileInput: document.getElementById('pdf-upload') as HTMLInputElement,
        rulesTab: document.getElementById('rules-tab'),
        honorsTab: document.getElementById('honors-tab'),
        settingsTab: document.getElementById('settings-tab'),
        adminRulesList: document.getElementById('admin-rules-list'),
        adminHonorsList: document.getElementById('admin-honors-list'),
        settingsForm: document.getElementById('settings-form'),
        settingsLogo: document.getElementById('setting-logo'),
        settingsPrimaryColor: document.getElementById('setting-primary-color'),
        settingsSecondaryColor: document.getElementById('setting-secondary-color'),
        settingsFooterText: document.getElementById('setting-footer-text'),
        settingsHonorsTab: document.getElementById('setting-honors-tab'),
        addRuleForm: document.getElementById('add-rule-form'),
        addHonorForm: document.getElementById('add-honor-form'),
        distinguishedBehaviorList: document.getElementById('distinguished-behavior-list'),
        distinguishedAttendanceList: document.getElementById('distinguished-attendance-list'),
        uploadCsvBtn: document.getElementById('upload-csv-btn'),
        deleteAllHonorsBtn: document.getElementById('delete-all-honors-btn')
    };
    // Debug: log whether critical elements are found
    console.log('cacheElements:', {
        adminFab: !!elements.adminFab,
        passwordModal: !!elements.passwordModal,
        passwordInput: !!elements.passwordInput,
        submitPassword: !!elements.submitPassword,
        adminModal: !!elements.adminModal
    });
};

// Add debounce function to improve performance
const debounce = function(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
};

// Add performance monitoring
const performanceMonitor = {
    start: 0,
    end: 0,

    startTimer: function(label) {
        this.start = performance.now();
        console.log(`Performance timer started for: ${label}`);
    },

    endTimer: function(label) {
        this.end = performance.now();
        const duration = this.end - this.start;
        console.log(`Performance timer for ${label}: ${duration.toFixed(2)}ms`);

        // Log if operation took longer than expected
        if (duration > 100) {
            console.warn(`Performance warning: ${label} took ${duration.toFixed(2)}ms`);
        }
    }
};

// Convert Gregorian to Hijri date
const gregorianToHijri = function(date) {
    // Using moment-hijri for accurate conversion
    return moment(date).format('iD iMMMM iYYYY');
};

// Get Hijri month names
const hijriMonths = [
    'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأول', 'جمادى الثاني',
    'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
];

// Initialize filters
const initFilters = () => {
    // Initialize month and year filters
    const monthFilter = document.getElementById('month-filter') as HTMLSelectElement;
    const yearFilter = document.getElementById('year-filter') as HTMLSelectElement;
    
    if (monthFilter && yearFilter) {
        const pinnedMonth = localStorage.getItem('pinnedMonth');
        const pinnedYear = localStorage.getItem('pinnedYear');
        
        if (pinnedMonth) monthFilter.value = pinnedMonth;
        if (pinnedYear) yearFilter.value = pinnedYear;
    }
    
    // Display any uploaded PDF in the Honor Board
    displayPdfInHonorBoard();
};

// Initialize application
// Tab management
// Tab management and initialization is now handled by UIManager.initTabs()

// Initialize month and year dropdowns
const initializeMonthYearSelects = () => {
    const monthSelects = document.querySelectorAll('select[id$="-month"]');
    const yearSelects = document.querySelectorAll('select[id$="-year"]');
    
    // Add Hijri months to all month selects
    const hijriMonths = [
        'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
        'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
        'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
    ];
    
    monthSelects.forEach(select => {
        if (select instanceof HTMLSelectElement) {
            // Keep the first option and clear others
            const firstOption = select.options[0];
            select.innerHTML = '';
            select.appendChild(firstOption);
            
            // Add month options
            hijriMonths.forEach((month, index) => {
                const option = document.createElement('option');
                option.value = (index + 1).toString();
                option.textContent = month;
                select.appendChild(option);
            });
        }
    });
    
    // Add Hijri years to all year selects
    const currentYear = parseInt(moment().format('iYYYY'));
    const startYear = currentYear - 5;
    const endYear = currentYear + 5;
    
    yearSelects.forEach(select => {
        if (select instanceof HTMLSelectElement) {
            // Keep the first option and clear others
            const firstOption = select.options[0];
            select.innerHTML = '';
            select.appendChild(firstOption);
            
            // Add year options
            for (let year = startYear; year <= endYear; year++) {
                const option = document.createElement('option');
                option.value = year.toString();
                option.textContent = year.toString();
                select.appendChild(option);
            }
        }
    });
};

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    UIManager.init();
    
    // Display any uploaded PDF in the Honor Board
    displayPdfInHonorBoard();
});

// Setup event listeners
const setupEventListeners = () => {
    // Admin panel event listeners are handled by the rebuilt admin module (admin-panel.ts)

    // Add other event listeners
    elements.closeBtn?.addEventListener('click', closeModal);
    elements.monthFilter?.addEventListener('change', debounce(displayHonors, 150));
    elements.yearFilter?.addEventListener('change', debounce(displayHonors, 150));
};

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing application');
    UIManager.init();
    // Initialize the rebuilt admin panel
    try {
        initAdminPanel();
    } catch (e) {
        console.error('Failed to initialize admin panel:', e);
    }
});
    

// Populate Hijri months in the dropdown
const populateHijriMonths = () => {
    const monthFilter = document.getElementById('month-filter');
    if (monthFilter) {
        const hijriMonths = [
            'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
            'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
            'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
        ];
        hijriMonths.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = (index + 1).toString();
            option.textContent = month;
            monthFilter.appendChild(option);
        });
    }
};

// Call the function after DOM is loaded
// Initialize date filters
const initializeDateFilters = function() {
    // Use direct DOM lookup to ensure homepage filters are populated
    const monthEl = document.getElementById('month-filter') as HTMLSelectElement | null;
    const yearEl = document.getElementById('year-filter') as HTMLSelectElement | null;

    if (!monthEl || !yearEl) {
        console.error('Month or Year filter elements not found');
        return;
    }

    performanceMonitor.startTimer('Date filters initialization');
    
    // Load previously selected month and year
    const savedMonth = localStorage.getItem('pinnedMonth');
    const savedYear = localStorage.getItem('pinnedYear');
    
    if (savedMonth) monthEl.value = savedMonth;
    if (savedYear) yearEl.value = savedYear;

    // Use Hijri months instead of Gregorian months
    const hijriMonths = [
        '<option value="">الكل</option>',
        '<option value="1">محرم</option>',
        '<option value="2">صفر</option>',
        '<option value="3">ربيع الأول</option>',
        '<option value="4">ربيع الثاني</option>',
        '<option value="5">جمادى الأولى</option>',
        '<option value="6">جمادى الآخرة</option>',
        '<option value="7">رجب</option>',
        '<option value="8">شعبان</option>',
        '<option value="9">رمضان</option>',
        '<option value="10">شوال</option>',
        '<option value="11">ذو القعدة</option>',
        '<option value="12">ذو الحجة</option>'
    ];
    monthEl.innerHTML = hijriMonths.join('');

    const currentYear = parseInt(moment().format('iYYYY'));
    const yearOptions = ['<option value="">الكل</option>'];
    for (let year = currentYear; year >= currentYear - 5; year--) {
        yearOptions.push(`<option value="${year}">${year}</option>`);
    }
    yearEl.innerHTML = yearOptions.join('');

    // Set defaults to current month and year
    const monthNames = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    const now = new Date();
    const currentMonthName = monthNames[now.getMonth()];

    monthEl.value = currentMonthName;
    yearEl.value = String(currentYear);

    // Add event listeners (debounced)
    monthEl.addEventListener('change', function() {
        localStorage.setItem('pinnedMonth', monthEl.value);
        debounce(displayHonors, 150)();
    });
    
    yearEl.addEventListener('change', function() {
        localStorage.setItem('pinnedYear', yearEl.value);
        debounce(displayHonors, 150)();
    });

    performanceMonitor.endTimer('Date filters initialization');
};

// Initialize admin modal
const initializeAdminModal = function() {
    cacheElements();

    // Check if admin modal exists
    if (!elements.adminModal) {
        console.error('Admin modal not found');
        return;
    }

    // Start performance monitoring
    performanceMonitor.startTimer('Admin modal initialization');

    // Check if close button exists
    if (!elements.closeBtn) {
        console.error('Close button not found');
        return;
    }

    // Add event listener for close button
    elements.closeBtn.addEventListener('click', closeModal);

    // Check if admin FAB exists and wire it to open the password modal
    if (elements.adminFab) {
        elements.adminFab.addEventListener('click', showPasswordModal);
    }

    // Handle tab navigation in modal
    const tabLinks = elements.adminModal ? elements.adminModal.querySelectorAll('.tab-link') : [];
    const handleTabClick = function(e) {
        e.preventDefault();
        const targetTab = (e.currentTarget as HTMLElement).getAttribute('data-tab');
        if (targetTab) {
            // Hide all tab contents
            elements.adminModal.querySelectorAll('.tab-content').forEach(function(content) {
                content.classList.remove('active');
            });

            // Remove active class from all tab links
            tabLinks.forEach(l => l.classList.remove('active'));

            // Show selected tab content
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                // Scroll to top of modal content
                targetContent.scrollTop = 0;
            }

            // Add active class to clicked tab link
            (e.currentTarget as HTMLElement).classList.add('active');
        }
    };

    // Add event listeners to tab links
    tabLinks.forEach(link => {
        link.addEventListener('click', handleTabClick);
    });

    // Close modal when clicking outside the modal content
    if (elements.adminModal) {
        elements.adminModal.addEventListener('click', function(e) {
            if (e.target === elements.adminModal && !elements.modalContent?.contains(e.target as Node)) {
                closeModal();
            }
        });
    }

    // Add event listener for escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && elements.adminModal && elements.adminModal.classList.contains('visible')) {
            closeModal();
        }
    });

    // End performance monitoring
    performanceMonitor.endTimer('Admin modal initialization');

    console.log('Admin modal initialized');
};

// Initialize grade and section filters
const initGradeAndSectionFilters = function() {
    // Cache DOM elements again to ensure we have the latest elements
    cacheElements();

    const gradeFilter = document.getElementById('honor-grade');
    const sectionFilter = document.getElementById('honor-section');

    if (!gradeFilter || !sectionFilter) {
        console.error('Grade or section filter elements not found');
        console.log('Grade filter:', gradeFilter);
        console.log('Section filter:', sectionFilter);
        return;
    }

    // Start performance monitoring
    performanceMonitor.startTimer('Grade and section filters initialization');

    // Populate grades
    const gradeOptions = [
        '<option value="">اختر الصف</option>',
        '<option value="الأول">الصف الأول</option>',
        '<option value="الثاني">الصف الثاني</option>',
        '<option value="الثالث">الصف الثالث</option>',
        '<option value="الرابع">الصف الرابع</option>',
        '<option value="الخامس">الصف الخامس</option>',
        '<option value="السادس">الصف السادس</option>'
    ];
    gradeFilter.innerHTML = gradeOptions.join('');

    // Populate sections
    const sectionOptions = [
        '<option value="">اختر الشعبة</option>',
        '<option value="أ">أ</option>',
        '<option value="ب">ب</option>',
        '<option value="ج">ج</option>',
        '<option value="د">د</option>'
    ];
    sectionFilter.innerHTML = sectionOptions.join('');

    // Set default values
    if (gradeFilter) (gradeFilter as HTMLSelectElement).value = '';
    if (sectionFilter) (sectionFilter as HTMLSelectElement).value = '';

    // End performance monitoring
    performanceMonitor.endTimer('Grade and section filters initialization');

    console.log('Grade and section filters initialized');
};

// Initialize settings
const initializeSettings = function() {
    const defaultSettings = {
        logo: './assets/default-logo.png',
        primaryColor: '#4a90e2',
        secondaryColor: '#f5a623',
        footerText: 'للتواصل: example@school.edu | © 2024 ابتدائية الخنساء برغدان. جميع الحقوق محفوظة.',
        honorsTab: true
    };

    try {
        // Cache DOM elements again to ensure we have the latest elements
        cacheElements();

        let settings = { ...defaultSettings, ...JSON.parse(localStorage.getItem('schoolSettings') || '{}') };

        // Update footer text
        if (elements.footerText) {
            elements.footerText.textContent = settings.footerText;
        }

        // Update colors
        document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);

        // Update logo
        const logoElements = document.querySelectorAll('.school-logo-img');
        logoElements.forEach(function(el) {
            if (el instanceof HTMLImageElement) {
                el.src = settings.logo;
                // Add error handling for image loading
                el.onerror = function() {
                    el.src = defaultSettings.logo;
                };
            }
        });

        // Update school name
        const nameElements = document.querySelectorAll('.school-name-span');
        nameElements.forEach(function(el) {
            if (el) el.textContent = 'ابتدائية الخنساء برغدان';
        });

        console.log('Settings applied successfully');
    } catch (error) {
        console.error('Error initializing settings:', error);
        // Use default settings if there's an error
        document.documentElement.style.setProperty('--primary-color', defaultSettings.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', defaultSettings.secondaryColor);
    }
};

// Display PDF in Honor Board
const displayPdfInHonorBoard = function() {
    const uploadedFile = localStorage.getItem('uploadedFile');
    if (!uploadedFile) return;
    
    const fileData = JSON.parse(uploadedFile);
    const honorBoard = document.getElementById('honor-board');
    
    if (!honorBoard) return;
    
    // Clear existing content
    honorBoard.innerHTML = '';
    
    // Create PDF display element
    const pdfContainer = document.createElement('div');
    pdfContainer.className = 'pdf-container';
    
    // Check if it's a PDF by type or extension
    const isPdf = fileData.type === 'application/pdf' || fileData.name.toLowerCase().endsWith('.pdf');
    const isImage = fileData.type.startsWith('image/') || 
                   ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].some(ext => 
                       fileData.name.toLowerCase().endsWith(`.${ext}`));
    
    if (isPdf) {
        const pdfEmbed = document.createElement('embed');
        pdfEmbed.src = fileData.data;
        pdfEmbed.type = 'application/pdf';
        pdfEmbed.width = '100%';
        pdfEmbed.height = '600px';
        pdfContainer.appendChild(pdfEmbed);
    } else if (isImage) {
        const img = document.createElement('img');
        img.src = fileData.data;
        img.alt = fileData.name;
        img.style.width = '100%';
        img.style.maxHeight = '600px';
        img.style.objectFit = 'contain';
        pdfContainer.appendChild(img);
    }
    
    // Add file name
    const fileName = document.createElement('div');
    fileName.className = 'file-name';
    fileName.textContent = `الملف: ${fileData.name}`;
    pdfContainer.appendChild(fileName);
    
    honorBoard.appendChild(pdfContainer);
};

// Display honors with filtering
const displayHonors = function() {
    // Get honors from localStorage
    let honors = JSON.parse(localStorage.getItem('honors') || '[]');

    // Get filter values
    const monthFilter = (document.getElementById('month-filter') as HTMLSelectElement)?.value || '';
    const yearFilter = (document.getElementById('year-filter') as HTMLSelectElement)?.value || '';
    const gradeFilter = (document.getElementById('grade-filter') as HTMLSelectElement)?.value || '';

    // Apply filters
    const filteredHonors = honors.filter(honor => {
        return (!monthFilter || honor.month == monthFilter) &&
               (!yearFilter || honor.year == yearFilter) &&
               (!gradeFilter || honor.grade == gradeFilter);
    });

    // Sort honors by date (newest first)
    filteredHonors.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Get display elements
    const distinguishedBehaviorList = document.getElementById('distinguished-behavior-list');
    const distinguishedAttendanceList = document.getElementById('distinguished-attendance-list');

    if (!distinguishedBehaviorList || !distinguishedAttendanceList) {
        console.error('Display elements not found');
        return;
    }

    // Clear existing content
    distinguishedBehaviorList.innerHTML = '';
    distinguishedAttendanceList.innerHTML = '';

    // Separate honors by type
    const behaviorHonors = filteredHonors.filter(honor => honor.type === 'behavior');
    const attendanceHonors = filteredHonors.filter(honor => honor.type === 'attendance');

    // Display behavior honors
    if (behaviorHonors.length === 0) {
        distinguishedBehaviorList.innerHTML = '<p class="no-data">لا توجد متميزين في السلوك</p>';
    } else {
        behaviorHonors.forEach(honor => {
            const honorElement = document.createElement('div');
            honorElement.className = 'honor-item';
            honorElement.innerHTML = `
                <div class="honor-header">
                    <h3>${honor.name}</h3>
                    <span class="honor-type">${honor.type}</span>
                </div>
                <div class="honor-details">
                    <p><strong>الصف:</strong> ${honor.grade}</p>
                    <p><strong>الشعبة:</strong> ${honor.section}</p>
                    <p><strong>السبب:</strong> ${honor.reason}</p>
                    <p><strong>التاريخ:</strong> ${convertToHijri(new Date(honor.date))}</p>
                </div>
            `;
            distinguishedBehaviorList.appendChild(honorElement);
        });
    }

    // Display attendance honors
    if (attendanceHonors.length === 0) {
        distinguishedAttendanceList.innerHTML = '<p class="no-data">لا توجد متميزين في الحضور</p>';
    } else {
        attendanceHonors.forEach(honor => {
            const honorElement = document.createElement('div');
            honorElement.className = 'honor-item';
            honorElement.innerHTML = `
                <div class="honor-header">
                    <h3>${honor.name}</h3>
                    <span class="honor-type">${honor.type}</span>
                </div>
                <div class="honor-details">
                    <p><strong>الصف:</strong> ${honor.grade}</p>
                    <p><strong>الشعبة:</strong> ${honor.section}</p>
                    <p><strong>السبب:</strong> ${honor.reason}</p>
                    <p><strong>التاريخ:</strong> ${convertToHijri(new Date(honor.date))}</p>
                </div>
            `;
            distinguishedAttendanceList.appendChild(honorElement);
        });
    }
};

// Display rules
const displayRules = function() {
    // Get rules from localStorage
    let rules = JSON.parse(localStorage.getItem('rules') || '[]');

    // Get display elements
    const adminRulesList = document.getElementById('admin-rules-list');
    const rulesList = document.getElementById('rules-list'); // may be absent on homepage

    if (!adminRulesList) {
        console.error('Admin rules display element not found');
        return;
    }

    // Clear existing content
    adminRulesList.innerHTML = '';
    if (rulesList) rulesList.innerHTML = '';

    // Sort rules by order
    rules.sort((a, b) => a.order - b.order);

    // Display rules
    if (rules.length === 0) {
        adminRulesList.innerHTML = '<p class="no-data">لا توجد قواعد مسجلة</p>';
        if (rulesList) rulesList.innerHTML = '<p class="no-data">لا توجد قواعد مسجلة</p>';
    } else {
        rules.forEach(rule => {
            const ruleElement = document.createElement('div');
            ruleElement.className = 'rule-item';
            ruleElement.innerHTML = `
                <div class="rule-header">
                    <h3>${rule.title}</h3>
                    <span class="rule-type">${rule.type}</span>
                </div>
                <div class="rule-details">
                    <p>${rule.text}</p>
                    <p><strong>الترتيب:</strong> ${rule.order}</p>
                    <p><strong>الحالة:</strong> ${rule.status}</p>
                    ${rule.attachment ? `<p><strong>مرفق:</strong> ${rule.attachment}</p>` : ''}
                </div>
            `;
            adminRulesList.appendChild(ruleElement);
            if (rulesList) rulesList.appendChild(ruleElement.cloneNode(true));
        });
    }
};

// Display admin honors
const displayAdminHonors = function() {
    // Get honors from localStorage
    let honors = JSON.parse(localStorage.getItem('honors') || '[]');

    // Get display element
    const adminHonorsList = document.getElementById('admin-honors-list');

    if (!adminHonorsList) {
        console.error('Display element not found');
        return;
    }

    // Clear existing content
    adminHonorsList.innerHTML = '';

    // Sort honors by date (newest first)
    honors.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Display honors
    if (honors.length === 0) {
        adminHonorsList.innerHTML = '<p class="no-data">لا توجد متميزين مسجلين</p>';
    } else {
        honors.forEach(honor => {
            const honorElement = document.createElement('div');
            honorElement.className = 'honor-item';
            honorElement.innerHTML = `
                <div class="honor-header">
                    <h3>${honor.name}</h3>
                    <span class="honor-type">${honor.type}</span>
                </div>
                <div class="honor-details">
                    <p><strong>الصف:</strong> ${honor.grade}</p>
                    <p><strong>الشعبة:</strong> ${honor.section}</p>
                    <p><strong>السبب:</strong> ${honor.reason}</p>
                    <p><strong>التاريخ:</strong> ${convertToHijri(new Date(honor.date))}</p>
                    <p><strong>الحالة:</strong> ${honor.status}</p>
                    ${honor.attachment ? `<p><strong>مرفق:</strong> ${honor.attachment}</p>` : ''}
                </div>
                <div class="honor-actions">
                    <button class="edit-honor-btn" data-id="${honor.id}">تعديل</button>
                    <button class="delete-honor-btn" data-id="${honor.id}">حذف</button>
                </div>
            `;
            adminHonorsList.appendChild(honorElement);
        });

        // Add event listeners to edit buttons
        const editButtons = adminHonorsList.querySelectorAll('.edit-honor-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                editHonor(id);
            });
        });

        // Add event listeners to delete buttons
        const deleteButtons = adminHonorsList.querySelectorAll('.delete-honor-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                deleteHonor(id);
            });
        });
    }
};

// Open password modal
const openPasswordModal = function() {
    const passwordModal = document.getElementById('password-modal');
    const passwordInput = document.getElementById('password-input') as HTMLInputElement | null;
    if (passwordModal) {
        passwordModal.style.display = 'flex';
        passwordModal.classList.add('visible');
        if (passwordInput) {
            passwordInput.value = '';
            passwordInput.focus();
        }
    }
};

// Open admin modal
const openModal = function() {
    console.log('Opening admin modal');

    // Ensure admin modal exists
    const modal = document.getElementById('admin-modal');
    if (!modal) {
        console.error('Admin modal not found');
        return;
    }

    // Find modal content inside the admin modal
    const modalContent = modal.querySelector('.modal-content') as HTMLElement | null;
    if (!modalContent) {
        console.error('Modal content not found inside admin modal');
        return;
    }

    // Display the modal
    modal.style.display = 'flex';
    modal.style.zIndex = '10000';
    modal.classList.add('visible');

    // Focus on the first input in the modal if available
    const firstInput = modalContent.querySelector('input');
    if (firstInput) {
        (firstInput as HTMLInputElement).focus();
    }

    console.log('Admin modal opened successfully');
};

// Ensure admin-fab has a fallback click listener after DOM is ready
// Fallback: ensure FAB opens password modal (not admin) after DOM ready
document.addEventListener('DOMContentLoaded', function() {
    const fab = document.getElementById('admin-fab');
    if (fab) {
        fab.addEventListener('click', showPasswordModal);
    }
});

// Close admin modal
const closeModal = function() {
    console.log('Closing admin modal');
    if (elements.adminModal) {
        elements.adminModal.classList.remove('visible');
        (elements.adminModal as HTMLElement).style.display = 'none';
    }
};

// Load admin data
const loadAdminData = function() {
    console.log('Loading admin data');

    // Load honors
    displayAdminHonors();

    // Load rules
    displayRules();
};

// Edit honor
const editHonor = function(id) {
    console.log('Editing honor:', id);

    // Get honor from localStorage
    let honors = JSON.parse(localStorage.getItem('honors') || '[]');
    const honor = honors.find((h: any) => h.id === id);

    if (!honor) {
        console.error('Honor not found');
        return;
    }

    // Populate form
    const honorForm = document.getElementById('add-honor-form');
    if (honorForm && honorForm instanceof HTMLFormElement) {
        const idInput = honorForm.querySelector('#honor-id') as HTMLInputElement;
        const nameInput = honorForm.querySelector('#honor-name') as HTMLInputElement;
        const gradeSelect = honorForm.querySelector('#honor-grade') as HTMLSelectElement;
        const sectionSelect = honorForm.querySelector('#honor-section') as HTMLSelectElement;
        const categorySelect = honorForm.querySelector('#honor-category') as HTMLSelectElement;

        if (idInput) idInput.value = honor.id;
        if (nameInput) nameInput.value = honor.name;
        if (gradeSelect) gradeSelect.value = honor.grade;
        if (sectionSelect) sectionSelect.value = honor.section;
        if (categorySelect) categorySelect.value = honor.type;

        // Show admin modal
        const adminModal = document.getElementById('admin-modal');
        if (adminModal) {
            adminModal.style.display = 'flex';
            adminModal.classList.add('visible');
        }
    }
};

// Define the deleteHonor function to avoid the undefined error
const deleteHonor = function(id: string) {
    console.log('Deleting honor:', id);

    // Get honors from localStorage

// Get honors from localStorage
    let honors = JSON.parse(localStorage.getItem('honors') || '[]');

    // Filter out the honor to be deleted
    honors = honors.filter((honor: any) => honor.id !== id);

    // Update localStorage
    localStorage.setItem('honors', JSON.stringify(honors));

    // Refresh displayed honors
    displayAdminHonors();
};

// Add new rule
const addRule = function(e) {
    e.preventDefault();

    const ruleForm = document.getElementById('add-rule-form');
    if (!ruleForm) {
        console.error('Rule form not found');
        return;
    }

    const titleInput = ruleForm.querySelector('#rule-title') as HTMLInputElement;
    const textInput = ruleForm.querySelector('#rule-text') as HTMLTextAreaElement;
    const orderInput = ruleForm.querySelector('#rule-order') as HTMLInputElement;
    const statusSelect = ruleForm.querySelector('#rule-status') as HTMLSelectElement;

    // Validate inputs
    if (!titleInput.value || !textInput.value) {
        alert('يرجى ملء جميع الحقول الإلزامية');
        return;
    }

    // Get existing rules
    let rules = JSON.parse(localStorage.getItem('rules') || '[]');

    // Create new rule object
    const newRule = {
        id: Date.now().toString(),
        title: titleInput.value,
        text: textInput.value,
        order: parseInt(orderInput.value) || 0,
        status: statusSelect.value || 'active',
        type: 'general', // Default type
        attachment: null // No attachment by default
    };

    // Add new rule to the beginning of the array
    rules.unshift(newRule);

    // Save updated rules to localStorage
    localStorage.setItem('rules', JSON.stringify(rules));

    // Refresh displayed rules
    displayRules();

    // Reset form
    const ruleFormEl = document.getElementById('rule-form') as HTMLFormElement;
    if (ruleFormEl) ruleFormEl.reset();
};

// Add new honor
const addHonor = function(e) {
    e.preventDefault();

    const honorForm = document.getElementById('add-honor-form');
    if (!honorForm) {
        console.error('Honor form not found');
        return;
    }

    const nameInput = honorForm.querySelector('#honor-name') as HTMLInputElement;
    const gradeSelect = honorForm.querySelector('#honor-grade') as HTMLSelectElement;
    const sectionSelect = honorForm.querySelector('#honor-section') as HTMLSelectElement;
    const typeSelect = honorForm.querySelector('#honor-type') as HTMLSelectElement;
    const reasonInput = honorForm.querySelector('#honor-reason') as HTMLInputElement;
    const dateInput = honorForm.querySelector('#honor-date') as HTMLInputElement;
    const statusSelect = honorForm.querySelector('#honor-status') as HTMLSelectElement;

    // Validate inputs
    if (!nameInput.value || !gradeSelect.value || !sectionSelect.value || !reasonInput.value || !dateInput.value) {
        alert('يرجى ملء جميع الحقول الإلزامية');
        return;
    }

    // Get existing honors
    let honors = JSON.parse(localStorage.getItem('honors') || '[]');

    // Create new honor object
    const newHonor = {
        id: Date.now().toString(),
        name: nameInput.value,
        grade: gradeSelect.value,
        section: sectionSelect.value,
        type: typeSelect.value,
        reason: reasonInput.value,
        date: dateInput.value,
        status: statusSelect.value || 'active',
        attachment: null // No attachment by default
    };

    // Add new honor to the beginning of the array
    honors.unshift(newHonor);

    // Save updated honors to localStorage
    localStorage.setItem('honors', JSON.stringify(honors));

    // Refresh displayed honors in admin panel
    displayAdminHonors();
    
    // Refresh displayed honors on homepage
    displayHonors();

    // Reset form
    const honorFormEl = document.getElementById('honor-form') as HTMLFormElement;
    if (honorFormEl) honorFormEl.reset();
};

// Import CSV file
const importCsv = function(e) {
    e.preventDefault();

    const fileInput = document.getElementById('csv-file') as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) {
        alert('يرجى اختيار ملف CSV');
        return;
    }

    const file = fileInput.files[0];

    // Read CSV file
    const reader = new FileReader();
    reader.onload = function(event) {
        const csvData = event.target?.result;
        if (typeof csvData === 'string') {
            // Parse CSV data
            const parsedData = parseCsvData(csvData);

            // Get existing honors
            let honors = JSON.parse(localStorage.getItem('honors') || '[]');

            // Add new honors from CSV
            parsedData.forEach((row: any) => {
                const newHonor = {
                    id: Date.now().toString(),
                    name: row['الاسم'],
                    grade: row['الصف'],
                    section: row['الشعبة'],
                    type: row['النوع'],
                    reason: row['السبب'],
                    date: row['التاريخ'],
                    status: 'active',
                    attachment: null
                };

                // Add new honor to the beginning of the array
                honors.unshift(newHonor);
            });

            // Save updated honors to localStorage
            localStorage.setItem('honors', JSON.stringify(honors));

            // Refresh displayed honors
            displayAdminHonors();

            alert('تم استيراد البيانات بنجاح');
        }
    };
    reader.readAsText(file);
};

// Parse CSV data
const parseCsvData = function(csv: string) {
    const lines = csv.split('\n');
    const result = [];

    // Get headers
    const headers = lines[0].split(',').map(header => header.trim());

    for (let i = 1; i < lines.length; i++) {
        const obj: any = {};
        const currentLine = lines[i].split(',');

        headers.forEach((header, index) => {
            obj[header] = currentLine[index]?.trim();
        });

        result.push(obj);
    }

    return result;
};

// Download CSV template
const downloadCsvTemplate = function() {
    const csvContent = "data:text/csv;charset=utf-8,"
        + "الاسم, الصف, الشعبة, النوع, السبب, التاريخ\n"
        + "مثال 1, الصف الأول, أ, سلوك, حسن, 2024-01-01\n"
        + "مثال 2, الصف الثاني, ب, حضور, ممتاز, 2024-01-02\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'template.csv');
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
};

// Print honors
const printHonors = function() {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert('يرجى تعطيل مانع النوافذ المنبثقة');
        return;
    }

    // Get honors from localStorage
    let honors = JSON.parse(localStorage.getItem('honors') || '[]');

    // Sort honors by date (newest first)
    honors.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Generate HTML for honors
    let honorsHtml = '<h1>قائمة المتميزين</h1>';
    honorsHtml += '<table>';
    honorsHtml += '<tr><th>الاسم</th><th>الصف</th><th>الشعبة</th><th>السبب</th><th>التاريخ</th></tr>';

    honors.forEach(honor => {
        honorsHtml += `
            <tr>
                <td>${honor.name}</td>
                <td>${honor.grade}</td>
                <td>${honor.section}</td>
                <td>${honor.reason}</td>
                <td>${honor.date}</td>
            </tr>
        `;
    });

    honorsHtml += '</table>';

    // Write HTML to print window
    printWindow.document.write(`
        <html>
        <head>
            <title>طباعة المتميزين</title>
            <style>
                body { font-family: Arial, sans-serif; }
                h1 { text-align: center; }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: right;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            ${honorsHtml}
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.print();
};

// Print rules
const printRules = function() {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert('يرجى تعطيل مانع النوافذ المنبثقة');
        return;
    }

    // Get rules from localStorage
    let rules = JSON.parse(localStorage.getItem('rules') || '[]');

    // Sort rules by order
    rules.sort((a, b) => a.order - b.order);

    // Generate HTML for rules
    let rulesHtml = '<h1>قائمة القواعد</h1>';
    rulesHtml += '<table>';
    rulesHtml += '<tr><th>العنوان</th><th>النص</th><th>الترتيب</th><th>الحالة</th></tr>';

    rules.forEach(rule => {
        rulesHtml += `
            <tr>
                <td>${rule.title}</td>
                <td>${rule.text}</td>
                <td>${rule.order}</td>
                <td>${rule.status}</td>
            </tr>
        `;
    });

    rulesHtml += '</table>';

    // Write HTML to print window
    printWindow.document.write(`
        <html>
        <head>
            <title>طباعة القواعد</title>
            <style>
                body { font-family: Arial, sans-serif; }
                h1 { text-align: center; }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: right;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            ${rulesHtml}
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.print();
};

// Search honors
const searchHonors = function() {
    const searchInput = document.getElementById('search-honors') as HTMLInputElement;
    const filter = searchInput.value.toLowerCase();

    // Get honors from localStorage
    let honors = JSON.parse(localStorage.getItem('honors') || '[]');

    // Filter honors by search term
    const filteredHonors = honors.filter(honor => {
        return honor.name.toLowerCase().includes(filter) ||
               honor.grade.toLowerCase().includes(filter) ||
               honor.section.toLowerCase().includes(filter) ||
               honor.reason.toLowerCase().includes(filter) ||
               honor.date.toLowerCase().includes(filter);
    });

    // Sort honors by date (newest first)
    filteredHonors.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Get display elements
    const distinguishedBehaviorList = document.getElementById('distinguished-behavior-list');
    const distinguishedAttendanceList = document.getElementById('distinguished-attendance-list');

    if (!distinguishedBehaviorList || !distinguishedAttendanceList) {
        console.error('Display elements not found');
        return;
    }

    // Clear existing content
    distinguishedBehaviorList.innerHTML = '';
    distinguishedAttendanceList.innerHTML = '';

    // Separate honors by type
    const behaviorHonors = filteredHonors.filter(honor => honor.type === 'behavior');
    const attendanceHonors = filteredHonors.filter(honor => honor.type === 'attendance');

    // Display behavior honors
    if (behaviorHonors.length === 0) {
        distinguishedBehaviorList.innerHTML = '<p class="no-data">لا توجد متميزين في السلوك</p>';
    } else {
        behaviorHonors.forEach(honor => {
            const honorElement = document.createElement('div');
            honorElement.className = 'honor-item';
            honorElement.innerHTML = `
                <div class="honor-header">
                    <h3>${honor.name}</h3>
                    <span class="honor-type">${honor.type}</span>
                </div>
                <div class="honor-details">
                    <p><strong>الصف:</strong> ${honor.grade}</p>
                    <p><strong>الشعبة:</strong> ${honor.section}</p>
                    <p><strong>السبب:</strong> ${honor.reason}</p>
                    <p><strong>التاريخ:</strong> ${convertToHijri(new Date(honor.date))}</p>
                </div>
            `;
            distinguishedBehaviorList.appendChild(honorElement);
        });
    }

    // Display attendance honors
    if (attendanceHonors.length === 0) {
        distinguishedAttendanceList.innerHTML = '<p class="no-data">لا توجد متميزين في الحضور</p>';
    } else {
        attendanceHonors.forEach(honor => {
            const honorElement = document.createElement('div');
            honorElement.className = 'honor-item';
            honorElement.innerHTML = `
                <div class="honor-header">
                    <h3>${honor.name}</h3>
                    <span class="honor-type">${honor.type}</span>
                </div>
                <div class="honor-details">
                    <p><strong>الصف:</strong> ${honor.grade}</p>
                    <p><strong>الشعبة:</strong> ${honor.section}</p>
                    <p><strong>السبب:</strong> ${honor.reason}</p>
                    <p><strong>التاريخ:</strong> ${convertToHijri(new Date(honor.date))}</p>
                </div>
            `;
            distinguishedAttendanceList.appendChild(honorElement);
        });
    }
};

// Search rules
const searchRules = function() {
    const searchInput = document.getElementById('search-rules') as HTMLInputElement;
    const filter = searchInput.value.toLowerCase();

    // Get rules from localStorage
    let rules = JSON.parse(localStorage.getItem('rules') || '[]');

    // Filter rules by search term
    const filteredRules = rules.filter(rule => {
        return rule.title.toLowerCase().includes(filter) ||
               rule.text.toLowerCase().includes(filter) ||
               rule.order.toString().includes(filter) ||
               rule.status.toLowerCase().includes(filter);
    });

    // Sort rules by order
    filteredRules.sort((a, b) => a.order - b.order);

    // Get display element
    const adminRulesList = document.getElementById('admin-rules-list');

    if (!adminRulesList) {
        console.error('Admin rules display element not found');
        return;
    }

    // Clear existing content
    adminRulesList.innerHTML = '';

    // Display rules
    if (filteredRules.length === 0) {
        adminRulesList.innerHTML = '<p class="no-data">لا توجد قواعد مطابقة</p>';
    } else {
        filteredRules.forEach(rule => {
            const ruleElement = document.createElement('div');
            ruleElement.className = 'rule-item';
            ruleElement.innerHTML = `
                <div class="rule-header">
                    <h3>${rule.title}</h3>
                    <span class="rule-type">${rule.type}</span>
                </div>
                <div class="rule-details">
                    <p>${rule.text}</p>
                    <p><strong>الترتيب:</strong> ${rule.order}</p>
                    <p><strong>الحالة:</strong> ${rule.status}</p>
                    ${rule.attachment ? `<p><strong>مرفق:</strong> ${rule.attachment}</p>` : ''}
                </div>
            `;
            adminRulesList.appendChild(ruleElement);
        });
    }
};

// Dark mode toggle
const toggleDarkMode = function() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Save preference to localStorage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
};

// Load dark mode preference
const loadDarkModePreference = function() {
    const isDarkMode = JSON.parse(localStorage.getItem('darkMode') || 'false');
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
};

// Initialize app
const initializeApp = function() {
    // Load dark mode preference
    loadDarkModePreference();

    // Load admin data
    loadAdminData();

    // Initialize date filters
    initializeDateFilters();

    // Initialize settings
    initializeSettings();

    // Initialize admin modal
    initializeAdminModal();
};

// Handle PDF upload for honors
const pdfUploadBtn = document.getElementById('upload-pdf-btn');
const pdfUploadInput = document.getElementById('pdf-upload') as HTMLInputElement;
const pdfPreview = document.getElementById('pdf-preview');

if (pdfUploadBtn && pdfUploadInput) {
    pdfUploadBtn.addEventListener('click', () => {
        pdfUploadInput.click();
    });
    
    pdfUploadInput.addEventListener('change', (e: Event) => {
        const fileInput = e.target as HTMLInputElement;
        const file = fileInput.files?.[0];
        if (file && file.type === 'application/pdf') {
            // Save PDF to localStorage
            const reader = new FileReader();
            reader.onload = function(event) {
                try {
                    const pdfData = {
                        name: file.name,
                        type: 'pdf',
                        data: event.target?.result
                    };
                    
                    // Save to localStorage
                    localStorage.setItem('honorsPdf', JSON.stringify(pdfData));
                    
                    // Show preview
                    if (pdfPreview) {
                        pdfPreview.innerHTML = `
                            <div class="pdf-preview-item">
                                <i class="fas fa-file-pdf"></i>
                                <span>${file.name}</span>
                                <button class="remove-pdf-btn" title="حذف الملف">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `;
                        
                        // Add event listener to remove button
                        const removeBtn = pdfPreview.querySelector('.remove-pdf-btn');
                        if (removeBtn) {
                            removeBtn.addEventListener('click', () => {
                                localStorage.removeItem('honorsPdf');
                                if (pdfPreview) pdfPreview.innerHTML = '';
                                pdfUploadInput.value = '';
                            });
                        }
                    }
                    
                    alert('تم رفع ملف PDF بنجاح');
                } catch (error) {
                    console.error('Error saving PDF:', error);
                    alert('حدث خطأ أثناء حفظ الملف');
                }
            };
            
            reader.readAsDataURL(file);
        } else {
            alert('الرجاء اختيار ملف PDF صالح');
        }
    });
}

// Handle bulk add for honors
const addBulkBtn = document.getElementById('add-bulk-btn');
if (addBulkBtn) {
    addBulkBtn.addEventListener('click', () => {
        const grade = (document.getElementById('bulk-grade') as HTMLSelectElement)?.value || '';
        const section = (document.getElementById('bulk-section') as HTMLSelectElement)?.value || '';
        const category = (document.getElementById('bulk-category') as HTMLSelectElement)?.value || '';
        const reason = (document.getElementById('bulk-reason') as HTMLInputElement)?.value || '';
        const month = (document.getElementById('bulk-month') as HTMLSelectElement)?.value || '';
        const year = (document.getElementById('bulk-year') as HTMLSelectElement)?.value || '';
        const namesText = (document.getElementById('bulk-names') as HTMLTextAreaElement)?.value || '';
        
        if (!grade || !section || !category || !reason || !month || !year || !namesText) {
            alert('يرجاء ملء جميع الحقول');
            return;
        }
        
        // Split names by line
        const names = namesText.split('\n').filter(name => name.trim() !== '');
        
        if (names.length === 0) {
            alert('يرجاء إضافة أسماء الطالبات');
            return;
        }
        
        // Get existing honors
        let honors = JSON.parse(localStorage.getItem('honors') || '[]');
        
        // Add each honor
        names.forEach(name => {
            const honorData = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                name: name.trim(),
                grade,
                section,
                category,
                reason,
                status: 'published',
                month,
                year,
                type: category,
                date: new Date().toISOString().split('T')[0],
                attachment: null
            };
            
            honors.push(honorData);
        });
        
        // Save to localStorage
        localStorage.setItem('honors', JSON.stringify(honors));
        
        // Refresh displays
        displayHonors();
        displayAdminHonors();
        
        // Reset form
        (document.getElementById('bulk-names') as HTMLTextAreaElement).value = '';
        
        alert(`تمت إضافة ${names.length} طالبة بنجاح`);
    });
}

// Handle file preview for rules
const ruleAttachmentInput = document.getElementById('rule-attachment') as HTMLInputElement;
const filePreviewDiv = document.getElementById('file-preview');

if (ruleAttachmentInput && filePreviewDiv) {
    ruleAttachmentInput.addEventListener('change', (e: Event) => {
        const fileInput = e.target as HTMLInputElement;
        const file = fileInput.files?.[0];
        if (file) {
            // Clear previous preview
            filePreviewDiv.innerHTML = '';
            
            if (file.type.startsWith('image/')) {
                // Image preview
                const reader = new FileReader();
                reader.onload = function(event) {
                    filePreviewDiv.innerHTML = `
                        <div class="file-preview-item image-preview">
                            <img src="${event.target?.result}" alt="معاينة الصورة">
                            <span>${file.name}</span>
                            <button class="remove-file-btn" title="حذف الملف">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                    
                    // Add event listener to remove button
                    const removeBtn = filePreviewDiv.querySelector('.remove-file-btn');
                    if (removeBtn) {
                        removeBtn.addEventListener('click', () => {
                            ruleAttachmentInput.value = '';
                            filePreviewDiv.innerHTML = '';
                        });
                    }
                };
                reader.readAsDataURL(file);
            } else if (file.type === 'application/pdf') {
                // PDF preview
                filePreviewDiv.innerHTML = `
                    <div class="file-preview-item pdf-preview">
                        <i class="fas fa-file-pdf"></i>
                        <span>${file.name}</span>
                        <button class="remove-file-btn" title="حذف الملف">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                
                // Add event listener to remove button
                const removeBtn = filePreviewDiv.querySelector('.remove-file-btn');
                if (removeBtn) {
                    removeBtn.addEventListener('click', () => {
                        ruleAttachmentInput.value = '';
                        filePreviewDiv.innerHTML = '';
                    });
                }
            }
        }
    });
}

// Handle rule form submission with file attachment
const ruleForm = document.getElementById('add-rule-form');
if (ruleForm && ruleForm instanceof HTMLFormElement) {
    ruleForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(ruleForm);
        const ruleId = formData.get('rule-id')?.toString();
        const fileInput = document.getElementById('rule-attachment') as HTMLInputElement;
        
        const ruleData = {
            id: ruleId || Date.now().toString(),
            title: formData.get('rule-title')?.toString() || '',
            text: formData.get('rule-text')?.toString() || '',
            type: formData.get('rule-type')?.toString() || '',
            order: parseInt(formData.get('rule-order')?.toString() || '99'),
            status: formData.get('rule-status')?.toString() || ''
        } as any;
        
        // Handle file attachment if provided
        if (fileInput && fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            
            reader.onload = function(event) {
                try {
                    ruleData.attachment = {
                        name: file.name,
                        type: file.type.startsWith('image/') ? 'image' : 'pdf',
                        data: event.target?.result
                    };
                    
                    // Save rule
                    saveRule(ruleData);
                } catch (error) {
                    console.error('Error saving file:', error);
                    alert('حدث خطأ أثناء حفظ الملف');
                }
            };
            
            reader.readAsDataURL(file);
        } else {
            // Save rule without attachment
            saveRule(ruleData);
        }
    });
}

// Function to save rule
const saveRule = function(ruleData: any) {
    // Get existing rules
    let rules = JSON.parse(localStorage.getItem('rules') || '[]');
    
    // Check if we're editing an existing rule
    const existingIndex = rules.findIndex(r => r.id === ruleData.id);
    if (existingIndex !== -1) {
        // Update existing rule
        rules[existingIndex] = ruleData;
        console.log('Rule updated successfully');
    } else {
        // Add new rule
        rules.push(ruleData);
        console.log('Rule added successfully');
    }
    
    // Save to localStorage
    localStorage.setItem('rules', JSON.stringify(rules));
    
    // Reset form
    const ruleForm = document.getElementById('add-rule-form');
    if (ruleForm && ruleForm instanceof HTMLFormElement) {
        ruleForm.reset();
    }
    
    // Clear file preview
    const filePreviewDiv = document.getElementById('file-preview');
    if (filePreviewDiv) filePreviewDiv.innerHTML = '';
    
    // Update form title back to "إضافة قاعدة جديدة"
    const formTitle = document.getElementById('rule-form-title');
    if (formTitle) formTitle.textContent = 'إضافة قاعدة جديدة';
    
    // Refresh displays
    displayRules();
    displayRulesPreview();
    
    alert('تم حفظ القاعدة بنجاح');
};

// Handle cancel edit button
const cancelRuleEditBtn = document.getElementById('cancel-rule-edit');
if (cancelRuleEditBtn) {
    cancelRuleEditBtn.addEventListener('click', () => {
        // Reset form
        const ruleForm = document.getElementById('add-rule-form');
        if (ruleForm && ruleForm instanceof HTMLFormElement) {
            ruleForm.reset();
        }
        
        // Clear file preview
        const filePreviewDiv = document.getElementById('file-preview');
        if (filePreviewDiv) filePreviewDiv.innerHTML = '';
        
        // Update form title back to "إضافة قاعدة جديدة"
        const formTitle = document.getElementById('rule-form-title');
        if (formTitle) formTitle.textContent = 'إضافة قاعدة جديدة';
    });
}

// Handle rules preview
const displayRulesPreview = function() {
    // Get rules from localStorage
    let rules = JSON.parse(localStorage.getItem('rules') || '[]');
    
    // Sort rules by order
    rules.sort((a, b) => a.order - b.order);
    
    // Get preview container
    const rulesPreviewContainer = document.getElementById('rules-preview-container');
    
    if (!rulesPreviewContainer) {
        console.error('Rules preview container not found');
        return;
    }
    
    // Clear existing content
    rulesPreviewContainer.innerHTML = '';
    
    // Display rules
    if (rules.length === 0) {
        rulesPreviewContainer.innerHTML = '<p class="no-data">لا توجد قواعد مسجلة</p>';
    } else {
        rules.forEach(rule => {
            const ruleElement = document.createElement('div');
            ruleElement.className = 'rule-preview-item';
            
            // Add attachment if exists
            let attachmentHtml = '';
            if (rule.attachment) {
                if (rule.attachment.type === 'image') {
                    attachmentHtml = `
                        <div class="rule-attachment image-attachment">
                            <img src="${rule.attachment.data}" alt="مرفق القاعدة">
                        </div>
                    `;
                } else if (rule.attachment.type === 'pdf') {
                    attachmentHtml = `
                        <div class="rule-attachment pdf-attachment">
                            <i class="fas fa-file-pdf"></i>
                            <a href="#" class="view-pdf-btn" data-id="${rule.id}">عرض الملف</a>
                        </div>
                    `;
                }
            }
            
            ruleElement.innerHTML = `
                <div class="rule-preview-header">
                    <h3>${rule.title}</h3>
                    <span class="rule-type">${rule.type}</span>
                </div>
                <div class="rule-preview-content">
                    <p>${rule.text}</p>
                    <div class="rule-meta">
                        <span><strong>الترتيب:</strong> ${rule.order}</span>
                        <span><strong>الحالة:</strong> ${rule.status}</span>
                    </div>
                    ${attachmentHtml}
                </div>
                <div class="rule-preview-actions">
                    <button class="edit-rule-btn" data-id="${rule.id}">
                        <i class="fas fa-edit"></i> تعديل
                    </button>
                    <button class="delete-rule-btn" data-id="${rule.id}">
                        <i class="fas fa-trash"></i> حذف
                    </button>
                </div>
            `;
            
            rulesPreviewContainer.appendChild(ruleElement);
        });
        
        // Add event listeners for edit buttons
        const editButtons = rulesPreviewContainer.querySelectorAll('.edit-rule-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                editRule(id);
                
                // Scroll to form
                const ruleForm = document.getElementById('add-rule-form');
                if (ruleForm) {
                    ruleForm.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Add event listeners for delete buttons
        const deleteButtons = rulesPreviewContainer.querySelectorAll('.delete-rule-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                deleteRule(id);
            });
        });
        
        // Add event listeners for PDF view buttons
        const viewPdfButtons = rulesPreviewContainer.querySelectorAll('.view-pdf-btn');
        viewPdfButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const id = this.getAttribute('data-id');
                const rule = rules.find(r => r.id === id);
                
                if (rule && rule.attachment && rule.attachment.type === 'pdf') {
                    // Open PDF in new tab
                    const pdfWindow = window.open('');
                    if (pdfWindow) {
                        pdfWindow.document.write(
                            `<html>
                                <head>
                                    <title>${rule.title}</title>
                                    <style>
                                        body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                                        h1 { text-align: center; }
                                    </style>
                                </head>
                                <body>
                                    <h1>${rule.title}</h1>
                                    <embed type="application/pdf" src="${rule.attachment.data}" width="100%" height="100%" />
                                </body>
                            </html>
                        `);
                        pdfWindow.document.close();
                    }
                }
            });
        });
    }
};

// Enhanced rules preview with file attachment viewer
const displayRulesPreviewWithViewer = function() {
    // Get rules from localStorage
    let rules = JSON.parse(localStorage.getItem('rules') || '[]');
    
    // Sort rules by order
    rules.sort((a, b) => a.order - b.order);
    
    // Get preview container
    const rulesPreviewContainer = document.getElementById('rules-preview-container');
    
    if (!rulesPreviewContainer) {
        console.error('Rules preview container not found');
        return;
    }
    
    // Clear existing content
    rulesPreviewContainer.innerHTML = '';
    
    // Display rules
    if (rules.length === 0) {
        rulesPreviewContainer.innerHTML = '<p class="no-data">لا توجد قواعد مسجلة</p>';
    } else {
        rules.forEach(rule => {
            const ruleElement = document.createElement('div');
            ruleElement.className = 'rule-preview-item';
            
            // Add attachment if exists
            let attachmentHtml = '';
            let attachmentViewer = '';
            
            if (rule.attachment) {
                if (rule.attachment.type === 'image') {
                    attachmentHtml = `
                        <div class="rule-attachment">
                            <span><i class="fas fa-paperclip"></i> مرفق: ${rule.attachment.name}</span>
                        </div>
                    `;
                    attachmentViewer = `
                        <div class="attachment-viewer">
                            <h4>معاينة المرفق:</h4>
                            <div class="image-attachment">
                                <img src="${rule.attachment.data}" alt="مرفق القاعدة">
                            </div>
                        </div>
                    `;
                } else if (rule.attachment.type === 'pdf') {
                    attachmentHtml = `
                        <div class="rule-attachment">
                            <span><i class="fas fa-paperclip"></i> مرفق: ${rule.attachment.name}</span>
                        </div>
                    `;
                    attachmentViewer = `
                        <div class="attachment-viewer">
                            <h4>معاينة المرفق:</h4>
                            <div class="pdf-attachment">
                                <iframe src="${rule.attachment.data}" type="application/pdf" width="100%" height="400px" style="border: none; border-radius: 8px;"></iframe>
                                <div class="pdf-download">
                                    <a href="${rule.attachment.data}" download="${rule.title}.pdf" class="pdf-download-btn"><i class="fas fa-download"></i> تحميل الملف</a>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }
            
            ruleElement.innerHTML = `
                <div class="rule-preview-header">
                    <h3>${rule.title}</h3>
                    <span class="rule-type">${rule.type}</span>
                </div>
                <div class="rule-preview-content">
                    <p>${rule.text}</p>
                    <div class="rule-meta">
                        <span><strong>الترتيب:</strong> ${rule.order}</span>
                        <span><strong>الحالة:</strong> ${rule.status}</span>
                    </div>
                    ${attachmentHtml}
                    ${attachmentViewer}
                </div>
                <div class="rule-preview-actions">
                    <button class="edit-rule-btn" data-id="${rule.id}">
                        <i class="fas fa-edit"></i> تعديل
                    </button>
                    <button class="delete-rule-btn" data-id="${rule.id}">
                        <i class="fas fa-trash"></i> حذف
                    </button>
                </div>
            `;
            
            rulesPreviewContainer.appendChild(ruleElement);
        });
        
        // Add event listeners for edit buttons
        const editButtons = rulesPreviewContainer.querySelectorAll('.edit-rule-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                editRule(id);
                
                // Scroll to form
                const ruleForm = document.getElementById('add-rule-form');
                if (ruleForm) {
                    ruleForm.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Add event listeners for delete buttons
        const deleteButtons = rulesPreviewContainer.querySelectorAll('.delete-rule-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                deleteRule(id);
            });
        });
    }
};

// Edit rule function
const editRule = function(id: string) {
    console.log('Editing rule:', id);

    // Get rule from localStorage
    let rules = JSON.parse(localStorage.getItem('rules') || '[]');
    const rule = rules.find(r => r.id === id);

    if (!rule) {
        console.error('Rule not found');
        return;
    }

    // Populate form
    const ruleForm = document.getElementById('add-rule-form');
    if (ruleForm && ruleForm instanceof HTMLFormElement) {
        // Update form title
        const formTitle = document.getElementById('rule-form-title');
        if (formTitle) {
            formTitle.textContent = 'تعديل القاعدة';
        }
        
        // Populate form fields
        (ruleForm.querySelector('[name="rule-id"]') as HTMLInputElement).value = rule.id;
        (ruleForm.querySelector('[name="rule-title"]') as HTMLInputElement).value = rule.title;
        (ruleForm.querySelector('[name="rule-text"]') as HTMLInputElement).value = rule.text;
        (ruleForm.querySelector('[name="rule-type"]') as HTMLInputElement).value = rule.type;
        (ruleForm.querySelector('[name="rule-order"]') as HTMLInputElement).value = rule.order.toString();
        (ruleForm.querySelector('[name="rule-status"]') as HTMLInputElement).value = rule.status;
        
        // Show attachment if exists
        const filePreviewDiv = document.getElementById('file-preview');
        if (filePreviewDiv && rule.attachment) {
            if (rule.attachment.type === 'image') {
                filePreviewDiv.innerHTML = `
                    <div class="file-preview-item image-preview">
                        <img src="${rule.attachment.data}" alt="معاينة الصورة">
                        <span>${rule.attachment.name}</span>
                        <button class="remove-file-btn" title="حذف الملف">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            } else if (rule.attachment.type === 'pdf') {
                filePreviewDiv.innerHTML = `
                    <div class="file-preview-item pdf-preview">
                        <i class="fas fa-file-pdf"></i>
                        <span>${rule.attachment.name}</span>
                        <button class="remove-file-btn" title="حذف الملف">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            }
            
            // Add event listener to remove button
            const removeBtn = filePreviewDiv.querySelector('.remove-file-btn');
            if (removeBtn) {
                removeBtn.addEventListener('click', () => {
                    // Remove attachment from rule data
                    rule.attachment = null;
                    filePreviewDiv.innerHTML = '';
                });
            }
        }

        // Scroll to form
        ruleForm.scrollIntoView({ behavior: 'smooth' });

        // Focus on first input
        const firstInput = ruleForm.querySelector('input');
        if (firstInput) {
            (firstInput as HTMLInputElement).focus();
        }
    }
};

// Delete rule function
const deleteRule = function(id: string) {
    console.log('Deleting rule:', id);

    // Confirm deletion
    if (!confirm('هل أنت متأكد من حذف هذه القاعدة؟')) {
        return;
    }

    // Get rules from localStorage
    let rules = JSON.parse(localStorage.getItem('rules') || '[]');

    // Filter out rule with matching id
    rules = rules.filter(r => r.id !== id);

    // Save back to localStorage
    localStorage.setItem('rules', JSON.stringify(rules));

    // Refresh displays
    displayRules();
    displayRulesPreviewWithViewer();

    console.log('Rule deleted successfully');
};

// Run initialization
initializeApp();

// Centralized event listeners are wired in UIManager.init() and setupEventListeners
// No duplicated DOMContentLoaded handlers remain — initialization occurs in one place.
