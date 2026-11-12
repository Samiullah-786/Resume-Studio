const STORAGE_KEY = 'resume-studio-v1';
const DEFAULTS = {
  fields: {
    name: 'Sami Ullah Khan',
    title: 'Web Developer',
    email: 'you@example.com',
    phone: '+92 300 0000000',
    location: 'Lahore, Pakistan',
    link: 'github.com/Samiullah-786',
    summary: 'JavaScript developer who builds responsive web experiences and interactive applications. Interested in clean interfaces, practical automation, and thoughtful product design.',
    skills: 'JavaScript, HTML, CSS, Node.js, Git & GitHub, Responsive UI'
  },
  experience: [{
    role: 'Web Developer',
    company: 'Independent Projects',
    location: 'Lahore, Pakistan',
    dates: '',
    description: 'Built responsive portfolio and interactive web apps using JavaScript, HTML, and CSS.\nIntegrated public APIs and refined mobile-first user experiences.'
  }],
  education: [],
  projects: [],
  template: 'modern',
  accent: '#3867d6'
};
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sheet = $('#resumeSheet');
let state = loadState();
let saveTimer;
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? {
      ...structuredClone(DEFAULTS),
      ...JSON.parse(saved), fields: {
        ...DEFAULTS.fields,
        ...(JSON.parse(saved).fields || {})
      }
    } : structuredClone(DEFAULTS)
  } catch { return structuredClone(DEFAULTS) }
}
function safeText(value) {
  return String(value || '').trim()
}
function setText(el, value, fallback = '') {
  el.textContent = safeText(value) || fallback
}
function renderContact(fields) {
  const box = $('#previewContact'); box.replaceChildren();
  [['email', fields.email],
  ['phone', fields.phone],
  ['location', fields.location],
  ['link', fields.link]].forEach(([type, value]) => {
    value = safeText(value);
    if (!value)
      return;
    const row = document.createElement('div'); row.textContent = value; box.appendChild(row)
  })
}
function renderEntries(type, containerId) {
  const container = $(containerId);
  container.replaceChildren();
  const list = state[type] || [];
  if (!list.length) {
    const empty = document.createElement('p');
    empty.className = 'preview-summary';
    empty.textContent = type === 'experience' ? 'Add a role or project to show your experience.' : type === 'projects' ? 'Add a project with your contribution and outcome.' : 'Add a school, course, or qualification.';
    container.appendChild(empty);
    return
  } list.forEach(item => {
    const entry = document.createElement('div');
    entry.className = 'resume-entry';
    const top = document.createElement('div');
    top.className = 'entry-top';
    const role = document.createElement('strong');
    role.textContent = safeText(item.role) || (type === 'experience' ? 'Role / project' : 'Degree / qualification');
    const date = document.createElement('span');
    date.className = 'entry-date'; date.textContent = safeText(item.dates);
    top.append(role, date); entry.appendChild(top);
    const sub = document.createElement('p');
    sub.className = 'entry-sub';
    sub.textContent = [
      safeText(item.company),
      safeText(item.location)].filter(Boolean).join(' · ');
    if (sub.textContent) entry.appendChild(sub);
    if (item.description) {
      const desc = document.createElement('p');
      desc.className = 'entry-description';
      desc.textContent = safeText(item.description);
      entry.appendChild(desc)
    } container.appendChild(entry)
  })
}
function renderSkills() {
  const skills = safeText(state.fields.skills).split(',').map(x => x.trim()).filter(Boolean);
  const chips = $('#skillChips');
  chips.replaceChildren();
  skills.forEach(skill => {
    const chip = document.createElement('span');
    chip.className = 'skill-chip';
    chip.textContent = skill;
    chips.appendChild(chip)
  });
  const preview = $('#previewSkills');
  preview.replaceChildren();
  (skills.length ? skills : ['Add your skills in the editor']).forEach(skill => {
    const chip = document.createElement('span');
    chip.textContent = skill;
    preview.appendChild(chip)
  })
}
function atsChecks() {
  const f = state.fields;
  const skills = f.skills.split(',').map(x => x.trim()).filter(Boolean);
  return [{
    ok: !!f.name.trim(),
    label: 'Add your full name',
    note: 'Use the name you want employers to recognize.',
    weight: 10
  },
  {
    ok: !!f.title.trim(),
    label: 'Add a target job title',
    note: 'Tailor it to the role you are applying for.',
    weight: 10
  },
  {
    ok: !!(f.email.trim() || f.phone.trim()),
    label: 'Add at least one contact method',
    note: 'Use a professional email or phone number.',
    weight: 10
  },
  {
    ok: f.summary.trim().length >= 80,
    label: 'Write a focused professional summary',
    note: 'Aim for 80+ characters that describe strengths and value.',
    weight: 15
  },
  {
    ok: state.experience.some(x => x.role.trim() && x.description.trim()),
    label: 'Describe experience with outcomes',
    note: 'Start bullets with strong verbs; add measurable impact where possible.',
    weight: 20
  },
  {
    ok: skills.length >= 4,
    label: 'Add at least four relevant skills',
    note: 'Mirror the skills requested in the job description.',
    weight: 20
  },
  {
    ok: state.education.some(x => x.role.trim() || x.company.trim()) || state.projects.some(x => x.role.trim() && x.description.trim()),
    label: 'Add education or a featured project',
    note: 'Include a qualification or project that supports your application.',
    weight: 15
  }]
}
function atsScore() {
  return atsChecks().reduce((sum, item) => sum + (item.ok ? item.weight : 0), 0)
}
function renderAtsChecklist() {
  const box = $('#atsChecklist');
  box.replaceChildren(); const checks = atsChecks();
  checks.forEach(item => {
    const row = document.createElement('div');
    row.className = `ats-check ${item.ok ? 'is-done' : 'is-open'}`;
    const icon = document.createElement('span');
    icon.className = 'ats-check-icon';
    icon.textContent = item.ok ? '✓' : '＋';
    const copy = document.createElement('span');
    copy.className = 'ats-check-copy';
    const title = document.createElement('b');
    title.textContent = item.label;
    const note = document.createElement('small');
    note.textContent = item.note; copy.append(title, note);
    row.append(icon, copy); box.appendChild(row)
  })
}
function updatePreview() {
  const f = state.fields;
  setText($('#previewName'), f.name, 'Your Name');
  setText($('#previewTitle'), f.title, 'Professional Title');
  setText($('#previewSummary'), f.summary, 'Your professional summary will appear here. Describe what you do, what you do well, and the value you bring.');
  renderContact(f);
  renderEntries('experience', '#previewExperience');
  renderEntries('education', '#previewEducation');
  renderEntries('projects', '#previewProjects');
  renderSkills();
  $('#summaryCount').textContent = f.summary.length;
  const score = atsScore(); $('#scoreValue').textContent = score;
  $('#scoreRing').style.setProperty('--score', `${score * 3.6}deg`);
  $('#scoreRing').style.background = `conic-gradient(#2dbd91 ${score * 3.6}deg,#e5ebf4 0deg)`;
  $('#completionBar').style.width = `${score}%`;
  sheet.style.setProperty('--accent', state.accent);
  sheet.classList.toggle('classic', state.template === 'classic');
  sheet.classList.toggle('modern', state.template === 'modern');
  sheet.classList.toggle('executive', state.template === 'executive');
  renderAtsChecklist();
  scheduleSave()
}
function bindFields() {
  $$('[data-field]').forEach(input => {
    input.value = state.fields[input.dataset.field] || '';
    input.addEventListener('input', () => {
      state.fields[input.dataset.field] = input.value; updatePreview()
    })
  })
}
const schemas = {
  experience: [
    ['role', 'Role / position'],
    ['company', 'Company / organization'],
    ['location', 'Location'],
    ['dates', 'Dates (e.g. 2022 — 2024)'],
    ['description', 'Impact and responsibilities']
  ],
  education: [
    ['role', 'Degree / qualification'],
    ['company', 'School / institution'],
    ['location', 'Location'],
    ['dates', 'Dates'],
    ['description', 'Relevant details (optional)']
  ],
  projects: [
    ['role', 'Project name'],
    ['company', 'Role / link / client'],
    ['location', 'Tools / stack'],
    ['dates', 'Year or duration'],
    ['description', 'What you built and its impact']
  ]
};
function renderRepeat(type, containerId) {
  const container = $(containerId);
  container.replaceChildren();
  state[type].forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'repeat-item';
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'remove-row';
    remove.setAttribute('aria-label', `Remove ${type} item ${index + 1}`);
    remove.textContent = '×';
    remove.addEventListener('click', () => {
      state[type].splice(index, 1);
      renderRepeat(type, containerId);
      updatePreview()
    });
    card.appendChild(remove);
    const grid = document.createElement('div');
    grid.className = 'repeat-item-grid';
    schemas[type].forEach(([key, label]) => {
      const wrap = document.createElement('label');
      wrap.textContent = label;
      const control = key === 'description' ? document.createElement('textarea') : document.createElement('input');
      control.value = item[key] || ''; control.placeholder = label;
      control.dataset.key = key; if (key === 'description') wrap.classList.add('wide');
      control.addEventListener('input', () => {
        state[type][index][key] = control.value;
        updatePreview()
      }); wrap.appendChild(control); grid.appendChild(wrap)
    });
    card.appendChild(grid);
    container.appendChild(card)
  })
}
function addItem(type, containerId) {
  state[type].push({
    role: '',
    company: '',
    location: '',
    dates: '',
    description: ''
  });
  renderRepeat(type, containerId);
  const controls = $$('[data-key]', $(containerId));
  controls[controls.length - schemas[type].length]?.focus();
  updatePreview()
}
function scheduleSave() {
  clearTimeout(saveTimer);
  $('#saveState').innerHTML = '<i></i> Saving…';
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      $('#saveState').innerHTML = '<i></i> Draft saved locally'
    } catch {
      $('#saveState').innerHTML = '<i></i> Local saving unavailable'
    }
  }, 250)
}

let toastTimer;
function toast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2300)
}
$('#addExperience').addEventListener('click', () => addItem('experience', '#experienceFields'));
$('#addProject').addEventListener('click', () => addItem('projects', '#projectFields'));
$('#addEducation').addEventListener('click', () => addItem('education', '#educationFields'));
$('#templateSelect').value = state.template; $('#templateSelect').addEventListener('change', e => {
  state.template = e.target.value; updatePreview()
});
$('#accentPicker').value = state.accent; $('#accentPicker').addEventListener('input', e => {
  state.accent = e.target.value; updatePreview()
});
$('#printBtn').addEventListener('click', () => window.print());
$('#resetBtn').addEventListener('click', () => {
  if (!confirm('Reset your resume draft to the sample content?'))
    return; state = structuredClone(DEFAULTS);
  $$('[data-field]').forEach(input => input.value = state.fields[input.dataset.field] || '');
  renderRepeat('experience', '#experienceFields');
  renderRepeat('education', '#educationFields');
  renderRepeat('projects', '#projectFields');
  $('#templateSelect').value = state.template;
  $('#accentPicker').value = state.accent;
  updatePreview();
  toast('Draft reset to sample content')
});

const atsDialog = $('#atsDialog');
$('#atsDetails').addEventListener('click', () => atsDialog.showModal());
$('#closeAts').addEventListener('click', () => atsDialog.close());
atsDialog.addEventListener('click', e => {
  if (e.target === atsDialog) atsDialog.close()
});
$('#backupBtn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], {
    type: 'application/json'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'resume-studio-backup.json';
  a.click(); URL.revokeObjectURL(url);
  toast('Resume backup downloaded')
});
$('#restoreBtn').addEventListener('click', () => $('#restoreFile').click());
$('#restoreFile').addEventListener('change', async e => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const incoming = JSON.parse(await file.text());
    if (!incoming.fields || !Array.isArray(incoming.experience) || !Array.isArray(incoming.education)) throw new Error('Invalid resume backup');
    state = {
      ...structuredClone(DEFAULTS), ...incoming,
      fields: { ...DEFAULTS.fields, ...incoming.fields },
      projects: Array.isArray(incoming.projects) ? incoming.projects : []
    };
    $$('[data-field]').forEach(input => input.value = state.fields[input.dataset.field] || '');
    renderRepeat('experience', '#experienceFields');
    renderRepeat('education', '#educationFields');
    renderRepeat('projects', '#projectFields');
    $('#templateSelect').value = state.template;
    $('#accentPicker').value = state.accent;
    updatePreview();
    toast('Resume backup restored')
  } catch {
    toast('Could not read that backup file')
  }
  finally {
    e.target.value = ''
  }
});
bindFields();
renderRepeat('experience', '#experienceFields');
renderRepeat('education', '#educationFields');
renderRepeat('projects', '#projectFields');
updatePreview();