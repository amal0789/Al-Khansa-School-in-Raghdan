// Lightweight admin panel module
// Handles password gate, admin modal, tabs, PDF upload, honors management

type Honor = {
  id: string;
  name: string;
  grade: string;
  section: string;
  category: string;
  reason: string;
  status: string;
  month: string;
  year: string;
  image?: string | null;
  date: string;
};

const PASSWORD = '0789';
const HONORS_KEY = 'honors';
const PDF_KEY = 'honorsPdf';

function qs<T extends HTMLElement = HTMLElement>(sel: string, el: ParentNode = document): T | null {
  return el.querySelector(sel) as T | null;
}

export function initAdminPanel() {
  const adminFab = document.getElementById('admin-fab');
  const passwordModal = document.getElementById('password-modal');
  const passwordInput = qs<HTMLInputElement>('#password-input');
  const submitPassword = document.getElementById('submit-password');
  const adminModal = document.getElementById('admin-modal');
  const closeBtn = document.getElementById('close-modal-btn');
  const uploadBtn = document.getElementById('upload-pdf-btn');
  const pdfInput = qs<HTMLInputElement>('#pdf-upload');
  const pdfPreview = document.getElementById('pdf-preview');
  const addHonorForm = document.getElementById('add-honor-form') as HTMLFormElement | null;
  const adminHonorsList = document.getElementById('admin-honors-list');
  const deleteAllBtn = document.getElementById('delete-all-honors-btn');

  // Helpers
  function showPasswordModal() {
    if (!passwordModal) return;
    passwordModal.style.display = 'flex';
    const input = passwordInput;
    if (input) {
      input.value = '';
      input.focus();
    }
  }

  function hidePasswordModal() {
    if (!passwordModal) return;
    passwordModal.style.display = 'none';
  }

  function showAdminModal() {
    if (!adminModal) return;
    adminModal.style.display = 'block';
    adminModal.classList.add('visible');
    // render list
    renderHonorsList();
  }

  function hideAdminModal() {
    if (!adminModal) return;
    adminModal.classList.remove('visible');
    adminModal.style.display = 'none';
  }

  // FAB click
  adminFab?.addEventListener('click', (e) => {
    e.preventDefault();
    showPasswordModal();
  });

  // Submit password
  submitPassword?.addEventListener('click', () => {
    const val = passwordInput?.value || '';
    if (val === PASSWORD) {
      hidePasswordModal();
      showAdminModal();
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  });

  // Close admin modal
  closeBtn?.addEventListener('click', hideAdminModal);

  // Clicking outside admin modal content closes it
  window.addEventListener('click', (ev) => {
    if (!adminModal) return;
    if (ev.target === adminModal) {
      hideAdminModal();
    }
  });

  // Tabs inside admin modal: pair tabs with tab-contents by order
  const tabButtons = adminModal?.querySelectorAll('.tab') || [];
  const tabContents = adminModal?.querySelectorAll('.tab-content') || [];
  tabButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => (c as HTMLElement).style.display = 'none');
      btn.classList.add('active');
      const content = tabContents[idx] as HTMLElement | undefined;
      if (content) {
        content.style.display = 'block';
      }
    });
  });

  // PDF upload
  uploadBtn?.addEventListener('click', () => pdfInput?.click());
  pdfInput?.addEventListener('change', (e) => {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (!f) return;
    if (f.type !== 'application/pdf' && !f.type.startsWith('image/')) {
      alert('الرجاء اختيار ملف PDF أو صورة');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        localStorage.setItem(PDF_KEY, reader.result as string);
        if (pdfPreview) pdfPreview.innerHTML = `<p>تم حفظ الملف: ${f.name}</p>`;
        alert('تم حفظ الملف');
      } catch (err) {
        console.error(err);
        alert('خطأ عند حفظ الملف');
      }
    };
    reader.readAsDataURL(f);
  });

  // Honors storage helpers
  function loadHonors(): Honor[] {
    try {
      return JSON.parse(localStorage.getItem(HONORS_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }
  function saveHonors(h: Honor[]) {
    localStorage.setItem(HONORS_KEY, JSON.stringify(h));
  }

  function renderHonorsList() {
    if (!adminHonorsList) return;
    const honors = loadHonors();
    adminHonorsList.innerHTML = '';
    if (honors.length === 0) {
      adminHonorsList.innerHTML = '<p>لا توجد طالبات محفوظات</p>';
      return;
    }
    honors.forEach(h => {
      const el = document.createElement('div');
      el.className = 'admin-honor-item';
      el.innerHTML = `
        <strong>${h.name}</strong> — ${h.grade} / ${h.section} — ${h.category} — ${h.month}/${h.year}
        <div class="admin-honor-actions">
          <button data-id="${h.id}" class="delete-honor-btn">حذف</button>
        </div>
      `;
      adminHonorsList.appendChild(el);
    });
    // attach delete
    adminHonorsList.querySelectorAll('.delete-honor-btn').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        const id = (ev.currentTarget as HTMLElement).getAttribute('data-id');
        if (!id) return;
        let honors = loadHonors();
        honors = honors.filter(x => x.id !== id);
        saveHonors(honors);
        renderHonorsList();
      });
    });
  }

  // Add honor form
  addHonorForm?.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const form = addHonorForm as HTMLFormElement;
    const formData = new FormData(form);
    const name = (formData.get('honor-name') as string) || '';
    const grade = (formData.get('honor-grade') as string) || '';
    const section = (formData.get('honor-section') as string) || '';
    const category = (formData.get('honor-category') as string) || '';
    const reason = (formData.get('honor-reason') as string) || '';
    const status = (formData.get('honor-status') as string) || 'published';
    const month = (formData.get('honor-month') as string) || '';
    const year = (formData.get('honor-year') as string) || '';

    const imageFile = (qs<HTMLInputElement>('#honor-image') as HTMLInputElement | null)?.files?.[0];

    const id = String(Date.now());
    const honor: Honor = {
      id,
      name,
      grade,
      section,
      category,
      reason,
      status,
      month,
      year,
      image: null,
      date: new Date().toISOString()
    };

    if (imageFile) {
      const r = new FileReader();
      r.onload = () => {
        honor.image = r.result as string;
        const arr = loadHonors();
        arr.unshift(honor);
        saveHonors(arr);
        renderHonorsList();
        form.reset();
        alert('تم حفظ الطالبة');
      };
      r.readAsDataURL(imageFile);
    } else {
      const arr = loadHonors();
      arr.unshift(honor);
      saveHonors(arr);
      renderHonorsList();
      form.reset();
      alert('تم حفظ الطالبة');
    }
  });

  // Delete all honors
  deleteAllBtn?.addEventListener('click', () => {
    if (!confirm('هل تريد حذف جميع الطالبات؟')) return;
    saveHonors([]);
    renderHonorsList();
    alert('تم الحذف');
  });

  // Initial render
  renderHonorsList();
}
