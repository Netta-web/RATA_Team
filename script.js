        const teamMembers = [
            {
                id: 1,
                name: "Rene William Ngabo",
                role: "Executive Director",
                image: "assets/rene-RATA.png",
                linkedin: "https://www.linkedin.com/in/rene-william-ngabo-68448aa2",
                bio: `Rene William Ngabo is an assistive technology and disability inclusion enthusiast committed to improving the lives of vulnerable populations, particularly persons with disabilities. Through his work with Rwanda Assistive Technology Access (RATA), he focuses on widening participation, expanding educational opportunities, and enhancing employment prospects by leveraging assistive technologies.
Beyond disability inclusion, Rene is a passionate digital champion, dedicated to spreading digital literacy, developing locally relevant tools, and ensuring that digital technologies are accessible to all. His vision combines social impact with innovation, making him a strong advocate for both assistive technology adoption and digital inclusion in Rwanda and beyond.`
            },
            {
                id: 2,
                name: "Esther Kayitesi",
                role: "Finance and Administration Officer",
                image: "assets/esther-RATA.png",
                linkedin: "https://www.linkedin.com/in/esther-kayitesi-2aa442253/",
                bio: `Esther Kayitesi is a Finance and Administration Officer at Rwanda Assistive Technology Access (RATA).
                 She holds professional certifications as a CPA and FMVA, reflecting her expertise in accounting, financial modeling, and corporate finance. 
                 Based in Kigali, Rwanda, Esther is an alumna of the University of Rwanda, where she built a strong foundation in finance and management.
Her role at RATA combines financial oversight with administrative leadership, supporting the organization’s mission to expand access to assistive technologies across Rwanda.`
            },
            {
                id: 3,
                name: "Charles Birekeraho",
                role: "Community Outreach Manager",
                image: "assets/charles-RATA.png",
                linkedin: "https://www.linkedin.com/in/birekeraho-charles-000b2829a/",
                bio: `Charles Birekeraho is an Assistive Technology Mentor and Trainer with Rwanda Assistive Technology Access (RATA). He recently completed the Certificate IV in Assistive Technology Mentoring through Assistive Technology Australia, a milestone achieved thanks to the strong collaboration between the two organizations.
With a passion for disability inclusion and community impact, Charles brings both technical expertise and mentorship skills to his role. His work focuses on empowering individuals with disabilities by improving access to assistive technologies and fostering meaningful participation in education, employment, and everyday life
.`
            },
        ];

        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;

        function initTheme() {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            html.setAttribute('data-theme', savedTheme);
        }

        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // Render Team Cards
        const teamGrid = document.getElementById('teamGrid');
        
        function renderTeam() {
            teamGrid.innerHTML = teamMembers.map(member => `
                <div class="team-card" tabindex="0" data-id="${member.id}" role="button" aria-label="View ${member.name}'s profile">
                    <div class="card-image-container">
                        <img src="${member.image}" alt="${member.name}" class="card-image">
                    </div>
                    <div class="card-info">
                        <h3 class="card-name">${member.name}</h3>
                        <p class="card-role">${member.role}</p>
                    </div>
                </div>
            `).join('');

            document.querySelectorAll('.team-card').forEach(card => {
                card.addEventListener('click', () => openModal(card.dataset.id));
                card.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openModal(card.dataset.id);
                    }
                });
            });
        }

        // Modal
        const modalOverlay = document.getElementById('modalOverlay');
        const modalGrid = document.getElementById('modalGrid');
        const closeModal = document.getElementById('closeModal');

        function openModal(id) {
            const member = teamMembers.find(m => m.id == id);
            if (!member) return;

            const bioHtml = member.bio.split('\n\n').map(p => `<p>${p}</p>`).join('');
            const linkedinHtml = member.linkedin ? `
                <p style="margin-top:12px">
                    <a href="${member.linkedin}" target="_blank" rel="noopener" aria-label="Open LinkedIn profile of ${member.name}" style="color:var(--primary); text-decoration:none; display:inline-flex; align-items:center;">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                </p>` : '';

            modalGrid.innerHTML = `
                <img src="${member.image}" alt="${member.name}" class="modal-image">
                <div class="modal-content">
                    <h2 class="modal-name">${member.name}</h2>
                    <p class="modal-role">${member.role}</p>
                    <div class="modal-bio">${bioHtml}</div>
                    ${linkedinHtml}
                </div>
            `;

            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            closeModal.focus();
        }

        function closeModalFn() {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        closeModal.addEventListener('click', closeModalFn);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModalFn();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModalFn();
            }
        });

        // Initialize
        initTheme();
        renderTeam();
