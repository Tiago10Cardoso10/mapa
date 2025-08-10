import os
from pdf2image import convert_from_path


# Diretório onde estão os PDFs
input_dir = '/Users/alexandrevenancio/Downloads/untitled folder'      # Coloque aqui o caminho dos seus PDFs
output_dir = '/Users/alexandrevenancio/Downloads/cards'  # Onde serão salvos os JPGs
os.makedirs(output_dir, exist_ok=True)

# Lista e ordena os PDFs
pdf_files = sorted([f for f in os.listdir(input_dir) if f.lower().endswith('.pdf')])

for idx, pdf_file in enumerate(pdf_files, start=1):
    pdf_path = os.path.join(input_dir, pdf_file)

    # Converte as 2 páginas do PDF em imagens
    images = convert_from_path(pdf_path, fmt='jpeg')

    if len(images) != 2:
        print(f"Aviso: {pdf_file} tem {len(images)} páginas, esperado 2.")

    for page_num, image in enumerate(images, start=1):
        file_name = f"c{idx:02d}i{page_num}.jpg"
        image_path = os.path.join(output_dir, file_name)
        image.save(image_path, 'JPEG')
        print(f"Salvo: {image_path}")