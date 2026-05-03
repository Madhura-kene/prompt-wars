// =============================================
// ELECTION SIMULATOR — FULL SCENARIO ENGINE
// =============================================

const SCENARIOS = [
  {
    day: 1, stage: 'Voter Registration',
    icon: '📋', title: 'Registration Deadline Crisis',
    desc: 'You\'re the Election Director. It\'s 2 weeks before the registration deadline. Your online portal crashed this morning — 50,000 people can\'t register.',
    context: 'Tech team says a fix will take 3–5 days. Advocacy groups are threatening legal action. The media is calling.',
    choices: [
      { letter: 'A', title: 'Extend the deadline by 1 week', detail: 'Give all voters time to register. Requires emergency court order.', trust: +10, turnout: +15, legal: -5 },
      { letter: 'B', title: 'Open emergency in-person centers', detail: 'Set up 10 additional registration sites across the county.', trust: +5, turnout: +8, legal: +5 },
      { letter: 'C', title: 'Accept paper registration only', detail: 'Announce paper forms as fallback. Manual processing required.', trust: 0, turnout: +3, legal: +8 },
      { letter: 'D', title: 'Do nothing — deadline stands', detail: 'Issue a statement. Tech team working on it.', trust: -15, turnout: -10, legal: 0 }
    ]
  },
  {
    day: 8, stage: 'Candidate Verification',
    icon: '📝', title: 'Contested Candidacy',
    desc: 'A candidate has submitted signatures, but 30% are flagged as potentially invalid. The candidate is well-known. Opponents are calling for disqualification.',
    context: 'State law requires 5,000 valid signatures. Candidate submitted 6,800 but 2,100 are disputed.',
    choices: [
      { letter: 'A', title: 'Full independent audit of signatures', detail: 'Hire third-party auditors. Takes 2 weeks, very accurate.', trust: +12, turnout: 0, legal: +12 },
      { letter: 'B', title: 'Quick in-house review (3 days)', detail: 'Your staff reviews disputed signatures. Faster but less rigorous.', trust: -3, turnout: 0, legal: +4 },
      { letter: 'C', title: 'Accept the candidacy as-is', detail: 'Candidate has enough valid signatures if only 10% are truly invalid.', trust: -8, turnout: 0, legal: -10 },
      { letter: 'D', title: 'Give candidate 5 days to replace disputed signatures', detail: 'Allow curative supplement of valid signatures.', trust: +5, turnout: 0, legal: +6 }
    ]
  },
  {
    day: 20, stage: 'Polling Station Setup',
    icon: '🏫', title: 'Polling Location Shortage',
    desc: 'Budget cuts mean you must reduce polling stations by 20%. Two options: cut locations in high-density urban areas or low-density rural areas.',
    context: 'Urban precincts have more voters per station (long lines risk). Rural voters face longer drives.',
    choices: [
      { letter: 'A', title: 'Cut 20% from rural stations', detail: 'Fewer trips, less impact per station. Rural voters drive further.', trust: -8, turnout: -12, legal: -3 },
      { letter: 'B', title: 'Cut 20% from urban stations', detail: 'Urban voters face longer lines and potential suppression claims.', trust: -12, turnout: -18, legal: -8 },
      { letter: 'C', title: 'Evenly distribute cuts + expand mail-in voting', detail: '10% cut everywhere, promote mail-in as alternative.', trust: +3, turnout: -5, legal: +5 },
      { letter: 'D', title: 'Push for emergency budget from City Council', detail: 'Lobby hard. 60% chance of success. May take 2 more weeks.', trust: +8, turnout: 0, legal: +8 }
    ]
  },
  {
    day: 35, stage: 'Election Eve',
    icon: '🌙', title: 'Disinformation Storm',
    desc: 'The night before the election, viral social media posts claim your office changed polling locations. They didn\'t — but the posts are spreading fast.',
    context: 'Posts have 500K views. Local TV is asking for comment. You have 3 hours before midnight.',
    choices: [
      { letter: 'A', title: 'Hold emergency press conference NOW', detail: 'Directly rebut the misinformation on camera.', trust: +15, turnout: +5, legal: 0 },
      { letter: 'B', title: 'Release official statement via website only', detail: 'Clear and factual but may not reach the viral audience.', trust: +4, turnout: 0, legal: +2 },
      { letter: 'C', title: 'Call TV stations directly with the truth', detail: 'Request on-air corrections. Takes 1–2 hours.', trust: +8, turnout: +3, legal: 0 },
      { letter: 'D', title: 'No response — don\'t amplify', detail: 'Strategy: ignore it. Risk: confusion grows overnight.', trust: -12, turnout: -8, legal: 0 }
    ]
  },
  {
    day: 36, stage: 'Election Day',
    icon: '🗳️', title: 'Machine Malfunction — District 7',
    desc: 'It\'s 10:30 AM. Voting machines in 3 precincts of District 7 have failed. 400 voters have been turned away. Polls close at 8 PM.',
    context: 'Tech repair ETA: 4 hours. You have paper ballots in storage. Election law allows provisional ballots.',
    choices: [
      { letter: 'A', title: 'Deploy paper ballots immediately', detail: 'Slower process, but voting continues uninterrupted.', trust: +10, turnout: +12, legal: +8 },
      { letter: 'B', title: 'Wait for machines — extend those precincts\' hours by 2 hours', detail: 'Voters can come back. Requires judge approval.', trust: +5, turnout: +6, legal: +3 },
      { letter: 'C', title: 'Issue provisional ballots to all affected voters', detail: 'Ballots counted later after verification.', trust: +4, turnout: +5, legal: +10 },
      { letter: 'D', title: 'Transport voters to nearest working precinct', detail: 'Provide free shuttle buses to nearby polling locations.', trust: +6, turnout: +8, legal: +5 }
    ]
  },
  {
    day: 37, stage: 'Vote Counting',
    icon: '🔢', title: 'The Recount Request',
    desc: 'Results show Candidate A leads by 0.4%. Candidate B\'s team requests a full hand recount. Your staff is exhausted. Media is pressing for results.',
    context: 'A 0.4% margin triggers automatic recount eligibility under state law. Estimated time: 5 days.',
    choices: [
      { letter: 'A', title: 'Begin full hand recount immediately', detail: 'Transparent, thorough. Takes 5 days but bulletproof result.', trust: +15, turnout: 0, legal: +12 },
      { letter: 'B', title: 'Audit a 5% sample first, full recount if discrepancy found', detail: 'Faster screening before committing to full recount.', trust: +5, turnout: 0, legal: +6 },
      { letter: 'C', title: 'Machine recount only (1 day)', detail: 'Quick, but may not satisfy concerns about machine accuracy.', trust: -3, turnout: 0, legal: +3 },
      { letter: 'D', title: 'Deny the recount — margin is above threshold', detail: 'Your legal team says 0.4% may be above automatic recount trigger.', trust: -18, turnout: 0, legal: -10 }
    ]
  },
  {
    day: 42, stage: 'Certification',
    icon: '📜', title: 'Board Member Refuses to Certify',
    desc: 'One of three canvassing board members refuses to certify the results, citing unsubstantiated fraud claims. Certification deadline is in 24 hours.',
    context: 'No credible evidence of fraud has been presented. Courts have dismissed three related suits.',
    choices: [
      { letter: 'A', title: 'File emergency court order to compel certification', detail: 'Legal precedent is clear. Likely to succeed in 6–8 hours.', trust: +12, turnout: 0, legal: +15 },
      { letter: 'B', title: 'Certify with the two agreeing board members', detail: 'Legal if majority agrees. Creates optics of controversy.', trust: -5, turnout: 0, legal: +4 },
      { letter: 'C', title: 'Request state oversight — escalate to Secretary of State', detail: 'Proper escalation channel. Slight delay.', trust: +6, turnout: 0, legal: +10 },
      { letter: 'D', title: 'Negotiate — offer a public hearing for concerns', detail: 'Try to bring board member on board through process.', trust: +3, turnout: 0, legal: +5 }
    ]
  },
  {
    day: 50, stage: 'Post-Election',
    icon: '🏛️', title: 'Transition of Power',
    desc: 'The winner has been certified. The outgoing official is refusing to cooperate with the transition team — blocking access to budget files and key staff.',
    context: 'The inauguration is in 30 days. Critical infrastructure decisions must be made.',
    choices: [
      { letter: 'A', title: 'Invoke legal authority — demand access formally', detail: 'Send official demand letter backed by statute.', trust: +10, turnout: 0, legal: +12 },
      { letter: 'B', title: 'Work around it — build parallel transition team', detail: 'Start fresh with available public records.', trust: +2, turnout: 0, legal: +4 },
      { letter: 'C', title: 'Engage independent mediator', detail: 'Neutral third party facilitates cooperation.', trust: +8, turnout: 0, legal: +6 },
      { letter: 'D', title: 'Escalate publicly — hold press conference', detail: 'Pressure through public opinion. Risk of politicization.', trust: -4, turnout: 0, legal: +2 }
    ]
  }
];

let state = {
  scenario: 0,
  trust: 75, turnout: 50, legal: 90,
  history: [],
  phase: 'scene' // 'scene' | 'outcome' | 'final'
};

let lastOutcome = null;

function updateBars() {
  const clamp = (v) => Math.min(100, Math.max(0, v));
  state.trust   = clamp(state.trust);
  state.turnout = clamp(state.turnout);
  state.legal   = clamp(state.legal);

  document.getElementById('trustBar').style.width   = state.trust + '%';
  document.getElementById('turnoutBar').style.width = state.turnout + '%';
  document.getElementById('legalBar').style.width   = state.legal + '%';
  document.getElementById('trustVal').textContent   = state.trust;
  document.getElementById('turnoutVal').textContent = state.turnout;
  document.getElementById('legalVal').textContent   = state.legal;

  const s = SCENARIOS[state.scenario] || SCENARIOS[SCENARIOS.length - 1];
  document.getElementById('dayNum').textContent = s.day;
}

function getEffectLabel(val, label) {
  if (val === 0) return `<span class="effect-chip effect-neu">= ${label}</span>`;
  const cl = val > 0 ? 'effect-pos' : 'effect-neg';
  const sym = val > 0 ? '+' : '';
  return `<span class="effect-chip ${cl}">${sym}${val} ${label}</span>`;
}

function renderScene() {
  const s = SCENARIOS[state.scenario];
  document.getElementById('simScene').innerHTML = `
    <div class="scene-header">
      <div>
        <div class="scene-stage-badge">Stage: ${s.stage}</div>
      </div>
      <div class="scene-icon">${s.icon}</div>
      <div class="scene-content">
        <h2 class="scene-title">${s.title}</h2>
        <p class="scene-desc">${s.desc}</p>
      </div>
    </div>
    <div class="scene-context"><strong>Context</strong>${s.context}</div>
    <div class="scene-choices">
      <h4>What do you do?</h4>
      ${s.choices.map((c,i) => `
        <button class="choice-btn" onclick="makeChoice(${i})">
          <div class="choice-letter">${c.letter}</div>
          <div class="choice-text">
            <strong>${c.title}</strong>
            <span>${c.detail}</span>
          </div>
        </button>`).join('')}
    </div>`;
}

function makeChoice(idx) {
  const s  = SCENARIOS[state.scenario];
  const ch = s.choices[idx];
  lastOutcome = ch;

  state.trust   += ch.trust;
  state.turnout += ch.turnout;
  state.legal   += ch.legal;
  state.history.push({ day: s.day, stage: s.stage, choice: ch.title });

  updateBars();
  renderOutcome(s, ch);
  renderHistory();
}

function renderOutcome(s, ch) {
  const icon = ch.trust + ch.turnout + ch.legal > 0 ? '✅' : ch.trust + ch.legal < -15 ? '⚠️' : '📋';
  document.getElementById('simScene').innerHTML = `
    <div class="outcome-card">
      <div class="outcome-header">
        <div class="outcome-icon">${icon}</div>
        <div>
          <div class="scene-stage-badge">Outcome — ${s.stage}</div>
          <h3 class="outcome-title">You chose: "${ch.title}"</h3>
        </div>
      </div>
      <p class="outcome-desc">${getOutcomeDesc(s, ch)}</p>
      <div class="outcome-effects">
        ${getEffectLabel(ch.trust, 'Public Trust')}
        ${getEffectLabel(ch.turnout, 'Voter Turnout')}
        ${getEffectLabel(ch.legal, 'Legal Compliance')}
      </div>
      <button class="btn-next" onclick="nextScenario()">
        ${state.scenario + 1 >= SCENARIOS.length ? 'See Final Results →' : 'Next Scenario →'}
      </button>
    </div>`;
}

function getOutcomeDesc(s, ch) {
  const score = ch.trust + ch.turnout + ch.legal;
  if (score > 15)  return `An excellent call. Your decisive action built public confidence and maintained the election's integrity. This is exactly the kind of leadership democratic institutions rely on.`;
  if (score > 5)   return `A reasonable decision. You managed competing pressures effectively, though some stakeholders remain uncertain. Monitoring the situation closely will be important.`;
  if (score > -5)  return `A neutral choice. You maintained the status quo without making things worse. But some voters and observers may question whether more decisive action was needed.`;
  if (score > -15) return `A difficult choice. While it may have been expedient, it created real concerns about fairness and trust. The public will be watching next steps closely.`;
  return `This decision has significantly damaged confidence in the election process. Critics are mobilizing. You'll need to work hard to restore trust in the remaining stages.`;
}

function nextScenario() {
  state.scenario++;
  if (state.scenario >= SCENARIOS.length) {
    renderFinal();
  } else {
    renderScene();
  }
}

function renderFinal() {
  const avg = Math.round((state.trust + state.turnout + state.legal) / 3);
  let grade, title, desc;
  if (avg >= 85) { grade = 'A+'; title = 'Democracy Champion'; desc = 'You ran a textbook election. High trust, broad participation, and airtight legal compliance. Future election officials will study your decisions.'; }
  else if (avg >= 70) { grade = 'B'; title = 'Competent Official'; desc = 'You handled most crises well. A few missteps cost you some public trust, but the election was conducted fairly and results are accepted.'; }
  else if (avg >= 55) { grade = 'C'; title = 'Under Pressure'; desc = 'You struggled at key moments. The election was completed, but several decisions drew criticism. Some voter confidence has been eroded.'; }
  else { grade = 'D'; title = 'Legitimacy at Risk'; desc = 'Multiple poor decisions have created a crisis of confidence in the results. Legal challenges are mounting and international observers are concerned.'; }

  document.getElementById('simScene').innerHTML = `
    <div class="final-card">
      <div class="final-grade">${grade}</div>
      <h2 class="final-title">${title}</h2>
      <p class="final-desc">${desc}</p>
      <div class="final-scores">
        <div class="final-score-item">
          <div class="final-score-num">${state.trust}</div>
          <div class="final-score-label">Public Trust</div>
        </div>
        <div class="final-score-item">
          <div class="final-score-num">${state.turnout}</div>
          <div class="final-score-label">Voter Turnout</div>
        </div>
        <div class="final-score-item">
          <div class="final-score-num">${state.legal}</div>
          <div class="final-score-label">Legal Compliance</div>
        </div>
      </div>
      <button class="btn-restart" onclick="restartSim()">🔄 Play Again</button>
    </div>`;
}

function restartSim() {
  state = { scenario: 0, trust: 75, turnout: 50, legal: 90, history: [], phase: 'scene' };
  updateBars();
  renderScene();
  document.getElementById('historyLog').innerHTML = '';
}

function renderHistory() {
  const log = document.getElementById('historyLog');
  log.innerHTML = state.history.slice().reverse().map(h =>
    `<div class="history-item"><span class="history-day">Day ${h.day}</span><span>${h.stage}: ${h.choice}</span></div>`
  ).join('');
}

document.getElementById('hamburger')?.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

// INIT
updateBars();
renderScene();
