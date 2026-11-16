export async function savePlaylistCover(uri, base64) {
  if (!base64 || typeof window === 'undefined') return uri;

  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => {
      const longestSide = Math.max(image.naturalWidth, image.naturalHeight);
      const scale = Math.min(1, 640 / longestSide);
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext('2d');
      if (!context) {
        reject(new Error('Não foi possível preparar a imagem selecionada.'));
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.78));
    };
    image.onerror = () => reject(new Error('Não foi possível abrir a imagem selecionada.'));
    image.src = `data:image/jpeg;base64,${base64}`;
  });
}

export async function removePlaylistCover() {}
