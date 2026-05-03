// =============================================
// JOURNEY PAGE — INTERACTIVE LOGIC
// =============================================

const STAGES = [
  {
    id: 1, emoji: '📋', title: 'Voter Registration',
    tag_who: 'Citizens', tag_time: '30–365 days before', tag_law: 'Election Law',
    desc: 'Before anyone can vote, they must register. This process verifies a person\'s identity, citizenship, age, and residency. Registration deadlines vary widely — some countries have automatic registration at birth, others require active enrollment months in advance.',
    who: ['Eligible citizens', 'Election boards', 'State/national govt'],
    what: ['Verify identity & citizenship', 'Confirm residential address', 'Check age eligibility', 'Update voter rolls'],
    why: ['Prevent duplicate voting', 'Ensure accurate voter lists', 'Plan polling resources'],
    visual: 'ballot',
    timeline: { date: 'Up to 365 days before', label: 'Registration opens' }
  },
  {
    id: 2, emoji: '🏛️', title: 'Candidate Filing',
    tag_who: 'Candidates & Parties', tag_time: '6–12 months before', tag_law: 'Candidacy Law',
    desc: 'Candidates formally declare their intention to run. This usually involves submitting paperwork, paying a filing fee, and in some systems gathering a required number of citizen signatures to demonstrate public support.',
    who: ['Aspiring candidates', 'Political parties', 'Election commissions'],
    what: ['Submit declaration of candidacy', 'Pay filing fee', 'Gather petition signatures', 'Declare campaign finances'],
    why: ['Filter serious candidates', 'Ensure legal compliance', 'Organize ballot design'],
    visual: 'doc',
    timeline: { date: '6–12 months before', label: 'Filing period' }
  },
  {
    id: 3, emoji: '🗳️', title: 'Primary Elections',
    tag_who: 'Party Members', tag_time: '3–6 months before', tag_law: 'Party Rules',
    desc: 'In many countries, political parties hold internal elections (primaries or caucuses) to select their official candidate. Voters affiliated with a party choose among several contenders, with the winner earning the right to represent that party in the general election.',
    who: ['Registered party members', 'Independent voters (in open primaries)', 'Party officials'],
    what: ['Cast party preference votes', 'Elect delegates', 'Determine candidate nominations'],
    why: ['Democratic candidate selection', 'Reduce intra-party conflict', 'Build candidate support base'],
    visual: 'count',
    timeline: { date: '3–6 months before', label: 'Primary season' }
  },
  {
    id: 4, emoji: '📢', title: 'Campaign Period',
    tag_who: 'Candidates, Media, Public', tag_time: 'Ongoing until election', tag_law: 'Campaign Finance Law',
    desc: 'Candidates campaign to win voter support through rallies, advertisements, debates, and door-to-door canvassing. Campaign finance laws regulate how much money can be raised and spent, and from which sources.',
    who: ['Candidates & campaign teams', 'Political action committees', 'Media organizations', 'Donors'],
    what: ['Hold rallies and town halls', 'Run advertisements', 'Participate in debates', 'Fundraise and spend within limits'],
    why: ['Inform voters of policy positions', 'Build name recognition', 'Mobilize voter base'],
    visual: 'rally',
    timeline: { date: '3 months – 1 day before', label: 'Campaign season' }
  },
  {
    id: 5, emoji: '📥', title: 'Voting Day',
    tag_who: 'All Registered Voters', tag_time: 'Election Day', tag_law: 'Voting Rights Act',
    desc: 'On election day, registered voters go to their designated polling station (or vote by mail/early). They receive a ballot, mark their choice privately, and submit it. Poll workers verify eligibility and maintain order.',
    who: ['Registered voters', 'Poll workers', 'Election observers', 'Law enforcement'],
    what: ['Verify voter identity', 'Issue ballots', 'Cast votes privately', 'Collect and secure ballots'],
    why: ['Exercise democratic right', 'Ensure secret ballot', 'Maintain election integrity'],
    visual: 'urn',
    timeline: { date: 'Election Day', label: 'Polls open (often 7am–8pm)' }
  },
  {
    id: 6, emoji: '🔢', title: 'Vote Counting',
    tag_who: 'Election Officials', tag_time: 'Election Night / Days after', tag_law: 'Counting Protocol',
    desc: 'After polls close, ballots are counted. This may be done by machine, by hand, or a combination. Results are reported precinct by precinct. Mail-in and provisional ballots often take longer to count. Observers from both parties may watch.',
    who: ['Bipartisan counting teams', 'Canvassing boards', 'Party observers', 'Independent auditors'],
    what: ['Tally machine counts', 'Count mail-in ballots', 'Process provisional ballots', 'Report precinct results'],
    why: ['Determine winner', 'Enable audits and recounts', 'Build public confidence'],
    visual: 'count',
    timeline: { date: 'Election Night / Days after', label: 'Counting & reporting' }
  },
  {
    id: 7, emoji: '⚖️', title: 'Certification & Canvass',
    tag_who: 'Canvassing Boards', tag_time: 'Days to weeks after', tag_law: 'Certification Statute',
    desc: 'Election officials formally certify the results after reviewing all ballots — including provisional and late mail-in ballots. This process includes auditing a random sample of precincts and resolving any disputed ballots.',
    who: ['County/state canvassing boards', 'Secretaries of State', 'Courts (if contested)', 'Bipartisan certifiers'],
    what: ['Audit sample precincts', 'Resolve provisional ballots', 'Issue official vote totals', 'Certify final results'],
    why: ['Legal finality of results', 'Resolve disputes before deadline', 'Trigger transition of power'],
    visual: 'cert',
    timeline: { date: '1–4 weeks after election', label: 'Canvass & certification' }
  },
  {
    id: 8, emoji: '🎉', title: 'Inauguration & Transfer',
    tag_who: 'Elected Official & Outgoing', tag_time: 'Weeks to months after', tag_law: 'Constitutional Mandate',
    desc: 'The winner is sworn into office in a formal ceremony. The outgoing official facilitates the transfer of power — sharing briefings, handing over documents, and vacating offices. In presidential systems this is called the inauguration.',
    who: ['Newly elected official', 'Outgoing officeholder', 'Transition team', 'Chief Justice / official oath-giver'],
    what: ['Take oath of office', 'Receive security briefings', 'Assemble cabinet/staff', 'Assume official duties'],
    why: ['Peaceful transfer of power', 'Democratic continuity', 'Begin new mandate'],
    visual: 'cert',
    timeline: { date: 'Weeks to months later', label: 'Inauguration' }
  }
];

let currentStage = 0;
const visited = new Set();

// RENDER STAGE SELECTOR
function renderSelector() {
  const sel = document.getElementById('stageSelector');
  sel.innerHTML = STAGES.map((s, i) => `
    <button class="stage-btn ${i === currentStage ? 'active' : ''} ${visited.has(i) && i !== currentStage ? 'done' : ''}"
      onclick="goToStage(${i})">
      ${s.emoji} ${s.title}
    </button>
  `).join('');
}

// VISUAL BUILDERS
function buildVisual(type) {
  if (type === 'ballot') return `
    <div class="ballot-visual">
      <div class="ballot-line"></div>
      <div class="ballot-line"></div>
      <div class="ballot-line"></div>
      <div style="margin-top:1rem; display:flex; align-items:center; gap:0.5rem;">
        <div class="ballot-check"></div>
        <div style="height:10px; width:60px; background:var(--border); border-radius:4px;"></div>
      </div>
      <div style="margin-top:0.5rem; display:flex; align-items:center; gap:0.5rem;">
        <div style="width:18px;height:18px;border:2px solid var(--border);border-radius:3px;"></div>
        <div style="height:10px; width:80px; background:var(--border); border-radius:4px;"></div>
      </div>
    </div>`;
  if (type === 'urn') return `
    <div class="urn-visual">
      <div style="font-size:4rem;">🗳️</div>
      <div class="urn-papers" style="margin-top:1rem;">
        <div class="urn-paper"></div>
        <div class="urn-paper"></div>
        <div class="urn-paper"></div>
      </div>
      <p style="font-size:0.78rem;margin-top:0.5rem;color:var(--muted);">Votes being cast</p>
    </div>`;
  if (type === 'count') return `
    <div class="count-visual">
      ${[['68%','#1a3a5c','A'],['45%','#c0392b','B'],['32%','#c8963e','C'],['18%','#1e6b3c','D']]
        .map(([h,c,l]) => `
        <div class="count-bar-wrap">
          <div class="count-bar" style="height:120px;">
            <div class="count-bar-fill" style="background:${c};--h:${h};"></div>
          </div>
          <div class="count-bar-label">${l}</div>
        </div>`).join('')}
    </div>`;
  if (type === 'doc') return `<div style="font-size:5rem;animation:bounce 3s ease-in-out infinite;">📄</div>`;
  if (type === 'rally') return `<div style="font-size:5rem;animation:bounce 2.5s ease-in-out infinite;">📢</div>`;
  if (type === 'cert') return `<div style="font-size:5rem;animation:bounce 3s ease-in-out infinite;">📜</div>`;
  return '';
}

// RENDER MAIN STAGE CARD
function renderStage() {
  visited.add(currentStage);
  const s = STAGES[currentStage];
  const pct = Math.round(((currentStage + 1) / STAGES.length) * 100);
  document.getElementById('journeyProgress').style.width = pct + '%';

  document.getElementById('stageMain').innerHTML = `
    <div class="stage-card">
      <div class="stage-card-top">
        <div>
          <div class="stage-num">0${s.id}</div>
          <span class="stage-emoji">${s.emoji}</span>
          <h2>${s.title}</h2>
          <p>${s.desc}</p>
          <div class="stage-tags">
            <span class="stage-tag tag-who">👥 ${s.tag_who}</span>
            <span class="stage-tag tag-time">🕐 ${s.tag_time}</span>
            <span class="stage-tag tag-law">⚖️ ${s.tag_law}</span>
          </div>
        </div>
        <div class="stage-visual">${buildVisual(s.visual)}</div>
      </div>
      <div class="stage-card-bottom">
        <div class="detail-block">
          <h4>Who's Involved</h4>
          <ul>${s.who.map(x=>`<li>${x}</li>`).join('')}</ul>
        </div>
        <div class="detail-block">
          <h4>What Happens</h4>
          <ul>${s.what.map(x=>`<li>${x}</li>`).join('')}</ul>
        </div>
        <div class="detail-block">
          <h4>Why It Matters</h4>
          <ul>${s.why.map(x=>`<li>${x}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="stage-nav">
        <button class="stage-nav-btn" onclick="goToStage(${currentStage-1})" ${currentStage===0?'disabled style="opacity:0.3;cursor:not-allowed"':''}>← Previous</button>
        <span class="stage-counter">Stage ${currentStage+1} of ${STAGES.length}</span>
        <button class="stage-nav-btn gold" onclick="goToStage(${currentStage+1})" ${currentStage===STAGES.length-1?'disabled style="opacity:0.5;cursor:not-allowed"':''}>
          ${currentStage===STAGES.length-1 ? '✓ Complete' : 'Next →'}
        </button>
      </div>
    </div>`;

  renderSelector();
  renderTimeline();
  window.scrollTo({ top: 200, behavior: 'smooth' });
}

// RENDER TIMELINE
function renderTimeline() {
  document.getElementById('timeline').innerHTML = STAGES.map((s,i) => `
    <div class="tl-item ${i < currentStage ? 'done' : i === currentStage ? 'active' : ''}" onclick="goToStage(${i})">
      <div class="tl-dot"></div>
      <div class="tl-date">${s.timeline.date}</div>
      <div class="tl-title">${s.emoji} ${s.title}</div>
      <div class="tl-desc">${s.timeline.label}</div>
    </div>`).join('');
}

function goToStage(i) {
  if (i < 0 || i >= STAGES.length) return;
  currentStage = i;
  renderStage();
}

// NAV
document.getElementById('hamburger')?.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

// INIT
renderStage();
