  document.querySelector('.nk-form').addEventListener('submit', function(e) {
        e.preventDefault();

        var form = this;
        var formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.type === 'success') {
                document.querySelector('.nk-form-response-success').innerText = data.response;
                document.querySelector('.nk-form-response-success').style.display = 'block';
            } else {
                document.querySelector('.nk-form-response-error').innerText = data.response;
                document.querySelector('.nk-form-response-error').style.display = 'block';
            }
        })
        .catch(error => {
            document.querySelector('.nk-form-response-error').innerText = 'An error occurred while submitting the form.';
            document.querySelector('.nk-form-response-error').style.display = 'block';
        });
    });