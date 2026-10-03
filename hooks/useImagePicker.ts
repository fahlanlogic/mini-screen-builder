const MAX_SIZE = 1024 * 1024; // 1 MB

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function useImagePicker(onPicked: (url: string) => void) {
  const open = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png,image/jpeg,image/webp,image/gif";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      if (file.size > MAX_SIZE) {
        alert("Ukuran gambar maksimal 1 MB");
        return;
      }
      onPicked(await readAsDataURL(file));
    };

    input.click();
  };

  return { open };
}
