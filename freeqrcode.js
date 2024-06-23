document.getElementById('content-type').addEventListener('change', function() {
      var selectedType = document.getElementById('content-type').value;
      if (selectedType === 'phone') {
        document.getElementById('phone-section').style.display = 'block';
      } else {
        document.getElementById('phone-section').style.display = 'none';
      }
    });

    document.getElementById('generate-btn').addEventListener('click', function() {
      var contentType = document.getElementById('content-type').value;
      var inputValue = document.getElementById('qr-text').value.trim();
      if (!inputValue) {
        alert('Please enter text, phone number, or email');
        return;
      }

      var apiUrl;
      if (contentType === 'text') {
        apiUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(inputValue);
      } else if (contentType === 'phone') {
        var countryCode = document.getElementById('country-code').value;
        apiUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=tel:' + encodeURIComponent(countryCode + inputValue);
      } else if (contentType === 'email') {
        apiUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=mailto:' + encodeURIComponent(inputValue);
      }

      // Clear previous QR code, if any
      document.getElementById('qrcode').innerHTML = '';
      document.getElementById('download-btn').style.display = 'none';

      // Create new QR code image element
      var qrImage = document.createElement('img');
      qrImage.src = apiUrl;
      qrImage.alt = 'QR Code';

      // Add onload event to the image
      qrImage.onload = function() {
        // Show download button
        document.getElementById('download-btn').style.display = 'block';
      };

      // Append the QR code image to the container
      document.getElementById('qrcode').appendChild(qrImage);
    });

    document.getElementById('download-btn').addEventListener('click', async function() {
      // Get the QR code image URL
      var qrImageSrc = document.getElementById('qrcode').querySelector('img').src;

      // Fetch the image data
      const response = await fetch(qrImageSrc);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger the download
      var downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'qrcode_freeqrcodecreator.blogspot.com.png'; // Set the download file name with your site name

      // Append the anchor element to the body
      document.body.appendChild(downloadLink);

      // Trigger the download
      downloadLink.click();

      // Clean up
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    });
