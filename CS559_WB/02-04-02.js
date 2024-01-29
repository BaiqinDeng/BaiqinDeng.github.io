document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    // Draw the puppy
    function drawPuppy() {
        // Draw head
        ctx.fillStyle = '#D2B48C'; // Tan color for the head
        ctx.beginPath();
        ctx.arc(150, 150, 100, 0, Math.PI * 2, true); // Circle for the head
        ctx.fill();

        // Draw ears
        ctx.fillStyle = '#8B4513'; // Darker color for the ears
        ctx.beginPath();
        ctx.arc(100, 100, 50, 0, Math.PI, true); // Left ear
        ctx.arc(200, 100, 50, 0, Math.PI, true); // Right ear
        ctx.fill();

        // Draw eyes
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(130, 130, 10, 0, Math.PI * 2, true); // Left eye
        ctx.arc(170, 130, 10, 0, Math.PI * 2, true); // Right eye
        ctx.fill();

        // Draw nose
        ctx.beginPath();
        ctx.arc(150, 170, 10, 0, Math.PI * 2, true); // Nose
        ctx.fill();

        // Draw smiling mouth
        ctx.beginPath();
        ctx.arc(150, 180, 20, 0, Math.PI, false); // Smiling mouth
        ctx.stroke();
    }

    drawPuppy();
});
