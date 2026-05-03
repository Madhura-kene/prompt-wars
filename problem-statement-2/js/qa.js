// =============================================
// Q&A PAGE — CLAUDE AI INTEGRATION
// =============================================

const SUGGESTIONS = [
  'How does the Electoral College work?',
  'What is ranked-choice voting?',
  'How are mail-in ballots verified?',
  'What happens during a recount?',
  'How do primaries differ from general elections?',
  'Which countries have compulsory voting?',
  'How is gerrymandering done?',
  'What is proportional representation?',
  'How long does vote counting take?',
  'What is a hung parliament?'
];

const SYSTEM_PROMPT = `You are ElectIQ's non-partisan Election Guide — an expert on election processes, systems, and procedures across the world. 

Your role is to educate people about how elections work. You explain electoral processes, timelines, voting methods, counting procedures, candidate requirements, campaign finance, and democratic institutions.

Guidelines:
- Be clear, accurate, and educational
- Remain strictly non-partisan — never favor or criticize any political party, candidate, or ideology
- Cover elections globally — US, UK, EU countries, Asia, Africa, Latin America
- Use concrete examples and analogies when helpful
- Keep responses concise but thorough (150–350 words typically)
- Use plain language that anyone can understand
- When appropriate, mention how different countries handle the same issue differently
- Format with short paragraphs; use bullet points sparingly for lists
- If asked about specific election results or who won, explain you focus on processes, not outcomes
- Never speculate about election fraud, conspiracy theories, or unsubstantiated claims
- If asked something outside elections/voting/democracy, politely redirect to election topics`;

let conversationHistory = [];
let isLoading = false;

// Render suggestion chips
function renderSuggestions() {
  document.getElementById('suggestions').innerHTML = SUGGESTIONS
    .map(q => `<button class="suggestion-btn" onclick="askSuggestion('${q.replace(/'/g, "\\'")}')">${q}</button>`)
    .join('');
}

function askSuggestion(q) {
  document.getElementById('chatInput').value = q;
  sendMessage();
}

// Append a message bubble to the chat
function appendMessage(role, text) {
  const win = document.getElementById('chatWindow');

  // Remove welcome if present
  const welcome = win.querySelector('.chat-welcome');
  if (welcome) welcome.remove();

  const div = document.createElement('div');
  div.className = `msg ${role}`;

  const avatar = role === 'ai'
    ? `<div class="msg-avatar">🗳️</div>`
    : `<div class="msg-avatar">You</div>`;

  const formattedText = formatText(text);

  div.innerHTML = `${avatar}<div class="msg-bubble">${formattedText}</div>`;
  win.appendChild(div);
  win.scrollTop = win.scrollHeight;
  return div;
}

function formatText(text) {
  // Convert markdown-ish to HTML
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .split('\n\n').filter(Boolean)
    .map(p => p.startsWith('<ul>') ? p : `<p>${p}</p>`)
    .join('');
}

// Show typing indicator
function showTyping() {
  const win = document.getElementById('chatWindow');
  const div = document.createElement('div');
  div.className = 'msg ai'; div.id = 'typingIndicator';
  div.innerHTML = `<div class="msg-avatar">🗳️</div>
    <div class="msg-bubble" style="background:var(--paper); border:1px solid var(--border);">
      <div class="typing-dots"><span></span><span></span><span></span></div>
    </div>`;
  win.appendChild(div);
  win.scrollTop = win.scrollHeight;
}

function removeTyping() {
  document.getElementById('typingIndicator')?.remove();
}

async function sendMessage() {
  if (isLoading) return;
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  isLoading = true;
  const btn = document.getElementById('sendBtn');
  btn.disabled = true;
  btn.innerHTML = '<span style="font-size:0.8rem;">...</span>';

  appendMessage('user', text);
  conversationHistory.push({ role: 'user', content: text });

  showTyping();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: conversationHistory
      })
    });

    const data = await response.json();
    removeTyping();

    const reply = data.content?.map(b => b.text || '').join('') || 'Sorry, I couldn\'t process that. Please try again.';
    conversationHistory.push({ role: 'assistant', content: reply });
    appendMessage('ai', reply);

  } catch (err) {
    removeTyping();
    appendMessage('ai', 'There was an error connecting to the AI. Please check your connection and try again.');
    console.error(err);
  }

  isLoading = false;
  btn.disabled = false;
  btn.innerHTML = '<span id="sendIcon">→</span>';
  input.focus();
}

// Enter key to send
document.getElementById('chatInput').addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});

document.getElementById('hamburger')?.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

// INIT
renderSuggestions();
