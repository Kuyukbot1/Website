function processFile() {
            const fileInput = document.getElementById('fileInput');
            const output = document.getElementById('output');
            const downloadLink = document.getElementById('downloadLink');
            const outputFileName = document.getElementById('outputFileName').value;
            const toggleButton = document.getElementById('toggleOutput');

            if (fileInput.files.length === 0) {
                alert('Pilih file .txt terlebih dahulu');
                return;
            }
            if (!outputFileName) {
                alert('Masukkan nama file output');
                return;
            }

            const file = fileInput.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const lines = e.target.result.split('\n');
                let columns = lines.map(line => line.split(/\s+/));

                // Menggabungkan kolom-kolom ke dalam satu array
                let combinedLines = [];
                for (let col = 0; col < columns[0].length; col++) {
                    for (let row = 0; row < columns.length; row++) {
                        if (columns[row][col] !== undefined && columns[row][col] !== '') {
                            combinedLines.push(columns[row][col]);
                        }
                    }
                }

                
                const resultText = combinedLines.join('\n');

                
                output.textContent = resultText;
                output.style.display = 'block';

                
                const blob = new Blob([resultText], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                downloadLink.href = url;
                downloadLink.download = outputFileName;
                downloadLink.textContent = 'Download File Gabungan';

                
                toggleButton.textContent = 'Sembunyikan Hasil';
            };

            reader.readAsText(file);
        }

        function toggleOutput() {
            const output = document.getElementById('output');
            const toggleButton = document.getElementById('toggleOutput');

            if (output.style.display === 'none') {
                output.style.display = 'block';
                toggleButton.textContent = 'Sembunyikan Hasil';
            } else {
                output.style.display = 'none';
                toggleButton.textContent = 'Tampilkan Hasil';
            }
                  }
