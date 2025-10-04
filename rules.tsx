document.addEventListener('DOMContentLoaded', () => {
    const behaviorListEl = document.getElementById('all-behavior-rules');
    const attendanceListEl = document.getElementById('all-attendance-rules');
    const footerTextEl = document.querySelector('#footer p');

    const loadAndApplySettings = () => {
        const defaultSettings = {
            logo: './assets/default-logo.png',
            primaryColor: '#4a90e2',
            secondaryColor: '#f5a623',
            footerText: 'للتواصل: example@school.edu | © 2024 ابتدائية الخنساء برغدان. جميع الحقوق محفوظة.',
        };
        let settings = { ...defaultSettings, ...JSON.parse(localStorage.getItem('schoolSettings') || '{}') };

        if (footerTextEl) {
            footerTextEl.textContent = settings.footerText;
        }
        document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);

        // Update logo in the header
        document.querySelectorAll('.school-logo-img').forEach(el => {
            if (el) (el as HTMLImageElement).src = settings.logo
        });
        
        // The school name is now in the HTML, but we ensure it's correct here if needed later
        document.querySelectorAll('.school-name-span').forEach(el => {
            if(el) el.textContent = 'ابتدائية الخنساء برغدان'
        });
    };


    const renderRules = () => {
        const rules = JSON.parse(localStorage.getItem('schoolRules') || '[]');

        if (!behaviorListEl || !attendanceListEl) {
            console.error('Rule list elements not found!');
            return;
        }
        
        const publishedRules = rules.filter(r => r.status === 'published').sort((a,b) => a.order - b.order);

        if (publishedRules.length === 0) {
            behaviorListEl.innerHTML = '<p>لا توجد قواعد سلوك لعرضها.</p>';
            attendanceListEl.innerHTML = '<p>لا توجد قواعد مواظبة لعرضها.</p>';
            return;
        }

        const behaviorRules = publishedRules.filter(r => r.type === 'behavior');
        const attendanceRules = publishedRules.filter(r => r.type === 'attendance');

        const createRuleHTML = (rule) => {
            let attachmentHTML = '';
            let attachmentViewer = '';
            
            if (rule.attachment) {
                if (rule.attachment.type === 'image') {
                    attachmentHTML = `<div class="rule-attachment"><i class="fas fa-paperclip"></i> مرفق: ${rule.attachment.name}</div>`;
                    attachmentViewer = `
                        <div class="attachment-viewer">
                            <h4>معاينة المرفق:</h4>
                            <div class="image-attachment">
                                <img src="${rule.attachment.data}" alt="مرفق القاعدة">
                            </div>
                        </div>
                    `;
                } else if (rule.attachment.type === 'pdf') {
                    attachmentHTML = `<div class="rule-attachment"><i class="fas fa-paperclip"></i> مرفق: ${rule.attachment.name}</div>`;
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

            return `
                <div class="rule-item">
                    <h3>${rule.title}</h3>
                    <p>${rule.text}</p>
                    ${attachmentHTML}
                    ${attachmentViewer}
                </div>
            `;
        };

        behaviorListEl.innerHTML = behaviorRules.length > 0 
            ? behaviorRules.map(createRuleHTML).join('') 
            : '<p>لا توجد قواعد سلوك حالياً.</p>';

        attendanceListEl.innerHTML = attendanceRules.length > 0
            ? attendanceRules.map(createRuleHTML).join('')
            : '<p>لا توجد قواعد مواظبة حالياً.</p>';
    };

    // --- INITIALIZATION ---
    loadAndApplySettings();
    renderRules();
});