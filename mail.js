

const dot = document.getElementById('cDot'), ring = document.getElementById('cRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px' });
(function animate() { rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animate) })();
document.querySelectorAll('a,button,.service-card,.work-card,.tcard,.faq-item,.team-card,.contact-item,.price-card').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('expand'); ring.classList.add('expand') });
    el.addEventListener('mouseleave', () => { dot.classList.remove('expand'); ring.classList.remove('expand') });
});


const html = document.documentElement;
function toggleTheme() {
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    document.getElementById('themeKnob').textContent = isDark ? '🌙' : '☀️';
}
document.getElementById('themeBtn').addEventListener('click', toggleTheme);


function closeMobile() {
    document.getElementById('mobileMenu').classList.remove('open');
    document.getElementById('hamburger').classList.remove('active');
}
document.getElementById('hamburger').addEventListener('click', function () {
    this.classList.toggle('active');
    document.getElementById('mobileMenu').classList.toggle('open');
});

const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 50 ? '0 8px 40px rgba(0,0,0,0.2)' : 'none';
});


document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }) }
    });
});


const revealEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revObs.observe(el));

function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let start = 0;
    const duration = 1800;
    const step = timestamp => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const cur = Math.floor(ease * target);
        el.textContent = cur + suffix;
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}
const statEls = document.querySelectorAll('.stat-num[data-target]');
const statObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting && !e.target.dataset.animated) {
            e.target.dataset.animated = '1';
            animateCounter(e.target);
        }
    });
}, { threshold: 0.5 });
statEls.forEach(el => statObs.observe(el));


const hTargets = [['heroM1', '$2.4M'], ['heroM2', '+142%'], ['heroM3', '128K'], ['heroM4', '40+']];
setTimeout(() => {
    hTargets.forEach(([id, val], i) => {
        setTimeout(() => { document.getElementById(id).textContent = val }, i * 300);
    });
}, 800);


const bars = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88];
const sb = document.getElementById('sparkbar');
if (sb) {
    bars.forEach((h, i) => {
        const b = document.createElement('div');
        b.className = 'sbar' + (i >= 8 ? ' active' : '');
        b.style.height = h + '%';
        sb.appendChild(b);
    });
}


const items = ['UI/UX Design', 'Web Development', 'Mobile Apps', 'AI Solutions', 'Cloud DevOps', 'Digital Strategy', 'Brand Identity', 'E-Commerce', 'SaaS Products', 'Data Analytics'];
const track = document.getElementById('marqueeTrack');
if (track) {
    const doubled = [...items, ...items];
    doubled.forEach(t => {
        const d = document.createElement('div');
        d.className = 'marquee-item';
        d.innerHTML = `${t} <span class="marquee-sep">✦</span>`;
        track.appendChild(d);
    });
}


let tIdx = 0;
const tcards = document.querySelectorAll('.tcard');
const totalReal = 4;
const dotsC = document.getElementById('tDots');
for (let i = 0; i < totalReal; i++) {
    const d = document.createElement('div');
    d.className = 'tdot' + (i === 0 ? ' active' : '');
    d.onclick = () => { tIdx = i; updateSlider() };
    dotsC.appendChild(d);
}
function updateSlider() {
    const track = document.getElementById('testimonialsTrack');
    track.style.transform = `translateX(calc(-${tIdx * 395}px))`;
    tcards.forEach((c, i) => c.classList.toggle('active', i === tIdx || i === tIdx + totalReal));
    document.querySelectorAll('.tdot').forEach((d, i) => d.classList.toggle('active', i === tIdx));
}
function slideTest(dir) {
    tIdx = (tIdx + dir + totalReal) % totalReal;
    updateSlider();
}
setInterval(() => { tIdx = (tIdx + 1) % totalReal; updateSlider() }, 5000);


function filterWork(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.work-card').forEach(c => {
        const show = cat === 'all' || c.dataset.cat === cat;
        c.style.opacity = show ? '1' : '0.25';
        c.style.transform = show ? '' : 'scale(0.97)';
        c.style.transition = 'all 0.4s';
    });
}


function togglePricing(el) {
    el.classList.toggle('on');
    const isAnnual = el.classList.contains('on');
    document.querySelectorAll('.price-val[data-monthly]').forEach(v => {
        const val = isAnnual ? v.dataset.annual : v.dataset.monthly;
        v.innerHTML = val === 'Custom' ? `Custom<span></span>` :
            `${val}<span>/mo</span>`;
    });
}


function toggleFAQ(item) {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
}


function submitForm() {
    const btn = document.querySelector('.form-submit');
    btn.innerHTML = '<span>Sending...</span>';
    btn.style.opacity = '0.7';
    setTimeout(() => {
        document.getElementById('formBody').style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
    }, 1500);
}


function subscribeNL() {
    const email = document.getElementById('nlEmail').value;
    if (!email || !email.includes('@')) {
        document.getElementById('nlEmail').style.borderColor = '#f87171';
        return;
    }
    document.getElementById('nlMsg').style.display = 'block';
    document.getElementById('nlEmail').value = '';
}


window.addEventListener('scroll', () => {
    const s = window.scrollY;
    document.querySelectorAll('.float-orb').forEach((o, i) => {
        o.style.transform = `translate(${Math.sin(s * 0.002 + i) * 15}px,${s * 0.05 * (i + 1) * 0.3}px)`;
    });
});



function submitForm() {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("cemail").value;
    let service = document.getElementById("cservice").value;
    let message = document.querySelector("textarea").value;

    let subject = `New Contact from ${fname} ${lname}`;

    let body = `
Name: ${fname} ${lname}
Email: ${email}
Service: ${service}
Message:
${message}
  `;

    let mailtoLink = `mailto:ah.wa.ah12@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
}

