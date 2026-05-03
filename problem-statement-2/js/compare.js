// =============================================
// COMPARE PAGE — COUNTRY DATA & LOGIC
// =============================================

const COUNTRIES = {
  us: {
    name: 'United States', flag: '🇺🇸', system: 'Federal Republic',
    voting_method: 'First-Past-the-Post', registration: 'Active (vary by state)',
    term: '4 years (President)', turnout: '~56%', age: '18', women_pct: '27%',
    electoral: 'Electoral College (winner-take-all)', campaign_finance: 'PACs allowed (unlimited)',
    id_required: 'Varies by state', mail_in: 'Available in most states',
    democracy_score: [7, 6, 8, 5, 9, 7, 6],
    note: 'Two-party dominated system; winner determined by Electoral College, not popular vote.'
  },
  uk: {
    name: 'United Kingdom', flag: '🇬🇧', system: 'Constitutional Monarchy',
    voting_method: 'First-Past-the-Post', registration: 'Active (easy online)',
    term: 'Up to 5 years (Parliament)', turnout: '~67%', age: '18', women_pct: '35%',
    electoral: 'Parliamentary — PM leads largest party', campaign_finance: 'Strict spending caps',
    id_required: 'Photo ID required (since 2023)', mail_in: 'Available on request',
    democracy_score: [8, 8, 9, 7, 8, 8, 9],
    note: 'Parliamentary system where citizens vote for MPs, not directly for Prime Minister.'
  },
  de: {
    name: 'Germany', flag: '🇩🇪', system: 'Federal Republic',
    voting_method: 'Mixed-Member Proportional', registration: 'Automatic (resident registration)',
    term: '4 years (Bundestag)', turnout: '~77%', age: '18', women_pct: '35%',
    electoral: 'Proportional representation hybrid', campaign_finance: 'State funding + private caps',
    id_required: 'Yes', mail_in: 'Widely used (postal voting)',
    democracy_score: [9, 9, 9, 8, 7, 9, 8],
    note: 'Uses two-vote system: one for local rep, one for party — leads to coalition governments.'
  },
  fr: {
    name: 'France', flag: '🇫🇷', system: 'Semi-Presidential Republic',
    voting_method: 'Two-Round System', registration: 'Automatic at 18',
    term: '5 years (President)', turnout: '~72%', age: '18', women_pct: '38%',
    electoral: 'Direct popular vote (two rounds)', campaign_finance: 'Strict caps, state reimbursement',
    id_required: 'Yes', mail_in: 'Very limited (proxyvoting)',
    democracy_score: [8, 8, 8, 7, 8, 8, 8],
    note: 'If no candidate wins 50%+ in round one, top two face off in a second round two weeks later.'
  },
  in: {
    name: 'India', flag: '🇮🇳', system: 'Federal Parliamentary Republic',
    voting_method: 'First-Past-the-Post', registration: 'Active (Voter ID card)',
    term: '5 years (Lok Sabha)', turnout: '~67%', age: '18', women_pct: '15%',
    electoral: 'Parliamentary — PM leads majority coalition', campaign_finance: 'Capped, partially enforced',
    id_required: 'Voter ID (EPIC) required', mail_in: 'Limited (postal + EVMs)',
    democracy_score: [7, 5, 7, 6, 6, 6, 7],
    note: "World's largest democracy by voters (~970M eligible). Uses Electronic Voting Machines (EVMs)."
  },
  au: {
    name: 'Australia', flag: '🇦🇺', system: 'Federal Parliamentary Democracy',
    voting_method: 'Preferential (Ranked Choice)', registration: 'Compulsory',
    term: '3 years (House of Reps)', turnout: '~91% (compulsory)', age: '18', women_pct: '38%',
    electoral: 'Preferential voting — candidates ranked', campaign_finance: 'Disclosure required',
    id_required: 'Name check only', mail_in: 'Postal vote available',
    democracy_score: [9, 9, 9, 8, 8, 9, 9],
    note: 'Voting is compulsory — fines apply for non-voters. Uses ranked-choice (preferential) voting.'
  },
  br: {
    name: 'Brazil', flag: '🇧🇷', system: 'Federal Presidential Republic',
    voting_method: 'Two-Round System', registration: 'Compulsory (18–70)',
    term: '4 years (President)', turnout: '~79%', age: '16 (optional)', women_pct: '17%',
    electoral: 'Direct election — electronic voting machines', campaign_finance: 'Public funding only (since 2017)',
    id_required: 'Voter card required', mail_in: 'Not widely available',
    democracy_score: [7, 6, 7, 6, 7, 6, 6],
    note: 'Uses electronic voting machines since 1996. Voting compulsory for citizens 18–70.'
  },
  se: {
    name: 'Sweden', flag: '🇸🇪', system: 'Constitutional Monarchy',
    voting_method: 'Party-List Proportional', registration: 'Automatic',
    term: '4 years (Riksdag)', turnout: '~87%', age: '18', women_pct: '47%',
    electoral: 'Proportional — parties win seats by vote share', campaign_finance: 'Largely state-funded',
    id_required: 'ID check at polls', mail_in: 'Early voting widely available',
    democracy_score: [10, 9, 10, 9, 9, 10, 9],
    note: 'Consistently rated one of the world\'s most functional democracies. High voter turnout.'
  },
  jp: {
    name: 'Japan', flag: '🇯🇵', system: 'Constitutional Monarchy',
    voting_method: 'Mixed (SNTV + PR)', registration: 'Automatic via residency',
    term: '4 years (Lower House)', turnout: '~54%', age: '18', women_pct: '10%',
    electoral: 'Parallel mixed system', campaign_finance: 'Very strict restrictions',
    id_required: 'Voter card + ID', mail_in: 'Absentee available',
    democracy_score: [8, 7, 8, 6, 7, 7, 6],
    note: 'One of the strictest campaign regulations — limits on posters, canvassing, and online activity.'
  },
  ng: {
    name: 'Nigeria', flag: '🇳🇬', system: 'Federal Presidential Republic',
    voting_method: 'First-Past-the-Post', registration: 'Active (INEC)',
    term: '4 years (President)', turnout: '~27%', age: '18', women_pct: '3%',
    electoral: 'Direct popular vote with geographic spread req.', campaign_finance: 'Regulated, enforcement weak',
    id_required: 'PVC (Permanent Voter Card)', mail_in: 'Not available',
    democracy_score: [4, 3, 5, 4, 5, 3, 4],
    note: 'Must win 25%+ of votes in 24 of 36 states AND a plurality — unique geographic spread requirement.'
  }
};

const DIMENSIONS = [
  { key: 'voting_method', label: 'Voting Method', icon: '🗳️' },
  { key: 'registration', label: 'Voter Registration', icon: '📋' },
  { key: 'electoral', label: 'Electoral System', icon: '🏛️' },
  { key: 'term', label: 'Term Length', icon: '📅' },
  { key: 'turnout', label: 'Voter Turnout', icon: '📊' },
  { key: 'age', label: 'Voting Age', icon: '🎂' },
  { key: 'women_pct', label: 'Women in Legislature', icon: '♀️' },
  { key: 'id_required', label: 'ID Required', icon: '🪪' },
  { key: 'mail_in', label: 'Mail-In Voting', icon: '📮' },
  { key: 'campaign_finance', label: 'Campaign Finance', icon: '💰' },
];

const RADAR_LABELS = ['Civil Liberties', 'Free Elections', 'Rule of Law', 'Participation', 'Transparency', 'Press Freedom', 'Gender Equity'];

// Populate selects
function populateSelects() {
  const a = document.getElementById('countryA');
  const b = document.getElementById('countryB');
  Object.entries(COUNTRIES).forEach(([key, c]) => {
    a.add(new Option(`${c.flag} ${c.name}`, key));
    b.add(new Option(`${c.flag} ${c.name}`, key));
  });
  a.value = 'us'; b.value = 'de';
}

function renderComparison() {
  const keyA = document.getElementById('countryA').value;
  const keyB = document.getElementById('countryB').value;
  const A = COUNTRIES[keyA], B = COUNTRIES[keyB];

  let html = `
    <div class="compare-header">
      <div class="compare-header-cell empty"></div>
      <div class="compare-header-cell">
        <div class="compare-flag">${A.flag}</div>
        <h3>${A.name}</h3>
        <p>${A.system}</p>
      </div>
      <div class="compare-header-cell">
        <div class="compare-flag">${B.flag}</div>
        <h3>${B.name}</h3>
        <p>${B.system}</p>
      </div>
    </div>`;

  DIMENSIONS.forEach(d => {
    html += `
      <div class="compare-row">
        <div class="compare-label"><span class="compare-label-icon">${d.icon}</span>${d.label}</div>
        <div class="compare-cell"><div class="value">${A[d.key]}</div></div>
        <div class="compare-cell"><div class="value">${B[d.key]}</div></div>
      </div>`;
  });

  // Notes
  html += `
    <div class="compare-row" style="margin-top:1rem;">
      <div class="compare-label"><span class="compare-label-icon">💡</span>Key Fact</div>
      <div class="compare-cell"><div class="sub">${A.note}</div></div>
      <div class="compare-cell"><div class="sub">${B.note}</div></div>
    </div>`;

  document.getElementById('compareMain').innerHTML = html;
  renderRadar(A, B, keyA, keyB);
}

function renderRadar(A, B, kA, kB) {
  const canvas = document.getElementById('radarChart');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const cx = W/2, cy = H/2, r = Math.min(W,H)/2 - 50;
  const n = RADAR_LABELS.length;

  ctx.clearRect(0, 0, W, H);

  // Grid circles
  for (let i = 1; i <= 5; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy, r * i / 5, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Spokes and labels
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const x = cx + r * Math.cos(angle), y = cy + r * Math.sin(angle);
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y);
    ctx.strokeStyle = 'rgba(0,0,0,0.1)'; ctx.stroke();
    const lx = cx + (r + 28) * Math.cos(angle), ly = cy + (r + 28) * Math.sin(angle);
    ctx.fillStyle = '#6b6560'; ctx.font = '10px DM Sans, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(RADAR_LABELS[i], lx, ly);
  }

  function drawPoly(scores, color, fill) {
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const val = scores[i] / 10;
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const x = cx + r * val * Math.cos(angle), y = cy + r * val * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = fill; ctx.fill();
    ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.stroke();
  }

  drawPoly(A.democracy_score, '#1a3a5c', 'rgba(26,58,92,0.15)');
  drawPoly(B.democracy_score, '#c8963e', 'rgba(200,150,62,0.15)');

  // Legend
  const leg = document.getElementById('radarLegend');
  leg.innerHTML = `
    <div class="radar-legend-item"><div class="radar-dot" style="background:#1a3a5c"></div><strong>${A.flag} ${A.name}</strong></div>
    <div style="font-size:0.8rem;color:var(--muted);margin-bottom:1rem;padding-left:1.75rem;">Score: ${A.democracy_score.join(', ')}</div>
    <div class="radar-legend-item"><div class="radar-dot" style="background:#c8963e"></div><strong>${B.flag} ${B.name}</strong></div>
    <div style="font-size:0.8rem;color:var(--muted);padding-left:1.75rem;">Score: ${B.democracy_score.join(', ')}</div>
    <p style="margin-top:1.5rem;font-size:0.78rem;">Scores are illustrative, based on aggregated democracy indices (EIU, Freedom House, V-Dem).</p>`;
}

document.getElementById('hamburger')?.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

populateSelects();
renderComparison();
