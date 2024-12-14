// Create a new SimplexNoise instance
// Access the canvas and its 2D context
const canvas = document.getElementById('terrainCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

// Canvas dimensions
const width = canvas.width;
const height = canvas.height;

// Create an ImageData object
const imageData = ctx.createImageData(width, height);

// Noise parameters
const scale = 0.01; // Adjust for larger or smaller features
const octaves = 4;  // Number of noise layers
const persistence = 0.5; // Controls the amplitude decrease per octave

// Generate terrain
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        // Calculate the noise value
        let n = 0;
        let amplitude = 1;
        let frequency = 1;
        for (let o = 0; o < octaves; o++) {
            amplitude *= persistence;
            frequency *= 2;
        }

        // Normalize the noise value to 0-1
        n = (n + 1) / 2;

        // Map the noise value to a height (e.g., grayscale color)
        const gray = Math.floor(n * 255);
        const index = (y * width + x) * 4;

        // Set RGBA values
        imageData.data[index + 0] = gray; // Red
        imageData.data[index + 1] = gray; // Green
        imageData.data[index + 2] = gray; // Blue
        imageData.data[index + 3] = 255;  // Alpha
    }
}
// Put the image data back to the canvas
ctx.putImageData(imageData, 0, 0);