document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('box2canvas');
    const ctx = canvas.getContext('2d');

    let fireworks = [];

    class Firework {
        constructor(targetX, targetY) {
            this.x = targetX;
            this.y = canvas.height;
            this.targetX = targetX;
            this.targetY = targetY;
            this.speed = 2;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.state = 'rise';
            this.particles = [];
        }

        draw() {
            if (this.state === 'rise') {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            } else if (this.state === 'explode') {
                this.particles.forEach(particle => {
                    ctx.fillStyle = particle.color;
                    ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
                });
            }
        }

        update() {
            if (this.state === 'rise') {
                this.y -= this.speed;
                const dx = this.targetX - this.x;
                const dy = this.targetY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 10) {
                    this.state = 'explode';
                    this.explode();
                }
            } else if (this.state === 'explode') {
                this.particles.forEach((particle, index) => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    particle.life--;
                    if (particle.life <= 0) {
                        this.particles.splice(index, 1);
                    }
                });
                if (this.particles.length === 0) {
                    this.remove();
                }
            }
        }

        explode() {
            for (let i = 0; i < 30; i++) {
                this.particles.push(new Particle(this.x, this.y, this.color));
            }
        }

        remove() {
            fireworks.splice(fireworks.indexOf(this), 1);
        }
    }

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 2;
            this.life = Math.random() * 20 + 40;
            this.vx = (Math.random() - 0.5) * 5;
            this.vy = (Math.random() - 0.5) * 5;
            this.color = color;
        }
    }

    function createFirework(x, y) {
        fireworks.push(new Firework(x, y));
    }

    function updateFireworks() {
        fireworks.forEach(firework => {
            firework.update();
            firework.draw();
        });
    }

    canvas.addEventListener('click', (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        createFirework(mouseX, mouseY);
    });

    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        updateFireworks();
    }

    animate();
});
