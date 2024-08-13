async function uploadAndConvert() {
    const fileInput = document.getElementById('fileInput');
    const messageDiv = document.getElementById('message');
    const imageContainer = document.getElementById('imageContainer');

    if (fileInput.files.length === 0) {
        messageDiv.innerHTML = "Please select a file.";
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
        // Replace with your PythonAnywhere URL
        const response = await fetch('https://your_username.pythonanywhere.com/upload/', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            messageDiv.innerHTML = "File converted successfully!";
            imageContainer.innerHTML = `<img src="${result.image_url}" alt="Converted Image">`;
        } else {
            messageDiv.innerHTML = "Failed to convert the file.";
        }
    } catch (error) {
        console.error("Error:", error);
        messageDiv.innerHTML = "Error occurred during conversion.";
    }
}
