 document.addEventListener('DOMContentLoaded', () => {

            // --- Three.js Animated Background ---
            let scene, camera, renderer, geometry, material, mesh;

            function initThreeJs() {
                scene = new THREE.Scene();
                scene.fog = new THREE.Fog(0x0d1117, 10, 50);
                camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                camera.position.z = 25;
                const canvas = document.getElementById('background-canvas');
                renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
                renderer.setSize(window.innerWidth, window.innerHeight);

                geometry = new THREE.IcosahedronGeometry(15, 1);
                material = new THREE.MeshBasicMaterial({
                    color: 0x00FFFF, // Cyan color
                    wireframe: true,
                    transparent: true,
                    opacity: 0.2
                });
                mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);

                const ambientLight = new THREE.AmbientLight(0x404040);
                scene.add(ambientLight);
                const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
                directionalLight.position.set(1, 1, 1);
                scene.add(directionalLight);
            }

            function animateThreeJs() {
                requestAnimationFrame(animateThreeJs);
                mesh.rotation.x += 0.0005;
                mesh.rotation.y += 0.001;
                mesh.rotation.z += 0.0007;
                renderer.render(scene, camera);
            }

            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }

            window.addEventListener('resize', onWindowResize);
            
            initThreeJs();
            animateThreeJs();

            // --- Smooth Scrolling for Navigation ---
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    document.querySelector(targetId).scrollIntoView({
                        behavior: 'smooth'
                    });
                    document.getElementById('vertical-navbar').classList.remove('open');
                    document.getElementById('mobile-menu-btn').classList.remove('hidden');
                    document.getElementById('close-menu-btn').classList.add('hidden');
                });
            });

            // --- Active Link Highlighting ---
            const sections = document.querySelectorAll('section');
            const verticalNavbar = document.getElementById('vertical-navbar');

            function highlightActiveLink() {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - verticalNavbar.clientHeight;
                    const sectionHeight = section.clientHeight;
                    if (window.scrollY >= sectionTop - 60 && window.scrollY < sectionTop + sectionHeight - 60) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('text-cyan-400');
                    if (link.getAttribute('href').includes(current)) {
                        link.classList.add('text-cyan-400');
                    }
                });
            }

            window.addEventListener('scroll', highlightActiveLink);
            highlightActiveLink();

            // --- Mobile Menu Toggle ---
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const closeMenuBtn = document.getElementById('close-menu-btn');
            const verticalNavbarMobile = document.getElementById('vertical-navbar');

            mobileMenuBtn.addEventListener('click', () => {
                verticalNavbarMobile.classList.add('open');
                mobileMenuBtn.classList.add('hidden');
                closeMenuBtn.classList.remove('hidden');
            });

            closeMenuBtn.addEventListener('click', () => {
                verticalNavbarMobile.classList.remove('open');
                mobileMenuBtn.classList.remove('hidden');
                closeMenuBtn.classList.add('hidden');
            });

            // --- Copy to Clipboard Functionality ---
            function copyToClipboard(text, messageElement) {
                const tempInput = document.createElement('input');
                tempInput.value = text;
                document.body.appendChild(tempInput);
                tempInput.select();
                try {
                    document.execCommand('copy');
                    messageElement.textContent = 'Copied to clipboard!';
                    messageElement.classList.remove('hidden');
                    messageElement.classList.add('text-green-400');
                    setTimeout(() => {
                        messageElement.classList.add('hidden');
                    }, 2000);
                } catch (err) {
                    messageElement.textContent = 'Failed to copy.';
                    messageElement.classList.remove('hidden');
                    messageElement.classList.add('text-red-400');
                    setTimeout(() => {
                        messageElement.classList.add('hidden');
                    }, 2000);
                }
                document.body.removeChild(tempInput);
            }

            const emailBtn = document.getElementById('email-btn');
            const phoneBtn = document.getElementById('phone-btn');
            const copyMessage = document.getElementById('copy-message');

            if (emailBtn) {
                emailBtn.addEventListener('click', () => {
                    copyToClipboard('mdjahinmiah231@gmail.com', copyMessage);
                });
            }

            if (phoneBtn) {
                phoneBtn.addEventListener('click', () => {
                    copyToClipboard('01302696453', copyMessage);
                });
            }
        });