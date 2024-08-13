function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

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

    const csrftoken = getCookie('csrftoken');

    try {
        // Replace with your PythonAnywhere URL
        const response = await fetch('https://shawnuva.pythonanywhere.com/upload/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': csrftoken,  // Include the CSRF token in the request headers
                'Accept': 'application/json',
            },
        });

        if (response.ok) {
            const result = await response.json();
            messageDiv.innerHTML = "File converted successfully!";
            imageContainer.innerHTML = `<img src="${result.image_url}" alt="Converted Image">`;
        } else {
            const errorData = await response.json();
            messageDiv.innerHTML = `Failed to convert the file: ${errorData.error}`;
        }
    } catch (error) {
        console.error("Error:", error);
        messageDiv.innerHTML = "Error occurred during conversion.";
    }
}
